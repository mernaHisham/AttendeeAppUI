import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Vacation } from '../model/vacation.model';
import { VacationService } from '../service/vacation.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  isLoading:boolean=false;
constructor(public service: VacationService, public messageService: MessageService, public confirmationService: ConfirmationService) { }

ngOnInit() {
    this.GetAllVacations();
}
GetAllVacations() {
  this.isLoading=true;
    this.service.GetAllVacations().subscribe((data) => {
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
    this.service.vacation.userId=1;
    this.service.vacation.userName="admin";

    this.service.PostVacation(this.service.vacation).subscribe(res => {
        this.GetAllVacations();
        this.service.vacationDialog = false;
        this.service.vacation = new Vacation();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    });
  
}


}

