import axios from 'axios'

const service = axios.create({
    baseURL: "https://www.fastmock.site/mock/6e51746f8783181fc25bc12110c40832/api",
    timeout: 5000,
    headers: {
        "Content-type": "application/json;charset=utf-8"
    },
    withCredentials: true
})
//请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') || ""
    }
    return config
})

//响应拦截

service.interceptors.response.use((res) => {
    const code: number = res.data.code
    if (code == 200 ) {
        return res.data
    }
  
    return Promise.reject(res.data)
},
    (err) => {
        console.log(err)
    })

export default service 