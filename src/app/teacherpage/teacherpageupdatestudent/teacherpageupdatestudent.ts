import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

@Component({
    selector: "teacherpageupdatestudent",
    templateUrl: "./teacherpageupdatestudent.html",
})
export class teacherpageupdatestudentComponent {
    isClassTeacher;
    public constructor(private router:Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.isClassTeacher=(params["name"]=="true");
        });
    }
}