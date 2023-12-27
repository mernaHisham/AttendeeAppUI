import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Device } from '../model/device.model';
import { DeviceService } from '../service/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  constructor(public deviceService: DeviceService, public messageService: MessageService, public confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.GetAllDevices();
  }
  GetAllDevices() {
      this.deviceService.GetAllDevices().subscribe((data) => (this.deviceService.devices = data as Device[]));
  }
  openNew() {
      this.deviceService.device = new Device();
      this.deviceService.submitted = false;
      this.deviceService.deviceDialog = true;
  }



  editDevice(dev: Device) {
      this.deviceService.device = { ...dev };
      this.deviceService.deviceDialog = true;
  }

  deleteDevice(dev: Device) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + dev.deviceId + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.deviceService.DeleteDevice(dev.id).subscribe((res) => {
                  this.GetAllDevices();
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
              });

          }
      });
  }
 

  hideDialog() {
      this.deviceService.deviceDialog = false;
      this.deviceService.submitted = false;
  }

  saveDevice() {
      this.deviceService.submitted = true;
      this.deviceService.PostDevice(this.deviceService.device).subscribe(res => {
          this.GetAllDevices();
          this.deviceService.deviceDialog = false;
          this.deviceService.device = new Device();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

      });
    
  }

 
}
