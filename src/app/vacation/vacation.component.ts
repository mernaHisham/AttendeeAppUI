import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Vacation } from '../model/vacation.model';
import { VacationService } from '../service/vacation.service';
import { Roles } from '../model/users.model';
import { UsersService } from '../service/users.service';
import { FilterStatusEnum } from '../model/device.model';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  isLoading: boolean = false;
  userRole: number = 0;
  Employees: any;
  loginUser: any = localStorage.getItem("user");
  loginUserRole = JSON.parse(this.loginUser)?.fkRoleId;
  loginUserId = JSON.parse(this.loginUser).id
  userId: number = this.loginUserId;
  vacationTypes: any = [
    { code: 1, name: "U-Urlaub", color: "primary", bgColor: "" },
    { code: 2, name: "PF-Pflegeurlaub", color: "secondary", bgColor: "" },
    { code: 3, name: "K-Krankenstand", color: "success", bgColor: "" },
    { code: 4, name: "UU-Unbezahlter Urlaub", color: "info", bgColor: "" },
    { code: 5, name: "UM-Umzugsurlaub", color: "warning", bgColor: "" },
    { code: 6, name: "T-Termin", color: "help", bgColor: "" },
    { code: 7, name: "T-Arbeitsstunden", color: "danger", bgColor: "" },
    { code: 8, name: "Überstundenarbeit", color: "success", bgColor: "" }
  ]
  constructor(public service: VacationService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService, public userService: UsersService) { }

  ngOnInit() {
    this.userRole = JSON.parse(this.loginUser).fkRoleId;
    this.GetAllEmployees();
    this.GetAllVacations();
  }
  GetAllEmployees() {
    let IsNordstern = JSON.parse(this.loginUser).isNordstern;
    let filterStatus = JSON.parse(this.loginUser).id == 1 ? FilterStatusEnum.superAdmin :
      IsNordstern ? FilterStatusEnum.Nordstern : FilterStatusEnum.Abendstern;
    this.userService.GetUsersSelectList(filterStatus).subscribe((data) => {
      this.Employees = data;
    });
  }

  GetAllVacations() {
    this.isLoading = true;
    let userId = this.userRole == Roles.Admin ? (this.userId ?? this.loginUserId) : this.loginUserId;
    this.service.GetAllVacations(userId).subscribe((data) => {
      this.service.vacations = data as Vacation[];
      this.isLoading = false;
    });
  }
  openNew() {
    this.service.vacation = new Vacation();
    this.service.submitted = false;
    this.service.vacationDialog = true;
  }



  editVacation(vac: Vacation) {
    this.service.vacation = { ...vac };
    this.service.vacation.vacationDate = vac.vacationDate?.substring(0, 10);
    if (vac.vacationType == 6) {
      this.service.vacation.startTime = new Date(vac.startTime).toTimeString().substring(0, 8);
      this.service.vacation.endTime = new Date(vac.endTime).toTimeString().substring(0, 8);
      this.service.dateType = "time";
    } else {
      this.service.vacation.startTime = vac.startTime?.substring(0, 10);
      this.service.vacation.endTime = vac.endTime?.substring(0, 10);
      this.service.dateType = "date";
    }

    this.service.vacationDialog = true;
  }

  deleteVacation(vac: Vacation) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + vac.vacationDate + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.DeleteVacation(vac.id).subscribe((res) => {
          this.GetAllVacations();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Vacation Deleted', life: 3000 });
        });

      }
    });
  }


  hideDialog() {
    this.service.vacationDialog = false;
    this.service.submitted = false;
  }

  saveVacation() {
    this.service.submitted = true;
    if (this.service.vacation.id > 0) {
      this.service.vacation.updatedBy = JSON.parse(this.loginUser).id;
      this.service.vacation.updatedDate = new Date();

      this.service.vacation.userId = this.loginUserRole == 1 ?
        this.service.vacation.userId
        : JSON.parse(this.loginUser)?.id;

      this.service.vacation.userName = this.loginUserRole == 1 ?
        this.Employees.filter((emp: any) => emp.id == this.service.vacation.userId)[0]?.name
        : JSON.parse(this.loginUser)?.name;

    } else {

      this.service.vacation.userId = this.loginUserRole == 1 ?
        this.service.vacation.userId
        : JSON.parse(this.loginUser)?.id;

      this.service.vacation.userName = this.loginUserRole == 1 ?
        this.Employees.filter((emp: any) => emp.id == this.service.vacation.userId)[0]?.name
        : JSON.parse(this.loginUser)?.name;
      this.service.vacation.createdBy = JSON.parse(this.loginUser).id;
      this.service.vacation.createdData = new Date();
    }

    this.service.PostVacation(this.service.vacation).subscribe(res => {
      this.GetAllVacations();
      this.service.vacationDialog = false;
      this.service.vacation = new Vacation();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Vacation Updated', life: 3000 });
    });

  }


}

