import { Component, Input } from '@angular/core';
import { FilterStatusEnum } from 'src/app/model/device.model';
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
  loginUser: any = localStorage.getItem("user");
  loginUserId: number = JSON.parse(this.loginUser).id;
  constructor(public service: AttendanceService,public userService: UsersService) {}
  ngOnInit() {
    this.GetAllEmployees();
 }
//    GetAllEmployees() {
//      this.userService.GetUsersSelectList().subscribe((data) => {
//          this.Employees = data;
//      });

//  }
  GetAllEmployees() {
     let IsNordstern = JSON.parse(this.loginUser).isNordstern;
     let filterStatus = JSON.parse(this.loginUser).id == 1 ? FilterStatusEnum.superAdmin :
       IsNordstern ? FilterStatusEnum.Nordstern : FilterStatusEnum.Abendstern;
     this.userService.GetUsersSelectList(filterStatus).subscribe((data) => {
       this.Employees = data;
     });
   }
}
