import {Component, OnInit} from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures";


@Component({
    selector: "teacherpageattendance",
    templateUrl: "./teacherpageattendance.html",
})
export class teacherpageattendanceComponent {
<<<<<<< HEAD
    ClassTeacherClass;
    ClassTeacherSection;
=======
    isClassTeacher;
    loading = true;
>>>>>>> 0eba2c27ed7e61c361cc64aa485f0f37923782a0
    public constructor(private router:Router,private route:ActivatedRoute) {
        this.route.params.subscribe((params)=>{
            this.ClassTeacherClass=params["class"];
            this.ClassTeacherSection=params["section"];
        });
        this.getdetails();
        this.loading = false;
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

    start; end;


    longpress(i) {
        console.log("LONG PRESSED")
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
