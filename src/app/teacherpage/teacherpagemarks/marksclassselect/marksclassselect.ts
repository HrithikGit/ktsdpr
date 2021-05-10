import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "marksclassselect",
    templateUrl: "./marksclassselect.html"
})


export class marksclassselectComponent{
    selectedindex=1;
    Class="Select a Class";
    Section="";
    Subject="Select a Subject";
    Exam="Select an Exam";
    Class_Section="Select a Class";
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
        if(this.openclass==false){this.openclass=true;}
        else{this.openclass=false;}
    }

    openSubject(){
        if(this.opensubject==false){this.opensubject=true;}
        else{this.opensubject=false;}
    }

    openExam(){
        if(this.openexam==false){this.openexam=true;}
        else{this.openexam=false;}
    }


    setclass(i){
        this.Class_Section=this.classes[i];
        this.Class=this.classes[i];
        this.openclass=false;
        this.Section=this.Class.substring(this.Class.length-1,this.Class.length);
        this.Class=this.Class.substring(0,this.Class.length-1).trim();
        this.Subject="Select a Subject";
        this.Exam="Select an Exam";
        this.subjects=["Please.. Wait..."];
        this.getsubject();

    }
    setsubject(i){
        this.Subject=this.subjects[i];
        this.opensubject=false;
        this.Exam="Select an Exam";
        this.exams=["Please... Wait..."];
        this.getexams();
        
    }
    setexam(i){
        this.Exam=this.exams[i];
        this.openexam=false;
    }

    async getmarks(){
        if(this.Class=="Select a Class"){
            alert("Please select a Class");
            return;
        }
        if(this.Subject=="Select a Subject" || this.Subject=="Please.. Wait..."){
            alert("Please select a Subject");
            return;
        }
        if(this.Exam=="Select an Exam" || this.Exam=="Please... Wait..."){
            alert("Please select an Exam");
            return;
        }
        if(this.Exam=="Marks Were Not Added"){
            alert("Marks for this subject were not added");
            return;
        }
        
        this.router.navigate(["marksview",this.Class,this.Section,this.Subject,this.Exam]);

    }
    
    public goHome(){
        this.router.navigate(["/teacher"], { replaceUrl: true });
    }
}