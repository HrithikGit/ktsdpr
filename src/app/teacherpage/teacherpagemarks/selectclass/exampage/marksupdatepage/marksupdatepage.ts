import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import "nativescript-plugin-firebase";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "marksupdatepage",
    templateUrl: "./marksupdatepage.html"
})
export class marksupdatepageComponent{
    teacherid;
    class;
    section;
    examtype;
    marks=[];
    waiting=true;
    max_scoreable;
    public constructor(private router:Router,private route:ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.class=parseInt(params["class"]);
            this.section=params["section"];
            this.teacherid=parseInt(params["teacherid"]);
            this.examtype=params["examtype"];
        });
        this.getdetails();
        this.max_scoreable=-1;
    }

    async getdetails(){
        const student=firebase.firestore().collection("Marks").where("Student_Class","==",this.class).where("Student_Section","==",this.section)
        .where("Exam_Type","==",this.examtype).where("Teacher_Id","==",this.teacherid);

        console.log(this.class+" "+this.section+" "+this.examtype+" "+this.teacherid);
        await student.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                console.log(data);
                this.marks.push({
                    "Exam_Type":data.Exam_Type,
                    "Student_Class":data.Student_Class,
                    "Student_Section":data.Student_Section,
                    "Student_Id":data.Student_Id,
                    "Subject":data.Subject,
                    "Teacher_Id":data.Teacher_Id,
                    "Student_Marks":data.Student_Marks,
                    "id":doc.id
                });
            })
        })

        this.waiting=false;
    }

    async makechanges(){
        var Toast = require("nativescript-toast");
        if(this.max_scoreable==-1 || this.max_scoreable==0){
            var toast = Toast.makeText("Maximum Marks cannot be "+this.max_scoreable);
            toast.show();
            return ;
            
        }
        console.log(this.marks);
        for(var i=0;i<this.marks.length;i++){
            if(parseInt(this.marks[i].Student_Marks)<0){
                alert("Please enter valid marks for "+this.marks[i].Student_Id+" Roll no");
                return;
            }
        }
 
        for(var i=0;i<this.marks.length;i++){
            await firebase.firestore().collection("Marks").doc(this.marks[i].id).update({
                "Student_Marks":parseInt(this.marks[i].Student_Marks),
                "Maximum_Marks" : parseInt(this.max_scoreable)
            });
        }

        var toast = Toast.makeText("Updated Successfully!");
    }
    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}