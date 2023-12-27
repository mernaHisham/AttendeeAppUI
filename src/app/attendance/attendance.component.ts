import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Attendance } from '../model/attendance.model';
import { AttendanceService } from '../service/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  isLoading:boolean=false;
  constructor(public service: AttendanceService, public messageService: MessageService, public confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.GetAllAttendance();
  }
  GetAllAttendance() {
      this.isLoading=true;
      this.service.GetAll().subscribe((data) => {
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
      this.service.attendance.userId=1;
      this.service.attendance.userName="merna";
      this.service.PostAttendance(this.service.attendance).subscribe(res => {
          this.GetAllAttendance();
          this.service.attenDialog = false;
          this.service.attendance = new Attendance();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

      });
    
  }

 
}