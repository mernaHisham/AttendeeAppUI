import { Component } from '@angular/core';
import { DeviceService } from '../service/device.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-device',
  templateUrl: './check-device.component.html',
  styleUrls: ['./check-device.component.css']
})
export class CheckDeviceComponent {
  confirmationCode: string = "";
  constructor(public service: DeviceService, public messageService: MessageService,private router:Router) {

  }
  CheckDevice = () => {
    this.service.CheckDevice(this.confirmationCode).subscribe((res:any) => {
     if(res.result){
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
      this.router.navigate(["/login"]);
      localStorage.setItem("ConfirmationCode",this.confirmationCode);
     }
     else
     this.messageService.add({ severity: 'error', summary: 'Failed', detail:  res.message, life: 3000 });

    });
  }
}

