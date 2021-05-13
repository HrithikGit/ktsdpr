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
    waiting=true;
    openmonday=false;
    opentuesday=false;
    openwednesday=false;
    openthursday=false;
    openfriday=false;
    opensaturday=false;
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
                && first["Subject"]==second["Subject"]){
                    var f = first;
                    f["Start"]= second["Start"]
                    f["End"] = second["End"]
                    ans.push(f);
                }
            }
        }
        if(ans.length==0){ans.push({"Start":"No scheduled classes this day"});}
        if(str=="Monday"){
            this.monday=[...ans];
            
        }
        else if(str=="Tuesday"){
            this.tuesday=[...ans];
        }
        else if(str=="Wednesday"){
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

        var days= ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        for(var i=0;i<days.length;i++){
            await this.join(days[i]);
        }

        if(TodayDay=="Mon"){this.openmonday=true;}
        else if(TodayDay=="Tue"){this.opentuesday=true;}
        else if(TodayDay=="Wed"){this.openwednesday=true;}
        else if(TodayDay=="Thu"){this.openthursday=true;}
        else if(TodayDay=="Fri"){this.openfriday=true;}
        else if(TodayDay=="Sat"){this.opensaturday=true;}
        else if(TodayDay=="Sun"){this.openmonday=true;}
        this.loading = false;
    }

    openMonday(){
        if(this.openmonday==true){this.openmonday=false;}
        else{this.openmonday=true;}
    }
    openTuesday(){
        if(this.opentuesday==true){this.opentuesday=false;}
        else{this.opentuesday=true;}
    }
    openWednesday(){
        if(this.openwednesday==true){this.openwednesday=false;}
        else{this.openwednesday=true;}
    }
    openThursday(){
        if(this.openthursday==true){this.openthursday=false;}
        else{this.openthursday=true;}
    }
    openFriday(){
        if(this.openfriday==true){this.openfriday=false;}
        else{this.openfriday=true;}
    }
    openSaturday(){
        if(this.opensaturday==true){this.opensaturday=false;}
        else{this.opensaturday=true;}
    }

    public goHome(){
        const appSettings = require("tns-core-modules/application-settings")
        this.router.navigate(["/"+appSettings.getString("TypeOfUser")], { replaceUrl: true });
    }
}
