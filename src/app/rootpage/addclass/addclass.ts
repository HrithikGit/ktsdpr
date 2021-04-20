import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "ns-items",
    templateUrl: "./addclass.html",
})


export class addclassComponent implements OnInit {
    class_year;
    class_section;
    class_teacher;
    no_of_students;
    class_Id;
    exists;
    notvalid;
    succeded;
    constructor(private router: Router,private page: Page) {}
    ngOnInit(): void {
        this.class_year="";
        this.class_section ="";
        this.class_teacher="";
        this.no_of_students=0;
        this.notvalid = false;
        this.exists = false;
    }
    isCharacterALetter(char) {
        return (/[a-zA-Z]/).test(char)
      }

    async fun(){
        this.class_year.trim();
        this.class_section.trim();
        this.class_teacher.trim();
        const k=1;
        this.succeded = false;
        //      Validation

        // console.log(this.class_year);
        // if(this.class_year.length==0 || this.class_section.length==0 ||this.class_teacher.length==0){
        //     this.notvalid = true;
        //     return;
        // }
        // if(!(this.isCharacterALetter(this.class_section.length))){
        //     this.notvalid = true;
        //     return ;
        // }
        // alert("Adding a Class with provided values");

        const classCollection = firebase.firestore().collection("Class");

        await classCollection.where("Class_ID","==",this.class_Id).where("Class_Section","==",this.class_section).get().then(result=>{
            result.forEach(doc=>{
                this.exists = true;
                console.log(JSON.stringify(doc.data()));
            })
        })
        console.log(this.exists);
        if(this.exists){
            alert("This Class Already exists ! Please Delete and Try or Add another Class");
            return;
        }
        console.log("Got Value ");


        classCollection.add({
            Class_ID : parseInt(this.class_year.trim())*100,
            Class_Section : this.class_section,
            Teacher_Id : parseInt(this.class_teacher),
            No_Of_Students : parseInt(this.no_of_students)
        }).then((result)=>{
            this.succeded = true;
            console.log("Added document with id "+ result.id);
            setTimeout(()=>{
                this.succeded= false;
            },3000);
        })
        if(this.succeded){
            this.router.navigate(["success","Successfully Added Class Details"]);
        }
        else{
            this.router.navigate(["fail","Problem in adding Class Details, Please try again"]);
        }
    }
}
