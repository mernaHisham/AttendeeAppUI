import { Component } from '@angular/core';
import { VacationService } from 'src/app/service/vacation.service';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styleUrls: ['./vacation-form.component.css']
})
export class VacationFormComponent {
  constructor(public service: VacationService) {}
}
