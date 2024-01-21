import { Component } from '@angular/core';
import { VacationService } from 'src/app/service/vacation.service';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styleUrls: ['./vacation-form.component.css']
})
export class VacationFormComponent {
  
  constructor(public service: VacationService) {}
  vacationTypes:any=[
    {code:1,name:	"U-Urlaub",color:"primary",bgColor:""},
    {code:2,name:	"PF-Pflegeurlaub",color:"secondary",bgColor:""},
    {code:3,name:	"K-Krankenstand",color:"success",bgColor:""},
    {code:4,name:	"UU-Unbezahlter Urlaub",color:"info",bgColor:""},
    {code:5,name:	"UM-Umzugsurlaub",color:"warning",bgColor:""},
    {code:6,name:	"T-Termin",color:"help",bgColor:""}
  ]

  SetDateType = () => this.service.dateType=this.service.vacation.vacationType==6?"time":"date";
  
}
