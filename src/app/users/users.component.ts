import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Users } from '../model/users.model';
import { UsersService } from '../service/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    constructor(public userService: UsersService, public messageService: MessageService, public confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.GetAllUsers();
    }
    GetAllUsers() {
        this.userService.GetAllUsers().subscribe((data) => (this.userService.users = data as Users[]));
    }
    openNew() {
        this.userService.user = new Users();
        this.userService.submitted = false;
        this.userService.userDialog = true;
    }



    editUser(user: Users) {
        this.userService.user = { ...user };
        this.userService.userDialog = true;
    }

    deleteUser(user: Users) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.userName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userService.DeleteUser(user.id).subscribe((res) => {
                    this.GetAllUsers();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
                });

            }
        });
    }
    ActivateUser(user: Users) {
        this.userService.UserActivation(user.id, false).subscribe((res) => {
            this.GetAllUsers();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        });
    }
 
    hideDialog() {
        this.userService.userDialog = false;
        this.userService.submitted = false;
    }

    saveUser() {
        this.userService.submitted = true;
        this.userService.PostUser(this.userService.user).subscribe(res => {
            this.GetAllUsers();
            this.userService.userDialog = false;
            this.userService.user = new Users();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

        });
      
    }

   
}