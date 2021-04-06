import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

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
    {path: "deletestudent", component: deletestudentComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
