import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AttendanceRequest } from '../model/attendance-request.model';
import { AttendanceRequestService } from '../service/attendance-request.service';
import { LoginResponse } from '../model/login-response.model';
import { Roles } from '../model/users.model';

@Component({
  selector: 'app-attendance-request',
  templateUrl: './attendance-request.component.html',
  styleUrls: ['./attendance-request.component.css']
})
export class AttendanceRequestComponent {
  isLoading:boolean=false;
  loginUser: any = localStorage.getItem("user");
  userRole:number=0;
  constructor(public service: AttendanceRequestService, 
    public messageService: MessageService, 
    public confirmationService: ConfirmationService) { }

    ngOnInit() {
      this.userRole=JSON.parse(this.loginUser).fkRoleId;
        this.GetAllAttendance();
    }
    GetAllAttendance() {
      this.isLoading=true;
        this.service.GetAll().subscribe((data) => {
            this.service.attends = data as AttendanceRequest[];
            this.isLoading=false;
        });
    }
    openNew() {
        this.service.attendance = new AttendanceRequest();
        this.service.submitted = false;
        this.service.attenDialog = true;
    }
  
  
  
    editAttendance(attnd: AttendanceRequest) {
        this.service.attendance = { ...attnd };
        this.service.attendance.attendanceDate =attnd.attendanceDate.substring(0,10);
        this.service.attendance.startDay =new Date(attnd.startDay).toTimeString().substring(0,8);
        this.service.attendance.startBreak =new Date(attnd.startBreak).toTimeString().substring(0,8);
        this.service.attendance.endBreak =new Date(attnd.endBreak).toTimeString().substring(0,8);
        this.service.attendance.endDay =new Date(attnd.endDay).toTimeString().substring(0,8);
  
        this.service.attenDialog = true;
    }
  
    deleteAttendance(attnd: AttendanceRequest) {
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
        this.service.attendance.userName=JSON.parse(this.loginUser).name;
        if(this.service.attendance.id>0){
          this.service.attendance.updatedBy =JSON.parse(this.loginUser).id;
          this.service.attendance.updatedDate=new Date();
        }else{
          this.service.attendance.createdBy =JSON.parse(this.loginUser).id;
          this.service.attendance.createdData=new Date();
        }
       
        this.service.PostAttendance(this.service.attendance).subscribe(res => {
            this.GetAllAttendance();
            this.service.attenDialog = false;
            this.service.attendance = new AttendanceRequest();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attendance Updated', life: 3000 });
  
        });
      
    }
    ApproveAttendance = (attendanceId:number) =>{
      this.service.ApproveAttendance(attendanceId).subscribe(res =>{
        this.GetAllAttendance();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attendance Updated', life: 3000 });
      })
    }
   
  }
