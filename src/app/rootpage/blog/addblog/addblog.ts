import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { action } from "tns-core-modules/ui/dialogs";
import { Switch } from "tns-core-modules/ui/switch";
import {LoadingIndicator,Mode,OptionsCommon} from '@nstudio/nativescript-loading-indicator';
import { EventData } from "tns-core-modules/data/observable";
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
    all_classes=[];
    show_classes=false;
    waiting=true;
    IDs=[]
    public constructor(private router:Router){
        this.headavail = true;
        this.content ="";
        this.heading ="";
        this.getclasses();
    }
    async getclasses(){
        const classes=firebase.firestore().collection("Class");
        await classes.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                data["checked"]=false;
                this.all_classes.push(data);
            })
        })
        this.waiting=false;
    }
    all_checked=true;
    onCheckedChange(args: EventData) {
        if(this.all_checked==true){this.all_checked=false; this.show_classes=true;}
        else{
            this.all_checked=true; 
            this.show_classes=false;
            
        }
    }

    select_class(i){
        if(this.all_classes[i]["checked"]==true){
            this.all_classes[i]["checked"]=false;}
        else{this.all_classes[i]["checked"]=true;}
    }

    getcolor(i){
        if(this.all_classes[i]["checked"]==true){return "green"}
        return "#f1f1f1";
    }

    addID(){
        this.IDs.push({"ID":""});
    }
    removeID(i){
        this.IDs.splice(i,1);
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

          var class_string="";


        if(this.all_checked==true){
            for(var i=0;i<this.all_classes.length;i++){
                this.all_classes[i]["checked"]=true;
                class_string+=this.all_classes[i].Class_Id+this.all_classes[i].Class_Section;
            }
        }
        else{
            for(var i=0;i<this.all_classes.length;i++){
                if(this.all_classes[i]["checked"]==true){
                    class_string+=this.all_classes[i].Class_Id+this.all_classes[i].Class_Section;}
            }
        }

        var ID_string="";
        for(var i=0;i<this.IDs.length;i++){
            ID_string+=this.IDs[i].ID+"-";
        }
        
        const date = new Date();
        const blogCollection = firebase.firestore().collection("Blogs");
        await blogCollection.add({
            Heading : this.heading,
            Content : this.content,
            Time : date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString(),
            Date : date.getDate().toString()+"-"+date.getMonth().toString()+"-"+date.getFullYear().toString(),
            toClass: class_string,
            toID: ID_string,
            Class_seen:"",
            ID_seen: ""

        });
        this.headavail=true;
        alert("Added Successfully !");
        
        indicator.hide()
    }
    public goHome(){
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}