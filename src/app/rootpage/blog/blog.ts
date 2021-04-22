import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "blog",
    templateUrl: "./blog.html",
})

export class blogComponent {
    loading;
    nodata;
    public constructor(private router:Router){
        this.loading = true;
        this.nodata = true;
    }
    add(): void{
        console.log("Tapped Add Blog");
    }
}
