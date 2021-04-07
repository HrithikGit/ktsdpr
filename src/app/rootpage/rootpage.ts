import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "rootpage",
    templateUrl: "./rootpage.html",
})
export class rootpageComponent implements OnInit{
    check="";
    public constructor(private router: Router) {}
    ngOnInit(): void {

    }
    teacherdetails(): void{
        console.log(this.check);
        this.router.navigate(["updateteacher"]);
    }

    studentdetails(): void{
        this.router.navigate(["updatestudent"]);
    }

    blog(): void{
        this.router.navigate(["blog"]);
    }
    attendance() : void{
        this.router.navigate(["attendance"]);
    }

}
