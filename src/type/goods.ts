export interface ListInt {
    userId: number,
        id: number,
        title: string,
        introduce:string
}
export interface selectDataInt {
    title: string,
    introduce: string,
    page: number,
    count: number,
    pagesize:number,
}
export class InitData {
    list: ListInt[] = []
    selectData: selectDataInt = {
        title: "",
        introduce: "",
        page: 1,
        count: 0,
        pagesize:5
    }
}