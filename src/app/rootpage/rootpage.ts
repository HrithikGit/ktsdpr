import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "rootpage",
    templateUrl: "./rootpage.html",
})
export class rootpageComponent {

    public constructor(private router: Router) {}
    teacherdetails(): void{
        this.router.navigate(["updateteacher"]);
    }

    studentdetails(): void{
        this.router.navigate(["updatestudent"]);
    }

    blog(): void{
        this.router.navigate(["blog"]);
    }

}