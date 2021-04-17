import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

@Component({
    selector: "attendance",
    templateUrl: "./attendance.html",
})
export class attendanceComponent {
    class;
    public constructor(private router:Router,private route:ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.class=params["name"];
        });
    }
}
