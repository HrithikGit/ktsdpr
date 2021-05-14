import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import "nativescript-plugin-firebase";
import {LoadingIndicator,Mode,OptionsCommon} from '@nstudio/nativescript-loading-indicator';
const indicator = new LoadingIndicator();


const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "exampage",
    templateUrl: "./exampage.html"
})
export class exampageComponent{
    class;
    section;
    teacherid;
    waiting=true;
    examtypes=[];
    subject;
    public constructor(private router:Router,private route:ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.class=parseInt(params["class"]);
            this.section=params["section"];
            this.teacherid=parseInt(params["teacherid"]);
            this.subject=params["subject"];
        })
        this.gettests();
    }

    async gettests(){
        const tests=firebase.firestore().collection("Marks").where("Teacher_Id","==",this.teacherid).where("Student_Class","==",this.class)
        .where("Student_Section","==",this.section);
        var set=new Set();
        await tests.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                if(!set.has(data.Exam_Type)){
                    set.add(data.Exam_Type);
                    this.examtypes.push({"Exam":data.Exam_Type});}
            })
        })
        this.waiting=false;
    }
    remove(i){
        //Ask for are you sure you want to remove unit-I data of this class
        if(this.examtypes[i].id!=-1){
            //remove from database using document id
            
        }
        this.examtypes.splice(i,1);
    }
    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
    
}