import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Vacation } from '../model/vacation.model';
import { VacationService } from '../service/vacation.service';
import { Roles } from '../model/users.model';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  isLoading:boolean=false;
  loginUser: any = localStorage.getItem("user");
  vacationTypes:any=[
    {code:1,name:	"U-Urlaub",color:"primary",bgColor:""},
    {code:2,name:	"PF-Pflegeurlaub",color:"secondary",bgColor:""},
    {code:3,name:	"K-Krankenstand",color:"success",bgColor:""},
    {code:4,name:	"UU-Unbezahlter Urlaub",color:"info",bgColor:""},
    {code:5,name:	"UM-Umzugsurlaub",color:"warning",bgColor:""},
    {code:6,name:	"T-Termin",color:"help",bgColor:""}
  ]
constructor(public service: VacationService, public messageService: MessageService, public confirmationService: ConfirmationService) { }

ngOnInit() {
    this.GetAllVacations();
}
GetAllVacations() {
  this.isLoading=true;
  let userRole=JSON.parse(this.loginUser).fkRoleId;
  let userId=userRole==Roles.Admin?0:JSON.parse(this.loginUser).id;
    this.service.GetAllVacations(userId).subscribe((data) => {
      this.service.vacations = data as Vacation[];
      this.isLoading=false;
});
}
openNew() {
    this.service.vacation = new Vacation();
    this.service.submitted = false;
    this.service.vacationDialog = true;
}



editVacation(vac: Vacation) {
    this.service.vacation = { ...vac };
    this.service.vacationDialog = true;
}

deleteVacation(vac: Vacation) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + vac.vacationDate + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.service.DeleteVacation(vac.id).subscribe((res) => {
                this.GetAllVacations();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            });

        }
    });
}


hideDialog() {
    this.service.vacationDialog = false;
    this.service.submitted = false;
}

saveVacation() {
    this.service.submitted = true;
    this.service.vacation.userId=JSON.parse(this.loginUser).id;
      this.service.vacation.userName=JSON.parse(this.loginUser).name;
      if(this.service.vacation.id>0){
        this.service.vacation.updatedBy =JSON.parse(this.loginUser).id;
        this.service.vacation.updatedDate=new Date();
      }else{
        this.service.vacation.createdBy =JSON.parse(this.loginUser).id;
        this.service.vacation.createdData=new Date();
      }
    this.service.PostVacation(this.service.vacation).subscribe(res => {
        this.GetAllVacations();
        this.service.vacationDialog = false;
        this.service.vacation = new Vacation();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    });
  
}


}

