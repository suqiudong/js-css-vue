/**
 * 对应后端涉及的 API
 * User: gaogy
 * Date: 2016/12/09
 * Time: 11:47
 */

import xhr from './xhr/'
import { error, success } from 'UTIL/notification';
class SystemPrivilegeService {
    readSystemPrivilege() {
        let systemPrivilege = {};
        xhr({
            url: '/RoleManager/list',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    systemPrivilege = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return systemPrivilege;
    }
    modifySystemPrivilege(data) {
        var hasModified = false;
        xhr({
            url: '/RoleManager/chownRole',
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
            return data.roleName;
        }
    }
    checkSysPrivilege(data) {
        let checkSysPrivilege = {};
        xhr({
            url: '/PrivilegeManager/checkSysPrivilege',
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
export default new SystemPrivilegeService()
