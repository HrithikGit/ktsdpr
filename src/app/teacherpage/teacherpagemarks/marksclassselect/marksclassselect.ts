import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "marksclassselect",
    templateUrl: "./marksclassselect.html"
})


export class marksclassselectComponent{
    selectedindex=1;
    Class="-";
    Section="";
    Subject="-";
    Exam="-";
    Class_Section="-";
    classes=[];
    exams=["Please select a class and subject"];
    subjects=["Please select a Class"];
    openclass=false;
    opensubject=false;
    openexam=false;
    waiting=true;
    public constructor(private router:Router,private route:ActivatedRoute){
        this.getclasses();
    }

    async getclasses(){
        const classes=firebase.firestore().collection("Class");
        await classes.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                this.classes.push(data.Class_Id+"-"+data.Class_Section);
            })
        })
        console.log(this.classes);
        this.waiting=false;
    }

    async getsubject(){
        var pres_subs=[];
        const subject=firebase.firestore().collection("Teacher").where("Class_Id","==",parseInt(this.Class))
        .where("Class_Section","==",this.Section);

        var set=new Set();
        await subject.get().then(result=>{
            result.forEach(doc=>{
                if(!set.has(doc.data().Subject_Name)){
                    set.add(doc.data().Subject_Name);
                    pres_subs.push(doc.data().Subject_Name);
                }
                
            })
        })
        this.subjects=[...pres_subs];
    }

    async getexams(){
        var isexamspresent=false;
        const exam=firebase.firestore().collection("Marks").where("Student_Class","==",parseInt(this.Class))
        .where("Student_Section","==",this.Section).where("Subject","==",this.Subject);

        var set=new Set();
        var pres_exams=[]
        await exam.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                if(!set.has(data.Exam_Type)){
                    set.add(data.Exam_Type);
                    pres_exams.push(data.Exam_Type);
                }
                
                isexamspresent=true;
            })
        })
        if(!isexamspresent){pres_exams.push("Marks Were Not Added");}
        this.exams=[...pres_exams];
    }


    openClass(){
        if(this.openclass==false){
            this.opensubject=false;
            this.openexam=false;
            this.openclass=true;}
        else{this.openclass=false;}
    }

    openSubject(){
        if(this.opensubject==false){
            this.openexam=false;
            this.openclass=false;
            this.opensubject=true;}
        else{this.opensubject=false;}
    }

    openExam(){
        if(this.openexam==false){
            this.openclass=false;
            this.opensubject=false;
            this.openexam=true;}
        else{this.openexam=false;}
    }


    setclass(i){
        this.Class_Section=this.classes[i];
        this.Class=this.classes[i];
        this.openclass=false;
        this.Section=this.Class.substring(this.Class.length-1,this.Class.length);
        this.Class=this.Class.substring(0,this.Class.length-1).trim();
        this.Subject="-";
        this.Exam="-";
        this.subjects=["Please.. Wait..."];
        this.getsubject();

    }
    setsubject(i){
        this.Subject=this.subjects[i];
        this.opensubject=false;
        this.Exam="-";
        this.exams=["Please... Wait..."];
        this.getexams();
        
    }
    loading=false;
    displaymarks=false;
    marks=[]
    async setexam(i){
        this.Class.trim();
        this.Exam=this.exams[i];
        this.openexam=false;

        var ero=false;
        if(this.Class=="-"){
            ero=true;
        }
        else if(this.Subject=="-" || this.Subject=="Please.. Wait..."){
            ero=true;
        }
        else if(this.Exam=="-" || this.Exam=="Please... Wait..."){
            ero=true;
        }
        else if(this.Exam=="Marks Were Not Added"){
            ero=true;
        }
        if(ero){
            alert("Please select appropriate details");
            return;
        }


        this.marks=[];
        const student=firebase.firestore().collection("Marks").where("Student_Class","==",parseInt(this.Class)).where("Student_Section","==",this.Section)
        .where("Exam_Type","==",this.Exam).where("Subject","==",this.Subject);
        this.loading=true;
        await student.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                console.log(data);
                this.marks.push({
                    "Student_Id":data.Student_Id,
                    "Student_Marks":data.Student_Marks,
                    "Student_Name":data.Student_Name
                });
            })
        })
        console.log(this.marks);
        this.loading=false;
        this.displaymarks=true;
    }
    
    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}