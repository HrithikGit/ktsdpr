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

        //Changing Data to Display

        for(var i=0;i<this.students.length;i++){
            const data=this.students[i];
            if(data["Is_Present_Today"]==1){
                data["today"]="Present"
            }
            else if(data["Is_Present_Today"]==0){
                data["today"]="Absent"
            }
            else{
                data["today"]="--";
            }
            await firebase.firestore().collection("Student").where("Student_Id","==",data["Student_Id"]).get().then(
                result=>{
                    result.forEach(doc=>{
                        data["name"] = doc.data()["Student_Name"];
                    })
                }
            )
        }
        this.notready = false;
    }

}
