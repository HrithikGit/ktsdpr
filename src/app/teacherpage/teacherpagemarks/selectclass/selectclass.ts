import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "selectclass",
    templateUrl: "./selectclass.html"
})
export class selectclassComponent{
    teacherid;
    waiting=true;
    classes=[];
    subject;
    public constructor(private router:Router,private route:ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.teacherid=parseInt(params["teacherid"]);
        })
        console.log(this.teacherid);
        this.getclasses();

    }
    async getclasses(){
        console.log(this.teacherid+"  insideee");
        const classes=firebase.firestore().collection("Teacher").where("Teacher_Id","==",this.teacherid);
        await classes.get().then(result=>{
            result.forEach(doc=>{
                var data=doc.data();
                console.log(doc.data());
                this.subject=data.Subject_Name;
                this.classes.push({"Class_Id":data.Class_Id,"Class_Section":data.Class_Section});
            })
        });
        this.waiting=false;
    }
}