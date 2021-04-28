import {Component} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "selectclass",
    templateUrl: "./selectclass.html"
})



export class selectclassComponent{
    teacherid;
    message;
    notready;
    classes=[];
    navigateto;
    public constructor(private router:Router,private route:ActivatedRoute){
        this.route.params.subscribe((params)=>{
            this.teacherid=params["teacherid"];
            this.message=params["message"];
        })
        this.notready=true;
        if(this.message=="add"){
            this.add();
        }
        else if(this.message="view"){
            this.view();
        }
    }
    async add(){
        // ikkada teacherid tho cheppe classes anni ravali
        this.navigateto="addmarks";

        //for time being dinini kuda view() ki pampthunna
        this.view();
    }
    async view(){
        this.navigateto="marks";
        const avail_classes = firebase.firestore().collection("Class");
        await avail_classes.get().then(result=>{
            result.forEach(doc=>{
                this.classes.push(doc.data());
            })
        })
        this.classes.reverse();
        this.notready = false;
    }
}