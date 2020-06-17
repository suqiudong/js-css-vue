/**
 * 对应后端涉及的 API
 * User: gaogy
 * Date: 2016/12/09
 * Time: 11:47
 */

import fetch from './fetch';
import { error } from 'UTIL/notification';
class ServiceMointorService {

    /**
     * 获取服务列表查询结果
     * @returns {{}}
     */
    async getServiceName() {
        return fetch({
            url: '/ServiceMointor/listName',
            success: function (data) {
                if (data.code == '0') {
                    if (data.code == '0') {
                        return data.result.data;
                    }
                }
                error(data.msg);
                return [];
            }
        });
    }


    /**
     * 获取监控列表查询结果
     * @returns {{}}
     */
    async getServiceMonitorList(options) {
        return fetch({
            url: '/LogManager/queryService',
            data: options,
            success: function (data) {
                if (data.code == '0') {
                    return data.result;
                }
                error(data.msg);
                return [];
            }
        });
    }

}
// 导出实例化对象
export default new ServiceMointorService()
