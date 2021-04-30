import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";


const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "viewteacher",
    templateUrl: "./viewteacher.html",
})
export class viewteacherComponent {
    loading ;
    teacherid;
    waiting;
    teacher_name;
    class_and_section=[];
    public constructor(private router: Router,private route: ActivatedRoute){
        this.loading = true;
        this.route.params.subscribe((params)=>{
            this.teacherid = params["teacherid"];
            console.log(this.teacherid);
        })
        this.waiting=true;
        this.loading = false;
        this.getdata();

    }

    async getdata(){
        const teacherCollection = firebase.firestore().collection("Teacher").where("Teacher_Id","==",this.teacherid);
        await teacherCollection.get().then(result=>{
            result.forEach(doc=>{
                var check = doc.data();
                this.teacher_name=check.Teacher_Name;
                check["id"] = doc.id;
                this.class_and_section.push(check);
            })
        })
        this.waiting = false;
        console.log(this.class_and_section);
    }

    async remove(i){
        var stop = false;
        await confirm({
            title: "Your title",
            message: "Are you sure delete this class for teacher"+this.class_and_section[i].Class_Id+this.class_and_section[i].Class_Section,
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
        const remcollection = firebase.firestore().collection("Teacher").doc(this.class_and_section[i].id);
        this.waiting = true;
        await remcollection.delete();
        var removeddata=this.class_and_section.splice(i,1);
        this.waiting = false;

        // console.log(i);
        // console.log("TAPPED ON REMOVE");
    }
}
