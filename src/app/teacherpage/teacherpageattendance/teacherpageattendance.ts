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
    loading=true;
    public constructor(private router:Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.ClassTeacherClass=params["class"];
            this.ClassTeacherSection=params["section"];
        });
        this.getdetails();
    }

    students =[];
    attendance =[];
    ref=[];
    // rows=[[],[],[]];

    async getdetails(){
        var k=0;

        var classid=1;
        var section ="A";

        const collect = firebase.firestore().collection("Student").where("Class_Id","==",classid)
        .where("Class_Section","==",section);

        await collect.get().then(result=>{
            result.forEach(doc=>{
                this.students.push(doc.data());
                this.attendance.push(doc.data()["Is_Present_Today"]);
                this.ref.push(doc.id);
            })
        })
        // for(var i=0;i<this.students.length;i++){
        //     this.rows[i%3].push(this.students[i]);
        // }
        // console.log(this.rows);
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
            message: "Student Name : "+this.students[i]["Student_Name"]+"\n"+
                    "Student Attendance : "+this.students[i]["Student_Attendance"],
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

    commit():void{
        console.log("YO");
    }
}
