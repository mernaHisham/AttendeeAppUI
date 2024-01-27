export class Users {
    id: number=0;
    firstName: string='';
    lastName: string='';
    userName: string='';
    password: string='';
    email: string='';
    phoneNumber: string='';
    weeklyHours: number=0;
    startDate: any;
    endDate: any;
    startTime:any;
    endTime:any;
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
export enum Roles{
    Admin=1,
    Employee=2
}

export enum AttendanceEnum
{
    OffLine = 1,
    Active = 2,
    OnBreak = 3,
    EndDay = 4,
    OnOverTime = 5
}