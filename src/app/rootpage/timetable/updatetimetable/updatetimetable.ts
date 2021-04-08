import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
@Component({
    selector: "updatetimetable",
    templateUrl: "./updatetimetable.html",
})

@NgModule({
    imports:[CommonModule,BrowserModule]
})
export class updatetimetableComponent {
    public constructor(private router:Router){}

}