import { Component } from '@angular/core';
import { AttendanceRequestService } from 'src/app/service/attendance-request.service';

@Component({
  selector: 'app-attendance-request-form',
  templateUrl: './attendance-request-form.component.html',
  styleUrls: ['./attendance-request-form.component.css']
})
export class AttendanceRequestFormComponent {
  constructor(public service: AttendanceRequestService) {}
}
