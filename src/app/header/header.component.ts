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
      routerLink:'/devices',
      styleClass: ''
    },
    {
      label: 'Users',
      routerLink:'/users',
      styleClass: this.active
    },
    {
      label: 'Attendance',
      routerLink:'/attendance',
      styleClass: ''
    },
    {
      label: 'Vacations',
      routerLink:'/vacation',
      styleClass: ''
    },
  ];

  ngOnInit() {
  }
}