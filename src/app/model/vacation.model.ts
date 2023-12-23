export interface Vacation {
    id: number;
    userId: number;
    userName: string;
    vacationDate: Date;
    vacationType: number;
    status: number;
    notes: string;
    createdBy: number;
    createdData: Date;
    updatedBy: number;
    updatedDate: Date;
    isDeleted: boolean;
}
