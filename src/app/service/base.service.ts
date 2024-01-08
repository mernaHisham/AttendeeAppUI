import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
 baseURl: string = "http://localhost:5193/api/";
 auth: any;
 requestOptions: any;

 constructor() {
    //ng build --output-path publish
     if (isDevMode()) {
        // this.baseURl = "https://attendeapi.royal-tek.com/api/";
         this.baseURl = "https://sterntimeapi.kindersterne.com/api/";
         
     }
 }
}
