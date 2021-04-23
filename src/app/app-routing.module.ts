import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";


//Components
import { attendanceComponent} from "./rootpage/attendance/attendance";
import { ItemsComponent } from "./item/items.component";
import {rootpageComponent} from "./rootpage/rootpage";
import {teacherpageComponent} from "./teacherpage/teacherpage";
import {studentpageComponent} from "./studentpage/studentpage";
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
import {deletetimetableComponent} from "./rootpage/timetable/deletetimetable/deletetimetable";
import {updatetimetableComponent} from "./rootpage/timetable/updatetimetable/updatetimetable";
import {classpageComponent} from "./rootpage/classpage/classpage";
import {addclassComponent} from "./rootpage/addclass/addclass";
import { deleteclassComponent } from "./rootpage/classpage/deleteclass/deleteclass"
import { addblogComponent} from "./rootpage/blog/addblog/addblog";
import {viewblogComponent} from "./rootpage/blog/viewblog/viewblog";
import {marksComponent} from "./rootpage/marks/marks";

const routes: Routes = [
    // { path: "", redirectTo: "/items", pathMatch: "full" },
    { path: "", redirectTo: "/root", pathMatch: "full" },
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
    {path: "addstudent", component:addstudentComponent},
    {path: "deletestudent", component: deletestudentComponent},
    {path: "attendance/:name/:section", component:attendanceComponent},
    {path: "addtimetable",component:addtimetableComponent},
    {path: "deletetimetable/:name/:name", component:deletetimetableComponent},
    {path:"updatetimetable/:name/:name", component:updatetimetableComponent},
    {path:"timetableclassselect/:name",component:timetableclassselectComponent},
    {path: "displaytimetable/:name/:name", component:displaytimetableComponent},
    {path : "addclass",component:addclassComponent},
    {path : "classpage", component: classpageComponent},
    {path : "deleteclass", component: deleteclassComponent},
    {path : "addblog",component: addblogComponent},
    {path : "viewblog/:date/:time",component : viewblogComponent},
    {path: "marks/:class/:section", component:marksComponent}

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
