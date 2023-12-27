import { Injectable } from '@angular/core';
import { Device } from '../model/device.model';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends BaseService {
  deviceDialog: boolean = false; 
    devices!: Device[];
    device!: Device;
    selectedDevice!: Device[] | null;
    submitted: boolean = false;
    Delete:string="Delete";
  constructor(private http: HttpClient) { 
   super();
  }
  GetAllDevices = () =>
 this.http.get(`${this.baseURl}Devices/GetAll`);
 
 GetById = (deviceId:number) =>
 this.http.get(`${this.baseURl}Devices/GetById?DeviceId=${deviceId}`);

 PostDevice = (device:Device) =>
 this.http.post(`${this.baseURl}Devices/PostDevice`,device);
 
 DeleteDevice = (deviceId:number) =>
 this.http.delete(`${this.baseURl}Devices/DeleteDevice?DeviceId=${deviceId}`);

}
