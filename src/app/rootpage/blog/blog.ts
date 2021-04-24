import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

const firebase = require("nativescript-plugin-firebase/app");

@Component({
    selector: "blog",
    templateUrl: "./blog.html",
    styleUrls : ["./blog.css"]
})

export class blogComponent {
    loading;
    nodata;
    blogs;
    public constructor(private router:Router){
        this.loading = true;
        this.nodata = false;
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
            console.log(a.Date);
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
        console.log(this.blogs);
        this.loading  = false;
    }
    add(): void{
        this.router.navigate(["addblog"]);
    }

    remove(i){
        const remcollection = firebase.firestore().collection("Blogs").doc(this.blogs[i].id);
        remcollection.delete();
        var removeddata=this.blogs.splice(i,1);
        // console.log(i);
        // console.log("TAPPED ON REMOVE");
    }
}
