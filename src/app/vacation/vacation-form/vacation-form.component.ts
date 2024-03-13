import { Component } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { VacationService } from 'src/app/service/vacation.service';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styleUrls: ['./vacation-form.component.css']
})
export class VacationFormComponent {
  Employees:any;
  loginUser: any = localStorage.getItem("user");
  loginUserRole= JSON.parse(this.loginUser)?.fkRoleId;
  constructor(public service: VacationService,public userService:UsersService) {}
  vacationTypes:any=[
    {code:1,name:	"U-Urlaub",color:"primary",bgColor:""},
    {code:2,name:	"PF-Pflegeurlaub",color:"secondary",bgColor:""},
    {code:3,name:	"K-Krankenstand",color:"success",bgColor:""},
    {code:4,name:	"UU-Unbezahlter Urlaub",color:"info",bgColor:""},
    {code:5,name:	"UM-Umzugsurlaub",color:"warning",bgColor:""},
    {code:6,name:	"T-Termin",color:"help",bgColor:""}//,
    //{code:7,name:	"T-Termin",color:"help",bgColor:""}
  ]
  ngOnInit() {
    this.GetAllEmployees();
 }
   GetAllEmployees() {
     this.userService.GetUsersSelectList().subscribe((data) => {
         this.Employees = data;
     });
 }
  SetDateType = () => this.service.dateType=this.service.vacation.vacationType==6||this.service.vacation.vacationType==7?"time":"date";
  
}
