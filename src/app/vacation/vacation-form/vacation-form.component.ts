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
    {code:1,name:	"U"},
    {code:2,name:	"PF"},
    {code:3,name:	"K"},
    {code:4,name:	"UU"},
    {code:5,name:	"UM"},
    {code:6,name:	"T"}
  ]
}
