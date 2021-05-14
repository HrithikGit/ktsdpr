import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import {LoadingIndicator,Mode,OptionsCommon} from '@nstudio/nativescript-loading-indicator';
const indicator = new LoadingIndicator();

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
        var check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
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
        check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
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
        check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
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
        check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
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
        check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
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
        check = getdata.where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
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
    mon(): void{this.currday ="Monday" ;this.rows=[...this.monday];   this.color(); this.moncol="#50C878";}
    tue(): void{this.currday ="Tuesday" ;this.rows=[]; this.rows=[...this.tuesday];  this.color(); this.tuecol="#50C878";}
    wed():void{this.currday ="Wednesday" ; this.rows=[...this.wednesday]; this.color(); this.wedcol="#50C878";}
    thu(): void{ this.currday ="Thrusday" ; this.rows=[...this.thursday];  this.color(); this.thucol="#50C878";}
    fri(): void{this.currday ="Friday" ; this.rows=[...this.friday];  this.color(); this.fricol="#50C878";}
    sat(): void{this.currday ="Saturday" ; this.rows=[...this.saturday];  this.color(); this.satcol="#50C878";}


    remove(val){
        console.log(val+" IS Y+THE VALUE");
        this.rows.splice(val,1);
        console.log(this.rows);
    }

    addcol(){
        var rw={"Start": "","End": "","Subject": "","Sequence":this.rows.length+1}
        this.rows.push(rw);
    }

    async change(){
        for(var i=0;i<this.rows.length;i++){
            if(this.rows[i].Start=="" || this.rows[i].End=="" || this.rows[i].Subject=="")
                {alert("Please check "+(i+1)+"th column"); return;}
        }

        const options: OptionsCommon = {
            message: 'Loading...',
            details: 'Please Wait',
            progress: 0.65, 
            margin: 10,
            dimBackground: true,
            color: '#0074D9', 
            backgroundColor: 'yellow',
            userInteractionEnabled: false,
            hideBezel: true,
            mode: Mode.Indeterminate
          };
          indicator.show(options);

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
            await del.delete();
        }

        const toadd = firebase.firestore().collection(this.currday);
        console.log(parseInt(this.class_id)+" "+this.section);
        for(var i=0;i<this.rows.length;i++){
            await toadd.add({
                Class_Id : parseInt(this.class_id),
                Class_Section : this.section,
                Start : this.rows[i]["Start"],
                End : this.rows[i]["End"],
                Sequence : parseInt(this.rows[i]["Sequence"]),
                Subject : this.rows[i]["Subject"].toUpperCase()
            })
        }
        indicator.hide();
        alert("Added Successfully !");
        if(this.currday=="Monday"){
            this.monday = [...this.rows];
        }
        else if(this.currday=="Tuesday"){
            this.tuesday = [...this.rows];
        }
        else if(this.currday=="Wednesday"){
            this.wednesday = [...this.rows];
        }
        else if(this.currday =="Thursday"){
            this.thursday = [...this.rows];
        }
        else if(this.currday =="Friday"){
            this.friday = [...this.rows];
        }
        else{
            this.saturday = [...this.rows];
        }
    }

    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}
