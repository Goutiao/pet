import service from "@/request/index"
import { loginFormInt } from "@/type/login"
export function login(data: loginFormInt) {
    return service({
        url: "/login",
        method: "POST",
        data
    })
}
//商品信息接口
export function getGoodsList() {
    return service({
        url: "/getGoodsList",
        method: "get",
        
    })
}
//角色信息接口
export function getRoleList() {
    return service({
        url: "/getRoleList",
        method: "get",
        
    })
}
//用户信息接口
export function getUserList() {
    return service({
        url: "/getUserList",
        method: "get",
        
    })
}

export function getAuList() {
    return service({
        url: "/getAuthorityList",
        method: "get",
        
    })
}

