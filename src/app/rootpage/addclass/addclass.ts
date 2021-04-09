import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
@Component({
    selector: "ns-items",
    templateUrl: "./addclass.html",
})
export class addclassComponent implements OnInit {
    class_name;
    class_teacher;
    no_of_students;
    constructor(private router: Router,private page: Page) {}
    ngOnInit(): void {
        this.class_name ="";
        this.class_teacher="";
        this.no_of_students="";
    }
    fun() : void{
        const k=1;
        console.log(this.class_name);
        // console.log("Details "+this.teachername+" "+this.teacherclass+" "+this.teachersub);
        if(k===1){
            this.router.navigate(["success","Successfully Added Class Details"]);
        }
        else{
            this.router.navigate(["fail","Problem in adding Class Details, Please try again"]);
        }
    }
}
