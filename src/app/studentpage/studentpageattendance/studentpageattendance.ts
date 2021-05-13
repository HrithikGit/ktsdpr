import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import "nativescript-plugin-firebase";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "marksupdatepage",
    templateUrl: "./studentpageattendance.html",
    styleUrls : ["./studentpageattendance.css"]
})
export class studentpageattendanceComponent{
    unq_id;
    loading ;
    data;
    rows=[];
    columns;
    colors=[];
    public constructor(private router:Router,private route:ActivatedRoute){
        this.loading = true;
        this.route.params.subscribe((params)=>{
            this.unq_id = params["unq_id"]
        });
        console.log(this.unq_id);
        this.getData();
    
    }
    async getData(){
        await firebase.firestore().collection("Student").where("Unq_Id","==",parseInt(this.unq_id)).get().then(result=>{
            result.forEach(doc=>{
                this.data = doc.data()
                if("Today_Date" in this.data){
                    this.rows.push([this.data.Today_Date, this.getVal(this.data.Is_Present_Today)]);
                    this.colors.push(this.getCol(this.data.Is_Present_Today));
                }
                else{
                    this.rows.push(["Data Not available ","--"])
                    this.colors.push("gray");
                }

                if("Previous_Date" in this.data){
                    this.rows.push([this.data.Previous_Date, this.getVal(this.data.Is_Present_Yesterday)]);
                    this.colors.push(this.getCol(this.data.Is_Present_Yesterday));
                }
                else{
                    this.rows.push(["Data Not available ","--"])
                    this.colors.push("gray");
                }

                if("Previous_Previous_Date" in this.data){
                    this.rows.push([this.data.Previous_Previous_Date, this.getVal(this.data.Is_Present_DayBefore)]);
                    this.colors.push(this.getCol(this.data.Is_Present_DayBefore));
                }
                else{
                    this.rows.push(["Data Not available ","----"])
                    this.colors.push("gray");
                }
 
            })
        })
        this.setPercentage(this.data.Student_Attendance);
        this.loading  = false;
    }

    getCol(str){
        if(str=="1"){
            return "green";
        }
        else{
            return "red";
        }
    }
    getVal(str){
        if(str=="1"){
            return "Present";
        }
        else{
            return "Absent";
        }
    }

    setPercentage(percent) {
        this.columns = percent + "*," + (100 - percent) + "*";
      }

    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}