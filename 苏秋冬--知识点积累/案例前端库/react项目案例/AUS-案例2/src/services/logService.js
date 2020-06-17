/**
 * 对应后端涉及的 API
 * User: jiaomx
 * Date: 2016/12/27
 * Time: 17:26
 */

// import xhr from './xhr/';
import fetch from './fetch';
// import fetch from 'isomorphic-fetch';
import { error, success} from 'UTIL/notification';
class LogService {

    async logQuery(option) {
        return fetch({
            url: '/LogManager/queryLog',
            data: option,
            success: function (data) {
                if (data.code == '0') {
                    success('查询成功 !');
                    return data.result.data;
                }
                error(data.msg);
                return [];
            }
        });
    }

    // logQuery(option) {
    //     let log = {};
    //     xhr({
    //         url: '/LogManager/queryLog',
    //         async: false,
    //         data: option,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 log = data;
    //                 success('查询成功 !');
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return log;
    // }

}

// 导出实例化对象
export default new LogService();
