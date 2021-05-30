import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "viewstudent",
    templateUrl: "./viewstudent.html",
})
export class viewstudentComponent { 
    loading ;
    studentid;
    class;
    section;
    student_name;
    student_attendance;
    exists;
    waiting ;
    notvalid;
    student_address;
    student_mobileno;
    docid;
    isMobileValid;
    doberror;
    student_dob;
    mole1;
    mole2;
    student_father_name;
    datejoined;
    student_mother_name;
    student_id;
    public constructor(private router: Router,private route: ActivatedRoute){
        this.loading = true;
        this.route.params.subscribe((params)=>{
            this.studentid = parseInt(params["studentid"]);
            this.class= parseInt(params["class"]);
            this.section = params["section"];
        })
        this.isMobileValid = true;
        this.doberror = false;
        this.waiting = false;
        this.getData(); 
    }

    //Validation
    checkMobile(event : any){
        console.log("Came here")
        if(this.student_mobileno.trim().length!=10){
            this.isMobileValid = false;
            return;
        }
        this.isMobileValid = true;
    } 

    checkDob(event : any){
        try{
            var splittedDob = this.student_dob.split("-"); 
            if(splittedDob.length!=3){
                this.doberror = true;
                return;
            }
            var day = parseInt(splittedDob[0]);
            var month = parseInt(splittedDob[1]);
            if(splittedDob[2].length!=4){
                this.doberror= true;
            }
            if(day<=0 || day>31 || month<0 || month>=13){
                this.doberror=true;
                return;
            } 
        }
        catch(error){
            this.doberror = true;
            return;
        }
        this.doberror = false;
    }
    

    //Getting Data 
    async getData(){
        const stuCollection = firebase.firestore().collection("Student").where("Class_Id","==",this.class)
                            .where("Class_Section","==",this.section).where("Student_Id","==",this.studentid);
        await stuCollection.get().then(result=>{
                result.forEach(doc=>{
                    this.docid = doc.id;
                    this.student_id = doc.data()["Student_Id"],
                    this.student_mobileno=doc.data()["Student_MobileNo"]
                    this.student_name = doc.data()["Student_Name"];
                    this.student_attendance = doc.data()["Student_Attendance"];
                    this.student_address = doc.data()["Student_Address"];
                    this.student_dob= doc.data()["Date_Of_Birth"];
                    this.mole1 = doc.data()["Student_Mole1"];
                    this.mole2 = doc.data()["Student_Mole2"];
                    this.student_father_name = doc.data()["Student_Father_Name"];
                    this.student_mother_name = doc.data()["Student_Mother_Name"];
                    this.student_mobileno = doc.data()["Student_Mobile_No"]
                    this.datejoined = doc.data()["Date_Of_Joining"];
                })
            })
            this.loading = false;
    }
    async updateStudent(){
        var stop = false;
        await confirm({
            title: "Your title",
            message: "Are you sure to update this Student?",
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
         }).then(result=>{
             if(result){
                 stop = false;
             }
             else{
                 stop = true;
             }
         })
        if(stop){
            return ;
        }
        this.waiting = true;
        const changeRecord = firebase.firestore().collection("Student").doc(this.docid);
        changeRecord.update({
            Student_Id : parseInt(this.student_id),
            Student_Name : this.student_name,
            Student_Father_Name : this.student_father_name,
            Student_Mother_Name : this.student_mother_name,
            Student_Attendance : parseInt(this.student_attendance),
            Student_Mobile_No : parseInt(this.student_mobileno),
            Date_Of_Birth : this.student_dob,
            Student_Address : this.student_address,
        })
        alert("Added Successfully !");
        this.waiting = false;
    }

    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}
