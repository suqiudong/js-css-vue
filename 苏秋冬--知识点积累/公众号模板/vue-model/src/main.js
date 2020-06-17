// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import Cookies from 'js-cookie';
import axios from 'axios';
import { LoadingPlugin, ToastPlugin } from 'vux';
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin, { position: 'center' });
Vue.config.productionTip = false;
Vue.use(require('vue-wechat-title'));
axios.default.defaults.withCredentials = true;
// Vue.prototype.$axios = axios;



// router.beforeEach((to, from, next) => {
//     var cookies = Cookies.get("find_drug_token");
//     console.log(cookies);
//     var toPath = encodeURIComponent('?next=' + to.fullPath);
//     if (!cookies) {
//         window.localStorage.setItem("beforeLoginUrl", to.fullPath); // 保存用户进入的url‘/home’
//         window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8d03621af17085ad&redirect_uri=https%3A%2F%2Frddp.zjchilink.com%2Fapi%2Foauth' + toPath + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect');
//         next(localStorage.getItem("beforeLoginUrl"));
//         return false;
//     } else if (cookies) {
//         const base = require('./components/request/baseUrl.js');
//         base.default.defaults.headers.Authorization = 'JWT ' + cookies;
//         store.dispatch('getUserInfo');
//     };
//     next();
// })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});