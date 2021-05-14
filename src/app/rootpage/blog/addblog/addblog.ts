import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { action } from "tns-core-modules/ui/dialogs";
import {LoadingIndicator,Mode,OptionsCommon} from '@nstudio/nativescript-loading-indicator';
const indicator = new LoadingIndicator();
const appSettings = require("tns-core-modules/application-settings")

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "blog",
    templateUrl: "./addblog.html",
    styleUrls : ["./addblog.css"]
})

export class addblogComponent {
    headavail;
    heading;
    content;
    public constructor(private router:Router){
        this.headavail = true;
        this.content ="";
        this.heading ="";
    }
    async addToDb(){
        this.heading.trim();
        this.content.trim();
        if(this.heading.length==0 || this.content.length==0){
            this.headavail = false;
            return ;
        }

        //Confirm Prompt
        var flag = false;
        await action({
            message: "Are you sure to add this data",
            cancelButtonText: "",
            actions: ["Yes", "No"]
        }).then((result) => {
            if (result == "No") {
                flag = true;
            } else {
            }
        });
        if(flag){
            return ;
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

        const date = new Date();
        const blogCollection = firebase.firestore().collection("Blogs");
        await blogCollection.add({
            Heading : this.heading,
            Content : this.content,
            Time : date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString(),
            Date : date.getDate().toString()+"-"+date.getMonth().toString()+"-"+date.getFullYear().toString()
        });
        alert("Added Successfully !");
        indicator.hide()
    }
    public goHome(){
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}
