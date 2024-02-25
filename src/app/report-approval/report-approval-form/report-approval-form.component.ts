import { Component } from '@angular/core';
import { ReportApprovalService } from 'src/app/service/report-approval.service';

@Component({
  selector: 'app-report-approval-form',
  templateUrl: './report-approval-form.component.html',
  styleUrls: ['./report-approval-form.component.css']
})
export class ReportApprovalFormComponent {
constructor(public service:ReportApprovalService){}
}
