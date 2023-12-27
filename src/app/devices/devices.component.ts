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
    isLoading:boolean=false;
  constructor(public service: DeviceService, public messageService: MessageService, public confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.GetAllDevices();
  }
  GetAllDevices() {
    this.isLoading=true;
      this.service.GetAllDevices().subscribe((data) => {
        this.service.devices = data as Device[];
        this.isLoading=false;
  });
  }
  openNew() {
      this.service.device = new Device();
      this.service.submitted = false;
      this.service.deviceDialog = true;
  }



  editDevice(dev: Device) {
      this.service.device = { ...dev };
      this.service.deviceDialog = true;
  }

  deleteDevice(dev: Device) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + dev.deviceId + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.service.DeleteDevice(dev.id).subscribe((res) => {
                  this.GetAllDevices();
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
              });

          }
      });
  }
 

  hideDialog() {
      this.service.deviceDialog = false;
      this.service.submitted = false;
  }

  saveDevice() {
      this.service.submitted = true;
      this.service.PostDevice(this.service.device).subscribe(res => {
          this.GetAllDevices();
          this.service.deviceDialog = false;
          this.service.device = new Device();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

      });
    
  }

 
}
