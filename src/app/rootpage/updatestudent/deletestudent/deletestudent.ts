import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";
import { FirebaseTrace } from "nativescript-plugin-firebase/performance/performance";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "deletestudent",
    templateUrl: "./deletestudent.html",
})
export class deletestudentComponent {
    student_class;
    student_section;
    waiting;

    students=[];
    public constructor(private router: Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.student_class= params["name"],
            this.student_section = params["section"]
            console.log(this.student_class+" "+this.student_section);
        })
        this.waiting = true;
        this.getData();
    }

    async getData(){
        const teacherCollection = firebase.firestore().collection("Student");
        await teacherCollection.get().then(result=>{
            result.forEach(doc=>{
                var check = doc.data();
                check["id"] = doc.id;
                this.students.push(check);
            })
        })
        this.waiting = false;
    }

    async remove(i){
        var stop = false;
        await confirm({
            title: "Your title",
            message: "Are you sure delete this student "+this.students[i].Student_Name,
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
        const remcollection = firebase.firestore().collection("Student").doc(this.students[i].id);
        this.waiting = true;
        await remcollection.delete();
        var removeddata=this.students.splice(i,1);
        this.waiting = false;

        // console.log(i);
        // console.log("TAPPED ON REMOVE");
    }
}
