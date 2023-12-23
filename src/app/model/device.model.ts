export interface Device {
    id: number;
    deviceId: string;
    isActive: boolean;
    confirmationCode: string;
    createdBy: number;
    createdData: Date;
    updatedBy: number;
    updatedDate: Date;
    isDeleted: boolean;
    notes: string;
}
