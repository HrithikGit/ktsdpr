import { Component, OnInit } from "@angular/core";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { Page } from "tns-core-modules/ui/page";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "marks",
    templateUrl: "./marks.html",
})
export class marksComponent {
    public message:string;
    public arr:Array<string> = [];
    class; section;
    public constructor(private router: Router,private page: Page,private route: ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.class=params["class"];
            this.section=params["section"];
        });
    }
}
