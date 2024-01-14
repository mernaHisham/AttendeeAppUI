import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Device } from '../model/device.model';
import { DeviceService } from '../service/device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
    isLoading:boolean=false;
    loginUser: any = localStorage.getItem("user");
    loginUserRole: number = 0;
  constructor(public service: DeviceService, public messageService: MessageService,
     public confirmationService: ConfirmationService,private router:Router) { }

  ngOnInit() {
    this.loginUserRole= JSON.parse(this.loginUser).fkRoleId;
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
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Deleted', life: 3000 });
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
      if(this.service.device.id>0){
        this.service.device.updatedBy =JSON.parse(this.loginUser).id;
        this.service.device.updatedDate=new Date();
      }else{
        this.service.device.createdBy =JSON.parse(this.loginUser).id;
        this.service.device.createdData=new Date();
      }
      this.service.PostDevice(this.service.device).subscribe(res => {
          this.GetAllDevices();
          this.service.deviceDialog = false;
          this.service.device = new Device();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Updated', life: 3000 });

      });
    
  }

 
}
