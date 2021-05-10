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
    waiting ;
    constructor(private router: Router,private page: Page) {
        this.waiting = true;
        // if(appSettings.getString("AlreadyLoggedIn")=="Yes"){
        //     this.router.navigate([appSettings.getString("TypeOfUser")]);
        // }
        this.waiting = false;
        this.notcorrect = false;
    }
    ngOnInit(): void {
        this.page.actionBarHidden = true;
        // this.page.actionBar.title="Title check"         (Action Bar Title)
    }
 
    async loginAuthenicate(){
        this.waiting = true;
        this.user.trim();
        if(this.user.length==0 || this.pass.length==0){
            alert("Invalid Email or PassWord\n Try Re-entering Details");
            return ;
        }
        var isValid = false;
        var type ="";
        var personid =0;
        var documentid ="";
        const userCollection = firebase.firestore().collection("Users").where("Username","==",this.user)
        .where("Password","==",this.pass);
        await userCollection.get().then(result=>{
            result.forEach(doc=>{
                isValid = true;
                documentid = doc.id;
                personid = doc.data()["Id"];
                if(doc.data()["Type"]=="Teacher"){
                    type="teacher";
                    console.log(doc.data()); 
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
            this.waiting = true;
            if(type=="student"){
                await firebase.firestore().collection("Student").where("Unq_Id","==",personid).get()
                .then(result=>{
                    result.forEach(doc=>{
                        appSettings.setString("Name : ")
                        appSettings.setString("RollNumber",doc.data()["Student_Id"]+"");  
                        appSettings.setString("Attendance",doc.data()["Student_Attendance"]+"");
                        appSettings.setString("LastDate",doc.data()["Today_Date"]);
                        appSettings.setString("StudentClass",doc.data()["Class_Id"]+"");
                        appSettings.setString("StudentSection",doc.data()["Class_Section"])
                    }) 
                })
                this.updateandmove(type); 
            }


            else if(type=="teacher"){
                await firebase.firestore().collection("Teacher").where("Teacher_Id","==",personid).get()
                .then(result=>{
                    result.forEach(doc=>{
                        appSettings.setString("Name",doc.data()["Teacher_Name"]);
                    })
                })
                await firebase.firestore().collection("Class").where("Teacher_Id","==",personid).get()
                .then(result=>{
                    result.forEach(doc=>{
                        appSettings.setString("IsClassTeacher","True");
                        appSettings.setString("Class",doc.data()["Class_Id"]+"");
                        appSettings.setString("Section",doc.data()["Class_Section"]);
                    })
                })
                this.waiting = false;
                this.updateandmove(type);
            }
            //Code for Root
            else{
                appSettings.setString("IsRoot","True");
                this.updateandmove(type);
            }
        }
        else{ 
            this.notcorrect = true; 
        }
        this.waiting = false; 
    }
    updateandmove(type){
        appSettings.setString("AlreadyLoggedIn","Yes");
        appSettings.setString("TypeOfUser",type);
        this.router.navigate([type]);
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
