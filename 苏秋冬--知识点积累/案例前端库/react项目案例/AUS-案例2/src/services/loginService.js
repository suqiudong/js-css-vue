/**
 * 对应后端涉及的 API
 * User: jiaomx
 * Date: 2016/12/27
 * Time: 17:26
 */

import xhr from './xhr/';
import { error } from 'UTIL/notification';
class ReportService {

    /**
     * 用户登录
     * @returns {{}}
     */
    login(userName, passwd) {
        let login = {};
        xhr({
            url: '/UserManager/validUser',
            async: false,
            data: {userName: userName, password: passwd},
            success: function (data) {
                if (data.code == '0') {
                    login = data;
                    sessionStorage.setItem('XDataUserName', userName);
                } else {
                    error(data.msg);
                }
            }
        });
        return login;
    }
    /**
     * 用户注销
     * @returns {{}}
     */
    logoff(userName) {
        let logoff = {};
        xhr({
            url: '/UserManager/logout',
            async: false,
            data: {userName: userName},
            success: function (data) {
                if (data.code == '0') {
                    logoff = data;
                    sessionStorage.removeItem('XDataUserName');
                    sessionStorage.removeItem('userRolePermission');
                }else {
                    error(data.msg);
                }
            }
        });
        return logoff;
    }

    /**
     * 用户权限获取
     * @returns {{}}
     */
    userRolePermission(userName) {
        let userRolePermission = {};
        let sessionPrivilege = '';
        xhr({
            url: '/PrivilegeManager/listSystemPrivilege',
            async: false,
            data: {userName: userName},
            success: function (data) {
                let privilege = data.result.detail;
                for (let key in privilege) {
                    for (let i = 0; i < privilege[key].length; i++) {
                        switch (privilege[key][i]) {
                            case '创建':
                                sessionPrivilege += key + '_CREATE ';
                                break;
                            case '修改':
                                sessionPrivilege += key + '_MODIFY ';
                                break;
                            case '删除':
                                sessionPrivilege += key + '_DELETE ';
                                break;
                            case '查看':
                                sessionPrivilege += key + '_QUERY ';
                                break;
                            case '重置密码':
                                sessionPrivilege += key + '_RESET ';
                                break;
                            case '执行':
                                sessionPrivilege += key + '_EXECUTE ';
                                break;
                            case '管理':
                                sessionPrivilege += key + '_ADMIN ';
                                break;
                            case '权限管理':
                                sessionPrivilege += key + '_ADMIN ';
                                break;
                            case '安装':
                                sessionPrivilege += key + '_INSTALL ';
                                break;
                            case '卸载':
                                sessionPrivilege += key + '_UNINSTALL ';
                                break;
                            case '分析':
                                sessionPrivilege += key + '_ANALYSIS ';
                                break;
                            case '操作':
                                sessionPrivilege += key + '_OPERATE ';
                                break;
                            case '查看日志':
                                sessionPrivilege += key + '_LOG ';
                                break;
                            case '授权':
                                sessionPrivilege += key + '_AUTHOR ';
                                break;
                            default:
                                sessionPrivilege += '';
                                break;
                        }
                    }
            }
                if (data.code == '0') {
                    userRolePermission = data;
                    sessionStorage.setItem('userRolePermission', sessionPrivilege);
                }else {
                    error(data.msg);
                }
            }
        });
        return userRolePermission;
    }

    /**
     * 激活获取
     * @returns {{}}
     */
    getActive() {
        let getActive = {};
        xhr({
            url: '/LicenseManager/validLicenseStatus',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    getActive = data;
                }else {
                    error(data.msg);
                }
            }
        });
        return getActive;
    }

}

// 导出实例化对象
export default new ReportService()
