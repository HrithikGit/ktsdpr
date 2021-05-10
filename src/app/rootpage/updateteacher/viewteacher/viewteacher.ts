import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";
import { EventData } from "tns-core-modules/data/observable";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "viewteacher",
    templateUrl: "./viewteacher.html",
})
export class viewteacherComponent {
    loading ;
    teacherid;
    waiting;
    teacher_name;
    class_and_section=[];
    subjectname;

    prev_class_and_section=[];

    public constructor(private router: Router,private route: ActivatedRoute){
        this.loading = true;
        this.route.params.subscribe((params)=>{
            this.teacherid = params["teacherid"];
            console.log(this.teacherid);
            
        })
        this.waiting=true;
        this.loading = false;
        this.getdata();

    }


    async getdata(){
        const teacherCollection = firebase.firestore().collection("Teacher").where("Teacher_Id","==",parseInt(this.teacherid));
        await teacherCollection.get().then(result=>{
            result.forEach(doc=>{
                var check = doc.data();
                this.teacher_name=check.Teacher_Name;
                check["id"] = doc.id;
                this.class_and_section.push(check);
                this.prev_class_and_section.push(check);
                this.subjectname=check.Subject_Name;
            })
        })
        this.waiting = false;
        console.log(this.class_and_section);
    }


    addrow(){
        this.class_and_section.push({"Class_Id":-1,"Teacher_Id":this.teacherid,"Class_Section":"","Subject_Name":this.subjectname,"Teacher_Name":this.teacher_name});

    }
    async remove(i){
        var stop = false;
        await confirm({
            title: "Your title",
            message: "Are you sure delete this class for teacher"+this.class_and_section[i].Class_Id+this.class_and_section[i].Class_Section,
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
            return ;
        }
        /*const remcollection = firebase.firestore().collection("Teacher").doc(this.class_and_section[i].id);
        this.waiting = true;
        await remcollection.delete();
        var removeddata=this.class_and_section.splice(i,1);
        this.waiting = false;*/

        this.class_and_section.splice(i,1);

        // console.log(i);
        // console.log("TAPPED ON REMOVE");
    }
    isCharacterALetter(char) {
        return (/[a-zA-Z]/).test(char)
      }




    notvalid;
    async confirmchanges(){
        if(this.class_and_section==this.prev_class_and_section){
            alert("Done!");
            return;
        }


        for(var i=0;i<this.class_and_section.length;i++){
            var present_class=parseInt(this.class_and_section[i].Class_Id);
            var present_section=this.class_and_section[i].Class_Section;

            if(!(this.isCharacterALetter(present_section))){
                this.notvalid = true;
                alert("Please check sections");
                return ;
            }

            //Validation Ends Here !
            //Confirmation ends here !
            console.log(present_class+"  %%%%%%%%%%%  "+present_section);

            //this.waiting = true;
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
            alert("Class "+present_class+""+present_section+"Doesn't Exist ! Try adding class in ManageClasses");
            return;
            }

        var exists=false;
        var teacherid_of_class=-1;
        await firebase.firestore().collection("Teacher")
        .where("Class_Id","==",present_class).where("Class_Section","==",present_section)
        .where("Subject_Name","==",this.subjectname).get().then(result=>{
        result.forEach(doc=>{
               exists= true;
               teacherid_of_class=doc.data().Teacher_Id;
        })
        })
        // If already teacher teaching subject in given class is found

        if(exists){
            if(teacherid_of_class!=this.teacherid){
                alert("Teacher for given subject in given class already exists !");
                this.waiting = false;
                return;}
            }
        

    }
    for(var i=0;i<this.prev_class_and_section.length;i++){
            const remcollection = firebase.firestore().collection("Teacher").doc(this.prev_class_and_section[i].id);
            //this.waiting = true;
            await remcollection.delete();
        }
    for(var i=0;i<this.class_and_section.length;i++){
        this.addteacher(parseInt(this.class_and_section[i].Class_Id),this.class_and_section[i].Class_Section);
    }

    alert("Done!");
}
    async addteacher(class_tobeAdded,section_tobeAdded){
        this.teacher_name.trim();
        this.subjectname.trim();

        const teacherCollection = firebase.firestore().collection("Teacher");
        await teacherCollection.add({
            Teacher_Id : parseInt(this.teacherid),
            Teacher_Name : this.teacher_name,
            Class_Id : class_tobeAdded,
            Class_Section : section_tobeAdded,
            Subject_Name : this.subjectname
        })
        
        
    }

    public goHome(){
        this.router.navigate(["/root"], { replaceUrl: true });
    }
}
 