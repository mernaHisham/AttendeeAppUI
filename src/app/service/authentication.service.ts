import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { LoginRequest } from '../model/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService{
  request:LoginRequest=new LoginRequest();
  constructor(private http: HttpClient) { 
    super();
   }
 
   Login = () =>
   this.http.post(`${this.baseURl}Authentication/Login`,this.request);
}
