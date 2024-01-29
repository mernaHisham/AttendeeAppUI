import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DevicesComponent } from './devices/devices.component';
import { UsersComponent } from './users/users.component';
import { SetDeviceComponent } from './set-device/set-device.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { VacationComponent } from './vacation/vacation.component';
import { HomeComponent } from './home/home.component';
import { CheckDeviceComponent } from './check-device/check-device.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { AttendanceRequestComponent } from './attendance-request/attendance-request.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'setdevice',component:SetDeviceComponent},
  {path:'checkdevice',component:CheckDeviceComponent},
  {path:'login',component:LoginComponent},
  {path:'users',component:UsersComponent},
  {path:'devices',component:DevicesComponent},
  {path:'attendance',component:AttendanceComponent},
  {path:'requests',component:AttendanceRequestComponent},
  {path:'report',component:AttendanceReportComponent},
  {path:'accessdenied',component:AccessDeniedComponent},
  {path:'userstatus',component:UserStatusComponent},
  {path:'vacation',component:VacationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
