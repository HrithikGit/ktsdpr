import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "attendance",
    templateUrl: "./attendance.html",
})
export class attendanceComponent {
    public constructor(private router:Router){}
    add(): void{
        console.log("Tapped Add Blog");
    }
}
