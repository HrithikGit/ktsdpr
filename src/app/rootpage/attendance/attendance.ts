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

    func(a,b){
        return parseInt(a["Student_Id"])-parseInt(b["Student_Id"]);
    }

    getColor(str){
        if(str=="1"){
            return "#a4de02";
        }
        else if(str=="-1"){
            return "red";
        }
        else{
            return "gray";
        }
    }
    getToday(str){
        if(str=="1"){
            return "Present";
        }
        else if(str=="-1"){
            return "Absent";
        }
        else{
            return "--";
        }
    }


    async getdata(){
        // console.log("YO");
        await firebase.firestore().collection("Student").where("Class_Id","==",parseInt(this.class))
        .where("Class_Section","==",this.section).get().then(result=>{
            result.forEach(doc=>{
                var check = doc.data();
                check["displaytod"]=this.getToday(check["Is_Present_Today"]);
                check["color"]= this.getColor(check["Is_Present_Today"]);
                this.students.push(check);
            })
        })

        this.notready = false;
    }

}
