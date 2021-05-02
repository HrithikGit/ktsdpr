import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures";
import { prompt } from "tns-core-modules/ui/dialogs";
const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "teacherpageattendance",
    templateUrl: "./teacherpageattendance.html",
})
export class teacherpageattendanceComponent {
    ClassTeacherClass;
    ClassTeacherSection;
    waiting ;
    loading=true;
    attendance=[];
    ref=[];
    rows=[[]];
    public constructor(private router:Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.ClassTeacherClass=params["class"];
            this.ClassTeacherSection=params["section"];
        });
        this.waiting = false;
        this.getdetails();
    }

    initialize(){
        this.attendance =[];
        this.ref=[];
        this.rows=[[]];
    }
    async getdetails(){
        var k=0;

        var classid=1;
        var section ="A";

        const collect = firebase.firestore().collection("Student").where("Class_Id","==",classid)
        .where("Class_Section","==",section);

        await collect.get().then(result=>{
            result.forEach(doc=>{
                var check = {};
                check["Student_Id"]=doc.data()["Student_Id"];
                check["Student_Name"]=doc.data()["Student_Name"];
                check["Student_Attendance"] = doc.data()["Student_Attendance"];
                check["Is_Present_Today"] = doc.data()["Is_Present_Today"];
                check["Classes_Attended"]= doc.data()["Classes_Attended"];
                this.attendance.push(doc.data()["Is_Present_Today"]);
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

    start; end;


    longpress(i) {
        prompt({
            title: "Details",
            message: "Student Name : "+this.rows[Math.floor(i/3)][i%3]["Student_Name"]+"\n"+
                    "Student Attendance : "+this.rows[Math.floor(i/3)][i%3]["Student_Attendance"],
            okButtonText: "Ok"
        })
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
        var date = new Date();
        var today = date.getDay().toString()+"-"+date.getMonth().toString()+":"+date.getFullYear().toString();
        this.waiting = true;
        const updating = firebase.firestore().collection("Student");

        var getdate ="";
        var sofar=0;
        const  checkdate = firebase.firestore().collection("Generate_Id");
        var dateupdate ="";
        await checkdate.get().then(result=>{
            result.forEach(doc=>{
                dateupdate = doc.id;
                sofar = doc.data()["Classes_So_Far"];
                getdate = doc.data()["Today_Date"];
            })
        })


        if(getdate!=today){
            sofar+=1;
           await firebase.firestore().collection("Generate_Id").doc(dateupdate).update({
                Previous_Date: getdate,
                Today_Date : today,
                Classes_So_Far : sofar
            })
            for(var i=0;i<this.ref.length;i++){
                await firebase.firestore().collection("Student").doc(this.ref[i]).update({
                    Is_Present_Yesterday : this.rows[Math.floor(i/3)][i%3]["Is_Present_Today"],
                    Is_Present_Today : "0"
                })
            }
        }


        for(var i=0;i<this.ref.length;i++){
            console.log(i+" "+Math.floor(i/3)+" "+i%3);
            var attended = parseInt(this.rows[Math.floor(i/3)][i%3]["Classes_Attended"]);
            var ispresenttoday = this.rows[Math.floor(i/3)][i%3]["Is_Present_Today"];

            if(getdate==today){
                if(ispresenttoday==this.attendance[i]){
                    continue;
                }
                else if(ispresenttoday!=this.attendance[i] && this.attendance[i]=="1"){
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
                Student_Attendance : (attended/sofar)*100
            });
        }
        this.initialize();
        await this.getdetails();
        this.waiting = false;
        alert("Attendance has been updated !");
    }
}
