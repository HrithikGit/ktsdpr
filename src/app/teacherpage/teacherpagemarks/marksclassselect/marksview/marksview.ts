import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "marksview",
    templateUrl: "./marksview.html"
})


export class marksviewComponent{
    subject;
    class;
    section;
    examtype;
    marks=[];
    waiting=true;
    public constructor(private router:Router,private route:ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.class=params["class"];
            this.section=params["section"];
            this.subject=params["subject"];
            this.examtype=params["examtype"];
        });
        this.getdetails();

    }

    async getdetails(){
        this.class.trim();
        const student=firebase.firestore().collection("Marks").where("Student_Class","==",parseInt(this.class)).where("Student_Section","==",this.section)
        .where("Exam_Type","==",this.examtype).where("Subject","==",this.subject);

        console.log(this.class+" "+this.section+" "+this.examtype+" "+this.subject);
        await student.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                console.log(data);
                this.marks.push({
                    "Student_Id":data.Student_Id,
                    "Student_Marks":data.Student_Marks,
                });
            })
        })
        console.log(this.marks);
        this.waiting=false;
    }

    public goHome(){
        this.router.navigate(["/teacher"], { replaceUrl: true });
    }
}