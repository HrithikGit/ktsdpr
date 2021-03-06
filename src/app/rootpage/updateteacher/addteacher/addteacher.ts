import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { confirm } from "tns-core-modules/ui/dialogs";
import { EventData } from "tns-core-modules/data/observable";
import { Switch } from "tns-core-modules/ui/switch";
import {LoadingIndicator,Mode,OptionsCommon} from '@nstudio/nativescript-loading-indicator';

const indicator = new LoadingIndicator();
const firebase = require("nativescript-plugin-firebase/app")
const appSettings = require("tns-core-modules/application-settings")
 
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
    teacherid=0;
    docid="";
    Class_Id;
    Section_Id;
    rows=[{"class":"", "section":"","subject":""}];
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

        if(this.checked==true){this.checked=false;}
        else{this.checked=true;}
        /*let sw = args.object as Switch;
        this.checked = sw.checked; // boolean
        if(this.checked){
            this.confirmClassTeacher();
        }
        sw.checked = this.checked;*/
    }
    addrow():void{
        if(this.rows[this.rows.length-1].class.trim().length==0 ||
        this.rows[this.rows.length-1].subject.trim().length==0 ||
        this.rows[this.rows.length-1].section.trim().length==0){
            var Toast = require("nativescript-toast");
            var toast = Toast.makeText("Above Fields Cannot be empty");
            toast.show();
            return ;
        }
        this.rows.push({"class":"","section":"","subject":""});
    }
    remove(i){
        this.rows.splice(i,1);
    }

    async confirmClassTeacher(){
         var stop =false;
        console.log("Came here ");
            await confirm({
               title: "Note",
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



    async submit(){
        if(this.rows[this.rows.length-1].class.trim().length==0 ||
        this.rows[this.rows.length-1].subject.trim().length==0 ||
        this.rows[this.rows.length-1].section.trim().length==0){
            var Toast = require("nativescript-toast");
            var toast = Toast.makeText("Above Fields Cannot be empty");
            toast.show();
            return ;
        }

        const options: OptionsCommon = {
            message: 'Loading...',
            details: 'Please Wait',
            progress: 0.65, 
            margin: 10,
            dimBackground: true,
            color: '#0074D9', 
            backgroundColor: 'yellow',
            userInteractionEnabled: false,
            hideBezel: true,
            mode: Mode.Indeterminate
          };
          indicator.show(options);

        await firebase.firestore().collection("Generate_Id").get().then(result=>{
            result.forEach(doc=>{
                this.docid=doc.id;
                this.teacherid = doc.data()["Teacher_No"];
            })
        });


        for(var i=0;i<this.rows.length;i++){
            var present_section=this.rows[i].section.trim();
            var present_class=parseInt(this.rows[i].class.trim());
            if(!(this.isCharacterALetter(present_section))){
                indicator.hide();
                this.notvalid = true;
                alert("Please check sections");
                return ;
            }

            //Validation Ends Here !
            //Confirmation ends here !
            console.log(present_class+"  %%%%%%%%%%%  "+present_section);

            this.waiting = true;
            var classdefined = false;
            const checkexist = firebase.firestore().collection("Class").where("Class_Id","==",present_class)
            .where("Class_Section","==",present_section);
            await checkexist.get().then(
            result=>{
               result.forEach(doc=>{
                   classdefined = true;
               })
            }
          );
            console.log(classdefined);
       if(!classdefined){
           indicator.hide();
           alert("Given Class Doesn't Exist ! Try adding class in ManageClasses");
           this.waiting = false;
           return;
       }


       await firebase.firestore().collection("Teacher")
       .where("Class_Id","==",present_class).where("Class_Section","==",present_section)
       .where("Subject_Name","==",this.subject_name).get().then(result=>{
           result.forEach(doc=>{
               this.exists= true;
           })
        })
        // If already teacher teaching subject in given class is found

        if(this.exists){
            indicator.hide();
            alert("Teacher for given subject in given class already exists !");
            this.waiting = false;
            return;
        }
        }


        for(var i=0;i<this.rows.length;i++){
           await this.addteacher(parseInt(this.rows[i].class.trim()),this.rows[i].section.trim(),
           this.rows[i].subject.trim());
        }


        if(this.checked){
            const classCollection = firebase.firestore().collection("Class").where("Class_Id","==",this.Class_Id)
            .where("Class_Section","==",this.Section_Id);
            var classdoc="";
            await classCollection.get().then(result=>{
                result.forEach(doc=>{
                    classdoc=doc.id;
                })
            })
            const classDoc = firebase.firestore().collection("Class").doc(classdoc)
            await classDoc.update({
                Teacher_Id : this.teacherid+1
            })
        }

        const updateId = firebase.firestore().collection("Generate_Id").doc(this.docid);
        updateId.update({
            Teacher_No : this.teacherid+1
        })

        //Adding UserId and PassWord in User Database;
        const userCollection = firebase.firestore().collection("Users");
        userCollection.add({
            Username : this.teacher_name.trim()+this.teacherid,
            Password : "1234",
            Type : "Teacher",
            Id: this.teacherid,
            FirstLogin : true
        })
        this.waiting = false;
        indicator.hide();
        alert("Teacher Added Successfully ! with id : "+this.teacher_name+this.teacherid);

 
    }

    async addteacher(class_tobeAdded,section_tobeAdded,sub_tobeAdded){
        this.teacher_name.trim();
        this.subject_name.trim();
        this.succeded = false;
        this.exists = false;

        const teacherCollection = firebase.firestore().collection("Teacher");
        await teacherCollection.add({
            Teacher_Id : this.teacherid+1,
            Teacher_Name : this.teacher_name,
            Class_Id : class_tobeAdded,
            Class_Section : section_tobeAdded,
            Subject_Name : sub_tobeAdded
        })



    }

    public goHome(){
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}
