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
import {timetableComponent} from "./rootpage/timetable/timetable";
import {blogComponent} from "./rootpage/blog/blog";
import {deleteteacherComponent} from "./rootpage/updateteacher/deleteteacher/deleteteacher";
import {addteacherComponent} from "./rootpage/updateteacher/addteacher/addteacher";
import {successComponent} from "./rootpage/success/success";
import {failComponent} from "./rootpage/fail/fail";
import {deletestudentComponent} from "./rootpage/updatestudent/deletestudent/deletestudent";
import {addstudentComponent} from "./rootpage/updatestudent/addstudent/addstudent";
import {displaytimetableComponent} from "./rootpage/timetable/displaytimetable/displaytimetable";
import {timetableclassselectComponent} from "./rootpage/timetable/timetableclassselect/timetableclassselect";
import {updatetimetableComponent} from "./rootpage/timetable/updatetimetable/updatetimetable";
import {addclassComponent} from "./rootpage/classpage/addclass/addclass";
import { deleteclassComponent } from "./rootpage/classpage/deleteclass/deleteclass"
import { addblogComponent} from "./rootpage/blog/addblog/addblog";
import {viewblogComponent} from "./rootpage/blog/viewblog/viewblog";
import {marksComponent} from "./rootpage/marks/marks";
import {viewstudentComponent} from "./rootpage/updatestudent/viewstudent/viewstudent";
import {viewteacherComponent} from "./rootpage/updateteacher/viewteacher/viewteacher";


//teacherpage
import {teacherpageattendanceComponent} from "./teacherpage/teacherpageattendance/teacherpageattendance";
import {teacherpagemarksComponent} from "./teacherpage/teacherpagemarks/teacherpagemarks";
import {teacherpagetimetableComponent} from "./teacherpage/teacherpagetimetable/teacherpagetimetable";
import {teacherpageupdatestudentComponent} from "./teacherpage/teacherpageupdatestudent/teacherpageupdatestudent";
import {timetableofteacherComponent} from "./teacherpage/teacherpagetimetable/timetableofteacher/timetableofteacher";
import {selectclassComponent} from "./teacherpage/teacherpagemarks/selectclass/selectclass";
import {marksclassselectComponent} from "./teacherpage/teacherpagemarks/marksclassselect/marksclassselect";
import {marksviewComponent} from "./teacherpage/teacherpagemarks/marksclassselect/marksview/marksview";
import {exampageComponent} from "./teacherpage/teacherpagemarks/selectclass/exampage/exampage";
import {marksupdatepageComponent} from "./teacherpage/teacherpagemarks/selectclass/exampage/marksupdatepage/marksupdatepage";


//studentpage
import {studentmarksComponent} from "./studentpage/studentmarks/studentmarks";
import {studentpageattendanceComponent} from "./studentpage/studentpageattendance/studentpageattendance"

const routes: Routes = [
    { path: "", redirectTo: "/items", pathMatch: "full" },
    // { path: "", redirectTo: "/root", pathMatch: "full" },
    // { path : "",redirectTo: "/student", pathMatch: "full"}
    // {path:"",redirectTo: "/teacher", pathMatch:"full"},
    { path: "items", component: ItemsComponent },
    { path: "root", component: rootpageComponent},
    { path: "teacher", component:teacherpageComponent},
    { path: "student", component: studentpageComponent},
    {path: "blog/:person", component: blogComponent},
    {path: "timetable", component: timetableComponent},
    {path: "addteacher", component:addteacherComponent},
    {path: "deleteteacher", component: deleteteacherComponent},
    {path: "success/:name", component:successComponent},
    {path: "fail/:name", component:failComponent},
    {path: "addstudent/:name/:section", component:addstudentComponent},
    {path: "deletestudent/:name/:section", component: deletestudentComponent},
    {path: "attendance/:name/:section", component:attendanceComponent},
    {path:"updatetimetable/:name/:section", component:updatetimetableComponent},
    {path:"timetableclassselect/:name",component:timetableclassselectComponent},
    {path: "displaytimetable/:name/:section", component:displaytimetableComponent},
    {path : "addclass/:name/:section",component:addclassComponent},
    {path : "deleteclass", component: deleteclassComponent},
    {path : "addblog",component: addblogComponent},
    {path : "viewblog/:date/:time/:isRoot",component : viewblogComponent},
    {path: "marks", component:marksComponent},
    {path: "teacherpageupdatestudent/:class/:section",component:teacherpageupdatestudentComponent},
    {path:"teacherpagetimetable/:class/:section",component:teacherpagetimetableComponent},
    {path:"teacherpagemarks/:class/:section/:teacherid",component:teacherpagemarksComponent},
    {path:"teacherpageattendance/:class/:section",component:teacherpageattendanceComponent},
    {path:"timetableofteacher/:teacherid",component:timetableofteacherComponent},
    {path:"selectclass/:teacherid",component:selectclassComponent},
    {path :"viewteacher/:teacherid", component: viewteacherComponent},
    {path : "viewstudent/:studentid/:class/:section", component: viewstudentComponent},
    {path: "marksclassselect",component:marksclassselectComponent},
    {path:"marksview/:class/:section/:subject/:examtype",component:marksviewComponent},
    {path:"exampage/:class/:section/:teacherid/:subject",component:exampageComponent},
    {path: "marksupdatepage/:class/:section/:teacherid/:examtype",component:marksupdatepageComponent},
    {path: "studentmarks/:class/:section/:roll", component:studentmarksComponent},
    {path : "studentattendance/:unq_id",component : studentpageattendanceComponent}

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
