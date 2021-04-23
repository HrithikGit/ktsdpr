import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
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
    constructor(private router: Router,private page: Page) {}
    ngOnInit(): void {
        this.student_name="";
        this.student_class="";
        this.student_id="";
        this.student_section="";
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

        if(this.student_name.length==0 || this.student_class.length==0 ||this.student_id.length==0){
            this.notvalid = true;
            return;
        }
        if(!(this.isCharacterALetter(this.student_section))){
            this.notvalid = true;
            return ;
        }

        //Validation Ends Here !

        const studentCollection = firebase.firestore().collection("Student");

        await studentCollection.where("Student_Id","==",parseInt(this.student_id)).where("Class_Section","==",this.student_section).get().then(result=>{
            result.forEach(doc=>{
                this.exists = true;
                console.log(JSON.stringify(doc.data()));
            })
        })
        console.log(this.exists);

        if(this.exists){
            alert("This Student Already exists ! Please Delete and Try or Add another Student");
            return;
        }


        // console.log("Got Value ");


        await studentCollection.add({
            Student_Id : parseInt(this.student_id),
            Class_Id : parseInt(this.student_class)*100,
            Class_Section : this.student_section,
            Student_Name : this.student_name,
            Student_Attendance : parseInt(this.student_attendance)
        }).then((result)=>{
            this.succeded = true;
            console.log("Added document with id "+ result.id);
            // setTimeout(()=>{
            //     this.succeded= false;
            // },3000);
        })

        if(this.succeded){
            this.router.navigate(["success","Successfully Added Class Details"]);
        }
        else{
            this.router.navigate(["fail","Problem in adding Class Details, Please try again"]);
        }
    }
}


