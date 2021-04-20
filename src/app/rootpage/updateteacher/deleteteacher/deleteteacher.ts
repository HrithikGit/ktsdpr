import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "deleteteacher",
    templateUrl: "./deleteteacher.html",
})
export class deleteteacherComponent {
    public constructor(private router: Router) {}
    teachername: string="";
    fun(): void{
        if(true){
            this.router.navigate(["success","Successfully deleted teacher "+this.teachername+" detail"]);
        }
        else{
            this.router.navigate(["fail","Problem in deleting teacher "+this.teachername+" detail"]);
        }
    }
}