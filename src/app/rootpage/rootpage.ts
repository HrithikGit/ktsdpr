import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "rootpage",
    templateUrl: "./rootpage.html",
})
export class rootpageComponent implements OnInit{
    check="";
    public constructor(private router: Router) {
    }
    ngOnInit(): void {

    }
    teacherdetails(): void{
        console.log(this.check);
        this.router.navigate(["updateteacher"]);
    }

    addclass(): void{
        this.router.navigate(["classpage"]);
    }
    studentdetails(): void{
        this.router.navigate(["updatestudent"]);
    }
    timetable(): void{
        this.router.navigate(["timetable"]);
    }
    blog(): void{
        this.router.navigate(["blog"]);
    }
    attendance() : void{
        this.router.navigate(["timetableclassselect","Attendance"]);
    }

    marks():void{
        this.router.navigate(["timetableclassselect","Marks"]);
    }
}
