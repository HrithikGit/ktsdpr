import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
@Component({
    selector: "addtimetable",
    templateUrl: "./addtimetable.html",
})

@NgModule({
    imports:[CommonModule,BrowserModule]
})
export class addtimetableComponent {
    public constructor(private router:Router){}

}