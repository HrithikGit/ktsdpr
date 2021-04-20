import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "blog",
    templateUrl: "./blog.html",
})
export class blogComponent {
    public constructor(private router:Router){}
    add(): void{
        console.log("Tapped Add Blog");
    }
}