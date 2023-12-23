import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { Users } from '../model/users';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
    userDialog: boolean = false;

    users!: Users[];

    user!: Users;

    selectedUser!: Users[] | null;

    submitted: boolean = false;
    Delete:string="Delete";
    status: any[]= [
      { label: 'Active', value: 1 },
      { label: 'UnActive', value: 2 }
  ];

    constructor(private userService: UsersService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.userService.GetAllUsers().subscribe((data) => (this.users = data as Users[]));

        // this.statuses = [
        //     { label: 'INSTOCK', value: 'instock' },
        //     { label: 'LOWSTOCK', value: 'lowstock' },
        //     { label: 'OUTOFSTOCK', value: 'outofstock' }
        // ];
    }

    openNew() {
     //   this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users = this.users.filter((val) => !this.selectedUser?.includes(val));
                this.selectedUser = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editUser(user: Users) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: Users) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.userName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users = this.users.filter((val) => val.id !== user.id);
             //   this.user = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

        if (this.user.userName?.trim()) {
            if (this.user.id) {
                this.users[this.findIndexById(this.user.id.toString())] = this.user;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
              //  this.user.id = this.createId();
              //  this.user.image = 'product-placeholder.svg';
                this.users.push(this.user);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.users = [...this.users];
            this.userDialog = false;
           // this.user = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id.toString() === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getStatus(status: any) {
        switch (status) {
            case true:
                return 'success';
            case false:
                return 'danger';
             default:
                return 'info';
        }
    }
}