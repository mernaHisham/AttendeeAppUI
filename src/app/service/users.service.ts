import { Injectable } from '@angular/core';
import { Users } from '../model/users.model';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {
  userDialog: boolean = false; 
    users!: Users[];
    user!: Users;
    selectedUser!: Users[] | null;
    submitted: boolean = false;
    Delete:string="Delete";
  constructor(private http: HttpClient) { 
   super();
  }
  GetAllUsers = () =>
 this.http.get(`${this.baseURl}Users/GetAll`);
 
 GetById = (userId:number) =>
 this.http.get(`${this.baseURl}Users/GetById?UserId=${userId}`);

 PostUser = (user:Users) =>
 this.http.post(`${this.baseURl}Users/PostUser`,user);
 
 DeleteUser = (userId:number) =>
 this.http.delete(`${this.baseURl}Users/DeleteUser?UserId=${userId}`);

 UserActivation = (userId:number,active:boolean) =>
 this.http.get(`${this.baseURl}Users/UserActivation?UserId=${userId}&&active=${active}`);
}
