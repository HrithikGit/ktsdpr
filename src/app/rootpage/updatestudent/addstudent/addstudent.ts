import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import {LoadingIndicator,Mode,OptionsCommon} from '@nstudio/nativescript-loading-indicator';
const indicator = new LoadingIndicator();

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "ns-items",
    templateUrl: "./addstudent.html",
})
export class addstudentComponent {
    student_name;
    student_class;
    student_id;
    student_section;
    student_attendance;
    exists; 
    notvalid;
    succeded;
    student_address;
    student_mobileno;
    isMobileValid;
    student_father_name;
    student_mother_name;
    student_dob;
    mole1;
    mole2;
    doberror;
    constructor(private router: Router,private route: ActivatedRoute,private page: Page) {
        this.route.params.subscribe((params)=>{
            this.student_class= params["name"],
            this.student_section = params["section"]
            console.log(this.student_class+" "+this.student_section);
        })
        this.intialize();
    }
    intialize(): void {
        this.doberror = false;
        this.isMobileValid = true;
        this.student_mobileno="";
        this.student_address="";
        this.student_name="";
        this.student_id="";
        this.student_attendance="";
        this.notvalid = false;
        this.exists = false;
        this.student_father_name="";
        this.student_mother_name="";
        this.mole1="";
        this.mole2="";
    }
    isCharacterALetter(char) {
        return (/[a-zA-Z]/).test(char)
      } 

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

    async fun(){
        this.student_attendance.trim();
        this.student_class.trim();
        this.student_id.trim();
        this.student_name.trim();
        this.student_section.trim();
        this.succeded = false;
        //      Validation

        // console.log(this.class_year);

        if(this.student_name.length==0 || (!this.isMobileValid) || this.doberror){
            this.notvalid = true;
            return;
        }
        //Validation Ends Here !

        const studentCollection = firebase.firestore().collection("Student");

        await studentCollection.where("Student_Id","==",parseInt(this.student_id)).
        where("Class_Id","==",this.student_class).where("Class_Section","==",this.student_section).get().then(result=>{
            result.forEach(doc=>{
                this.exists = true;
            })
        })

        if(this.exists){
            alert("This Student with provided Roll No. Exists ! Please Delete and Try or Add another Student");
            return;
        } 


        // console.log("Got Value ");
        var value =0;
        var doccheck ="";
        await firebase.firestore().collection("Generate_Id").get().then(result=>{
            result.forEach(doc=>{
                doccheck = doc.id;
                value = doc.data()["Student_No"]
            })
        })


        
        const options: OptionsCommon = {
            message: 'Loading...',
            details: 'Please Wait',
            progress: 0.65, 
            margin: 10, 
            dimBackground: true,
            color: '#FF392E', 
            backgroundColor: 'yellow',
            userInteractionEnabled: false,
            hideBezel: true,
            mode: Mode.Indeterminate
          };
          indicator.show(options);

        var unqid = this.student_name+this.student_id+this.student_class+this.student_section;
        await studentCollection.add({
            Unq_Id : value,
            Student_Id : parseInt(this.student_id),
            Class_Id : parseInt(this.student_class),
            Class_Section : this.student_section,
            Student_Name : this.student_name,
            Student_Father_Name : this.student_father_name,
            Student_Mother_Name : this.student_mother_name,
            Student_Attendance : parseInt(this.student_attendance),
            Student_Mobile_No : parseInt(this.student_mobileno),
            Date_Of_Birth : this.student_dob,
            Student_Address : this.student_address,
            Is_Present_Today : "0",
            Classes_So_Far : 0, 
            Classes_Attended : 0,
            Is_Present_Yesterday : "0",
            Date_Of_Joining: new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()
        })
        
        await firebase.firestore().collection("Users").add({
            Username: parseInt(this.student_mobileno),
            Password : "1234",
            Type : "Student", 
            Id : value,
            FirstLogin : true
        })

        await firebase.firestore().collection("Generate_Id").doc(doccheck).update({
            Student_No : value+1
        })
        indicator.hide();
        alert("Added Successfully !");
        this.intialize();
    }
    
    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}


