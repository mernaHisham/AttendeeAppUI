import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Users } from '../model/users.model';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent {
  constructor(public service: UsersService, public messageService: MessageService,
    public confirmationService: ConfirmationService,public router:Router) { }

ngOnInit() {
   this.GetAllUsers();
}
  GetAllUsers() {
 //   this.isLoading=true;
    this.service.GetAllUsers().subscribe((data) => {
        this.service.users = data as Users[];
        //this.isLoading=false;
    });
}
}
