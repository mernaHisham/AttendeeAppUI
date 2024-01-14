import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Users } from '../model/users.model';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    isLoading:boolean=false;
    loginUser: any = localStorage.getItem("user");
    loginUserRole: number = 0;
    constructor(public service: UsersService, public messageService: MessageService,
         public confirmationService: ConfirmationService,public router:Router) { }

    ngOnInit() {
        this.loginUserRole= JSON.parse(this.loginUser).fkRoleId;
        this.GetAllUsers();
    }
    GetAllUsers() {
        this.isLoading=true;
        this.service.GetAllUsers().subscribe((data) => {
            this.service.users = data as Users[];
            this.isLoading=false;
        });
    }
    openNew() {
        this.service.user = new Users();
        this.service.submitted = false;
        this.service.userDialog = true;
    }



    editUser(user: Users) {
        this.service.user = { ...user };
        this.service.userDialog = true;
    }

    deleteUser(user: Users) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.userName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.DeleteUser(user.id).subscribe((res) => {
                    this.GetAllUsers();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
                });

            }
        });
    }
    ActivateUser(user: Users) {
        this.service.UserActivation(user.id, false).subscribe((res) => {
            this.GetAllUsers();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
        });
    }
 
    hideDialog() {
        this.service.userDialog = false;
        this.service.submitted = false;
    }

    saveUser() {
        this.service.submitted = true;
        if(this.service.user.id>0){
            this.service.user.updatedBy =JSON.parse(this.loginUser).id;
            this.service.user.updatedDate=new Date();
          }else{
            this.service.user.createdBy =JSON.parse(this.loginUser).id;
            this.service.user.createdData=new Date();
          }
        this.service.PostUser(this.service.user).subscribe(res => {
            this.GetAllUsers();
            this.service.userDialog = false;
            this.service.user = new Users();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });

        });
      
    }

   
}