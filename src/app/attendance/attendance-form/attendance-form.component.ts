import { Component, Input } from '@angular/core';
import { Users } from 'src/app/model/users.model';
import { AttendanceService } from 'src/app/service/attendance.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css']
})
export class AttendanceFormComponent {
  @Input() userEdit:boolean=false;
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
