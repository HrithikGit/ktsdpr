import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";;
import { AppRoutingModule } from "./app-routing.module";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { NativeScriptCommonModule } from "@nativescript/angular";
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

//Components
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { FormsModule } from '@angular/forms';
import {teacherpageComponent} from "./teacherpage/teacherpage";
import {updateteacherComponent} from "./rootpage/updateteacher/updateteacher";
import {updatestudentComponent} from "./rootpage/updatestudent/updatestudent";
import {timetableComponent} from "./rootpage/timetable/timetable";
import {blogComponent} from "./rootpage/blog/blog";
import {deleteteacherComponent} from "./rootpage/updateteacher/deleteteacher/deleteteacher";
import {addteacherComponent} from "./rootpage/updateteacher/addteacher/addteacher";
import {deletestudentComponent} from "./rootpage/updatestudent/deletestudent/deletestudent";
import {addstudentComponent} from "./rootpage/updatestudent/addstudent/addstudent";
import {successComponent} from "./rootpage/success/success";
import { attendanceComponent} from "./rootpage/attendance/attendance";
import {addtimetableComponent} from "./rootpage/timetable/addtimetable/addtimetable";
import {displaytimetableComponent} from "./rootpage/timetable/displaytimetable/displaytimetable";
import {timetableclassselectComponent} from "./rootpage/timetable/timetableclassselect/timetableclassselect";
import {updatetimetableComponent} from "./rootpage/timetable/updatetimetable/updatetimetable";
import { addclassComponent} from "./rootpage/addclass/addclass";
import { deleteclassComponent} from "./rootpage/classpage/deleteclass/deleteclass";
import { addblogComponent} from "./rootpage/blog/addblog/addblog";
import { viewblogComponent} from "./rootpage/blog/viewblog/viewblog";
import {marksComponent} from "./rootpage/marks/marks";



//teacherpage
import {teacherpageattendanceComponent} from "./teacherpage/teacherpageattendance/teacherpageattendance";
import {teacherpagemarksComponent} from "./teacherpage/teacherpagemarks/teacherpagemarks";
import {teacherpagetimetableComponent} from "./teacherpage/teacherpagetimetable/teacherpagetimetable";
import {teacherpageupdatestudentComponent} from "./teacherpage/teacherpageupdatestudent/teacherpageupdatestudent";
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        FormsModule,
        NativeScriptCommonModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        teacherpageComponent,
        addteacherComponent,
        addstudentComponent,
        deletestudentComponent,
        timetableComponent,
        updateteacherComponent,
        updatestudentComponent,
        blogComponent,
        deleteteacherComponent,
        successComponent,
        attendanceComponent,
        addtimetableComponent,
        updatetimetableComponent,
        timetableclassselectComponent,
        addclassComponent,
        deleteclassComponent,
        displaytimetableComponent,
        addblogComponent,
        viewblogComponent,
        marksComponent,
        teacherpageattendanceComponent,
        teacherpagemarksComponent,
        teacherpagetimetableComponent,
        teacherpageupdatestudentComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
