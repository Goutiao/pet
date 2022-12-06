export interface loginFormInt {
    username: string
    password: string
}

export class LoginData {
    ruleForm: loginFormInt = {
        username: "",
        password: ""
    }
}