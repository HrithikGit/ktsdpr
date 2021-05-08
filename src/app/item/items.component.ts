import { Component, OnInit } from "@angular/core";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { Page } from "tns-core-modules/ui/page";
import {Router} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app");
const appSettings = require("tns-core-modules/application-settings");


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
        if(appSettings.getString("AlreadyLoggedIn")=="Yes"){
            this.router.navigate([appSettings.getString("TypeOfUser")]);
        }
        this.notcorrect = false;
    }
    ngOnInit(): void {
        this.page.actionBarHidden = true;
        // this.page.actionBar.title="Title check"         (Action Bar Title)
    }

    async loginAuthenicate(){
        this.user.trim();
        if(this.user.length==0 || this.pass.length==0){
            alert("Invalid Email or PassWord\n Try Re-entering Details");
            return ;
        }
        var isValid = false;
        var type ="";
        const userCollection = firebase.firestore().collection("Users").where("Username","==",this.user)
        .where("Password","==",this.pass);
        await userCollection.get().then(result=>{
            result.forEach(doc=>{
                isValid = true;
                if(doc.data()["Type"]=="Teacher"){
                    type="teacher";
                }
                else if(doc.data()["Type"]=="Root"){
                    type ="root";
                }
                else{
                    type="student";
                }
            })
        })
        if(isValid){
            appSettings.setString("AlreadyLoggedIn","Yes");
            appSettings.setString("TypeOfUser",type);
            this.router.navigate([type])
        }
        else{
            this.notcorrect = true;
        }
    }
    rootpage(){
        this.router.navigate(["root"]);
    }
    studentpage(){
        this.router.navigate(["student"])
    }
    teacherpage(){
        this.router.navigate(["teacher"])
    }
}
