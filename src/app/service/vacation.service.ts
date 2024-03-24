import { Injectable } from '@angular/core';
import { Vacation } from '../model/vacation.model';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VacationService extends BaseService {
  vacationDialog: boolean = false; 
  vacations!: Vacation[];
  vacation!: Vacation;
  selectedVacation!: Vacation[] | null;
  submitted: boolean = false;
  Delete:string="Delete";
  dateType:string = "date";
constructor(private http: HttpClient) { 
 super();
}
GetAllVacations = (userId:number) =>
this.http.get(`${this.baseURl}Vacations/GetAll?userId=${userId}`);
GetAllByUser=(userId:number)=>
this.http.get(`${this.baseURl}Vacations/GetAllByUser?userId=${userId}`);
GetById = (VacationId:number) =>
this.http.get(`${this.baseURl}Vacations/GetById?VacationId=${VacationId}`);
GetUserVacations=(userId:number)=>
this.http.get(`${this.baseURl}Vacations/GetUserVacations?userId=${userId}`);

PostVacation = (vacation:Vacation) =>
this.http.post(`${this.baseURl}Vacations/PostVacation`,vacation);

DeleteVacation = (VacationId:number) =>
this.http.get(`${this.baseURl}Vacations/DeleteVacation?VacationId=${VacationId}`);
 GetVacationsReport=( userId:number,  from:any,  to:any)=>
 this.http.get(`${this.baseURl}Vacations/GetVacationsReport?userId=${userId}&from=${from}&to=${to}`);

}
