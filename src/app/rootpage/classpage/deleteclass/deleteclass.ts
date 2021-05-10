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
    classes=[];
    waiting=true;
    public constructor(private router: Router) {
        this.class_id="";
        this.section="";
        this.getdata();
    }

    public goHome(){
        this.router.navigate(["/root"], { replaceUrl: true });
    }

    async getdata(){
        const all_classes=firebase.firestore().collection("Class");
        await all_classes.get().then(
            result=>{
                result.forEach(doc=>{
                    var data=doc.data();
                    this.classes.push(data);
                })
        })
        this.waiting=false;
        console.log(this.classes);

    }


    add(){
        this.router.navigate(["addclass","Add","Add"]);
    }
    async remove(i){
        var class_id_tobeDeleted=this.classes[i].Class_Id;
        var class_section_toBeDeleted=this.classes[i].Class_Section;

        this.classes.splice(i,1);

        await this.delete(class_id_tobeDeleted,class_section_toBeDeleted);


    }

    async delete(Class_Id,Class_Section){
        var val ="";
        const record = firebase.firestore().collection("Class").where("Class_Id","==",parseInt(Class_Id)).where("Class_Section","==",Class_Section);
        await record.get().then(
            result=>{
                result.forEach(doc=>{
                    console.log(doc.data());
                    val = doc.id;
                })
            }
        )
        const reqdoc = firebase.firestore().collection("Class").doc(val);
        reqdoc.delete().then(()=>{
            alert("Delete Sucessful");
        })
    }


}
