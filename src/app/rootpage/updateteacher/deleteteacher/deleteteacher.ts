import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "deleteteacher",
    templateUrl: "./deleteteacher.html",
})
export class deleteteacherComponent {
    teacherclass ;
    teachersub;
    teachername;
    teacherid;
    section;
    waiting;

    teachers=[];
    public constructor(private router: Router) {
        this.waiting = true;
        this.intialize();
        this.getData();
    }

    intialize() : void{
        this.teacherid="";
        this.teacherclass="";
        this.teachersub="";
        this.teachername="";
        this.section="";
    }

    async getData(){
        const teacherCollection = firebase.firestore().collection("Teacher");
        await teacherCollection.get().then(result=>{
            result.forEach(doc=>{
                var check = doc.data();
                check["id"] = doc.id;
                this.teachers.push(check);
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
        const remcollection = firebase.firestore().collection("Teacher").doc(this.teachers[i].id);
        this.waiting = true;
        await remcollection.delete();
        var removeddata=this.teachers.splice(i,1);
        this.waiting = false;

        // console.log(i);
        // console.log("TAPPED ON REMOVE");
    }
}
