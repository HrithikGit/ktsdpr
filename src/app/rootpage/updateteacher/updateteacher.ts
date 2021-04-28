import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { deleteteacherComponent } from "./deleteteacher/deleteteacher";

@Component({
    selector: "updateteacher",
    templateUrl: "./updateteacher.html",
})
export class updateteacherComponent {
    public constructor(private router: Router) {}
    addteacher(): void{
        this.router.navigate(["addteacher"]);
    }
    deleteteacher(): void{
        this.router.navigate(["deleteteacher"]);
    }
}
