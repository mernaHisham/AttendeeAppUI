import { Component, OnInit } from '@angular/core';
import { ReportApprovalService } from '../service/report-approval.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ReportApproval } from '../model/report-approval.model';
import { UserTypeEnum } from '../model/users.model';

@Component({
  selector: 'app-report-approval',
  templateUrl: './report-approval.component.html',
  styleUrls: ['./report-approval.component.css']
})
export class ReportApprovalComponent implements OnInit {
  isLoading:boolean=false;
  loginUser: any = localStorage.getItem("user");
  loginUserRole: number = 0;
  loginUserId: number = JSON.parse(this.loginUser).id;
  isNordstern: number = JSON.parse(this.loginUser).isNordstern;
  
constructor(public service: ReportApprovalService, public messageService: MessageService,
   public confirmationService: ConfirmationService,private router:Router) { }

ngOnInit() {
  this.loginUserRole= JSON.parse(this.loginUser).fkRoleId;
    this.GetAllReportApprovals();
}
GetAllReportApprovals() {
  this.isLoading=true;
   let userTypeEnum = this.loginUserId==1?UserTypeEnum.SuperAdmin:
        this.isNordstern?UserTypeEnum.Nordstern:UserTypeEnum.Abendstern;
    this.service.GetAllReportApprovals(userTypeEnum).subscribe((data) => {
      this.service.reports = data as ReportApproval[];
      this.isLoading=false;
});
}
}
