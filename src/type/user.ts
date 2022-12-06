export interface UserInt{
    id: number,
    nickName: string,
    role:RoleInt[],
    userName:string,
}

export interface RoleInt {
    roleAu: number,
    roleName:string 
}
export interface SelectUserDataInt {
    roleAu: number,
    nickName:string
}
export interface ActiveInt{
    id: number,
    nickName: string,
    role:number[],
    userName:string,
}
export interface SelectRoleDataInt {
    authority: number[],
    roleName: string,
    roleAu:number
}

export class InitData {
    userlist: UserInt[] = []
    selectUserData: SelectUserDataInt = {
        nickName: "",
      roleAu: 3
    }
    roleList: SelectRoleDataInt[] = []
    isShow=false
    active:ActiveInt={
    id: 0,
    nickName: "",
    role:[],
    userName:"",
}
    
}