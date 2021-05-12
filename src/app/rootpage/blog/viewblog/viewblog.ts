import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "blog",
    templateUrl: "./viewblog.html",
    styleUrls : ["./viewblog.css"]
})

export class viewblogComponent {
    date;
    time;
    heading;
    content;
    loading;
    docid;
    waiting;
    prevheading;
    prevcontent;
    opacity;
    check;
    isRoot;
    public constructor(private router:Router,private route: ActivatedRoute){
        this.loading = true;
        this.waiting = false;
        this.check = false;
        this.route.params.subscribe((params)=>{
            this.date = params["date"],
            this.time = params["time"]
            this.isRoot = params["isRoot"]=="true"?true:false;
        })
        console.log(this.isRoot);
        this.getData(); 
    }
    async getData(){
        console.log(this.date);
        console.log(this.time);
        const blogCollection = firebase.firestore().collection("Blogs").where("Date","==",this.date).where("Time","==",this.time);
        await blogCollection.get().then(result=>{
            result.forEach(doc=>{
                this.docid = doc.id;
                this.heading = doc.data()["Heading"];
                this.content = doc.data()["Content"];
            })
        })
        this.opacity = 0.5;
        this.loading = false;
    } 
    async updateData(){

        var stop = false;
        await confirm({
            title: "Your title",
            message: "Are you sure want to modify the data of this Blog?",
            okButtonText: "Yes",
            cancelButtonText: "No"
         }).then(result=>{
            if(result==true){
                 stop = false;
             }
             else{
                 stop = true;
             }
         })
        if(stop){
            return ;
        }
        if(this.heading.length==0 || this.content.length==0){
            alert("Data cannot be empty! Either of Heading and Content are empty");
            return ;
        }
        this.waiting = true;
        firebase.firestore().collection("Blogs").doc(this.docid).update({
            Heading : this.heading,
            Content : this.content
        })
        alert("Update Successfull !");
        this.waiting = false;
    }

    public goHome(){
        this.router.navigate(["/root"], { replaceUrl: true });
    }
} 
