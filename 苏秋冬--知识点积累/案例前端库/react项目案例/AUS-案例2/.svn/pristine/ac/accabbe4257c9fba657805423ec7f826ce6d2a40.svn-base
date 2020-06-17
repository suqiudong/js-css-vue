/**
 * 对应后端涉及的 API
 * User: gaogy
 * Date: 2016/12/09
 * Time: 11:47
 */

// import xhr from './xhr/';
import fetch from './fetch';
import { success, error } from 'UTIL/notification';

class DataViewService {

    /**
     * 获取sql查询结果
     * @returns {{}}
     */
    async getSqlResult(mqlOptions) {
        return fetch({
            url: '/DataSource/explain',
            data: mqlOptions,
            success: function (data) {
                if (data.code == '0') {
                    success('执行计划查询成功');
                    return data.result;
                }
                error(data.msg);
                return '';
            }
        });
    }

    // getSqlResult(mqlOptions) {
    //     let mqlResult = {};
    //     xhr({
    //         url: '/DataSource/explain',
    //         data: mqlOptions,
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 mqlResult = data.result;
    //                 success('执行计划查询成功');
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return mqlResult;
    // }

    /**
     * 执行计划查询结果
     * @returns {{}}
     */
    async getPlanResult(mqlOptions) {
        return fetch({
            url: '/DataSource/Sql',
            data: mqlOptions,
            success: function (data) {
                if (data.code == '0') {
                    success('数据查询成功');
                    return data.result.data;
                }
                error(data.msg);
                return {};
            }
        });
    }

    // getPlanResult(mqlOptions) {
    //     let mqlResult = {};
    //     xhr({
    //         url: '/DataSource/Sql',
    //         data: mqlOptions,
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 mqlResult = data.result.data;
    //                 success('数据查询成功');
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return mqlResult;
    // }

}
// 导出实例化对象
export default new DataViewService()
