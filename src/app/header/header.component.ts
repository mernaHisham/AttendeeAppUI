import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  items: MenuItem[] = [
    {
      label: 'Devices',
      styleClass: 'active'
    },
    {
      label: 'Users',
      styleClass: ''
    },
    {
      label: 'Attendance',
      styleClass: ''
    },
    {
      label: 'Holydays',
      styleClass: ''
    },
  ];

  ngOnInit() {
  }
}