import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "ns-items",
    templateUrl: "./addstudent.html",
})
export class addstudentComponent {
    student_name;
    student_class;
    student_id;
    student_section;
    student_attendance;
    exists;
    notvalid;
    succeded;
    student_address;
    constructor(private router: Router,private route: ActivatedRoute,private page: Page) {
        this.route.params.subscribe((params)=>{
            this.student_class= params["name"],
            this.student_section = params["section"]
            console.log(this.student_class+" "+this.student_section);
        })
        this.intialize();
    }
    intialize(): void {
        this.student_address="";
        this.student_name="";
        this.student_id="";
        this.student_attendance="";
        this.notvalid = false;
        this.exists = false;
    }
    isCharacterALetter(char) {
        return (/[a-zA-Z]/).test(char)
      }

    async fun(){
        this.student_attendance.trim();
        this.student_class.trim();
        this.student_id.trim();
        this.student_name.trim();
        this.student_section.trim();
        this.succeded = false;
        //      Validation

        // console.log(this.class_year);

        if(this.student_name.length==0){
            this.notvalid = true;
            return;
        }
        //Validation Ends Here !

        const studentCollection = firebase.firestore().collection("Student");

        await studentCollection.where("Student_Id","==",parseInt(this.student_id)).
        where("Class_Id","==",this.student_class).where("Class_Section","==",this.student_section).get().then(result=>{
            result.forEach(doc=>{
                this.exists = true;
                console.log(JSON.stringify(doc.data()));
            })
        })
        console.log(this.exists);

        if(this.exists){
            alert("This Student with provided Roll No. Exists ! Please Delete and Try or Add another Student");
            return;
        }


        // console.log("Got Value ");


        await studentCollection.add({
            Student_Id : parseInt(this.student_id),
            Class_Id : parseInt(this.student_class),
            Class_Section : this.student_section,
            Student_Name : this.student_name,
            Student_Attendance : parseInt(this.student_attendance),
            Student_Address : this.student_address
        }).then((result)=>{
            // this.succeded = true;
            // console.log("Added document with id "+ result.id);
            // setTimeout(()=>{
            //     this.succeded= false;
            // },3000);
        })
        alert("Added Successfully !");
        this.intialize();
    }
}


