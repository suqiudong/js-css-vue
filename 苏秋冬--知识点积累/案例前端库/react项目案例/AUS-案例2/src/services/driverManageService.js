/**
 * 对应后端涉及的 API
 * User: jiaomx
 * Date: 2016/12/27
 * Time: 17:26
 */
import xhr from './xhr/';
import fetch from './fetch';
import { error, success } from 'UTIL/notification';
class DriverManageService {

    /**
     * 插件列表
     * @returns {{}}
     */
    async driverList() {
        return fetch({
            url: '/DriverManager/list',
            success: function (data) {
                if (data.code == '0') {
                    return data;
                }
                error(data.msg);
                return {};
            }
        });
    }
    // driverList() {
    //     let driverList = {};
    //     xhr({
    //         url: '/DriverManager/list',
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 driverList = data;
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return driverList;
    // }
    /**
     * 插件是否在使用
     * @returns {{}}
     */
    isUseDriver(driverName) {
        let isUseDriver = {};
        xhr({
            url: '/DriverManager/isBeingUsed',
            data: {driverName: driverName},
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    isUseDriver = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return isUseDriver;
    }

    /**
     * get插件信息
     * @returns {{}}
     */
    lastDriverInfo(driverName) {
        let lastDriverInfo = {};
        xhr({
            url: '/DriverManager/detail',
            data: {driverName: driverName},
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    lastDriverInfo = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return lastDriverInfo;
    }

    /**
     * 安装插件信息
     * @returns {{}}
     */
    async driverInstall(install, callback) {
        return fetch({
            url: '/DriverManager/install',
            data: install,
            success: function (data) {
                if (data.code == '0') {
                    success('安装成功');
                    callback();
                    return data;
                }
                error(data.msg);
                return {};
            }
        });
    }
    // driverInstall(install) {
    //     let driverInstall = {};
    //     xhr({
    //         url: '/DriverManager/install',
    //         async: false,
    //         data: install,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 driverInstall = data;
    //                 success('安装成功！')
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return driverInstall;
    // }

    /**
     * 安装更新信息
     * @returns {{}}
     */
    driverUpdate(install) {
        let driverInstall = {};
        xhr({
            url: '/DriverManager/modify',
            async: false,
            data: install,
            success: function (data) {
                if (data.code == '0') {
                    driverInstall = data;
                    success('安装成功！')
                } else {
                    error(data.msg);
                }
            }
        });
        return driverInstall;
    }

    /**
     * 删除插件
     * @returns {{}}
     */
    async driverRemove(driverName, callback) {
        return fetch({
            url: '/DriverManager/uninstall',
            data: driverName,
            success: function (data) {
                if (data.code == '0') {
                    success('卸载成功');
                    callback();
                    return data;
                }
                error(data.msg);
                return {};
            }
        });
    }
    // driverRemove(driverName) {
    //     let driverRemove = {};
    //     xhr({
    //         url: '/DriverManager/uninstall',
    //         async: false,
    //         data: driverName,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 driverRemove = data;
    //                 success('卸载成功！')
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return driverRemove;
    //
    // }

    /**
     * 插件作业列表
     * @returns {{}}
     */
    JobList(driverName) {
        let driverJobList = {};
        xhr({
            url: '/DriverManager/getRelatedJobsByDriverName',
            async: false,
            data: {driverName: driverName},
            success: function (data) {
                if (data.code == '0') {
                    driverJobList = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return driverJobList;
    }

        

}

// 导出实例化对象
export default new DriverManageService()
