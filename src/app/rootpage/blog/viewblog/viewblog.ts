import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

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
    public constructor(private router:Router,private route: ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.date = params["date"],
            this.time = params["time"]
        })
        this.getData();
    }
    async getData(){
        console.log(this.date);
        console.log(this.time);
        const blogCollection = firebase.firestore().collection("Blogs").where("Date","==",this.date).where("Time","==",this.time);
        await blogCollection.get().then(result=>{
            result.forEach(doc=>{
                console.log(doc.data());
                this.heading = doc.data()["Heading"];
                this.content = doc.data()["Content"];
            })
        })
        console.log(this.heading);
        console.log(this.content);
    }

}
