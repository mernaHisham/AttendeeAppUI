export class Device {
    id: number=0;
    deviceId: string="";
    isActive: boolean=true;
    confirmationCode: string="";
    createdBy: number=0;
    createdData: Date=new Date;
    updatedBy: number=0;
    updatedDate: Date=new Date;
    isDeleted: boolean=false;
    notes: string="";
}
export enum FilterStatusEnum
    {
        superAdmin = 0,
        Nordstern = 1,
        Abendstern = 2
    }