export interface AuListInt{
    name: string
    roleId: number
    roleList?: AuListInt,
    viewRole?:string
}
export interface AuInt{
    id:number
    authority: number[]
}
export class AuInitData{
    Au: AuInt = {
        id: 0,
        authority:[]
}
    constructor(id: number, authority: number[]) {
        this.Au.id= id
        this.Au.authority=authority    
    }
    auList: AuListInt[] = []
    treeRef:any
}