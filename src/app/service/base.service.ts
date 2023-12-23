import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
 baseURl: string = "http://localhost:5193/api/";
 auth: any;
 requestOptions: any;

 constructor() {
    
    //  if (!isDevMode()) {
    //      this.baseURl = "http://localhost:5193/api/";
    //  }
 }
}
