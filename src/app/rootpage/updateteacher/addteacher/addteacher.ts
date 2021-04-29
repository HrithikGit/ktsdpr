import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { confirm } from "tns-core-modules/ui/dialogs";
import { EventData } from "tns-core-modules/data/observable";
import { Switch } from "tns-core-modules/ui/switch";

const firebase = require("nativescript-plugin-firebase/app")

@Component({
    selector: "ns-items",
    templateUrl: "./addteacher.html"
})

export class addteacherComponent implements OnInit {
    teacher_name;
    class_id;
    section;
    subject_name;
    exists;
    notvalid;
    succeded;
    checked;
    waiting;
    constructor(private router: Router,private page: Page) {}
    ngOnInit(): void {
        this.waiting = false;
        this.checked = false;
        this.teacher_name="";
        this.class_id="";
        this.section="";
        this.subject_name="";
        this.notvalid = false;
        this.exists = false;
    }
    isCharacterALetter(char) {
        return (/[a-zA-Z]/).test(char)
      }

      onCheckedChange(args: EventData) {
        let sw = args.object as Switch;
        this.checked = sw.checked; // boolean
        if(this.checked){
            this.confirmClassTeacher();
        }
        sw.checked = this.checked;
    }

    async confirmClassTeacher(){
         var stop =false;
        console.log("Came here ");
            await confirm({
               title: "Your title",
               message: "Are you sure to make this teacher class teacher for "+this.class_id+" "+this.section,
               okButtonText: "Yes",
               cancelButtonText: "No",
               neutralButtonText: "Cancel"
            }).then(result=>{
                if(result==false){
                    stop = true;
                }
                else if(result==true){
                    stop = false;
                }
                else{
                    stop = true;
                }
            })
            if(stop){
                this.checked =false;
            }
    }
    async fun(){
        this.notvalid = false;
        this.teacher_name.trim();
        this.section.trim();
        this.subject_name.trim();
        this.succeded = false;
        this.exists = false;
        this.class_id = parseInt(this.class_id.trim());
        //      Validation

        // console.log(this.class_year);

        if(this.teacher_name.length==0 || this.section.length==0){
            this.notvalid = true;
            alert("Problem");
            return;
        }
        if(!(this.isCharacterALetter(this.section))){
            alert("Problem 2");
            this.notvalid = true;
            return ;
        }
        //Validation Ends Here !
       //Confirmation ends here !
       this.waiting = true;
       var classdefined = false;
       const checkexist = firebase.firestore().collection("Class").where("Class_Id","==",this.class_id)
       .where("Class_Section","==",this.section);
       await checkexist.get().then(
           result=>{
               result.forEach(doc=>{
                   classdefined = true;
               })
           }
       );

       if(!classdefined){
           alert("Given Class Doesn't Exist ! Try adding class in ManageClasses");
           this.waiting = false;
           return;
       }

       await firebase.firestore().collection("Teacher")
       .where("Class_Id","==",this.class_id).where("Class_Section","==",this.section)
       .where("Subject_Name","==",this.subject_name).get().then(result=>{
           result.forEach(doc=>{
               this.exists= true;
           })
        })
        // If already teacher teaching subject in given class is found

        if(this.exists){
            alert("Teacher for given subject in given class already exists !");
            this.waiting = false;
            return;
        }

        var docid="";
        var teacherid  = 0;
        await firebase.firestore().collection("Generate_Id").get().then(result=>{
            result.forEach(doc=>{
                docid=doc.id;
                teacherid = doc.data()["Teacher_No"];
            })
        });

        // console.log("doc id is "+docid+" teacher no "+teacherid);

        const teacherCollection = firebase.firestore().collection("Teacher");
        await teacherCollection.add({
            Teacher_Id : teacherid+1,
            Teacher_Name : this.teacher_name,
            Class_Id : this.class_id,
            Class_Section : this.section,
            Subject_Name : this.subject_name
        })

        if(this.checked){
            const classCollection = firebase.firestore().collection("Class").where("Class_Id","==",this.class_id)
            .where("Class_Section","==",this.section);
            var classdoc="";
            await classCollection.get().then(result=>{
                result.forEach(doc=>{
                    classdoc=doc.id;
                })
            })
            const classDoc = firebase.firestore().collection("Class").doc(classdoc)
            classDoc.update({
                Teacher_Id : teacherid+1
            })
        }

        const updateId = firebase.firestore().collection("Generate_Id").doc(docid);
        updateId.update({
            Teacher_No : teacherid+1
        })
        this.class_id="";
        this.teacher_name="";
        this.subject_name="";
        this.section="";
        this.waiting = false;
        alert("Teacher Added Successfully !")
    }
}
