import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
@Component({
    selector: "deletetimetable",
    templateUrl: "./deletetimetable.html",
})

@NgModule({
    imports:[CommonModule,BrowserModule]
})
export class deletetimetableComponent {
    public constructor(private router:Router){}

}