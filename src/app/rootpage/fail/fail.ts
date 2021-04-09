import { Component, OnInit } from "@angular/core";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { Page } from "tns-core-modules/ui/page";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "fail",
    templateUrl: "./fail.html",
})
export class failComponent {
    public message:string;
    public constructor(private router: Router,private page: Page,private route: ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.message=params["name"];
        });
        console.log(this.message+"$$$$$$$$$$$$$");
    }
}