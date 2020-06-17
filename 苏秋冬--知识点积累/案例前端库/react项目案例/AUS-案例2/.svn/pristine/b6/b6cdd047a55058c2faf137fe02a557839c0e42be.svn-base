/**
 * 对应后端涉及的 API
 * User: gaogy
 * Date: 2016/12/09
 * Time: 11:47
 */

import xhr from './xhr/'
import { error } from 'UTIL/notification';
class NodeMonitorService {

    /**
     * 获取节点列表查询结果
     * @returns {{}}
     */
    getNodeMonitorList () {
        let nodeList = {};
        xhr({
            url: 'NodeMonitor/list',
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

}
// 导出实例化对象
export default new NodeMonitorService()
