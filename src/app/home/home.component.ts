import { Component } from '@angular/core';
import { AttendanceService } from '../service/attendance.service';
import { Attendance } from '../model/attendance.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VacationService } from '../service/vacation.service';
import { Vacation } from '../model/vacation.model';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  vacations!: Vacation[];
  OT: Vacation = new Vacation();
  attnd: Attendance = new Attendance();
  Employees:any;
  loginUser: any = localStorage.getItem("user");
  loginUserRole= JSON.parse(this.loginUser)?.fkRoleId;
  vacationTypes: any = [
    { code: 1, name: "U-Urlaub", color: "#3b82f6", bgColor: "#f9fafb" },
    { code: 2, name: "PF-Pflegeurlaub", color: "#22c55e", bgColor: "#f9fafb" },
    { code: 3, name: "K-Krankenstand", color: "#0ea5e9", bgColor: "#f9fafb" },
    { code: 4, name: "UU-Unbezahlter Urlaub", color: "#f97316", bgColor: "#f9fafb" },
    { code: 5, name: "UM-Umzugsurlaub", color: "#ef4444", bgColor: "#f9fafb" },
    { code: 6, name: "T-Termin", color: "#a855f7", bgColor: "#f9fafb" },
    { code: 7, name: "T-Arbeitsstunden", color: "#51374f", bgColor: "#51374f" },
    {code: 8 , name: "Überstundenarbeit", color: "#0ea5e9", bgColor: "#f9fafb"}
  ]
  constructor(public vacService: VacationService, public confirmationService: ConfirmationService,
    public service: AttendanceService, public messageService: MessageService
    ,public userService:UsersService) { }

  ngOnInit() {
    this.GetAllEmployees();
    this.GetAllVacations();
    this.GetAttendance();
  }
  GetAllEmployees() {
    this.userService.GetUsersSelectList().subscribe((data) => {
        this.Employees = data;
    });}
  GetAllVacations = () => {
    var userId = JSON.parse(this.loginUser).id;
    this.vacService.GetUserVacations(userId)
      .subscribe((data: any) => {
        this.vacations = data.filter((z: Vacation) => z.vacationType != 8) as Vacation[];
        this.OT = data.filter((z: Vacation) => z.vacationType == 8
          && new Date(z.vacationDate).toLocaleDateString() == new Date().toLocaleDateString())[0];
      });
  }
  GetAttendance = () => {
    var userId = JSON.parse(this.loginUser).id;
    this.service.GetAttendance(userId).subscribe((res: any) => {
      this.attnd = res as Attendance;
    })
  }
  StartDay = () => {
    this.attnd = new Attendance();
    this.attnd.userId = JSON.parse(this.loginUser).id;
    this.attnd.userName = JSON.parse(this.loginUser).name;
    this.attnd.attendanceDate = new Date();
    this.attnd.startDay = new Date();

    this.service.StartDay(this.attnd, JSON.parse(this.loginUser).startTime).subscribe((res: any) => {
      if (res.result) {
        this.GetAttendance();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.msg, life: 3000 });
      }
      else
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: res.msg, life: 3000 });

    })
  }
  StartBreak = () => {
    this.service.StartBreak(this.attnd.id).subscribe((res: any) => {
      if (res.result) {
        this.GetAttendance();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.msg, life: 3000 });
      }
      else
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: res.msg, life: 3000 });
    })
  }
  EndBreak = () => {
    this.service.EndBreak(this.attnd.id).subscribe((res: any) => {
      if (res.result) {
        this.GetAttendance();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.msg, life: 3000 });
      }
      else
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: res.msg, life: 3000 });
    })
  }
  EndDay = () => {
    this.confirmationService.confirm({
      message: 'Hello ' + JSON.parse(this.loginUser).name + ',Are you sure you want to Logout?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.EndDay(this.attnd.id, JSON.parse(this.loginUser).endTime).subscribe((res: any) => {
          if (res.result) {
            this.GetAttendance();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.msg, life: 3000 });
          }
          else
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: res.msg, life: 3000 });
        })

      }
    });


  }
  openNew() {
    this.vacService.vacation = new Vacation();
    this.vacService.submitted = false;
    this.vacService.vacationDialog = true;
  }
  hideDialog() {
    this.vacService.vacationDialog = false;
    this.vacService.submitted = false;
  }

  saveVacation(overTime: string = "") {
    if (overTime == "start") {
      this.vacService.vacation = new Vacation();
      this.vacService.vacation.id = 0;
      this.vacService.vacation.userId = JSON.parse(this.loginUser).id;
      this.vacService.vacation.userName = JSON.parse(this.loginUser).name;
      this.vacService.vacation.createdBy = JSON.parse(this.loginUser).id;
      this.vacService.vacation.createdData = new Date();
      this.vacService.vacation.vacationDate = new Date();
      this.vacService.vacation.startTime = new Date();
      this.vacService.vacation.vacationType = 8;
    }
    else if (overTime == "end") {
      this.vacService.vacation = this.OT;
      this.vacService.vacation.endTime = new Date();

    }
    else {
      this.vacService.submitted = true;
      this.vacService.vacation.userId= this.loginUserRole==1?
      this.vacService.vacation.userId
      :JSON.parse(this.loginUser)?.id;

      this.vacService.vacation.userName=this.loginUserRole==1? 
     this.Employees.filter((emp:any)=>emp.id==this.vacService.vacation.userId)[0]?.name
     :JSON.parse(this.loginUser)?.name;
      if (this.vacService.vacation.id > 0) {
        this.vacService.vacation.updatedBy = JSON.parse(this.loginUser).id;
        this.vacService.vacation.updatedDate = new Date();
      } else {
        this.vacService.vacation.createdBy = JSON.parse(this.loginUser).id;
        this.vacService.vacation.createdData = new Date();
      }
    }
    this.vacService.PostVacation(this.vacService.vacation).subscribe(res => {
      this.GetAllVacations();
      this.vacService.vacationDialog = false;
      this.vacService.vacation = new Vacation();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Vacation Sent', life: 3000 });
    });

  }
}


