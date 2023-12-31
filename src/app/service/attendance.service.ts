import { Injectable } from '@angular/core';
import { Attendance } from '../model/attendance.model';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends BaseService {
  attenDialog: boolean = false;
  attends!: Attendance[];
  attendance!: Attendance;
  selectedAttendance!: Attendance[] | null;
  submitted: boolean = false;
  Delete: string = "Delete";
  constructor(private http: HttpClient) {
    super();
  }
  GetAll = () =>
    this.http.get(`${this.baseURl}Attendance/GetAll`);
  GetById = (AttendanceId: number) =>
    this.http.get(`${this.baseURl}Attendance/GetById?AttendanceId=${AttendanceId}`);
  PostAttendance = (attendance: Attendance) =>
    this.http.post(`${this.baseURl}Attendance/PostAttendance`, attendance);
  DeleteAttendance = (AttendanceId: number) =>
    this.http.delete(`${this.baseURl}Attendance/DeleteAttendance?AttendanceId=${AttendanceId}`);
  StartDay = (Attend: Attendance) =>
    this.http.post(`${this.baseURl}Attendance/StartDay`, Attend);
  StartBreak = (AttendanceId: number) =>
    this.http.get(`${this.baseURl}Attendance/StartBreak?AttendanceId=${AttendanceId}`);
  EndBreak = (AttendanceId: number) =>
    this.http.get(`${this.baseURl}Attendance/EndBreak?AttendanceId=${AttendanceId}`);
  EndDay = (AttendanceId: number) =>
    this.http.get(`${this.baseURl}Attendance/EndDay?AttendanceId=${AttendanceId}`);
    GetAttendance=(userId:number)=>
    this.http.get(`${this.baseURl}Attendance/GetAttendance?userId=${userId}`);

}
