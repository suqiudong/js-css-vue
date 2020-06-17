// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import store from './store/index';
import 'ant-design-vue/dist/antd.css'
// import 'ant-design-vue/dist/antd.less'
Vue.use(Antd)

Vue.config.productionTip = false
import { server } from './api/api'
Vue.prototype.$server = server

router.beforeEach((to, from, next) => {
        if (to.meta.requireAuth) {
            if (sessionStorage.getItem("token")) {
                store.commit("setToken", sessionStorage.getItem("token"))
                next()
            } else {
                alert("请先登录！");
                router.push({
                    path: '/'
                })
                sessionStorage.setItem("token", "123")
            }
        } else {
            next()
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})