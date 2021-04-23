import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "updatetimetable",
    templateUrl: "./updatetimetable.html",
})
@NgModule({
    imports:[CommonModule,BrowserModule]
})
export class updatetimetableComponent {
    bool=false;
    class;
    monday=[]; tuesday=[]; wednesday=[]; thursday=[]; friday=[]; saturday=[]; sunday=[];
    rows;
    moncol;
    tuecol;
    wedcol;
    thucol;
    fricol;
    satcol;
    onday;


    public constructor(private router:Router,private route:ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.class=params["name"];
        });

        this.onload();

        

    }
    async onload(){

        var Wday: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var day = new Date();
        var TodayDay = Wday[day.getDay()];
        var getdata = firebase.firestore().collection("Monday");
        var check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.monday.push(doc.data());
            })
        })
        this.monday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })

        
        getdata = firebase.firestore().collection("Tuesday");
        check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.tuesday.push(doc.data());
            })
        })
        this.tuesday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })

        getdata = firebase.firestore().collection("Wednesday");
        check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.wednesday.push(doc.data());
            })
        })
        this.wednesday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })   
        
        
        getdata = firebase.firestore().collection("Thursday");
        check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.thursday.push(doc.data());
            })
        })
        this.thursday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })

        getdata = firebase.firestore().collection("Friday");
        check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.friday.push(doc.data());
            })
        });
        this.friday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        });


        getdata = firebase.firestore().collection("Saturday");
        check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                console.log(JSON.stringify(doc.data()));
                this.saturday.push(doc.data());
            })
        });
        this.saturday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        });



        console.log(this.tuesday);


        if(TodayDay=="Mon"){this.mon();}
        else if(TodayDay=="Tue"){this.tue();}
        else if(TodayDay=="Wed"){this.wed();}
        else if(TodayDay=="Thu"){this.thu();}
        else if(TodayDay=="Fri"){this.fri();}
        else if(TodayDay=="Sat"){this.sat();}
        else if(TodayDay=="Sun"){this.sun();}
        this.bool=true;
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
    mon(): void{ this.rows=[]; this.rows=[...this.monday];   this.color(); this.moncol='green';}
    tue(): void{this.rows=[]; this.rows=[...this.tuesday];  this.color(); this.tuecol='green';}
    wed():void{this.rows=[]; console.log("INSIDEEEEEEEEEEEEEEEEEEEEEEE"); this.rows=[...this.wednesday]; this.color(); this.wedcol='green';}
    thu(): void{ this.rows=[]; this.rows=[...this.thursday];  this.color(); this.thucol='green';}
    fri(): void{ this.rows=[]; this.rows=[...this.friday];  this.color(); this.fricol='green';}
    sat(): void{this.rows=[]; this.rows=[...this.saturday];  this.color(); this.satcol='green';}


    remove(val){
        console.log(val+" IS Y+THE VALUE");
        this.rows.splice(val,1);
        console.log(this.rows);
    }



    addcol(){
        var rw={"End_Minute": "","Class_Id": "1000","End_Hour": "","Start_Hour": "","Sequence": "","Start_Minute": "","Subject_Id": ""}
        this.rows.push(rw);
    }
}