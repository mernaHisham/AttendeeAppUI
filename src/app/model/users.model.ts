export class Users {
    id: number=0;
    firstName: string='';
    lastName: string='';
    userName: string='';
    password: string='';
    email: string='';
    phoneNumber: string='';
    weeklyHours: number=0;
    startDate: Date= new Date;
    endDate: Date= new Date;
    isActive: boolean=true;
    address: string='';
    fkRoleId: number=0;
    notes: string='';
    createdBy: number=0;
    createdData: Date= new Date;
    updatedBy: number=0;
    updatedDate: Date= new Date;
    isDeleted: boolean=false;
}
