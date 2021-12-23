import axios from "axios";

axios.interceptors.request.use( 
    config => {
        if(localStorage.getItem('Authorization')){
            config.headers.Authorization = localStorage.getItem('Authorization')
        }
        return config
    },
    error => {
        return Promise.reject(error)
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const service = axios.create({
    baseURL: 'http://192.168.43.103:10010',
    withCredentials: false,
    timeout: 5000,
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
          },
    }
})

export default service