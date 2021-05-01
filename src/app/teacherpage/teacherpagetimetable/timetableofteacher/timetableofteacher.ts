import {Component} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'

const firebase = require("nativescript-plugin-firebase/app")

@Component({
    selector: "timetableofteacher",
    templateUrl: "./timetableofteacher.html",
})
export class timetableofteacherComponent {
    monday=[]; tuesday=[]; wednesday=[]; thursday=[]; friday=[]; saturday=[]; sunday=[];
    rows=[];
    moncol;
    tuecol;
    wedcol;
    thucol;
    fricol;
    satcol;
    class_id;
    section;
    tt;
    loading ;
    index;
    teacherid;
    public constructor(private router:Router, private route:ActivatedRoute){
        this.index=0;
        this.tt =[];
        this.route.params.subscribe((params)=>{
            this.teacherid=params["teacherid"];
        });
        this.loading = true;
        this.getData();
    }


    async join(str){
        var getdata = firebase.firestore().collection("Teacher").where("Teacher_Id","==",4);
        var daycollection = firebase.firestore().collection(str);

        var dup=[];
        var avail=[];

        await getdata.get().then(result=>{
            result.forEach(doc=>{
                var check = doc.data();
                check["id"] = doc.id;
                dup.push(check);

            })
        })
        await daycollection.get().then(result=>{
            result.forEach(doc=>{
                var check = doc.data();
                check["id"] = doc.id;
                avail.push(check);
            })
        })

        var ans=[]

        for(var i=0;i<dup.length;i++){
            var first = dup[i];
            for(var j=0;j<avail.length;j++){
                var second = avail[j];
                if(first["Class_Id"]==second["Class_Id"] && first["Class_Section"]==second["Class_Section"]
                && first["Subject_Name"]==second["Subject_Name"]){
                    var f = first;
                    f["Start_Time"]= second["Start_Hour"]+":"+second["Start_Minute"];
                    f["End_Time"] = second["End_Hour"]+":"+second["End_Minute"];
                    ans.push(f);
                }
            }
        }
        if(str=="Monday"){
            this.monday=[...ans];
        }
        else if(str=="Tuesday"){
            this.tuesday=[...ans];
        }
        else if(str=="Wedensday"){
            this.wednesday =[...ans];
        }
        else if(str=="Thursday"){
            this.thursday=[...ans];
        }
        else if(str=="Friday"){
            this.friday =[...ans];
        }
        else{
            this.saturday =[...ans];
        }
    }



    async getData(){
        console.log("Here !");

        var Wday: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var day = new Date();
        var TodayDay = Wday[day.getDay()];

        var days= ["Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
        for(var i=0;i<days.length;i++){
            await this.join(days[i]);
        }

        if(TodayDay=="Mon"){this.mon();}
        else if(TodayDay=="Tue"){this.tue();}
        else if(TodayDay=="Wed"){this.wed();}
        else if(TodayDay=="Thu"){this.thu();}
        else if(TodayDay=="Fri"){this.fri();}
        else if(TodayDay=="Sat"){this.sat();}
        else if(TodayDay=="Sun"){this.sun();}
        this.loading = false;
    }
    color(): void{
        this.moncol='white';
        this.tuecol='white';
        this.wedcol='white';
        this.thucol='white';
        this.fricol='white';
        this.satcol='white';
    }
    sun(): void{this.mon();}
    mon(): void{
        this.rows=[...this.monday]; this.color(); this.moncol='green';
    console.log(this.rows);}
    tue(): void{this.rows=this.tuesday; this.color(); this.tuecol='green';}
    wed():void{this.rows=this.wednesday; this.color(); this.wedcol='green';}
    thu(): void{this.rows=this.thursday; this.color(); this.thucol='green';}
    fri(): void{this.rows=this.friday; this.color(); this.fricol='green';}
    sat(): void{this.rows=this.saturday; this.color(); this.satcol='green';}
}
