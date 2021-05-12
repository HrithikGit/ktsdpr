import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";

const appSettings = require("tns-core-modules/application-settings");

@Component({
    selector: "teacherpage",
    templateUrl: "./teacherpage.html",
})
export class teacherpageComponent {
    isClassTeacher;
    teacherid="13";
    exit_tapped;
    obj={classteacherclass:"1", classteachersection:"A"}; 
    public constructor(private router:Router) {
        this.exit_tapped = false;
        if(appSettings.getString("IsClassTeacher")=="True"){
            this.isClassTeacher=true;
            this.obj.classteacherclass = appSettings.getString("Class");
            this.obj.classteachersection = appSettings.getString("Section");
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
        this.router.navigate(["teacherpagetimetable",this.obj.classteacherclass,this.obj.classteachersection]);
    }
    marks():void{
        this.router.navigate(["teacherpagemarks",this.obj.classteacherclass,this.obj.classteachersection,parseInt(this.teacherid)]);
    }
    attendance():void{
        this.router.navigate(["teacherpageattendance",this.obj.classteacherclass,this.obj.classteachersection]);
    }
    blog(): void{
        this.router.navigate(["blog","teacher"]);
    }

    public logout(){
        appSettings.clear();
        this.router.navigate(["items"]);
    }
}
 