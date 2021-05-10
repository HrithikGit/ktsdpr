import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "studentpage",
    templateUrl: "./studentpage.html",
    styleUrls : ["./studentpage.css"]
})
export class studentpageComponent {
    studentclass =1;
    studentsection="A";
    public constructor(private router: Router) {
    }
    attendance(){
        
    }
    timetable(){
        this.router.navigate(["displaytimetable",this.studentclass,this.studentsection]);
    }
    blog(){
        this.router.navigate(["blog","Student"]);
    }
    about(){
        this.router.navigate(["studentpageabout"]);
    }
    

}
 