import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

@Component({
    selector: "teacherpagemarks",
    templateUrl: "./teacherpagemarks.html",
})
export class teacherpagemarksComponent {
    ClassTeacherClass;
    ClassTeacherSection;
    teacherid=10;
    public constructor(private router:Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.ClassTeacherClass=params["class"];
            this.ClassTeacherSection=params["section"];
        });
    }

    add():void{
        this.router.navigate(["selectclass",this.teacherid,"add"]);
    }

    view():void{
        this.router.navigate(["selectclass",this.teacherid,"view"]);
    }
}