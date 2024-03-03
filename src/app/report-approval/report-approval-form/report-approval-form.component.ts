import { Component } from '@angular/core';
import { ReportApprovalService } from 'src/app/service/report-approval.service';

@Component({
  selector: 'app-report-approval-form',
  templateUrl: './report-approval-form.component.html',
  styleUrls: ['./report-approval-form.component.css']
})
export class ReportApprovalFormComponent {
  loginUser:any=localStorage.getItem("user");
  loginUserName:string=JSON.parse(this.loginUser).name;
constructor(public service:ReportApprovalService){}
}
