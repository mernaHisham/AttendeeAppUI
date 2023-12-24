import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Users } from '../model/users.model';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
    constructor(public userService: UsersService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.GetAllUsers();
    }
    GetAllUsers(){
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
                this.userService.DeleteUser(user.id).subscribe((res) =>{
                    this.GetAllUsers();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
                });
               
            }
        });
    }
    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    hideDialog() {
        this.userService.userDialog = false;
        this.userService.submitted = false;
    }
  
    saveUser() {
        this.userService.submitted = true;
  this.userService.PostUser(this.userService.user).subscribe(res=>{
this.GetAllUsers();
                 this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

  });
        // if (this.userService.user.userName?.trim()) {
        //     if (this.userService.user.id) {
        //         this.userService.users[this.findIndexById(this.userService.user.id.toString())] = this.userService.user;
        //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        //     } else {
        //         //this.userService.user.id = this.createId();
        //         this.userService.users.push(this.userService.user);
        //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        //     }
  
        //     this.userService.users = [...this.userService.users];
        //     this.userService.userDialog = false;
        //     this.userService.user = new Users();
        // }
    }
  
    findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.userService.users.length; i++) {
          if (this.userService.users[i].id.toString() === id) {
              index = i;
              break;
          }
      }
      return index;
  }
}