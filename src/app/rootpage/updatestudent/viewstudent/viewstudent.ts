import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "viewstudent",
    templateUrl: "./viewstudent.html",
})
export class viewstudentComponent {
    loading ;
    studentid;
    class;
    section;
    student_name;
    student_attendance;
    exists;
    waiting ;
    notvalid;
    student_address;
    docid;
    public constructor(private router: Router,private route: ActivatedRoute){
        this.loading = true;
        this.route.params.subscribe((params)=>{
            this.studentid = parseInt(params["studentid"]);
            this.class= parseInt(params["class"]);
            this.section = params["section"];
        })
        this.waiting = false;
        this.getData();
    }
    async getData(){
        const stuCollection = firebase.firestore().collection("Student").where("Class_Id","==",this.class)
                            .where("Class_Section","==",this.section).where("Student_Id","==",this.studentid);
        await stuCollection.get().then(result=>{
                result.forEach(doc=>{
                    this.docid = doc.id;
                    this.student_name = doc.data()["Student_Name"];
                    this.student_attendance = doc.data()["Student_Attendance"];
                    this.student_address = doc.data()["Student_Address"];
                })
            })
            this.loading = false;
    }
    async updateStudent(){
        var stop = false;
        await confirm({
            title: "Your title",
            message: "Are you sure to update this Student?",
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
         }).then(result=>{
             if(result){
                 stop = false;
             }
             else{
                 stop = true;
             }
         })
        if(stop){
            return ;
        }
        this.waiting = true;
        const changeRecord = firebase.firestore().collection("Student").doc(this.docid);
        changeRecord.update({
            Student_Id : parseInt(this.studentid),
            Student_Name : this.student_name,
            Student_Attendance : parseInt(this.student_attendance),
            Student_Address : this.student_address
        })
        alert("Added Successfully !");
        this.waiting = false;
    }

    public goHome(){
        this.router.navigate(["/root"], { replaceUrl: true });
    }
}
