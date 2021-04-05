import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "deletestudent",
    templateUrl: "./deletestudent.html",
})
export class deletestudentComponent {
    public constructor(private router: Router) {}
    studentname: string="";
    fun(): void{
        if(true){
            this.router.navigate(["success","Successfully deleted student "+this.studentname+" detail"]);
        }
        else{
            this.router.navigate(["fail","Problem in deleting student "+this.studentname+" detail"]);
        }
    }
}