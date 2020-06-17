/**
 * 对应后端涉及的 API
 * User: gaogy
 * Date: 2016/12/09
 * Time: 11:47
 */

import xhr from './xhr/';
import { success, error } from 'UTIL/notification';
class ResPrivilegeService {

    readUsermanages() {
        let usermanageList = {};
        xhr({
            url: '/UserManager/listUser',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    usermanageList = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return usermanageList;
    }

    readRoleManage() {
        let roleManageList = {};
        xhr({
            url: '/RoleManager/listRole',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    roleManageList = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return roleManageList;
    }

    /**
     * 读取作业信息
     * @returns {{}}
     */
    readJobinfor(jobName) {
        let jobInfor = {};
        xhr({
            url: '/JobManager/get',
            async: false,
            data: {jobName: jobName},
            success: function (data) {
                if (data.code == '0') {
                    jobInfor = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return jobInfor;
    }

    readResPrivilege(data) {
        let resPrivilege = {};
        xhr({
            url: '/PrivilegeManager/listResourcePrivilege',
            async: false,
            data: data,
            success: function (data) {
                if (data.code == '0') {
                    resPrivilege = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return resPrivilege;
    }
    createResPrivilege(data) {
        var hasModified = false;
        xhr({
            url: '/PrivilegeManager/createResourcePrivilege',
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
            return data;
        }
    }
    checkResPrivilege(data) {
        let checkSysPrivilege = {};
        xhr({
            url: '/PrivilegeManager/checkResPrivilege',
            data: data,
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    checkSysPrivilege = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return checkSysPrivilege;
    }
}

// 导出实例化对象
export default new ResPrivilegeService()
