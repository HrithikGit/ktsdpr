import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

const firebase = require("nativescript-plugin-firebase/app")

@Component({
    selector: "ns-items",
    templateUrl: "./addteacher.html",
})
export class addteacherComponent implements OnInit {
    teacher_name;
    class_id;
    section;
    teacher_id;
    subject_id;
    exists;
    notvalid;
    succeded;
    constructor(private router: Router,private page: Page) {}
    ngOnInit(): void {
        this.teacher_name="";
        this.class_id="";
        this.section="";
        this.teacher_id="";
        this.subject_id="";
        this.notvalid = false;
        this.exists = false;
    }
    isCharacterALetter(char) {
        return (/[a-zA-Z]/).test(char)
      }

    async fun(){
        this.teacher_name.trim();
        this.class_id.trim();
        this.section.trim();
        this.teacher_id.trim();
        this.subject_id.trim();
        this.succeded = false;
        //      Validation

        // console.log(this.class_year);

        if(this.teacher_name.length==0 || this.section.length==0 ||this.teacher_id.length==0){
            this.notvalid = true;
            return;
        }
        if(!(this.isCharacterALetter(this.section))){
            this.notvalid = true;
            return ;
        }

        //Validation Ends Here !

        const teacherCollection = firebase.firestore().collection("Teacher");

        await teacherCollection.where("Teacher_Id","==",parseInt(this.teacher_id)).where("Class_Section","==",this.section).get().then(result=>{
            result.forEach(doc=>{
                this.exists = true;
                console.log(JSON.stringify(doc.data()));
            })
        })
        console.log(this.exists);

        if(this.exists){
            alert("This Teacher Already exists ! Please Delete and Try or Add another Student");
            return;
        }


        // console.log("Got Value ");


        await teacherCollection.add({
            Teacher_Id : parseInt(this.teacher_id),
            Class_Id : parseInt(this.class_id),
            Class_Section : this.section,
            Teacher_Name : this.teacher_name,
            Subject_Id : parseInt(this.subject_id)

        }).then((result)=>{
            this.succeded = true;
            console.log("Added document with id "+ result.id);
            // setTimeout(()=>{
            //     this.succeded= false;
            // },3000);
        })

        if(this.succeded){
            this.router.navigate(["success","Successfully Added Teacher Details"]);
        }
        else{
            this.router.navigate(["fail","Problem in adding Teacher Details, Please try again"]);
        }
    }
}
