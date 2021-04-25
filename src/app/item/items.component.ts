import { Component, OnInit } from "@angular/core";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { Page } from "tns-core-modules/ui/page";
import {Router} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({
  persist: false
}).then(instance =>( console.log("Intialized from component ")));
@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls : ["./items.component.css"]
})
export class ItemsComponent implements OnInit {
    user="";
    pass="";
    notcorrect ;
    constructor(private router: Router,private page: Page) {
        this.notcorrect = false;
    }
    ngOnInit(): void {
        this.page.actionBarHidden = true;
        // this.page.actionBar.title="Title check"         (Action Bar Title)
    }

    loginAuthenicate() :void{
        this.user.trim();
        if(this.user.length==0 || this.pass.length==0){
            alert("Invalid Email or PassWord\n Try Re-entering Details");
            return ;
        }
        var check = false;
        var passdb ="";
        const usercollection = firebase.firestore().collection("Users").where("Username","==",this.user)
        usercollection.get().then(result=>{
            result.forEach(doc=>{
                passdb = doc.data()["Password"];
            })
        })
        if(this.pass==passdb){
            this.router.navigate(["root"]);
        }
        else{
            this.notcorrect = true;
        }
    }
}
