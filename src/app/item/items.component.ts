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
    constructor(private router: Router,private page: Page) { }
    ngOnInit(): void {
        // this.page.actionBar.title="Title check"         (Action Bar Title)
        this.page.actionBarHidden=true;
    }

    loginAuthenicate() :void{
        console.log("Hoi");
        console.log("Entered Details are : ");
        console.log(this.user+" "+this.pass);
        if(this.user.length==0 || this.pass.length==0){
            alert("Invalid Email or PassWord\n Try Re-entering Details");
            return ;
        }
        var check = false;
        const userCollection = firebase.firestore().collection("Users");
        userCollection.get({ source: "server" }).then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const document = JSON.parse(JSON.stringify(doc.data()));
              console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
              if(document.Username===this.user && document.Password==this.pass){
                  if(document.Type=="Root"){
                    this.router.navigate(["root"]);
                }
                  else if(document.Type=="Teacher"){
                      this.router.navigate(["teacher"]);
                  }
                  else{
                      this.router.navigate(["student"]);
                  }
              }

            });
          });
    }
}
