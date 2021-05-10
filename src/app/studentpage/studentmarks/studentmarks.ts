import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";
import { ActionItemDirective } from "@nativescript/angular";

const firebase = require("nativescript-plugin-firebase/app")

@Component({
    selector: "studentmarks",
    templateUrl: "./studentmarks.html"
})
export class studentmarksComponent{
    class;
    section;
    roll;
    waiting=true;
    testset=new Set();
    tests=[];
    exammarks=[];
    indexes={};
    Exam="Select an Exam Type";
    openMarks=false;
    selectedexam_marks=[];
    selected_exams=[];
    public constructor(private router:Router,private route:ActivatedRoute){
        this.route.params.subscribe(params=>{
            this.class=params["class"];
            this.section=params["section"];
            this.roll=params["roll"];
        })
        this.getdetails();

    }
    async getdetails(){
        console.log(this.class+" "+this.section+" "+this.roll);
        const test=firebase.firestore().collection("Marks").where("Student_Class","==",parseInt(this.class))
        .where("Student_Section","==",this.section).where("Student_Id","==",parseInt(this.roll));
        await test.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                if(!this.testset.has(data.Exam_Type)){
                    this.testset.add(data.Exam_Type);
                    this.tests.push(data.Exam_Type);
                    this.indexes[data.Exam_Type]=this.tests.length-1;
                    this.exammarks.push({});
                }
                if(data.Student_Marks==0){this.exammarks[this.indexes[data.Exam_Type]][data.Subject]="Marks were not added";}
                else{this.exammarks[this.indexes[data.Exam_Type]][data.Subject]=data.Student_Marks;}
                console.log(data);
            })
        })
        console.log(this.exammarks);
        this.waiting=false;
    }

    openmarks(){
        if(this.openMarks==true){this.openMarks=false;}
        else{this.openMarks=true;}
    }

    setexamtype(i){
        this.Exam=this.tests[i];
        console.log(this.exammarks[i]+" inside "+i);
        this.selectedexam_marks=this.exammarks[i];
        this.openMarks=false;
        console.log(this.selectedexam_marks);
        this.selected_exams=Object.keys(this.selectedexam_marks);
    }

}