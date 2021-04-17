import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app")

@Component({
    selector: "attendance",
    templateUrl: "./attendance.html",
    styleUrls :["./attendance.css"]
})
export class attendanceComponent {
    class;
    section;
    notready;
    students=[];
    public constructor(private router:Router,private route:ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.class=params["name"];
            this.section=params["section"];
            this.notready = true;
            console.log(this.class+" "+this.section);
        });
        this.notready = true;
        this.getdata();
    }
    async getdata(){
        console.log("Came here");
        const attendanceCollection = firebase.firestore().collection("Attendance");
        const check = attendanceCollection.where("Class_Id","==",parseInt(this.class)).where("Class_Section","==",this.section);
        await check.get().then(result=>{
            result.forEach(doc=>{
                this.students.push(doc.data());
            })
        })
        console.log(this.students);
        console.log("Ended !");
        this.notready = false;
    }

}
