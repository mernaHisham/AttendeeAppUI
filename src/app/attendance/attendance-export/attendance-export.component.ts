import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Attendance, TotalsVals } from 'src/app/model/attendance.model';
import { Vacation } from 'src/app/model/vacation.model';
import { AttendanceService } from 'src/app/service/attendance.service';
import { VacationService } from 'src/app/service/vacation.service';
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
  totals:TotalsVals= new TotalsVals();
  vacAttendance : Attendance[]=[];
  vacationTypes:any=[
    {code:1,name:	"U-Urlaub",color:"primary",bgColor:""},
    {code:2,name:	"PF-Pflegeurlaub",color:"secondary",bgColor:""},
    {code:3,name:	"K-Krankenstand",color:"success",bgColor:""},
    {code:4,name:	"UU-Unbezahlter Urlaub",color:"info",bgColor:""},
    {code:5,name:	"UM-Umzugsurlaub",color:"warning",bgColor:""},
    {code:6,name:	"T-Termin",color:"help",bgColor:""}
  ]
  constructor(public service: AttendanceService,
    public vacService: VacationService,
    private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.queryParamMap.get('userId'));
    this.from = this.route.snapshot.queryParamMap.get('from');
    this.to = this.route.snapshot.queryParamMap.get('to');
  if(this.userId>0)
    this.GetAllAttendance();
    this.GetUserVacs();
  }
  async downloadAsPDF() {
    const doc = new jsPDF('p', 'pt', 'a4');
    const div = this.pdfTable.nativeElement;
    await doc.html(div, {
      callback: function (doc) {
      doc.save('Teilnahme.pdf');
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
    this.service.FilterAttendance(this.userId, this.from, this.to).subscribe((data) => {
      this.service.attends = data as Attendance[];
      this.service.attends.forEach(attnd=>{
        this.totals.lagSum+=attnd.lag;
        this.totals.overTimeSum+=attnd.overtime;
        this.totals.twmSum+=attnd.totalWorkMinutes;
        this.totals.tbmSum+=attnd.totalBreakMinutes;
      })
    });
  }
  GetUserVacs() {

    this.vacService.GetVacationsReport(this.userId, this.from, this.to).subscribe((data) => {
     this.vacAttendance = data as Attendance[];
     
    });
  }
}
