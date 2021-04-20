import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "ns-items",
    templateUrl: "./classpage.html",
    styleUrls :["./classpage.css"]
})
export class classpageComponent {
    public constructor(private router: Router) {}
    addclass(): void{
        this.router.navigate(["addclass"]);
    }
    deleteclass(): void{
        this.router.navigate(["deleteclass"]);
    }
}
