import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";
import { FirebaseTrace } from "nativescript-plugin-firebase/performance/performance";

const appSettings = require("tns-core-modules/application-settings");
const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "deletestudent",
    templateUrl: "./deletestudent.html",
})
export class deletestudentComponent {
    student_class;
    student_section;
    waiting;
    editable;
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
        const teacherCollection = firebase.firestore().collection("Student")
        .where("Class_Id","==",parseInt(this.student_class)).where("Class_Section","==",this.student_section);
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
        var idtoremove = (this.students[i].Unq_Id);
        this.waiting = true;
        await remcollection.delete();
        var removeddata=this.students.splice(i,1);

        var userdocid ="";
        await firebase.firestore().collection("Users").where("Type","==","Student").where("Id","==",
        idtoremove).get().then(result=>{
            result.forEach(doc=>{
                userdocid = doc.id;
            })
        })

        await firebase.firestore().collection("Users").doc(userdocid).delete();

        this.waiting = false;
        // console.log(i);
        // console.log("TAPPED ON REMOVE");
    }
    add():void{
        this.router.navigate(["addstudent",this.student_class,this.student_section]);
    }
    public goHome(){
        this.router.navigate(["/root"], { replaceUrl: true });
    }
}
