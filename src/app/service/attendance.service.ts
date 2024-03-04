import { Injectable } from '@angular/core';
import { Attendance, AttendanceFilterRequest } from '../model/attendance.model';
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
  filterForm :AttendanceFilterRequest= new AttendanceFilterRequest();
  constructor(private http: HttpClient) {
    super();
  }
  GetAll = (userId:number,from:any,to:any) =>
    this.http.get(`${this.baseURl}Attendance/GetAll?userId=${userId}&from=${from}&to=${to}`);
  GetAllByUser=(userId:number)=>
    this.http.get(`${this.baseURl}Attendance/GetAllByUser?userId=${userId}`);
  GetById = (AttendanceId: number) =>
    this.http.get(`${this.baseURl}Attendance/GetById?AttendanceId=${AttendanceId}`);
  PostAttendance = (attendance: Attendance) =>
    this.http.post(`${this.baseURl}Attendance/PostAttendance`, attendance);
  DeleteAttendance = (AttendanceId: number) =>
    this.http.get(`${this.baseURl}Attendance/DeleteAttendance?AttendanceId=${AttendanceId}`);
  StartDay = (Attend: Attendance,loginUserStartTime:Date) =>
    this.http.post(`${this.baseURl}Attendance/StartDay?loginUserStartTime=${loginUserStartTime}`, Attend);
  StartBreak = (AttendanceId: number) =>
    this.http.get(`${this.baseURl}Attendance/StartBreak?AttendanceId=${AttendanceId}`);
  EndBreak = (AttendanceId: number) =>
    this.http.get(`${this.baseURl}Attendance/EndBreak?AttendanceId=${AttendanceId}`);
  EndDay = (AttendanceId: number,loginUserEndTime:Date) =>
    this.http.get(`${this.baseURl}Attendance/EndDay?AttendanceId=${AttendanceId}&loginUserEndTime=${loginUserEndTime}`);
    GetAttendance=(userId:number)=>
    this.http.get(`${this.baseURl}Attendance/GetAttendance?userId=${userId}`);

    FilterAttendance=()=>
    this.http.post(`${this.baseURl}AttendanceReport/FilterAttendance`, this.filterForm);
    RecalculateAttendance=(userId:number,from:any,to:any)=>
    this.http.get(`${this.baseURl}Attendance/RecalculateAttendance?userId=${userId}&from=${from}&to=${to}`);

}
