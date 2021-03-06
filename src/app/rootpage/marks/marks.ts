import { Component, OnInit,NgModule,ViewChild,ElementRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";
import {LoadingIndicator,Mode,OptionsCommon} from '@nstudio/nativescript-loading-indicator';
const indicator = new LoadingIndicator();

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "marks",
    templateUrl: "./marks.html",
})
export class marksComponent {
    public message:string;
    public arr:Array<string> = [];
    waiting=true;
    exam="Add an Exam";
    examtype="";
    classes=[];
    class_select=[];
    openClasses=false;
    public constructor(private router: Router,private page: Page,private route: ActivatedRoute) {
        console.log("Heree..!");
        this.getdetails();
    }

    async getdetails(){
        const cls=firebase.firestore().collection("Class");
        await cls.get().then(result=>{
            result.forEach(doc=>{
                this.classes.push(doc.data());
            })
        })


        for(var i=0;i<this.classes.length;i++){
            this.class_select.push('white');
        }
        console.log(this.classes);
        this.waiting=false;

    }

    openclasses(){
        if(this.openClasses==true){this.openClasses=false;}
        else{this.openClasses=true;}
    }

    change(i){
        if(this.class_select[i]=='white'){this.class_select[i]="green";}
        else{this.class_select[i]='white';}
    }

    async add(){
        var classes_selected=[];
        for(var i=0;i<this.class_select.length;i++){
            if(this.class_select[i]=='green'){classes_selected.push(this.classes[i]);}
        }

        if(classes_selected.length==0){
            alert("Please select atleast one class");
            return;
        }
        if(this.examtype==""){
            alert("Please add unit name");
            return;
        }
        var stop = false;
        await confirm({
            title: "Your title",
            message: "Are you sure you want to Add "+this.examtype+" to the selected classes?",
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
         }).then(result=>{
             if(result==false){
                 stop = true;
             }
             else if(result==true){
                 stop = false;
             }
             else{
                 stop = true;
             }
         })
        if(stop){
            return ;
        }
        this.examtype=this.examtype.toUpperCase();
        const options: OptionsCommon = {
            message: 'Loading...',
            details: 'Please Wait',
            progress: 0.65, 
            margin: 10,
            dimBackground: true,
            color: '#0074D9', 
            backgroundColor: 'yellow',
            userInteractionEnabled: false,
            hideBezel: true,
            mode: Mode.Indeterminate
          };
          indicator.show(options);

        for(var i=0;i<classes_selected.length;i++){
          this.sel_class=classes_selected[i]["Class_Id"];
            this.sel_sec=classes_selected[i]["Class_Section"];
            this.checkunits();
            if(this.class_units.includes(this.examtype)){
                alert("Exam type already present in class "+this.sel_class+"-"+this.sel_sec);
                return;
            }
        }


        for(var i=0;i<classes_selected.length;i++){
            const subs=firebase.firestore().collection("Teacher").where("Class_Id","==",parseInt(classes_selected[i]["Class_Id"]))
            .where("Class_Section","==",classes_selected[i]["Class_Section"]);
            var subjects=[];

            await subs.get().then(result=>{
                result.forEach(doc=>{
                    subjects.push(doc.data().Subject_Name);
                })
            })


            

            const students=firebase.firestore().collection("Student").where("Class_Id","==",parseInt(classes_selected[i]["Class_Id"]))
            .where("Class_Section","==",classes_selected[i]["Class_Section"]);

            const marks=firebase.firestore().collection("Marks");
            await students.get().then(result=>{
                result.forEach(doc=>{
                    for(var j=0;j<subjects.length;j++){
                    marks.add({
                        "Exam_Type":this.examtype,
                        "Student_Class":parseInt(classes_selected[i]["Class_Id"]),
                        "Student_Id":doc.data().Student_Id,
                        "Student_Marks":0,
                        "Student_Section":classes_selected[i]["Class_Section"],
                        "Subject":subjects[j],
                        "Maximum_Marks":100,
                        "Student_Name":doc.data().Student_Name
                    })
                }
                })
            })

            console.log("Added "+classes_selected[i]);
        }
        this.openClasses=false;
        indicator.hide();
        alert("Added Successfully");
    }


    open=false;
    sel_class="";
    sel_sec="";
    class_selected="Select a class";
    is_Class_Selected=false;
    Open(){
        if(this.open==true){this.open=false;}
        else{this.open=true;}
    }

    async selected(i){
        this.sel_class=this.classes[i]["Class_Id"];
        this.sel_sec=this.classes[i]["Class_Section"];
        this.class_selected=this.sel_class+"-"+this.sel_sec;
        this.getunits();
        this.Open();
        

    }


    async checkunits(){
        this.class_units=[];
        var unitset=new Set();
        const units=firebase.firestore().collection("Marks").where("Student_Class","==",parseInt(this.sel_class))
        .where("Student_Section","==",this.sel_sec);

        await units.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                if(!unitset.has(data.Exam_Type)){
                    unitset.add(data.Exam_Type);
                    this.class_units.push(data.Exam_Type);
                }
            })
        })
    }


    class_units=[];
    fetching=false;
    async getunits(){
        var unitset=new Set();
        this.class_units=[];
        this.fetching=true;
        this.is_Class_Selected=true;
        const units=firebase.firestore().collection("Marks").where("Student_Class","==",parseInt(this.sel_class))
        .where("Student_Section","==",this.sel_sec);

        await units.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                if(!unitset.has(data.Exam_Type)){
                    unitset.add(data.Exam_Type);
                    this.class_units.push(data.Exam_Type);
                }
            })
        })
        
        this.fetching=false;
    }

    async removeexam(i){
        var stop = false;
        await confirm({
            title: "Your title",
            message: "Are you sure you want to delete "+this.class_units[i]+" exam record for class : "+this.sel_class+"-"+this.sel_sec,
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
         }).then(result=>{
             if(result==false){
                 stop = true;
             }
             else if(result==true){
                 stop = false;
             }
             else{
                 stop = true;
             }
         })
        if(stop){
            return ;
        }

        const students=firebase.firestore().collection("Marks").where("Student_Class","==",parseInt(this.sel_class))
        .where("Student_Section","==",this.sel_sec).where("Exam_Type","==",this.class_units[i]);

        const marks=firebase.firestore().collection("Marks");

        await students.get().then(result=>{
            result.forEach(doc=>{
                marks.doc(doc.id).delete();
            })
        })
        var exams=this.class_units.splice(i,1);
        alert("Removed "+exams+" data from "+this.sel_class+"-"+this.sel_sec+" Class");
    }

    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}
