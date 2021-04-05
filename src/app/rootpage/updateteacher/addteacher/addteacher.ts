import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
@Component({
    selector: "ns-items",
    templateUrl: "./addteacher.html",
})
export class addteacherComponent {
    public constructor(private router: Router,private page: Page) {}
    teachername="";
    teacherclass="";
    teachersub="";
    fun() : void{
        console.log("Details"+this.teachername+" "+this.teacherclass+" "+this.teachersub);
        if(true){
            this.router.navigate(["success","Successfully Added Teacher Details"]);
        }
        else{
            this.router.navigate(["fail","Problem in adding Teacher Details, Please try again"]);
        }
    }
}