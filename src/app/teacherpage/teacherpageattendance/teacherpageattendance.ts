import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";

@Component({
    selector: "teacherpageattendance",
    templateUrl: "./teacherpageattendance.html",
})
export class teacherpageattendanceComponent {
    isClassTeacher;
    public constructor(private router:Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.isClassTeacher=(params["name"]=="true");
        });
        this.getdetails();
    }
    Array=[];

    SuperArrays=[];
    async getdetails(){
        for(var i=0;i<15;i++){
            this.Array.push({"roll":i,"present":"0"});
        }

        var i=0;
        while(i<this.Array.length){
            var SubArray=[];
            var j=0;
            while(j<3 && i<this.Array.length){
                this.Array[i].present="1";
                SubArray.push(this.Array[i]);
                i+=1;
                j+=1;
            }
            this.SuperArrays.push(SubArray);
            
        }
        console.log(this.SuperArrays);

    }

    get(i){
        if(this.Array[i].present=="1"){
            return "green";
        }
        else{
            return "red";
        }
    }
    change(i){
        if(this.Array[i].present=="1"){
            this.Array[i].present="0";
        }
        else{
            this.Array[i].present="1";
        }
    }

    commit():void{
        console.log("CHANGES ARE TO BE MADE NOW");
    }
}