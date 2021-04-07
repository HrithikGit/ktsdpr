import { Component, OnInit } from "@angular/core";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { Page } from "tns-core-modules/ui/page";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "success",
    templateUrl: "./success.html",
})
export class successComponent {
    public message:string;
    public arr:Array<string> = [];
    public constructor(private router: Router,private page: Page,private route: ActivatedRoute) {
        this.arr.push("hello");
        this.arr.push("bye");
        this.route.params.subscribe((params)=>{
            this.message=params["name"];
        });
        console.log(this.message+"$$$$$$$$$$$$$");
    }
}
