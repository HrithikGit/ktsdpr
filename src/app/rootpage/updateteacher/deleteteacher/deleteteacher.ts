import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "deleteteacher",
    templateUrl: "./deleteteacher.html",
})
export class deleteteacherComponent {
    teacherclass ;
    teachersub;
    teachername;
    teacherid;
    section;
    public constructor(private router: Router) {
        this.teacherid="";
        this.teacherclass="";
        this.teachersub="";
        this.teachername="";
        this.section="";
    }
    async fun(){
        console.log("Came Here ! "+this.teacherid+" "+this.teacherclass);
        const teacherCollection = firebase.firestore().collection("Teacher")
        .where("Teacher_Id","==",parseInt(this.teacherid.trim())).where("Class_Id","==",parseInt(this.teacherclass)*100)
        .where("Class_Section","==",this.section);
        var val ="";
        await teacherCollection.get().then(result=>{
            result.forEach(doc=>{
                // console.log(doc.data().Student_Name);
                if(doc.data().Teacher_Name!=this.teachername){
                    alert("Entered Data Doesn't Match! Please re-check");
                    return;
                }
                console.log(doc.data());
                val = doc.id;
            })
        })
        if(val.length==0){
            alert("There is no such data available! recheck ");
            return;
        }
        console.log(val);
        firebase.firestore().collection("Teacher").doc(val).delete();
        alert("Delete Successful !");
    }
}
