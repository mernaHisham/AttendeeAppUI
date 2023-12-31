import { Component } from '@angular/core';
import { DeviceService } from '../service/device.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-device',
  templateUrl: './set-device.component.html',
  styleUrls: ['./set-device.component.css']
})
export class SetDeviceComponent {
  oldConfirmationCode: string = "";
  newConfirmationCode: string = "";
  constructor(public service: DeviceService, public messageService: MessageService,private router:Router) {

  }
  SerDevice = () => {
    this.service.SetDevice(this.oldConfirmationCode, this.newConfirmationCode).subscribe((res:any) => {
     if(res.result){
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
      this.router.navigate(["/login"]);
      localStorage.setItem("ConfirmationCode",this.newConfirmationCode);
     }
     else
     this.messageService.add({ severity: 'error', summary: 'Failed', detail:  res.message, life: 3000 });

    });
  }
}
