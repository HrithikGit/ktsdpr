import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";

const firebase = require("nativescript-plugin-firebase/app");
const appSettings = require("tns-core-modules/application-settings");

@Component({
    selector: "deleteteacher",
    templateUrl: "./deleteteacher.html",
})
export class deleteteacherComponent {
    teacherid;
    section;
    waiting;
    teacher_set=new Set();

    teachers=[];
    public constructor(private router: Router) {
        this.waiting = true;
        this.getData();
        console.log("Frome teacher "+appSettings.getNumber("check"))
    }

    async getData(){
        const teacherCollection = firebase.firestore().collection("Teacher");
        await teacherCollection.get().then(result=>{
            result.forEach(doc=>{
                var check = doc.data();
                check["id"] = doc.id;
                if(!this.teacher_set.has(check.Teacher_Id)){
                    this.teacher_set.add(check.Teacher_Id);
                    this.teachers.push({"Teacher_Id":check.Teacher_Id,"Subject_Name":check.Subject_Name,"Teacher_Name":check.Teacher_Name});
                }
            })
        })
        this.waiting = false;
    }

    async remove(i){
        var stop = false;
        await confirm({
            title: "Your title",
            message: "Are you sure delete this teacher "+this.teachers[i].Teacher_Name,
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
        this.waiting = true;
        
        var username = this.teachers[i].Teacher_Name+this.teachers[i].Teacher_Id;

        const remcollection = firebase.firestore().collection("Teacher").doc(this.teachers[i].id);
        await remcollection.delete();
        var removeddata=this.teachers.splice(i,1);
        
        //Removing user details from User Collection
        var storedoc="";
        const userCollection = firebase.firestore().collection("Users").where("Username","==",username);
        await userCollection.get().then(result=>{
            result.forEach(doc=>{
                storedoc = doc.id;
            })
        })

        await firebase.firestore().collection("Users").doc(storedoc).delete();

        this.waiting = false; 
        // console.log(i);
        // console.log("TAPPED ON REMOVE");
    }


    add():void{
        this.router.navigate(["addteacher"]);
    }

    public goHome(){
        this.router.navigate(["/root"], { replaceUrl: true });
    }
}
