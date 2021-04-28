import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";


//Components
import {rootpageComponent} from "./rootpage/rootpage";
import {teacherpageComponent} from "./teacherpage/teacherpage";
import {studentpageComponent} from "./studentpage/studentpage";


//root page
import { attendanceComponent} from "./rootpage/attendance/attendance";
import { ItemsComponent } from "./item/items.component";
import {updateteacherComponent} from "./rootpage/updateteacher/updateteacher";
import {updatestudentComponent} from "./rootpage/updatestudent/updatestudent";
import {timetableComponent} from "./rootpage/timetable/timetable";
import {blogComponent} from "./rootpage/blog/blog";
import {deleteteacherComponent} from "./rootpage/updateteacher/deleteteacher/deleteteacher";
import {addteacherComponent} from "./rootpage/updateteacher/addteacher/addteacher";
import {successComponent} from "./rootpage/success/success";
import {failComponent} from "./rootpage/fail/fail";
import {deletestudentComponent} from "./rootpage/updatestudent/deletestudent/deletestudent";
import {addstudentComponent} from "./rootpage/updatestudent/addstudent/addstudent";
import {addtimetableComponent} from "./rootpage/timetable/addtimetable/addtimetable";
import {displaytimetableComponent} from "./rootpage/timetable/displaytimetable/displaytimetable";
import {timetableclassselectComponent} from "./rootpage/timetable/timetableclassselect/timetableclassselect";
import {updatetimetableComponent} from "./rootpage/timetable/updatetimetable/updatetimetable";
import {classpageComponent} from "./rootpage/classpage/classpage";
import {addclassComponent} from "./rootpage/addclass/addclass";
import { deleteclassComponent } from "./rootpage/classpage/deleteclass/deleteclass"
import { addblogComponent} from "./rootpage/blog/addblog/addblog";
import {viewblogComponent} from "./rootpage/blog/viewblog/viewblog";
import {marksComponent} from "./rootpage/marks/marks";



//teacherpage
import {teacherpageattendanceComponent} from "./teacherpage/teacherpageattendance/teacherpageattendance";
import {teacherpagemarksComponent} from "./teacherpage/teacherpagemarks/teacherpagemarks";
import {teacherpagetimetableComponent} from "./teacherpage/teacherpagetimetable/teacherpagetimetable";
import {teacherpageupdatestudentComponent} from "./teacherpage/teacherpageupdatestudent/teacherpageupdatestudent";
import {timetableofteacherComponent} from "./teacherpage/teacherpagetimetable/timetableofteacher/timetableofteacher";
import {selectclassComponent} from "./teacherpage/teacherpagemarks/selectclass/selectclass";
import {addmarksComponent} from "./teacherpage/teacherpagemarks/addmarks/addmarks";

const routes: Routes = [
    // { path: "", redirectTo: "/items", pathMatch: "full" },
    { path: "", redirectTo: "/root", pathMatch: "full" },
    // {path:"",redirectTo: "/teacher", pathMatch:"full"},
    { path: "items", component: ItemsComponent },
    { path: "root", component: rootpageComponent},
    { path: "teacher", component:teacherpageComponent},
    { path: "student", component: studentpageComponent},
    {path: "updateteacher", component: updateteacherComponent},
    {path: "updatestudent", component: updatestudentComponent},
    {path: "blog", component: blogComponent},
    {path: "timetable", component: timetableComponent},
    {path: "addteacher", component:addteacherComponent},
    {path: "deleteteacher", component: deleteteacherComponent},
    {path: "success/:name", component:successComponent},
    {path: "fail/:name", component:failComponent},
    {path: "addstudent/:name/:section", component:addstudentComponent},
    {path: "deletestudent/:name/:section", component: deletestudentComponent},
    {path: "attendance/:name/:section", component:attendanceComponent},
    {path: "addtimetable",component:addtimetableComponent},
    {path:"updatetimetable/:name/:section", component:updatetimetableComponent},
    {path:"timetableclassselect/:name",component:timetableclassselectComponent},
    {path: "displaytimetable/:name/:section", component:displaytimetableComponent},
    {path : "addclass",component:addclassComponent},
    {path : "classpage", component: classpageComponent},
    {path : "deleteclass", component: deleteclassComponent},
    {path : "addblog",component: addblogComponent},
    {path : "viewblog/:date/:time",component : viewblogComponent},
    {path: "marks/:class/:section", component:marksComponent},
    {path: "teacherpageupdatestudent/:class/:section",component:teacherpageupdatestudentComponent},
    {path:"teacherpagetimetable/:class/:section",component:teacherpagetimetableComponent},
    {path:"teacherpagemarks/:class/:section",component:teacherpagemarksComponent},
    {path:"teacherpageattendance/:class/:section",component:teacherpageattendanceComponent},
    {path:"timetableofteacher/:teacherid",component:timetableofteacherComponent},
    {path:"selectclass/:teacherid/:message",component:selectclassComponent},
    {path: "addmarks/:class/:section/:subject", component:addmarksComponent}

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
