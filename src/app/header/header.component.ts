import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ReportApproval } from '../model/report-approval.model';
import { ReportApprovalService } from '../service/report-approval.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  urlVal:string = "";
  active:string="active";
  loginUser: any = localStorage.getItem("user");
  loginUserId: number = 0;
  loginUserRole: number = 0;
  loginUserName:string="";
  items: MenuItem[]=[];
  userRep! :ReportApproval;
  constructor(private router:Router,public service:ReportApprovalService,
    public messageService: MessageService){ }
  ngOnInit() {
   this.loginUserRole= JSON.parse(this.loginUser)?.fkRoleId;
   this.loginUserName= JSON.parse(this.loginUser)?.name;
   this.loginUserId =JSON.parse(this.loginUser)?.id;
      // if(new Date().getDate() === 1){
        this.GetReportApproval();
        // }
    

  }
  openNew() {
    this.service.report = new ReportApproval();
    this.service.submitted = false;
    this.service.reportDialog = true;
}

  hideDialog() {
    this.service.reportDialog = false;
    this.service.submitted = false;
}
  ApproveReport = () =>{
    this.service.report.createdBy = JSON.parse(this.loginUser).id;
    this.service.report.createdData = new Date();
    this.service.report.userId  = JSON.parse(this.loginUser).id;
    this.service.report.userName = JSON.parse(this.loginUser).name;
    this.service.report.reportMonth = new Date().getMonth();
    this.service.report.reportYear = new Date().getFullYear();


    this.service.ApproveReport().subscribe(res=>{
      this.GetReportApproval();
      this.hideDialog();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'report approved', life: 3000 });
  
    })

  }
  GetReportApproval = () =>{
  this.service.GetReportApproval(JSON.parse(this.loginUser).id).subscribe(res=>{
    this.userRep= res as ReportApproval;
    this.items=[
      {
        label: 'Devices',
        routerLink:'/devices',
        styleClass:this.loginUserId==1?"":"hidden" 
      },
      {
        label: 'Users',
        routerLink:'/users',
        styleClass:this.loginUserRole==2?"hidden":""
      },
      {
        label: 'Teilnahme',
        routerLink:'/attendance'
      },
      {
        label: 'Abwesenheit',
        routerLink:'/vacation'
      },{
        label: 'Statusübersicht',
        routerLink:'/userstatus',
        styleClass:this.loginUserRole==2?"hidden":""
      }
      ,{
        label: 'Requests',
        routerLink:'/requests',
        styleClass:this.loginUserRole==2?"hidden":""
      }
      // ,{
      //   label: 'Reports',
      //   routerLink:'/report',
      //   styleClass:this.loginUserRole==2?"hidden":""
      // }
      ,{
        label: 'ReportsApprovals',
        routerLink:'/reportapprovals',
        styleClass:this.loginUserRole==2?"hidden":""
      }
      // ,{
      //   label: 'Approve',
      //   styleClass:this.userRep?.id>0?"text-white bg-red-700 font-bold border-round":"",
      //   command:()=>this.openNew(),
      // }
    ];
  })
}
  Logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    this.router.navigate(['/login']);
  }
}