import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

@Component({
    selector: "teacherpagetimetable",
    templateUrl: "./teacherpagetimetable.html",
})
export class teacherpagetimetableComponent {
    ClassTeacherClass;
    ClassTeacherSection;
    isClassTeacher;
    teacherid=20;
    public constructor(private router:Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.ClassTeacherClass=params["class"];
            this.ClassTeacherSection=params["section"];
        });
        this.isClassTeacher=this.ClassTeacherClass!="";
    }

    timetable(){
        this.router.navigate(["timetableofteacher",this.teacherid]);
    }

    update(){
        this.router.navigate(["updatetimetable",this.ClassTeacherClass,this.ClassTeacherSection]);
    }
    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}