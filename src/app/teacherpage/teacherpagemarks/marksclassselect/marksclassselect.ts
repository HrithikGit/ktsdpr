import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
//import { DropDownModule } from "nativescript-drop-down/angular";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "marksclassselect",
    templateUrl: "./marksclassselect.html"
})


export class marksclassselectComponent{
    selectedindex=1;
    Class="";
    Section="";
    Subject="";
    Exam="";

    public constructor(private router:Router,private route:ActivatedRoute){ }

    async getmarks(){
        if(this.Class==""){
            alert("Please enter class name");
            return;
        }
        this.Class=this.Class.trim();
        var isclassdefined=false;
        const classes=firebase.firestore().collection("Class").where("Class_Id","==",parseInt(this.Class));
        await classes.get().then(result=>{
            result.forEach(doc=>{
                console.log(doc.data());
                isclassdefined=true;
            })
        })
        console.log(isclassdefined);
        if(!isclassdefined){
            alert("Please enter a valid class name");
            return;
        }

        const section=classes.where("Class_Section","==",this.Section);
        var issectiondefined=false;
        await section.get().then(result=>{
            result.forEach(doc=>{
                issectiondefined=true;
            })
        })

        if(!issectiondefined){
            alert("Please enter a valid section for class "+this.Class);
            return;
        }

        const subject=firebase.firestore().collection("Marks").where("Subject","==",this.Subject).where("Exam_Type","==",this.Exam);
        var isSubject_Exam=false;
        await subject.get().then(result=>{
            result.forEach(doc=>{
                isSubject_Exam=true;
            })
        })
        if(!isSubject_Exam){
            alert("Subject Marks were not added or Please check Subject and Exam Type");
            return;
        }
        this.router.navigate(["marksview",this.Class,this.Section,this.Subject,this.Exam]);

    }
    
}