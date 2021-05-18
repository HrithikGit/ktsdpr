import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { confirm } from "tns-core-modules/ui/dialogs";
import {LoadingIndicator,Mode,OptionsCommon} from '@nstudio/nativescript-loading-indicator';
const indicator = new LoadingIndicator();


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
    studentid;
    unqid;
    public constructor(private router: Router) {
        this.exit_tapped = false;
        this.studentclass = parseInt(appSettings.getString("StudentClass"));
        this.studentsection = appSettings.getString("StudentSection");
        this.studentid = parseInt(appSettings.getString("RollNumber"))
        this.unqid = parseInt(appSettings.getString("unq_id"));
        console.log(this.studentclass+" "+this.studentsection+" "+this.studentid+" "+this.unqid);
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
    
    public async logout(){
      var stop = false;
        await confirm({
            title: "Logout",
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
        const options: OptionsCommon = {
            message: 'Loading...',
            details: 'Please Wait',
            progress: 0.65, 
            margin: 10,
            dimBackground: true,
            color: '#FF392E', 
            backgroundColor: 'yellow',
            userInteractionEnabled: false,
            hideBezel: true,
            mode: Mode.Indeterminate
          };
          indicator.show(options);
        appSettings.clear();
        indicator.hide();
        this.router.navigate(["items"]);
    }

}
  