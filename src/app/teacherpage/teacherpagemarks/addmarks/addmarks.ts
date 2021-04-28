import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "addmarks",
    templateUrl: "./addmarks.html"
})


export class addmarksComponent{
    public constructor(private router:Router,private route:ActivatedRoute){

    }
}