import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Attendance } from '../model/attendance.model';
import { AttendanceService } from '../service/attendance.service';
import { LoginResponse } from '../model/login-response.model';
import { Roles } from '../model/users.model';
import { DatePipe } from '@angular/common';
import { AttendanceRequestService } from '../service/attendance-request.service';
import { AttendanceRequest } from '../model/attendance-request.model';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers:[DatePipe]
})
export class AttendanceComponent implements OnInit {
  isLoading:boolean=false;
  loginUser: any = localStorage.getItem("user");
  userRole:number=0;
  userId:number=0;
  from:any;
  to:any;
  constructor(public service: AttendanceService, public attReqService:AttendanceRequestService,
    public messageService: MessageService ,public userService: UsersService,
    private datePipe:DatePipe,
    public confirmationService: ConfirmationService) { }
    Employees:any;
  ngOnInit() {
    this.userRole=JSON.parse(this.loginUser).fkRoleId;
      this.GetAllAttendance();
      if(this.userRole==1)
      this.GetAllEmployees();
  }
  GetAllEmployees() {
    this.userService.GetUsersSelectList().subscribe((data) => {
        this.Employees = data;
    });
}
  GetAllAttendance() {
    this.isLoading=true;
    let userId=this.userRole==Roles.Admin?this.userId:JSON.parse(this.loginUser).id;
   // let userId=JSON.parse(this.loginUser).id;
      this.service.GetAll(userId,this.from,this.to).subscribe((data) => {
          this.service.attends = data as Attendance[];
          this.isLoading=false;
      });
  }
  RecalculateAttendance() {
    this.isLoading=true;
      this.service.RecalculateAttendance(this.userId,this.from,this.to).subscribe((res) => {
        console.log(res);
        
          this.isLoading=false;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attendance Deleted', life: 3000 });
          this.GetAllAttendance();
      });
  }
  openNew() {
      this.service.attendance = new Attendance();
      this.service.submitted = false;
      this.service.attenDialog = true;
  }

  timeConvert(minutes:number) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;

    // Formatting to ensure leading zeros if necessary
    var hoursStr = hours < 10 ? '0' + hours : hours;
    var minutesStr = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;

    return hoursStr + ':' + minutesStr;
}
  editAttendance(attnd: Attendance) {
    if(this.userRole==1){
      this.service.attendance = { ...attnd };
      this.service.attendance.attendanceDate =attnd.attendanceDate.substring(0,10);
      this.service.attendance.startDay =attnd.startDay==null?null:new Date(attnd.startDay).toTimeString().substring(0,8);
      this.service.attendance.startBreak =attnd.startBreak==null?null:new Date(attnd.startBreak).toTimeString().substring(0,8);
      this.service.attendance.endBreak =attnd.endBreak==null?null:new Date(attnd.endBreak).toTimeString().substring(0,8);
      this.service.attendance.endDay =attnd.endDay==null?null:new Date(attnd.endDay).toTimeString().substring(0,8);
    }
    else{
      this.attReqService.attendance = new AttendanceRequest();
      this.attReqService.attendance.attendanceId = attnd.id;
      this.attReqService.attendance.userName = attnd.userName;
      this.attReqService.attendance.attendanceDate =attnd.attendanceDate.substring(0,10);
      this.attReqService.attendance.startDay =attnd.startDay==null?null:new Date(attnd.startDay).toTimeString().substring(0,8);
      this.attReqService.attendance.startBreak =attnd.startBreak==null?null:new Date(attnd.startBreak).toTimeString().substring(0,8);
      this.attReqService.attendance.endBreak =attnd.endBreak==null?null:new Date(attnd.endBreak).toTimeString().substring(0,8);
      this.attReqService.attendance.endDay =attnd.endDay==null?null:new Date(attnd.endDay).toTimeString().substring(0,8);
    }
      
      this.service.attenDialog = true;
  }

  deleteAttendance(attnd: Attendance) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + attnd.userName + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.service.DeleteAttendance(attnd.id).subscribe((res) => {
                  this.GetAllAttendance();
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attendance Deleted', life: 3000 });
              });

          }
      });
  }
 

  hideDialog() {
      this.service.attenDialog = false;
      this.service.submitted = false;
  }

  saveAttendance() {
      this.service.submitted = true;
      if(this.userRole==1){
        if(this.service.attendance.id>0){
            this.service.attendance.updatedBy =JSON.parse(this.loginUser).id;
            this.service.attendance.updatedDate=new Date();
        }else{
          this.service.attendance.userId=JSON.parse(this.loginUser).id;
          this.service.attendance.userName=JSON.parse(this.loginUser).name;
          this.service.attendance.createdBy =JSON.parse(this.loginUser).id;
          this.service.attendance.createdData=new Date();
        }
        this.service.PostAttendance(this.service.attendance).subscribe(res => {
          this.GetAllAttendance();
          this.service.attenDialog = false;
          this.service.attendance = new Attendance();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attendance Updated', life: 3000 });
      });
      
      }else{
          this.attReqService.attendance.createdBy =JSON.parse(this.loginUser)?.id;
          this.attReqService.attendance.createdData=new Date();
          this.attReqService.PostAttendance(this.attReqService.attendance).subscribe(res => {
            this.GetAllAttendance();
            this.service.attenDialog = false;
            this.service.attendance = new Attendance();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attendance Updated', life: 3000 });
    
        });
      }
  }
}