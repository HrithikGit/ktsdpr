import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "studentpage",
    templateUrl: "./studentpage.html",
    styleUrls : ["./studentpage.css"]
})
export class studentpageComponent {
    studentclass ;
    studentsection;
    public constructor(private router: Router) {
    }
    attendance(){
        
    }
    timetable(){

    }
    blog(){
        this.router.navigate(["blog","Student"]);
    }
    about(){
        this.router.navigate(["studentpageabout"]);
    }
    

}
 