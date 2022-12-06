
export interface RoleInt{
    authority: number[],
    roleAu: number,
    roleName:string
}

export class RoleInitData{
    roleList: RoleInt[]=[]
}