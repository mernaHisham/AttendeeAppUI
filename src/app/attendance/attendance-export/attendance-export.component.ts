import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Attendance } from 'src/app/model/attendance.model';
import { AttendanceService } from 'src/app/service/attendance.service';
@Component({
  selector: 'app-attendance-export',
  templateUrl: './attendance-export.component.html',
  styleUrls: ['./attendance-export.component.css']
})
export class AttendanceExportComponent {
  userId: number = 0;
  from: any;
  to: any;
  @ViewChild('pdfTable', { static: false }) pdfTable: any;
  reportDt:Date=new Date();

 
  constructor(public service: AttendanceService,private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.queryParamMap.get('userId'));
    this.from = this.route.snapshot.queryParamMap.get('from');
    this.to = this.route.snapshot.queryParamMap.get('to');
  if(this.userId>0)
    this.GetAllAttendance();
  }
  async downloadAsPDF() {
    const doc = new jsPDF('p', 'pt', 'a4');
    const div = this.pdfTable.nativeElement;
    await doc.html(div, {
      callback: function (doc) {
        doc.save('test.pdf');
        doc.output('dataurlnewwindow');
      }
   });
  
  }
  timeConvert(minutes: number) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;
    var hoursStr = hours < 10 ? '0' + hours : hours;
    var minutesStr = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;
    return hoursStr + ':' + minutesStr;
  }
  GetAllAttendance() {

    this.service.GetAll(this.userId, this.from, this.to).subscribe((data) => {
      this.service.attends = data as Attendance[];
    });
  }
}
