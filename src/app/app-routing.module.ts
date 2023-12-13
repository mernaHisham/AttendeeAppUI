import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DevicesComponent } from './devices/devices.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'Users',component:UsersComponent},
  {path:'Devices',component:DevicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
