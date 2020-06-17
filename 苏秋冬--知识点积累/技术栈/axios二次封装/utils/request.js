import axios from 'axios'
import store from '@/store'
import { message } from 'ant-design-vue';
import { Toast } from 'ant-design-vue';
import Vue from 'vue';
import { Loading } from 'element-ui';
// let loadingInstance = Loading.service({
//     lock: true,
//     text: '加载中......',
//     background: 'rgba(0, 0, 0, 0.7)'
// }); //为所有请求添加loading

// 创建axios实例
const service = axios.create({
    baseURL: 'http://192.168.101.240:3000',
    headers: {
        'Authorization': ''
    },
    timeout: 15000 // 请求超时时间
});


// 请求发出前的拦截器
service.interceptors.request.use((req) => {
    //判断本地是否存在token
    var token = store.state.token;
    if (token) {
        //为header添加token
        req.headers.Authorization = store.state.token;
    }
    return req
}, (error) => {
    return Promise.reject(error)
});


// 响应的拦截器
service.interceptors.response.use(
    function(response) {
        //请求正常则返回
        loadingInstance.close(); //关闭loading
        return Promise.resolve(response)
    },
    function(error) {
        console.log(error.response)
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    message.error('404,请求找不到！');
                    break;
                case 500:
                    message.error('500,服务器错误！');
                    break;
                case 403:
                    message.error('403,认证过期！');
                case 401:
                    message.error('401,无权限！');
            }
        } else {
            message.error('未知错误，可能是断网了！');
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