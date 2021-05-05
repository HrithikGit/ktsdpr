import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "teacherpage",
    templateUrl: "./teacherpage.html",
})
export class teacherpageComponent {
    isClassTeacher=true;
    obj={classteacherclass:"100", classteachersection:"A"};
    public constructor(private router:Router) {}
    studentdetails(): void{
        this.router.navigate(["teacherpageupdatestudent",this.obj.classteacherclass,this.obj.classteachersection]);
    }
    timetable(): void{
        this.router.navigate(["teacherpagetimetable",this.obj.classteacherclass,this.obj.classteachersection]);
    }
    marks():void{
        this.router.navigate(["teacherpagemarks",this.obj.classteacherclass,this.obj.classteachersection]);
    }
    attendance():void{
        this.router.navigate(["teacherpageattendance",this.obj.classteacherclass,this.obj.classteachersection]);
    }
    blog(): void{
        this.router.navigate(["blog","teacher"]);
    }
}
