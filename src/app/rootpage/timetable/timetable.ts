import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { Item } from './item';
@Component({
    selector: "timetable",
    templateUrl: "./timetable.html",
})

@NgModule({
    imports:[CommonModule,BrowserModule]
})
export class timetableComponent {
    obj;
    rows;
    moncol;
    tuecol;
    wedcol;
    thucol;
    fricol;
    satcol;
    public constructor(private router:Router){
        var Wday: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];  
        var day = new Date();  
        var TodayDay = Wday[day.getDay()];
        this.obj={
            "Mon":
            [{"Time": "1-2", "period":"Maths"},
            {"Time": "2-3", "period":"Physics"},
            {"Time": "3-4", "period":"Chemistry"},
            {"Time": "4-5", "period":"Biology"},
            {"Time": "5-6", "period":"English"}],
            "Tue":
            [{"Time": "8-9", "period":"Maths"},
            {"Time": "9-10", "period":"Physics"},
            {"Time": "10-11", "period":"Chemistry"},
            {"Time": "11-12", "period":"Biology"},
            {"Time": "12-13", "period":"English"}],
            "Wed":
            [{"Time": "1-2", "period":"Maths"},
            {"Time": "2-3", "period":"Physics"},
            {"Time": "3-4", "period":"Chemistry"},
            {"Time": "4-5", "period":"Biology"},
            {"Time": "5-6", "period":"English"}],
            "Thu":
            [{"Time": "8-9", "period":"Maths"},
            {"Time": "9-10", "period":"Physics"},
            {"Time": "10-11", "period":"Chemistry"},
            {"Time": "11-12", "period":"Biology"},
            {"Time": "12-13", "period":"English"}],
            "Fri":
            [{"Time": "1-2", "period":"Maths"},
            {"Time": "2-3", "period":"Physics"},
            {"Time": "3-4", "period":"Chemistry"},
            {"Time": "4-5", "period":"Biology"},
            {"Time": "5-6", "period":"English"}],
            "Sat":
            [{"Time": "8-9", "period":"Maths"},
            {"Time": "9-10", "period":"Physics"},
            {"Time": "10-11", "period":"Chemistry"},
            {"Time": "11-12", "period":"Biology"},
            {"Time": "12-13", "period":"English"}]
        };
        if(TodayDay=="Mon"){this.mon();}
        else if(TodayDay=="Tue"){this.tue();}
        else if(TodayDay=="Wed"){this.wed();}
        else if(TodayDay=="Thu"){this.thu();}
        else if(TodayDay=="Fri"){this.fri();}
        else if(TodayDay=="Sat"){this.sat();}
        else if(TodayDay=="Sun"){this.sun();}
    }
    color(): void{
        this.moncol='white';
        this.tuecol='white';
        this.wedcol='white';
        this.thucol='white';
        this.fricol='white';
        this.satcol='white';
    }
    sun(): void{this.mon();}
    mon(): void{this.rows=this.obj.Mon; this.color(); this.moncol='green';}
    tue(): void{this.rows=this.obj.Tue; this.color(); this.tuecol='green';}
    wed():void{this.rows=this.obj.Wed; this.color(); this.wedcol='green';}
    thu(): void{this.rows=this.obj.Thu; this.color(); this.thucol='green';}
    fri(): void{this.rows=this.obj.Fri; this.color(); this.fricol='green';}
    sat(): void{this.rows=this.obj.Sat; this.color(); this.satcol='green';}


}