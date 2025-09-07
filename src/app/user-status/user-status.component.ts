import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Users } from '../model/users.model';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';
import { AttendanceService } from '../service/attendance.service';
import { Attendance } from '../model/attendance.model';
import { FilterStatusEnum } from '../model/device.model';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent {
  isLoading: boolean = false;
  loginUser: any = localStorage.getItem("user");
  userRole: number = 0;
  //attnd: Attendance= new Attendance();
  constructor(public service: UsersService, public attndService: AttendanceService, public messageService: MessageService,
    public confirmationService: ConfirmationService, public router: Router) { }

  ngOnInit() {
    this.GetAllUsers();
  }
  GetAllUsers() {
    let IsNordstern = JSON.parse(this.loginUser).isNordstern;
    let filterStatus = JSON.parse(this.loginUser).id == 1 ? FilterStatusEnum.superAdmin :
      IsNordstern ? FilterStatusEnum.Nordstern : FilterStatusEnum.Abendstern;
    this.service.GetUsersStatus(filterStatus).subscribe((data) => {
      this.service.userStatus = data;
    });
  }

  hideDialog() {
    this.attndService.attenDialog = false;
    this.attndService.submitted = false;
  }
  editAttendance(attnd: Attendance, userId: number, userName: string) {
    this.attndService.attendance = { ...attnd };
    this.attndService.attendance.userId = userId;
    this.attndService.attendance.userName = userName;
    this.attndService.attendance.attendanceDate = attnd.attendanceDate == null ? new Date() : attnd.attendanceDate.substring(0, 10);
    this.attndService.attendance.startDay = attnd.startDay == null ? new Date() : new Date(attnd.startDay).toTimeString().substring(0, 8);
    this.attndService.attendance.startBreak = attnd.startBreak == null ? null : new Date(attnd.startBreak).toTimeString().substring(0, 8);
    this.attndService.attendance.endBreak = attnd.endBreak == null ? null : new Date(attnd.endBreak).toTimeString().substring(0, 8);
    this.attndService.attendance.endDay = attnd.endDay == null ? null : new Date(attnd.endDay).toTimeString().substring(0, 8);
    this.attndService.attenDialog = true;
  }
  GetAttendance = (userId: number, userName: string) => {
    this.attndService.GetAttendance(userId).subscribe((res: any) => {
      this.editAttendance(res ?? new Attendance(), userId, userName);
    })
  }
  saveAttendance() {
    this.attndService.submitted = true;
    if (this.attndService.attendance.id > 0) {
      this.attndService.attendance.updatedBy = JSON.parse(this.loginUser).id;
      this.attndService.attendance.updatedDate = new Date();
    } else {
      this.attndService.attendance.createdBy = JSON.parse(this.loginUser).id;
      this.attndService.attendance.createdData = new Date();
    }

    this.attndService.PostAttendance(this.attndService.attendance).subscribe(res => {
      this.GetAllUsers();
      this.attndService.attenDialog = false;
      this.attndService.attendance = new Attendance();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attendance Updated', life: 3000 });

    });



  }
}