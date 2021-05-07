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
    updatingData;
    loading=true;
    attendance=[];
    ref=[];
    rows=[[]];
    getdate;
    today;
    sofar;
    dateupdate;
    public constructor(private router:Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.ClassTeacherClass=params["class"];
            this.ClassTeacherSection=params["section"];
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

        var classid=1;
        var section ="A";
        var date = new Date();
        this.today = date.getDay().toString()+"-"+date.getMonth().toString()+":"+date.getFullYear().toString();
        this.waiting = true;

        this.getdate ="";
        this.sofar=0;
        const  checkdate = firebase.firestore().collection("Generate_Id");
        this.dateupdate =""; 
        await checkdate.get().then(result=>{
            result.forEach(doc=>{
                this.dateupdate = doc.id;
                this.sofar = doc.data()["Classes_So_Far"];
                this.getdate = doc.data()["Today_Date"];
            })
        })
        console.log(this.today+" "+this.getdate);
        if(this.today==this.getdate){
            this.updatingData = true;
        }



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
                if(this.updatingData){
                    this.attendance.push(doc.data()["Is_Present_Today"]);
                }
                else{
                    this.attendance.push("0");
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
        "Student Attendance :"+this.rows[Math.floor(i/3)][i%3]["Student_Attendance"]);
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
        const updating = firebase.firestore().collection("Student");
        if(!this.updatingData){
            this.sofar+=1;
           await firebase.firestore().collection("Generate_Id").doc(this.dateupdate).update({
                Previous_Date: this.getdate,
                Today_Date : this.today,
                Classes_So_Far : this.sofar
            })
            for(var i=0;i<this.ref.length;i++){
                await firebase.firestore().collection("Student").doc(this.ref[i]).update({
                    Is_Present_Yesterday : this.rows[Math.floor(i/3)][i%3]["Is_Present_Today"]
                })
            }
        }


        for(var i=0;i<this.ref.length;i++){
            console.log(i+" "+Math.floor(i/3)+" "+i%3);
            var attended = parseInt(this.rows[Math.floor(i/3)][i%3]["Classes_Attended"]);
            var ispresenttoday = this.rows[Math.floor(i/3)][i%3]["Is_Present_Today"];

            if(this.getdate==this.today){
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
                Student_Attendance : (attended/this.sofar)*100
            });
        }
        this.initialize();
        await this.getdetails();
        this.waiting = false;
        alert("Attendance has been updated !");
    }
}
 