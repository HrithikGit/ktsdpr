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
    class_id;
    section;
    monday=[]; tuesday=[]; wednesday=[]; thursday=[]; friday=[]; saturday=[]; sunday=[];
    rows;
    moncol;
    tuecol;
    wedcol;
    thucol;
    fricol;
    satcol;
    onday;
    currday;

    public constructor(private router:Router,private route:ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.class_id=params["name"];
            this.section = params["section"];
        });
        this.onload();
        this.currday="";
    }
    async onload(){

        var Wday: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var day = new Date();
        var TodayDay = Wday[day.getDay()];
        var getdata = firebase.firestore().collection("Monday");
        var check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                var got = doc.data();
                got["id"] = doc.id;
                this.monday.push(got);
            })
        })
        this.monday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })


        getdata = firebase.firestore().collection("Tuesday");
        check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                var got = doc.data();
                got["id"] = doc.id;
                this.tuesday.push(got);
            })
        })
        this.tuesday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })

        getdata = firebase.firestore().collection("Wednesday");
        check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                var got = doc.data();
                got["id"] = doc.id;
                this.wednesday.push(got);
            })
        })
        this.wednesday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })


        getdata = firebase.firestore().collection("Thursday");
        check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                var got = doc.data();
                got["id"] = doc.id;
                this.thursday.push(got);
            })
        })
        this.thursday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })

        getdata = firebase.firestore().collection("Friday");
        check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                var got = doc.data();
                got["id"] = doc.id;
                this.friday.push(got);
            })
        });
        this.friday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        });


        getdata = firebase.firestore().collection("Saturday");
        check = getdata.where("Class_Id","==","1000");
        await check.get().then(result=>{
            result.forEach(doc=>{
                var got = doc.data();
                got["id"] = doc.id;
                this.saturday.push(got);
            })
        });
        this.saturday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        });



        // console.log(this.tuesday);


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
    mon(): void{this.currday ="Monday" ;this.rows=[...this.monday];   this.color(); this.moncol='green';}
    tue(): void{this.currday ="Tuesday" ;this.rows=[]; this.rows=[...this.tuesday];  this.color(); this.tuecol='green';}
    wed():void{this.currday ="Wednesday" ; console.log("INSIDEEEEEEEEEEEEEEEEEEEEEEE"); this.rows=[...this.wednesday]; this.color(); this.wedcol='green';}
    thu(): void{ this.currday ="Thrusday" ; this.rows=[...this.thursday];  this.color(); this.thucol='green';}
    fri(): void{this.currday ="Friday" ; this.rows=[...this.friday];  this.color(); this.fricol='green';}
    sat(): void{this.currday ="Saturday" ; this.rows=[...this.saturday];  this.color(); this.satcol='green';}


    remove(val){
        console.log(val+" IS Y+THE VALUE");
        this.rows.splice(val,1);
        console.log(this.rows);
    }

    addcol(){
        var rw={"End_Minute": "","End_Hour": "","Start_Hour": "","Sequence":this.rows.length+1,"Start_Minute": "","Subject_Name": ""}
        this.rows.push(rw);
    }

    async change(){
        var todel=[] ;
        if(this.currday=="Monday"){
            todel = [...this.monday];
        }
        else if(this.currday=="Tuesday"){
            todel = [...this.tuesday];
        }
        else if(this.currday=="Wednesday"){
            todel = [...this.wednesday];
        }
        else if(this.currday =="Thursday"){
            todel= [...this.thursday];
        }
        else if(this.currday =="Friday"){
            todel = [...this.friday];
        }
        else{
            todel  = [...this.saturday];
        }

        console.log(todel);
        for(var i=0;i<todel.length;i++){
            const del = firebase.firestore().collection(this.currday).doc(todel[i]["id"]);
            del.delete();
        }

        const toadd = firebase.firestore().collection(this.currday);

        for(var i=0;i<this.rows.length;i++){
            await toadd.add({
                Class_Id : this.class_id,
                Class_Section : this.section,
                Start_Time : this.rows[i]["Start_Hour"],
                Start_Minute : this.rows[i]["Start_Minute"],
                End_Hour : this.rows[i]["End_Hour"],
                End_Minute : this.rows[i]["End_Minute"],
                Sequence : this.rows[i]["Sequence"],
                Subject_Name : this.rows[i]["Subject_Name"]
            })
        }
    }
}
