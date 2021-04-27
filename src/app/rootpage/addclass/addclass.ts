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
    no_of_students;
    exists;
    notvalid;
    succeded;
    waiting;
    constructor(private router: Router,private page: Page) {}
    ngOnInit(): void {
        this.class_year="";
        this.class_section ="";
        this.no_of_students=0;
        this.notvalid = false;
        this.waiting = false;
        this.exists = false;
    }
    isCharacterALetter(char) {
        return (/[a-zA-Z]/).test(char)
      }

    async fun(){
        this.class_year = parseInt(this.class_year.trim());
        this.class_section.trim();
        const k=1;
        this.succeded = false;
        //      Validation

        // console.log(this.class_year);
        if(this.class_year.length==0 || this.class_section.length==0){
            this.notvalid = true;
            return;
        }
        if(!(this.isCharacterALetter(this.class_section))){
            this.notvalid = true;
            return ;
        }
        if(this.class_section.length!=1 || !(this.class_year>=1 && this.class_year<=10)){
            // console.log(this.section+" "+this.class_id);
            alert("Invalid Class Year !");
            return;
        }
        this.waiting = true;
        const classCollection = firebase.firestore().collection("Class");

        await classCollection.where("Class_ID","==",this.class_year).where("Class_Section","==",this.class_section).get().then(result=>{
            result.forEach(doc=>{
                this.exists = true;

            })
        })
        if(this.exists){
            this.waiting = false;
            alert("This Class Already exists ! Please Delete and Try or Add another Class");
            return;
        }

        await classCollection.add({
            Class_Id : this.class_year,
            Class_Section : this.class_section,
            No_Of_Students : parseInt(this.no_of_students)
        }).then((result)=>{
            this.succeded = true;
            console.log("Added document with id "+ result.id);
            setTimeout(()=>{
                this.succeded= false;
            },3000);
        })
        this.waiting = false;
        alert("Added Successfully !");
        this.class_year = "";
        this.class_section="";
        this.no_of_students=0;
    }
}
