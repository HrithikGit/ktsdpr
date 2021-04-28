import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "updatestudent",
    templateUrl: "./updatestudent.html",
})
export class updatestudentComponent {
    public constructor(private router: Router) {}
    addstudent(): void{
        this.router.navigate(["timetableclassselect","addstudent"]);
    }
    deletestudent(): void{
        this.router.navigate(["timetableclassselect","deletestudent"]);
    }
}
