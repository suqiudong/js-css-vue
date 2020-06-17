import { post, fetch, patch, put } from '../index'
const user = {
    login: function(paramObj) {
        return post('/v1/admin/auth/login/', paramObj);
    }, //登录

    quit: function(paramObj) {
        return fetch('/v1/admin/auth/logout/');
    }, //退出登录

    upload: function(paramObj) {
        return post('/v1/admin/common/upload-file/', paramObj)
    },

    getUserInfo: function(paramObj) {
        return fetch('/v1/admin/auth/user-info/', paramObj)
    }, //获取用户信息
}
export default user