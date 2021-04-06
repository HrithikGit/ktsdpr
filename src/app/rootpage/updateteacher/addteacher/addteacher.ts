import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
@Component({
    selector: "ns-items",
    templateUrl: "./addteacher.html",
})
export class addteacherComponent implements OnInit {
    teachername;
    teacherclass;
    teachersub;
    constructor(private router: Router,private page: Page) {}
    ngOnInit(): void {
        this.teachername ="";
        this.teacherclass="";
        this.teachersub="";
    }
    fun() : void{
        const k=1;
        console.log(this.teachername);
        console.log("Details "+this.teachername+" "+this.teacherclass+" "+this.teachersub);
        if(k===1){
            this.router.navigate(["success","Successfully Added Teacher Details"]);
        }
        else{
            this.router.navigate(["fail","Problem in adding Teacher Details, Please try again"]);
        }
    }
}
