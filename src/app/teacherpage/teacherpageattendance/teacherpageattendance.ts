import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
const firebase = require("nativescript-plugin-firebase/app");
import {LoadingIndicator,Mode,OptionsCommon} from '@nstudio/nativescript-loading-indicator';
  
const indicator = new LoadingIndicator();
const appSettings = require("tns-core-modules/application-settings")
  

@Component({
    selector: "teacherpageattendance",
    templateUrl: "./teacherpageattendance.html",
    styleUrls : ["./teacherpageattendance.css"]
})
export class teacherpageattendanceComponent {
    teacherclass;
    teachersection;
    waiting ;
    updatingData;
    loading=true;
    attendance=[];
    ref=[];
    rows=[[]];
    getdate;
    today;
    sofar;
    olddate;


    public constructor(private router:Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.teacherclass = parseInt(appSettings.getString("Teacher_Class"));
            this.teachersection = appSettings.getString("Teacher_Section");
        });
        this.waiting = false;
        this.getdetails();
    }  

    initialize(){
        this.ref=[]; 
        this.rows=[[]];
    } 
    async getdetails(){
        var k=0;
        var date = new Date();
        this.today = date.getDate().toString()+"-"+date.getMonth().toString()+"-"+date.getFullYear().toString();
        this.waiting = true;

        this.getdate ="";
        this.sofar=0;

        const collect = firebase.firestore().collection("Student").where("Class_Id","==",this.teacherclass)
        .where("Class_Section","==",this.teachersection);
 
        await collect.get().then(result=>{
            result.forEach(doc=>{
                var check = {};
                check["Student_Id"]=doc.data()["Student_Id"];
                check["Student_Name"]=doc.data()["Student_Name"];
                check["Student_Attendance"] = doc.data()["Student_Attendance"];
                check["Is_Present_Today"] = doc.data()["Is_Present_Today"];
                check["Is_Present_Yesterday"] = doc.data()["Is_Present_Yesterday"];
                check["Classes_Attended"]= doc.data()["Classes_Attended"];
                this.sofar = doc.data()["Classes_So_Far"];
                this.getdate = doc.data()["Today_Date"];
                this.olddate = doc.data()["Previous_Date"];
                if(this.getdate==this.today){
                    this.attendance.push(doc.data()["Is_Present_Today"]);
                }
                else{
                    this.attendance.push("1");
                }
                this.ref.push(doc.id);
                this.rows[k].push(check);
                if(this.rows[k].length==3){
                    this.rows.push([]);
                    k++;
                }
            })
        })
        this.loading = false;

    }

    get(i){
        if(this.attendance[i]=="1"){
            return "#a4de02"; //Green Color;
        }
        else if(this.attendance[i]=="-1"){
            return "#ff392e"; //Red Color
        }
        else{
            return "#808080";  //Gray Color;
        }
    }


    longpress(i) {
        alert("Student Name :"+this.rows[Math.floor(i/3)][i%3]["Student_Name"]+"\n"+
        "Student Attendance :"+this.rows[Math.floor(i/3)][i%3]["Student_Attendance"].toFixed(2));
      }

    change(i){
        if(this.attendance[i]=="1"){
            this.attendance[i]="-1";
        }
        else{
            this.attendance[i]="1";
        } 
    } 

    async commit(){
        //Loading animation 

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

        //
        this.loading = true;
        const updating = firebase.firestore().collection("Student");
        console.log(this.today+" "+this.getdate+" "+this.sofar);
        if(this.today!=this.getdate){
            this.sofar+=1;
            for(var i=0;i<this.ref.length;i++){
                await firebase.firestore().collection("Student").doc(this.ref[i]).update({
                    Previous_Previous_Date : this.olddate,
                    Previous_Date: this.getdate,
                    Today_Date : this.today,
                    Classes_So_Far : this.sofar,
                    Is_Present_DayBefore : this.rows[Math.floor(i/3)][i%3]["Is_Present_Yesterday"],
                    Is_Present_Yesterday : this.rows[Math.floor(i/3)][i%3]["Is_Present_Today"]
                })
            }
        }
 
        // console.log("HERE");

        for(var i=0;i<this.ref.length;i++){
            console.log(i+" "+Math.floor(i/3)+" "+i%3);
            var attended = parseInt(this.rows[Math.floor(i/3)][i%3]["Classes_Attended"]);
            var ispresenttoday = this.rows[Math.floor(i/3)][i%3]["Is_Present_Today"];

            if(this.getdate==this.today){
                if(ispresenttoday!=this.attendance[i] && this.attendance[i]=="1"){
                    attended++;
                }
                else if(ispresenttoday!=this.attendance[i] && this.attendance[i]=="-1"){
                    attended--;
                }
            }
            else{
                if(this.attendance[i]=="1"){
                    attended++;
                }
            }
            
            await updating.doc(this.ref[i]).update({ 
                Is_Present_Today : this.attendance[i],
                Classes_Attended :attended,
                Student_Attendance : (attended/this.sofar)*100
            });
        }
        // this.initialize();
        // await this.getdetails();
        this.waiting = false;
        this.loading = false;
        indicator.hide();
        alert("Attendance has been updated !");
    }
 
    public goHome(){
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}
 