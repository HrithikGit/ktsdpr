import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "timetableclassselect",
    templateUrl: "./timetableclassselect.html",
})

@NgModule({
    imports:[CommonModule,BrowserModule]
})
export class timetableclassselectComponent {
    detail;
    classes=[];
    public constructor(private router:Router,private route: ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.detail=params["name"];
        });

        if(this.detail=="Update"){this.detail="updatetimetable";}
        else if(this.detail=="Delete"){this.detail="deletetimetable";}
        else if(this.detail=="Display"){this.detail="displaytimetable";}
        else if(this.detail=="Attendance"){this.detail="attendance";}

        this.classes=[{"class":"1"},{"class":"2"},{"class":"3"},{"class":"4"},{"class":"5"},{"class":"1"},{"class":"2"},{"class":"3"},{"class":"4"},{"class":"5"},{"class":"1"},{"class":"2"},{"class":"3"},{"class":"4"},{"class":"5"}];
    }

}