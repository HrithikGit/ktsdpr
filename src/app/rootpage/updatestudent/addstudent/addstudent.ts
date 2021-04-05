import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
@Component({
    selector: "ns-items",
    templateUrl: "./addstudent.html",
})
export class addstudentComponent {
    public constructor(private router: Router,private page: Page) {}
    studentname="";
    studentclass="";
    studentsub="";
    fun() : void{
        console.log("Details"+this.studentname+" "+this.studentclass+" "+this.studentsub);
        if(true){
            this.router.navigate(["success","Successfully Added Student Details"]);
        }
        else{
            this.router.navigate(["fail","Problem in adding Student Details, Please try again"]);
        }
    }
}