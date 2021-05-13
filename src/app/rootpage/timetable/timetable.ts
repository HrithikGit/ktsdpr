import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
@Component({
    selector: "timetable",
    templateUrl: "./timetable.html",
})

@NgModule({
    imports:[CommonModule,BrowserModule]
})
export class timetableComponent {
    public constructor(private router:Router){}
    updatetimetable():void{this.router.navigate(["timetableclassselect","Update"]);}
    deletetimetable():void{this.router.navigate(["timetableclassselect","Delete"]);}
    displaytimetable():void{this.router.navigate(["timetableclassselect","Display"]);}
    
    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }

}