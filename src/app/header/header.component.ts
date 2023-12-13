import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  active:string="active";
  items: MenuItem[] = [
    {
      label: 'Devices',
      routerLink:'/Devices',
      styleClass: ''
    },
    {
      label: 'Users',
      routerLink:'/Users',
      styleClass: this.active
    },
    {
      label: 'Attendance',
      routerLink:'/Attendance',
      styleClass: ''
    },
    {
      label: 'Holydays',
      routerLink:'/Holydays',
      styleClass: ''
    },
  ];

  ngOnInit() {
  }
}