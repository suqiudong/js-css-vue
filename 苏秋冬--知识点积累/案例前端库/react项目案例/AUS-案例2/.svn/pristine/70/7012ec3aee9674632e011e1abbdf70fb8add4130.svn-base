/**
 * 对应后端涉及的 API
 * User: gaogy
 * Date: 2016/12/09
 * Time: 11:47
 */

import xhr from './xhr/'
import { error } from 'UTIL/notification';
class NodeServerManageService {

    /**
     * 获取节点列表查询结果
     * @returns {{}}
     */
    getNodeServerList () {
        let nodeList = {};
        xhr({
            url: 'NodeServerManage/nodeList',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    nodeList = data.result.data;
                } else {
                    error(data.msg);
                }
            }
        });
        return nodeList;
    }


    /**
     * 获取服务列表查询结果
     * @returns {{}}
     */
    getServerList () {
        let serverList = {};
        xhr({
            url: '/NodeServerManage/serverList',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    serverList = data.result.data;
                } else {
                    error(data.msg);
                }
            }
        });
        return serverList;
    }

    /**
     * 新增节点服务列表
     * @returns {{}}
     */
    addNodeServerList (options) {
        let result = {};
        xhr({
            url: '/NodeServerManage/add',
            async: false,
            data: options,
            success: function (data) {
                if (data.code == '0') {
                    result = data.result.data;
                } else {
                    error(data.msg);
                }
            }
        });
        return result;
    }

}
// 导出实例化对象
export default new NodeServerManageService()
