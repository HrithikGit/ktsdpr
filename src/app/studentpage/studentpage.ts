import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";

const appSettings = require("tns-core-modules/application-settings");

@Component({
    selector: "studentpage",
    templateUrl: "./studentpage.html",
    styleUrls : ["./studentpage.css"]
})
export class studentpageComponent {
    studentclass ;
    studentsection;
    exit_tapped ;
    studentid=16;
    public constructor(private router: Router) {
        this.exit_tapped = false;
        this.studentclass = parseInt(appSettings.getString("StudentClass"));
        this.studentsection = parseInt(appSettings.getString("StudentSection"));
    }
    
    ngOnInit() {
        if (application.android) {
          application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if (this.router.isActive("/student", false)) {
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

    attendance(){
        this.router.navigate(["studentattendance",appSettings.getString("unq_id")]);
    }
    timetable(){
        this.router.navigate(["displaytimetable",this.studentclass,this.studentsection]);
    }
    blog(){
        this.router.navigate(["blog","Student"]);
    }
    about(){
        this.router.navigate(["studentpageabout"]);
    }
    marks(){
        this.router.navigate(["studentmarks",this.studentclass,this.studentsection,this.studentid]);
    }
    
    public logout(){
      appSettings.clear();
      this.router.navigate(["items"]);
    }

}
  