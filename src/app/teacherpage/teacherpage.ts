import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "teacherpage",
    templateUrl: "./teacherpage.html",
})
export class teacherpageComponent {
    isClassTeacher=true;
    public constructor(private router:Router) {}
    studentdetails(): void{
        this.router.navigate(["teacherpageupdatestudent",String(this.isClassTeacher)]);
    }
    timetable(): void{
        this.router.navigate(["teacherpagetimetable",String(this.isClassTeacher)]);
    }
    marks():void{
        this.router.navigate(["teacherpagemarks",String(this.isClassTeacher)]);
    }
    attendance():void{
        this.router.navigate(["teacherpageattendance",String(this.isClassTeacher)]);
    }
}