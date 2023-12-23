export interface Users {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;
    weeklyHours: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    address: string;
    fkRoleId: number;
    notes: string;
    createdBy: number;
    createdData: Date;
    updatedBy: number;
    updatedDate: Date;
    isDeleted: boolean;
}
