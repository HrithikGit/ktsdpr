import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "displaytimetable",
    templateUrl: "./displaytimetable.html",
})

@NgModule({
    imports:[CommonModule,BrowserModule]
})
export class displaytimetableComponent {
    monday; tuesday; wednesday; thursday; friday; saturday; sunday;
    rows;
    moncol;
    tuecol;
    wedcol;
    thucol;
    fricol;
    satcol;
    class;
    vals : Array<JSON> =[];
    public constructor(private router:Router,private route: ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.class=params["name"];
        });
        var Wday: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var day = new Date();
        var TodayDay = Wday[day.getDay()];
        var getdata = firebase.firestore().collectionGroup("Monday");
        var check = getdata.where("Class_Id","==","1000");
        check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.vals.push(doc.data());
            })
        })
        console.log(this.vals);
        this.rows={};
        this.vals.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })
        this.monday = this.vals;

        this.vals.length=0;
        getdata = firebase.firestore().collectionGroup("Tuesday");
        check = getdata.where("Class_Id","==","1000");
        check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.vals.push(doc.data());
            })
        })
        console.log(this.vals);
        this.vals.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })
        this.tuesday = this.vals;

        this.vals.length=0;
        getdata = firebase.firestore().collectionGroup("Wednesday");
        check = getdata.where("Class_Id","==","1000");
        check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.vals.push(doc.data());
            })
        })
        console.log(this.vals);
        this.vals.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })
        this.wednesday = this.vals;   
        
        
        this.vals.length=0;
        getdata = firebase.firestore().collectionGroup("Thursday");
        check = getdata.where("Class_Id","==","1000");
        check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.vals.push(doc.data());
            })
        })
        console.log(this.vals);
        this.vals.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })
        this.thursday = this.vals;

        this.vals.length=0;
        getdata = firebase.firestore().collectionGroup("Friday");
        check = getdata.where("Class_Id","==","1000");
        check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.vals.push(doc.data());
            })
        })
        console.log(this.vals);
        this.vals.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })
        this.friday = this.vals;


        this.vals.length=0;
        getdata = firebase.firestore().collectionGroup("Saturday");
        check = getdata.where("Class_Id","==","1000");
        check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.vals.push(doc.data());
            })
        })
        console.log(this.vals);
        this.vals.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })
        this.saturday= this.vals;

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
    mon(): void{this.rows=this.monday; this.color(); this.moncol='green';}
    tue(): void{this.rows=this.tuesday; this.color(); this.tuecol='green';}
    wed():void{this.rows=this.wednesday; this.color(); this.wedcol='green';}
    thu(): void{this.rows=this.thursday; this.color(); this.thucol='green';}
    fri(): void{this.rows=this.friday; this.color(); this.fricol='green';}
    sat(): void{this.rows=this.saturday; this.color(); this.satcol='green';}

}
