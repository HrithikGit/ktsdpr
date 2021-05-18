import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";
const firebase = require("nativescript-plugin-firebase/app");
const appSettings = require("tns-core-modules/application-settings")

@Component({
    selector: "blog",
    templateUrl: "./blog.html",
    styleUrls : ["./blog.css"]
})

export class blogComponent { 
    loading;
    nodata;
    blogs; 
    person;
    isRoot;
    public constructor(private router:Router,private route: ActivatedRoute){
        this.loading = true;
        this.nodata = false;
        this.route.params.subscribe((params)=>{
            this.isRoot= (params["person"]=="Root");
        })
    }
    ngOnInit(): void {
        this.blogs=[];
        this.getdata();
    }
    async getdata(){
        await firebase.firestore().collection("Blogs").get().then(result=>{
            result.forEach(doc=>{
                var check = doc.data();
                if(check.Content.length>=100){
                    check.Content = check.Content.substring(0,110)+".....";
                }
                check["id"]=doc.id;
                this.blogs.push(check);
            })
        })
        this.blogs.sort(function(a,b){
            // console.log(a.Date);
            var date1 = a.Date.split('').reverse().join('');
            var date2 = b.Date.split('').reverse().join('');
            date1.replace("-","");
            date2.replace("-","");
            if(parseInt(date1)-parseInt(date2)==0){
                return parseInt(b.Time.replace(":",""))-parseInt(a.Time.replace(":",""));
            }
            return parseInt(date2)-parseInt(date1);
        })
        this.nodata = this.blogs.length==0;
        this.loading  = false;
    }
    add(): void{
        this.router.navigate(["addblog"]);
    }

    async remove(i){
        var stop = false;
        await confirm({
            title: "",
            message: "Are you sure you want to delete this blog?",
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

        const remcollection = firebase.firestore().collection("Blogs").doc(this.blogs[i].id);
        remcollection.delete();
        var removeddata=this.blogs.splice(i,1);
        // console.log(i);
        // console.log("TAPPED ON REMOVE");
    }

    public actioncheck(){
        console.log("Came here");
        appSettings.clear();
        this.router.navigate(["items"]);
    }
    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
    
}
 