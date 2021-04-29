import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
    selector: "viewteacher",
    templateUrl: "./viewteacher.html",
})
export class viewteacherComponent {
    loading ;
    teacherid;
    public constructor(private router: Router,private route: ActivatedRoute){
        this.loading = true;
        this.route.params.subscribe((params)=>{
            this.teacherid = params["teacherid"];
            console.log(this.teacherid);
        })
        this.loading = false;
    }
}
