/**
 * 对应后端涉及的 API
 * User: jiaomx
 * Date: 2016/12/19
 * Time: 17:29
 */

import xhr from './xhr/'
import fetch from './fetch';
import { success, error } from 'UTIL/notification';
class UsermanageService {

    /**
     * 获取用户列表请求逻辑
     * @returns {{}}
     */
    async readUsermanages() {
        return fetch({
            url: '/UserManager/listUser',
            success: function (data) {
                if (data.code == '0') {
                    return data;
                }
                error(data.msg);
                return {};
            }
        });
    }
    // readUsermanages() {
    //     let usermanageList = {};
    //     xhr({
    //         url: '/UserManager/listUser',
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 usermanageList = data;
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return usermanageList;
    // }

    /**
     * 用户删除事件
     * @param usertId
     */
    async delUser(names) {
        return fetch({
            url: '/UserManager/delete',
            data: {
                names: names
            },
            success: function (data) {
                if (data.code == '0') {
                    success('删除成功！');
                    return names;
                }
                for (let key in data.result.status) {
                    error('用户[' + key + ']删除失败！' + data.result.status[key]);
                }
            }
        });
    }
    // delUser(names) {
    //     let isDelSuccess = false;
    //     xhr({
    //         url: '/UserManager/delete',
    //         data: {
    //             names: names
    //         },
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 success('删除成功！');
    //                 isDelSuccess = true;
    //             }else {
    //                 for (let key in data.result.status) {
    //                     error('用户[' + key + ']删除失败！' + data.result.status[key]);
    //                 }
    //             }
    //         }
    //     });
    //     if (isDelSuccess) {
    //         return names;
    //     }
    // }

    /**
     * 用户重置密码事件
     * @param usertId
     */
    async resUserPass(userRecordUserName, md5Passwd) {
        return fetch({
            url: '/UserManager/modifyUserInfo',
            data: {
                userName: userRecordUserName,
                password: md5Passwd
            },
            success: function (data) {
                if (data.code == '0') {
                    return data;
                }
                error(data.msg);
                return {};
            }
        });
    }
    // resUserPass(userRecordUserName, md5Passwd) {
    //     let resUserPass = {}
    //     xhr({
    //         url: '/UserManager/modifyUserInfo',
    //         data: {
    //             userName: userRecordUserName,
    //             password: md5Passwd
    //         },
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 resUserPass = data;
    //             }else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return resUserPass;
    // }

    /**
     * 获取用户列表请求逻辑
     * @returns {{}}
     */
    async userDetail(userName) {
        return fetch({
            url: '/UserManager/getUserInfo',
            data: {userName: userName},
            success: function (data) {
                if (data.code == '0') {
                    return data;
                }
                error(data.msg);
                return {};
            }
        });
    }
    // userDetail(userName) {
    //     let userDetail = {};
    //     xhr({
    //         url: '/UserManager/getUserInfo',
    //         data: {
    //             userName: userName
    //         },
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 userDetail = data;
    //             }else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return userDetail;
    // }

    /**
     * 用户保存
     * @returns {{}}
     */
    async userUpdateSave(userDetailObj) {
        return fetch({
            url: '/UserManager/modifyUserInfo',
            data: {
                userName: userDetailObj.userName,
                phoneNo: userDetailObj.phoneNo,
                name: userDetailObj.name,
                email: userDetailObj.email,
                department: userDetailObj.department,
                position: userDetailObj.position
            },
            success: function (data) {
                if (data.code == '0') {
                    success('修改成功！');
                    return data;
                }
                error(data.msg);
                return {};
            }
        });
    }
    // userUpdateSave(userDetailObj) {
    //     let isUpdateSave = {};
    //     xhr({
    //         url: '/UserManager/modifyUserInfo',
    //         data: {
    //             userName: userDetailObj.userName,
    //             phoneNo: userDetailObj.phoneNo,
    //             name: userDetailObj.name,
    //             email: userDetailObj.email,
    //             department: userDetailObj.department,
    //             position: userDetailObj.position
    //         },
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 success('修改成功！');
    //                 isUpdateSave = data;
    //             }else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return isUpdateSave;
    // }

    /**
     * 添加用户
     * @returns {{}}
     */
    async addUserSave(addUserinfoObj) {
        return fetch({
            url: '/UserManager/create',
            data: {
                userName: addUserinfoObj.userName,
                password: addUserinfoObj.passwd,
                phoneNo: addUserinfoObj.phoneNo,
                name: addUserinfoObj.name,
                email: addUserinfoObj.email,
                department: addUserinfoObj.department,
                position: addUserinfoObj.position
            },
            success: function (data) {
                if (data.code == '0') {
                    success('添加成功！');
                    return data;
                }
                error(data.msg);
                return {};
            }
        });
    }
    // addUserSave(addUserinfoObj) {
    //     let isAddSuccess = {};
    //     xhr({
    //         url: '/UserManager/create',
    //         data: {
    //             userName: addUserinfoObj.userName,
    //             password: addUserinfoObj.passwd,
    //             phoneNo: addUserinfoObj.phoneNo,
    //             name: addUserinfoObj.name,
    //             email: addUserinfoObj.email,
    //             department: addUserinfoObj.department,
    //             position: addUserinfoObj.position
    //         },
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 isAddSuccess = data;
    //                 success('添加成功！');
    //             }else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return isAddSuccess;
    // }

    /**
     * 系统所有权限获取
     */
    getSysPrivilege() {
        let sysPrivilege = {};
        xhr({
            url: '/PrivilegeManager/listAllSysPrivilege',
            success: function(data) {
                if (data.code == '0') {
                    sysPrivilege = data;
                } else {
                    error(data.msg);
                }
            }
        })
        return sysPrivilege;
    }

    /**
     * 用户系统权限读取
     */
    userSysPrivilege(userName) {
        let userSysPrivilege = {};
        xhr({
            url: '/UserManager/getUserInfo',
            data: {
                userName: userName
            },
            success: function (data) {
                if (data.code == '0') {
                    userSysPrivilege = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return userSysPrivilege;
    }

    /**
     * 用户系统权限修改
     * @param data
     * @returns {*}
     */
    modifyUserSysPrivilege(data) {
        var hasModified = false;
        xhr({
            url: '/UserManager/chownUser',
            data: data,
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    success('修改成功 !');
                    hasModified = true;
                } else {
                    error(data.msg);
                }
            }
        });
        if (hasModified) {
            return data.userName;
        }
    }
}

// 导出实例化对象
export default new UsermanageService()
