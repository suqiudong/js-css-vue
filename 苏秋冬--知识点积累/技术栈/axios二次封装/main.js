// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import { Button, message } from 'ant-design-vue';
import ElementUI from 'element-ui';
import 'ant-design-vue/dist/antd.css';
import '../theme/index.css';
import './statics/css/common.css';

// 富文本
// import tinymce from 'tinymce/tinymce'
// import Editor from '@statics/tinymce/tinymce-vue'
// import 'tinymce/themes/modern/theme'
// import tinymce from 'vue-tinymce-editor'
// Vue.component('tinymce', tinymce);


// import 'froala-editor/js/froala_editor.pkgd.min'

// //引入中文语言包
// import 'froala-editor/js/languages/zh_cn'

// //引入 Froala Editor css files.
// import 'froala-editor/css/froala_editor.pkgd.min.css'
// import 'font-awesome/css/font-awesome.css' //此处可在index.html中引入：font-awesome cdn地址：<link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
// import 'froala-editor/css/froala_style.min.css'

// // Import and use Vue Froala lib.
// import VueFroala from 'vue-froala-wysiwyg'
// Vue.use(VueFroala)


Vue.use(ElementUI, Button, message);
Vue.config.productionTip = false;
Vue.prototype.$message = message;

import { server } from './api/api'

import VueVideoPlayer from 'vue-video-player'

// import 'video.js/dist/video-js.css' // 引入样式

// import 'vue-video-player/src/custom-theme.css' // 引入样式

import 'videojs-flash'

Vue.use(VueVideoPlayer)


//定义全局变量
Vue.prototype.$server = server;

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem("token")) {
        store.commit("setToken", sessionStorage.getItem("token"))
    } else {
        alert("请先登录！");
        sessionStorage.setItem("token", "123")
    }
    next()
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})