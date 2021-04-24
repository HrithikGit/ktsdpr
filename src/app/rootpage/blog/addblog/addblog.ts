import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

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
        const date = new Date();
        const blogCollection = firebase.firestore().collection("Blogs");
        await blogCollection.add({
            Heading : this.heading,
            Content : this.content,
            Time : date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString(),
            Date : date.getDate().toString()+"-"+date.getMonth().toString()+"-"+date.getFullYear().toString()
        });
        alert("Added Successfully !");
        this.router.navigate(["success","Done"]);
    }

}
