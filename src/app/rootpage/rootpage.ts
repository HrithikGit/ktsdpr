import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { Page } from "tns-core-modules/ui/page";
import { confirm } from "tns-core-modules/ui/dialogs";

const appSettings = require("tns-core-modules/application-settings")

@Component({
    selector: "rootpage",
    templateUrl: "./rootpage.html",
    styleUrls : ["./rootpage.css"]
})
export class rootpageComponent{
    check="";
    exit_tapped ;
    public constructor(private router: Router,private page: Page) {
        this.exit_tapped = false;
        // page.actionBarHidden = true;
    }
    ngOnInit() {
        if (application.android) {
          application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if (this.router.isActive("/root", false)) {
                data.cancel = true; // prevents default back button behavior
                this.getExit();
              }
          });
        } 
      }

      getExit(){
          if(!this.exit_tapped){
            this.exit_tapped = true;
            var Toast = require("nativescript-toast");
            var toast = Toast.makeText("Press again to Exit");
            toast.show();
            return ;
          }
        android.os.Process.killProcess(android.os.Process.myPid());
      }

    teacherdetails(): void{
        console.log(this.check);
        this.router.navigate(["deleteteacher"]);
    }

    addclass(): void{
        this.router.navigate(["deleteclass"]);
    }
    studentdetails(): void{
        this.router.navigate(["timetableclassselect","StudentDetails"]);
    }
    timetable(): void{
        this.router.navigate(["timetable"]);
    }
    blog(): void{
        this.router.navigate(["blog","Root"]);
    }
    attendance() : void{
        this.router.navigate(["timetableclassselect","Attendance"]);
    }

    marks():void{
        this.router.navigate(["marksclassselect"])
    }

    public async logout(){
        var stop = false;
        await confirm({
            title: "Your title",
            message: "Are you sure you want to logout?",
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
         }).then(result=>{
             if(result==false){
                 stop = true;
             }
             else if(result==true){
                 stop = false;
             }
             else{
                 stop = true;
             }
         })
        if(stop){
            return ;
        }
        appSettings.clear();
        this.router.navigate(["items"]);
    }
    
    exam(){
        this.router.navigate(["marks"]);
    }
}
