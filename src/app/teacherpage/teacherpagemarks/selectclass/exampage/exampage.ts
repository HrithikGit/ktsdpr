import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import "nativescript-plugin-firebase";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "exampage",
    templateUrl: "./exampage.html"
})
export class exampageComponent{
    class;
    section;
    teacherid;
    waiting=true;
    examtypes=[];
    subject;
    public constructor(private router:Router,private route:ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.class=parseInt(params["class"]);
            this.section=params["section"];
            this.teacherid=parseInt(params["teacherid"]);
            this.subject=params["subject"];
        })
        this.gettests();
    }

    async gettests(){
        const tests=firebase.firestore().collection("Marks").where("Teacher_Id","==",this.teacherid).where("Student_Class","==",this.class)
        .where("Student_Section","==",this.section);
        var set=new Set();
        await tests.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                if(!set.has(data.Exam_Type)){
                    set.add(data.Exam_Type);
                    this.examtypes.push({"Exam":data.Exam_Type});}
            })
        })
        this.waiting=false;
    }

    async add(){
        //Need a prompt and take exam name
        var examname="Unit-I";
        console.log(this.class+" "+this.section);
        const students=firebase.firestore().collection("Student").where("Class_Id","==",this.class).where("Class_Section","==",this.section);
        const marks=firebase.firestore().collection("Marks");
        await students.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                console.log(data);
                marks.add({
                    Student_Id: parseInt(data.Student_Id),
                    Student_Class: parseInt(data.Class_Id),
                    Student_Section:data.Class_Section,
                    Student_Marks:0,
                    Exam_Type:examname,
                    Subject:this.subject,
                    Teacher_Id:this.teacherid
                })
            })
        })
        this.examtypes.push({"Exam":examname,"id":-1});
        console.log(this.examtypes);
    }

    remove(i){
        //Ask for are you sure you want to remove unit-I data of this class
        if(this.examtypes[i].id!=-1){
            //remove from database using document id
            
        }
        this.examtypes.splice(i,1);
    }
    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
    
}