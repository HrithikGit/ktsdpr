import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "rootpage",
    templateUrl: "./rootpage.html",
})
export class rootpageComponent {

    public constructor() {}
    fun(): void{
        console.log("############### CLICKED");
    }

}