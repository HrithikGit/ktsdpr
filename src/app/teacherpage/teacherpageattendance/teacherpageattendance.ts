import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

@Component({
    selector: "teacherpageattendance",
    templateUrl: "./teacherpageattendance.html",
})
export class teacherpageattendanceComponent {
    isClassTeacher;
    public constructor(private router:Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.isClassTeacher=(params["name"]=="true");
        });
    }
}