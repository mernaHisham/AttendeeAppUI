import { Component } from '@angular/core';
import { DeviceService } from 'src/app/service/device.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent {
constructor(public deviceService:DeviceService){}
}
