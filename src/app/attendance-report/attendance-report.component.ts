import { Component } from '@angular/core';
import { AttendanceService } from '../service/attendance.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Attendance } from '../model/attendance.model';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css'],
  providers:[DatePipe]
})
export class AttendanceReportComponent {
  isLoading:boolean=false;
  loginUser: any = localStorage.getItem("user");
  userRole:number=0;
  constructor(public service: AttendanceService,
    public messageService: MessageService, 
    private datePipe:DatePipe,
    public confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.userRole=JSON.parse(this.loginUser).fkRoleId;
     // this.GetAllAttendance();
  }
  GetAllAttendance() {
    this.isLoading=true;
    let userId=JSON.parse(this.loginUser).id;
      // this.service.FilterAttendance(userId,).subscribe((data) => {        
      //     this.service.attends = data as Attendance[];
      //     this.isLoading=false;
      // });
  }
}
