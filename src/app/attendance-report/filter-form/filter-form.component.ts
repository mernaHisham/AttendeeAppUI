import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent {
  Employees:any;
  constructor(public service: AttendanceService,public userService: UsersService) {}
  ngOnInit() {
    this.GetAllEmployees();
 }
   GetAllEmployees() {
     this.userService.GetUsersSelectList().subscribe((data) => {
         this.Employees = data;
     });
 }
}