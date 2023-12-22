export interface Attendance {
    id: number;
    userId: number;
    userName: string;
    attendanceDate: Date;
    startDay: Date;
    endDay: Date;
    startBreak: Date;
    endBreak: Date;
    lag: number;
    comment: string;
    notes: string;
    createdBy: number;
    createdData: Date;
    updatedBy: number;
    updatedDate: Date;
    isDeleted: boolean;
}
