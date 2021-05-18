import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { RouterExtensions } from "@nativescript/angular/router";
import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { confirm } from "tns-core-modules/ui/dialogs";

const appSettings = require("tns-core-modules/application-settings");

@Component({
    selector: "teacherpage",
    templateUrl: "./teacherpage.html",
})
 
export class teacherpageComponent {
    isClassTeacher;
    teacherid=13;
    exit_tapped;
    obj={classteacherclass:1, classteachersection:"A"}; 
    public constructor(private rtr:RouterExtensions,private router: Router) {
        this.exit_tapped = false;
        this.teacherid = parseInt(appSettings.getString("TeacherId"));
        if(appSettings.getString("IsClassTeacher")=="True"){
            this.isClassTeacher=true;
            this.obj.classteacherclass = parseInt(appSettings.getString("TeacherClass"));
            this.obj.classteachersection = appSettings.getString("TeacherSection");
        }
        else{
            this.isClassTeacher = false;
        }
    }

    ngOnInit() {
        if (application.android) {
          application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if (this.router.isActive("/teacher", false)) {
                data.cancel = true; // prevents default back button behavior
                this.getExit();
              }
          });
        }
      }
      getExit(){
        if(!this.exit_tapped){
            this.exit_tapped = true;
            var Toast = require("nativescript-toast");
            var toast = Toast.makeText("Press again to Exit");
            toast.show();
            return ;
          }
        android.os.Process.killProcess(android.os.Process.myPid());
      }

    studentdetails(): void{
        if(!this.isClassTeacher){
            var Toast = require("nativescript-toast");
            var toast = Toast.makeText("You Aren't a Class Teacher");
            toast.show();
        }
        this.router.navigate(["deletestudent",this.obj.classteacherclass,this.obj.classteachersection]);
    }
    timetable(): void{
        this.router.navigate(["timetableofteacher",this.teacherid]);
    }
    marks():void{
        this.router.navigate(["teacherpagemarks",this.obj.classteacherclass,this.obj.classteachersection,this.teacherid]);
    }
    attendance():void{
        this.router.navigate(["teacherpageattendance",this.obj.classteacherclass,this.obj.classteachersection]);
    }
    blog(): void{
        this.router.navigate(["blog","teacher"]);
    }

    public async logout(){
        var stop = false;
        await confirm({
            title: "Your title",
            message: "Are you sure you want to logout?",
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
        appSettings.clear();
        this.router.navigate(["items"]);
    }

}
 