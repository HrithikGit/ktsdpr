import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

@Component({
    selector: "teacherpageupdatestudent",
    templateUrl: "./teacherpageupdatestudent.html",
})
export class teacherpageupdatestudentComponent {
    ClassTeacherClass;
    ClassTeacherSection;
    isClassTeacher="";
    public constructor(private router:Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.ClassTeacherClass=params["class"];
            this.ClassTeacherSection=params["section"];
        });

    }

    view(){
        this.router.navigate([]);
    }

    update(){
        this.router.navigate([]);
    }

}