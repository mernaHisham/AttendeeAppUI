export class Attendance {
    id: number=0;
    userId: number=0;
    userName: string="";
    attendanceDate: any=null;
    startDay: any=null;
    endDay: any=null;
    startBreak: any=null;
    endBreak: any=null;
    lag: number=0;
    comment: string="";
    notes: string="";
    createdBy: number=0;
    createdData: Date=new Date;
    updatedBy: number=0;
    updatedDate: Date=new Date;
    isDeleted: boolean=false;
    overtime:number=0;
    totalWorkMinutes:number=0;
    totalBreakMinutes:number=0;
}
export class AttendanceFilterRequest{
    userId:number=0;
    from :any;
    to:any;
}