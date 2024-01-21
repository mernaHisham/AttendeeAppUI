import { Injectable } from '@angular/core';
import { AttendanceRequest } from '../model/attendance-request.model';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AttendanceRequestService extends BaseService {
  attenDialog: boolean = false;
  attends!: AttendanceRequest[];
  attendance!: AttendanceRequest;
  selectedAttendance!: AttendanceRequest[] | null;
  submitted: boolean = false;
  Delete: string = "Delete";
  constructor(private http: HttpClient) {
    super();
  }
  GetAll = () =>
    this.http.get(`${this.baseURl}AttendanceRequest/GetAll`);

  GetById = (AttendanceId: number) =>
    this.http.get(`${this.baseURl}AttendanceRequest/GetById?AttendanceId=${AttendanceId}`);
  PostAttendance = (attendance: AttendanceRequest) =>
    this.http.post(`${this.baseURl}AttendanceRequest/PostAttendance`, attendance);
  DeleteAttendance = (AttendanceId: number) =>
    this.http.get(`${this.baseURl}AttendanceRequest/DeleteAttendance?AttendanceId=${AttendanceId}`);
    ApproveAttendance = (AttendanceId: number) =>
    this.http.get(`${this.baseURl}AttendanceRequest/ApproveAttendance?AttendanceId=${AttendanceId}`);

}

