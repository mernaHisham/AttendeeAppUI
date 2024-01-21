export class AttendanceRequest {
    id: number=0;
    AttendanceId: number=0;
    userName: string="";
    attendanceDate: any=null;
    startDay: any=null;
    endDay: any=null;
    startBreak: any=null;
    endBreak: any=null;
    notes: string="";
    createdBy: number=0;
    createdData: Date=new Date;
    updatedBy: number=0;
    updatedDate: Date=new Date;
    isDeleted: boolean=false;
    isApproved: boolean=false;
}
