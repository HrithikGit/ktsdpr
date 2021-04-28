import {Component} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
    selector: "timetableofteacher",
    templateUrl: "./timetableofteacher.html",
})
export class timetableofteacherComponent {
    teacherid: number;
    public constructor(private router:Router, private route:ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.teacherid=params["teacherid"];
        });

    }
}