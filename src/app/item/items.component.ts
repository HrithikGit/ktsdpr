import { Component, OnInit,NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { Page } from "tns-core-modules/ui/page";
import {Router} from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";


const firebase = require("nativescript-plugin-firebase/app");
const appSettings = require("tns-core-modules/application-settings");


firebase.initializeApp({
  persist: false
}).then(instance =>( console.log("Intialized from component ")));

@Component({
    selector: "login-page",
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
        if(appSettings.getString("AlreadyLoggedIn")=="Yes"){
            this.router.navigate([appSettings.getString("TypeOfUser")]);
        }
        this.waiting = false;
        this.notcorrect = false;
    }
    ngOnInit(): void {
        this.page.actionBarHidden = true;
        // this.page.actionBar.title="Title check"         (Action Bar Title)
    }
    loading=false;
    async loginAuthenicate(){
        this.waiting = true;
        this.loading=true;
        this.user.trim();
        if(this.user.length==0 || this.pass.length==0){
            alert("Invalid Email or PassWord\n Try Re-entering Details");
            this.loading=false;
            return ;
        }
        var isValid = false;
        var type ="";
        var personid =0;
        var documentid ="";
        const userCollection = firebase.firestore().collection("Users").where("Username","==",this.user)
        .where("Password","==",this.pass);
        var firsttime;
        await userCollection.get().then(result=>{
            result.forEach(doc=>{
                isValid = true;
                documentid = doc.id;
                if(doc.data()["FirstLogin"]){
                    firsttime = true;
                }
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

            var returntopage;
            if(firsttime){
                await prompt({
                    title: "Change Password",
                    message: "Enter new Password",
                    defaultText: "",
                    okButtonText: "Ok",
                    cancelButtonText: "Cancel"
                  }).then((data) => { 
                    if (data.result) {
                        if(data.text.trim().length==0){
                            alert("Password cannot be empty ! Retry");
                            returntopage = true;
                            return;
                        }
                       this.changePassword(data.text,documentid);
                      alert({
                        title: "Welcome",
                        message: "Your password was successfully reset.",
                        okButtonText: "Ok"
                      })
                    }
                    else{
                        returntopage =true;
                    }
                  }); 
            }
            if(returntopage){
                this.loading = false;
                return;
            }

            this.waiting = true;
            if(type=="student"){
                await firebase.firestore().collection("Student").where("Unq_Id","==",personid).get()
                .then(result=>{
                    result.forEach(doc=>{
                        appSettings.setString("unq_id",doc.data().Unq_Id+"");
                        appSettings.setString("StudentClass",doc.data().Class_Id+"");
                        appSettings.setString("StudentSection",doc.data().Class_Section);
                        appSettings.setString("RollNumber",doc.data()["Student_Id"]+"");
                    }) 
                })
                this.updateandmove(type); 
            }


            else if(type=="teacher"){
                appSettings.setString("TeacherId",personid+"");
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
                        appSettings.setString("TeacherClass",doc.data()["Class_Id"]+"");
                        appSettings.setString("TeacherSection",doc.data()["Class_Section"]);
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
        this.loading=false;
    }

    async changePassword(givenpass,givendoc){
        await firebase.firestore().collection("Users").doc(givendoc).update({
            // FirstLogin : false,
            Password : givenpass
        });
    }

    issues(){
        alert("Please Contact Administrator.!");
    }
    updateandmove(type){
        appSettings.setString("AlreadyLoggedIn","Yes");
        appSettings.setString("TypeOfUser",type);
        this.router.navigate([type]);
    } 
    rootpage(){
        appSettings.setString("TypeOfUser","root");
        this.router.navigate(["root"]);
    }
    studentpage(){
        appSettings.setString("TypeOfUser","student");
        appSettings.setString("unq_id","1")
        this.router.navigate(["student"])
    }
    teacherpage(){
        appSettings.setString("TeacherId","13");
        appSettings.setString("TypeOfUser","teacher");
        this.router.navigate(["teacher"])
    }
}