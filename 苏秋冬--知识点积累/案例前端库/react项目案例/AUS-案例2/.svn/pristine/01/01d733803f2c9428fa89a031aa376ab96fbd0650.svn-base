/**
 * 对应后端涉及的 API
 * User: jiaomx
 * Date: 2016/12/27
 * Time: 17:26
 */
import xhr from './xhr/';
import { error, success } from 'UTIL/notification';
class PluginManageService {

    /**
     * 插件列表
     * @returns {{}}
     */
    pluginList() {
        let pluginList = {};
        xhr({
            url: '/PluginManager/list',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    pluginList = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return pluginList;
    }
    /**
     * 插件是否在使用
     * @returns {{}}
     */
    isUsePlugin(pluginName) {
        let isUsePlugin = {};
        xhr({
            url: '/PluginManager/isBeingUsed',
            data: {pluginName: pluginName},
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    isUsePlugin = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return isUsePlugin;
    }

    /**
     * get插件信息
     * @returns {{}}
     */
    lastPluginInfo(pluginName) {
        let lastPluginInfo = {};
        xhr({
            url: '/PluginManager/get',
            data: {pluginName: pluginName},
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    lastPluginInfo = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return lastPluginInfo;
    }

    /**
     * 安装插件信息
     * @returns {{}}
     */
    pluginInstall(install) {
        let pluginInstall = {};
        xhr({
            url: '/PluginManager/install',
            async: false,
            data: install,
            success: function (data) {
                if (data.code == '0') {
                    pluginInstall = data;
                    success('安装成功！')
                } else {
                    error(data.msg);
                }
            }
        });
        return pluginInstall;
    }

    /**
     * 安装更新信息
     * @returns {{}}
     */
    pluginUpdate(install) {
        let pluginInstall = {};
        xhr({
            url: '/PluginManager/modify',
            async: false,
            data: install,
            success: function (data) {
                if (data.code == '0') {
                    pluginInstall = data;
                    success('安装成功！')
                } else {
                    error(data.msg);
                }
            }
        });
        return pluginInstall;
    }

    /**
     * 删除插件
     * @returns {{}}
     */
    pluginRemove(pluginRemoveinfo) {
        let pluginRemove = {};
        xhr({
            url: '/PluginManager/uninstall',
            async: false,
            data: pluginRemoveinfo,
            success: function (data) {
                if (data.code == '0') {
                    pluginRemove = data;
                    success('卸载成功！')
                } else {
                    error(data.msg);
                }
            }
        });
        return pluginRemove;

    }

    /**
     * 插件作业列表
     * @returns {{}}
     */
    JobList(pluginName) {
        let pluginJobList = {};
        xhr({
            url: '/PluginManager/getRelatedJobsByPluginName',
            async: false,
            data: {pluginName: pluginName},
            success: function (data) {
                if (data.code == '0') {
                    pluginJobList = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return pluginJobList;
    }

        

}

// 导出实例化对象
export default new PluginManageService()
