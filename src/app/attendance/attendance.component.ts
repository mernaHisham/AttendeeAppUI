import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Attendance } from '../model/attendance.model';
import { AttendanceService } from '../service/attendance.service';
import { LoginResponse } from '../model/login-response.model';
import { Roles } from '../model/users.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers:[DatePipe]
})
export class AttendanceComponent implements OnInit {
  isLoading:boolean=false;
  loginUser: any = localStorage.getItem("user");
  constructor(public service: AttendanceService, 
    public messageService: MessageService, 
    private datePipe:DatePipe,
    public confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.GetAllAttendance();
  }
  GetAllAttendance() {
    this.isLoading=true;
    let userRole=JSON.parse(this.loginUser).fkRoleId;
    let userId=userRole==Roles.Admin?0:JSON.parse(this.loginUser).id;
      this.service.GetAll(userId).subscribe((data) => {
          this.service.attends = data as Attendance[];
          this.isLoading=false;
      });
  }
  openNew() {
      this.service.attendance = new Attendance();
      this.service.submitted = false;
      this.service.attenDialog = true;
  }



  editAttendance(attnd: Attendance) {
      this.service.attendance = { ...attnd };
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
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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
      this.service.attendance.userId=JSON.parse(this.loginUser).id;
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
          this.service.attendance = new Attendance();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

      });
    
  }

 
}