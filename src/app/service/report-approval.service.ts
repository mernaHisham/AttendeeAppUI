import { Injectable } from '@angular/core';
import { ReportApproval } from '../model/report-approval.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { UserTypeEnum } from '../model/users.model';

@Injectable({
  providedIn: 'root'
})
export class ReportApprovalService extends BaseService {
   reportDialog: boolean = false; 
   reports!: ReportApproval[];
  // status: any;
   report!: ReportApproval;
   selectedReport!: ReportApproval[] | null;
   submitted: boolean = false;
  // Delete:string="Delete";
constructor(private http: HttpClient) { 
 super();
}
GetAllReportApprovals = (userTypeEnum:UserTypeEnum)=>
this.http.get(`${this.baseURl}ReportApprovals/GetAllReportApprovals?userTypeEnum=${userTypeEnum}`);
GetReportApproval=(userId:number)=>
this.http.get(`${this.baseURl}ReportApprovals/GetReportApproval?userId=${userId}`);
ApproveReport=()=>
this.http.post(`${this.baseURl}ReportApprovals/ApproveReport`,this.report);
}
