import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app")

@Component({
    selector: "ns-items",
    templateUrl: "./deleteclass.html",
    styleUrls: ["./deleteclass.css"]
})
export class deleteclassComponent {
    class_id;
    section;
    public constructor(private router: Router) {
        this.class_id="";
        this.section="";
    }
    async delete(){
        var val ="";
        const record = firebase.firestore().collection("Class").where("Class_Id","==",parseInt(this.class_id)).where("Class_Section","==",this.section);
        await record.get().then(
            result=>{
                result.forEach(doc=>{
                    console.log(doc.data());
                    val = doc.id;
                })
            }
        )
        if(val.length==0){
            alert("There is no such class available! Check the details and try again");
            return;
        }
        const reqdoc = firebase.firestore().collection("Class").doc(val);
        reqdoc.delete().then(()=>{
            alert("Delete Sucessful");
        })
    }

}
