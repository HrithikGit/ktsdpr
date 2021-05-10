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
              data.cancel = true; // prevents default back button behavior
              this.getExit();
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
        var name = appSettings.getString("Name");
        var attendance = appSettings.getString("Attendance");
        var lastdate = appSettings.getString("LastDate");
        const alertOptions = {
            title: 'Your Attendance',
            message: "Name : "+name+"\n\n"+"Attendance Percentage : "+attendance+"\n\n"+"Last Attendance Taken On : "+
            lastdate,
            okButtonText: 'Okay',
            cancelable: false // [Android only] Gets or sets if the dialog can be canceled by taping outside of the dialog.
          }
          alert(alertOptions);
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
    

}
  