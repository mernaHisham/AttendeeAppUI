import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  constructor(public service: UsersService) {}

 
}