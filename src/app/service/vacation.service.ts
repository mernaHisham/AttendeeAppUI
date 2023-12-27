import { Injectable } from '@angular/core';
import { Vacation } from '../model/vacation.model';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VacationService extends BaseService {
  userDialog: boolean = false; 
  vacations!: Vacation[];
  vacation!: Vacation;
  selectedVacation!: Vacation[] | null;
  submitted: boolean = false;
  Delete:string="Delete";
constructor(private http: HttpClient) { 
 super();
}
GetAllVacations = () =>
this.http.get(`${this.baseURl}Vacations/GetAll`);

GetById = (VacationId:number) =>
this.http.get(`${this.baseURl}Vacations/GetById?VacationId=${VacationId}`);

PostVacation = (vacation:Vacation) =>
this.http.post(`${this.baseURl}Vacations/PostVacation`,vacation);

DeleteVacation = (VacationId:number) =>
this.http.delete(`${this.baseURl}Vacations/DeleteVacation?VacationId=${VacationId}`);

}
