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
    monday=[]; tuesday=[]; wednesday=[]; thursday=[]; friday=[]; saturday=[]; sunday=[];
    class_id;
    section;
    waiting=true;
    openmonday=false;
    opentuesday=false;
    openwednesday=false;
    openthursday=false;
    openfriday=false;
    opensaturday=false;
    vals : Array<JSON> =[];
    public constructor(private router:Router,private route: ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.class_id=params["name"];
            this.section = params["section"];
        });
        this.onload();
    }

    async onload(){
        var Wday: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var day = new Date();
        var TodayDay = Wday[day.getDay()];
        var getdata = firebase.firestore().collection("Monday");
        var check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
        await check.get().then(result=>{
            result.forEach(doc=>{
                console.log(doc.data());
                this.monday.push(doc.data());
            })
        })
        this.monday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })


        getdata = firebase.firestore().collection("Tuesday");
        check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
        await check.get().then(result=>{
            result.forEach(doc=>{
                // console.log(JSON.stringify(doc.data()));
                this.tuesday.push(doc.data());
            })
        })
        this.tuesday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })

        getdata = firebase.firestore().collection("Wednesday");
        check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
        await check.get().then(result=>{
            result.forEach(doc=>{
                // console.log(JSON.stringify(doc.data()));
                this.wednesday.push(doc.data());
            })
        })
        this.wednesday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })


        getdata = firebase.firestore().collection("Thursday");
        check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
        await check.get().then(result=>{
            result.forEach(doc=>{
                // console.log(JSON.stringify(doc.data()));
                this.thursday.push(doc.data());
            })
        })
        this.thursday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        })

        getdata = firebase.firestore().collection("Friday");
        check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
        await check.get().then(result=>{
            result.forEach(doc=>{
                // console.log(JSON.stringify(doc.data()));
                this.friday.push(doc.data());
            })
        });
        this.friday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        });


        getdata = firebase.firestore().collection("Saturday");
        check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
        await check.get().then(result=>{
            result.forEach(doc=>{
                // console.log(JSON.stringify(doc.data()));
                this.saturday.push(doc.data());
            })
        });
        this.saturday.sort(function(a,b){
            return parseInt(a["Sequence"])-parseInt(b["Sequence"]);
        });
        if(TodayDay=="Mon"){this.openmonday=true;}
        else if(TodayDay=="Tue"){this.opentuesday=true;}
        else if(TodayDay=="Wed"){this.openwednesday=true;}
        else if(TodayDay=="Thu"){this.openthursday=true;}
        else if(TodayDay=="Fri"){this.openfriday=true;}
        else if(TodayDay=="Sat"){this.opensaturday=true;}
        else if(TodayDay=="Sun"){this.openmonday=true;}
        this.waiting=false;
    }

    openMonday(){
        if(this.openmonday==true){this.openmonday=false;}
        else{this.openmonday=true;}
    }
    openTuesday(){
        if(this.opentuesday==true){this.opentuesday=false;}
        else{this.opentuesday=true;}
    }
    openWednesday(){
        if(this.openwednesday==true){this.openwednesday=false;}
        else{this.openwednesday=true;}
    }
    openThursday(){
        if(this.openthursday==true){this.openthursday=false;}
        else{this.openthursday=true;}
    }
    openFriday(){
        if(this.openfriday==true){this.openfriday=false;}
        else{this.openfriday=true;}
    }
    openSaturday(){
        if(this.opensaturday==true){this.opensaturday=false;}
        else{this.opensaturday=true;}
    }
    
    public goHome(){
        this.router.navigate(["/root"], { replaceUrl: true });
    }

}
