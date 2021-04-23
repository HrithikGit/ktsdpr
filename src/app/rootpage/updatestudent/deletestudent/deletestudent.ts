import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { FirebaseTrace } from "nativescript-plugin-firebase/performance/performance";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "deletestudent",
    templateUrl: "./deletestudent.html",
})
export class deletestudentComponent {
    studentid ;
    studentclass;
    studentsection;
    studentname;
    public constructor(private router: Router) {
        this.studentid="";
        this.studentclass="";
        this.studentsection="";
        this.studentname="";
    }

    async fun(){
        console.log("Came Here !");
        const studentCollection = firebase.firestore().collection("Student").where("Student_Id","==",parseInt(this.studentid))
        .where("Class_Id","==",parseInt(this.studentclass)*100).where("Class_Section","==",this.studentsection);
        var val ="";
        await studentCollection.get().then(result=>{
            result.forEach(doc=>{
                // console.log(doc.data().Student_Name);
                if(doc.data().Student_Name!=this.studentname){
                    alert("Entered Data Doesn't Match! Please re-check");
                    return;
                }
                console.log(doc.data)
                val = doc.id;
                console.log("I'm here ! "+val);
            })
        })
        console.log(val);
        firebase.firestore().collection("Student").doc(val).delete();
        alert("Delete Successful !");
    }
}
