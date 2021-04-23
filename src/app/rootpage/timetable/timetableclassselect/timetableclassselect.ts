import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app")

@Component({
    selector: "timetableclassselect",
    templateUrl: "./timetableclassselect.html",
    styleUrls : ["./timetableclassselect.css"]
})

@NgModule({
    imports:[CommonModule,BrowserModule]
})
export class timetableclassselectComponent {
    detail;
    classes=[];
    notready;
    public constructor(private router:Router,private route: ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.detail=params["name"];
        });
        this.notready = true;
        this.getclasses();

        if(this.detail=="Update"){this.detail="updatetimetable";}
        else if(this.detail=="Delete"){this.detail="deletetimetable";}
        else if(this.detail=="Display"){this.detail="displaytimetable";}
        else if(this.detail=="Attendance"){this.detail="attendance";}
        else if(this.detail=="Marks"){this.detail="marks";}
    }

    async getclasses(){
        const avail_classes = firebase.firestore().collection("Class");
        await avail_classes.get().then(result=>{
            result.forEach(doc=>{
                this.classes.push(doc.data());
            })
        })
        this.classes.reverse();
        this.notready = false;
    }

}
