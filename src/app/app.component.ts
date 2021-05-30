import { Component } from "@angular/core";
import * as application from "tns-core-modules/application";
import { Router } from "@angular/router";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})

export class AppComponent {

    public constructor(private router: Router) { }

    public ngOnInit() {
    }

}