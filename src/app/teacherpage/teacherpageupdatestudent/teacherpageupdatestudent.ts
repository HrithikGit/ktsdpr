import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

const appSettings = require("tns-core-modules/application-settings");

@Component({
    selector: "teacherpageupdatestudent",
    templateUrl: "./teacherpageupdatestudent.html",
})
export class teacherpageupdatestudentComponent {
    ClassTeacherSection;
    isClassTeacher;
    public constructor(private router:Router,private route:ActivatedRoute) {
        this.isClassTeacher = appSettings.getString("IsClassTeacher")=="True"?true:false;
    }

    view(){
        this.router.navigate(["deletestudent"]);
    }

    update(){
        this.router.navigate(["deletestudent"]);
    }
    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }

} 