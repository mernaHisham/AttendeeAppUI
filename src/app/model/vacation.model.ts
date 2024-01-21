export class Vacation {
    id: number=0;
    userId: number=0;
    userName: string="";
    vacationDate: any;
    startTime: any;
    endTime: any;
    vacationType: number=0;
    status: number=0;
    notes: string="";
    createdBy: number=0;
    createdData: Date=new Date;
    updatedBy: number=0;
    updatedDate: Date=new Date;
    isDeleted: boolean=false;
}
