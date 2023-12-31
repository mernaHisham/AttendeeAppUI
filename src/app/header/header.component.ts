import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  urlVal:string = "";
  active:string="active";
  items: MenuItem[]=[
    {
      label: 'Devices',
      routerLink:'/devices',
      //styleClass:this.urlVal=='/devices'?this.active:"",
      //command:()=>{ this.urlVal= '/devices' }
    },
    {
      label: 'Users',
      routerLink:'/users',
      //styleClass:this.urlVal=='/users'?this.active:"",
      //command:()=>{ this.urlVal= '/users'}
    },
    {
      label: 'Attendance',
      routerLink:'/attendance',
      //styleClass:this.urlVal=='/attendance'?this.active:"",
      //command:()=>{ this.urlVal= '/attendance'}
    },
    {
      label: 'Vacations',
      routerLink:'/vacation',
      //styleClass:this.urlVal=='/vacation'?this.active:"",
      //command:()=>{ this.urlVal= '/vacation' }
    },
  ];
  constructor(private router:Router){ }
  ngOnInit() {
  }
  Logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    this.router.navigate(['/login']);
  }
}