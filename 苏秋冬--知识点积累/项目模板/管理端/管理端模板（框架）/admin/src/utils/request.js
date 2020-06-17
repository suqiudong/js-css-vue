// import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// // create an axios instance
// const service = axios.create({
//     // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request urlhttp://119.23.208.36:8003
//     baseURL: "http://119.23.208.36:8003", // url = base url + request urlhttp://119.23.208.36:8003
//     // withCredentials: true, // send cookies when cross-domain requests
//     timeout: 5000 // request timeout
// })

// // request interceptor
// service.interceptors.request.use(
//     config => {
//         // do something before request is sent

//         if (store.getters.token) {
//             // let each request carry token
//             // ['X-Token'] is a custom headers key
//             // please modify it according to the actual situation
//             config.headers['X-Token'] = getToken()
//         }
//         return config
//     },
//     error => {
//         // do something with request error
//         console.log(error) // for debug
//         return Promise.reject(error)
//     }
// )

// // response interceptor
// service.interceptors.response.use(
//     /**
//      * If you want to get http information such as headers or status
//      * Please return  response => response
//      */

//     /**
//      * Determine the request status by custom code
//      * Here is just an example
//      * You can also judge the status by HTTP Status Code
//      */
//     response => {
//         const res = response.data

//         // if the custom code is not 20000, it is judged as an error.
//         if (res.code !== 20000) {
//             Message({
//                 message: res.message || 'Error',
//                 type: 'error',
//                 duration: 5 * 1000
//             })

//             // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//             if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//                 // to re-login
//                 MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//                     confirmButtonText: 'Re-Login',
//                     cancelButtonText: 'Cancel',
//                     type: 'warning'
//                 }).then(() => {
//                     store.dispatch('user/resetToken').then(() => {
//                         location.reload()
//                     })
//                 })
//             }
//             return Promise.reject(new Error(res.message || 'Error'))
//         } else {
//             return res
//         }
//     },
//     error => {
//         console.log('err' + error) // for debug
//         Message({
//             message: error.message,
//             type: 'error',
//             duration: 5 * 1000
//         })
//         return Promise.reject(error)
//     }
// )

// export default service




import axios from 'axios'
import store from '@/store'
import router from '../router/index'
// import { message } from 'ant-design-vue';
import Vue from 'vue';
import { Loading } from 'element-ui';


// 创建axios实例
const service = axios.create({
    baseURL: 'http://119.23.208.36:8003', //测试地址
    // baseURL: 'http://119.23.208.36:8023', //演示地址
    headers: {
        'Authorization': ''
    },
    // timeout: 30000 // 请求超时时间
});

var loadingInstance;
// 请求发出前的拦截器
service.interceptors.request.use((req) => {
    // loadingInstance = Loading.service({
    //     lock: true,
    //     text: '加载中......',
    //     background: 'rgba(0, 0, 0, 0.7)'
    // }); //为所有请求添加loading
    //判断本地是否存在token
    var token = sessionStorage.getItem("token_test");
    if (token) {
        //为header添加token
        req.headers.Authorization = sessionStorage.getItem("token_test");
    }
    return req
}, (error) => {
    return Promise.reject(error)
});


// 响应的拦截器
service.interceptors.response.use(
    function(response) {
        //请求正常则返回
        // loadingInstance.close(); //关闭loading
        return Promise.resolve(response)
    },
    function(error) {
        console.log(error.response)
            // loadingInstance.close(); //关闭loading
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    alert('404,请求找不到！');
                    break;
                case 500:
                    alert('500,服务器错误！');
                    break;
                case 403:
                    alert('403,认证过期！');
                case 401:
                    alert('401,无权限！');
                case 500004:
                    router.push({
                        name: "login"
                    })
            }
        } else {
            alert('未知错误，可能是断网了！');
        };
        // 请求错误则向store commit这个状态变化
        const httpError = {
            hasError: true,
            status: error.response.status,
            statusText: error.response.statusText
        }
        store.commit('ON_HTTP_ERROR', httpError)
        return Promise.reject(error)
    }
);

export default service