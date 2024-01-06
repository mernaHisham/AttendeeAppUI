import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  urlVal:string = "";
  active:string="active";
  loginUser: any = localStorage.getItem("user");
  loginUserRole: number = 0;
  items: MenuItem[]=[];
  constructor(private router:Router){ }
  ngOnInit() {
   this.loginUserRole= JSON.parse(this.loginUser).fkRoleId;
    this.items=[
      {
        label: 'Devices',
        routerLink:'/devices',
        styleClass:this.loginUserRole==2?"hidden":"" 
      },
      {
        label: 'Users',
        routerLink:'/users',
        styleClass:this.loginUserRole==2?"hidden":""
      },
      {
        label: 'Attendance',
        routerLink:'/attendance'
      },
      {
        label: 'Vacations',
        routerLink:'/vacation'
      }
    ];
  }
  Logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    this.router.navigate(['/login']);
  }
}