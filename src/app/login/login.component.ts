import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public service: AuthenticationService, public messageService: MessageService,private router:Router) {

  }
  Login = () => {
    this.service.request.deviceCode= localStorage.getItem("ConfirmationCode")?.toString()??"";
    this.service.Login().subscribe((res:any) => {      
     if(res.result){
      localStorage.setItem("user",JSON.stringify(res.user));
      localStorage.setItem("accessToken",res.token);
      
      
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.msg, life: 3000 });
      this.router.navigate(["/"]);
     }
     else
     this.messageService.add({ severity: 'error', summary: 'Failed', detail:  res.msg, life: 3000 });

    });
  }
}
