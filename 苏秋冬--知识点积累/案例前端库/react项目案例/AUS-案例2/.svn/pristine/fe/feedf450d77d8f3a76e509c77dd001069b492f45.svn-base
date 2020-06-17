/**
 * 对应后端涉及的 API
 * User: gaogy
 * Date: 2016/12/09
 * Time: 11:47
 */

// import xhr from './xhr/';
import fetch from './fetch';
import { success, error } from 'UTIL/notification';
class DashboardService {

    /**
     * 获取仪表板列表请求逻辑
     * @returns {{}}
     */
    async readDashboards() {
        return fetch({
            url: '/DashboardManager/list',
            success: function (data) {
                if (data.code == '0') {
                    return data;
                }
                error(data.msg);
                return {};
            }
        });
    }
    // readDashboards() {
    //     let dashboardList = {};
    //     xhr({
    //         url: '/DashboardManager/list',
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 dashboardList = data;
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return dashboardList;
    // }

    /**
     * 仪表板删除事件
     * @param dashboardId
     */
    async delDashboard(dashboardId) {
        return fetch({
            url: '/DashboardManager/delete',
            data: {
                names: dashboardId
            },
            success: function (data) {
                if (data.code == '0') {
                    success('删除成功！');
                    window.location.replace('#/dashboard');
                    return dashboardId;
                } else {
                    for (let key in data.result.status) {
                        error('仪表板[' + key + ']删除失败！' + data.result.status[key]);
                    }
                }
            }
        });
    }
    // delDashboard(dashboardId) {
    //     var isDelSuccess = false;
    //
    //     xhr({
    //         url: '/DashboardManager/delete',
    //         data: {
    //             names: dashboardId
    //         },
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 success('删除成功！');
    //                 isDelSuccess = true;
    //                 window.location.replace('#/dashboard');
    //             } else {
    //                 for (let key in data.result.status) {
    //                     error('仪表板[' + key + ']删除失败！' + data.result.status[key]);
    //                 }
    //             }
    //         }
    //     });
    //
    //     if (isDelSuccess) {
    //         return dashboardId;
    //     }
    // }

    /**
     * MQL查询事件
     * @param options
     */
    async mqlSearch(mqlOptions) {
        return fetch({
            url: '/DashboardManager/search',
            data: mqlOptions,
            success: function (data) {
                if (data.code == '0') {
                    return data;
                }
                error(data.msg);
                return {};
            }
        });
    }
    // mqlSearch(mqlOptions) {
    //     let mqlResult = {};
    //     xhr({
    //         url: '/DashboardManager/search',
    //         data: mqlOptions,
    //         async: true,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 mqlResult = data;
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //
    //     return mqlResult;
    // }

    /**
     * 仪表板保存事件
     * @param dashboardName
     */
    async getDashboard(dashboardName) {
        return fetch({
            url: '/DashboardManager/get',
            data: {
                dashboardName: dashboardName
            },
            success: function (data) {
                if (data.code == '0') {
                    return data.result.detail;
                }
                error(data.msg);
                return {};
            }
        });
    }
    // getDashboard(dashboardName) {
    //     let dashboard = {};
    //     xhr({
    //         url: '/DashboardManager/get',
    //         data: {
    //             dashboardName: dashboardName
    //         },
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 dashboard = data.result.detail;
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return dashboard;
    // }

    /**
     * 仪表板新建事件
     * @param options
     */
    async addDashboard(dashboardOptions) {
        return fetch({
            url: '/DashboardManager/create',
            data: dashboardOptions,
            success: function (data) {
                if (data.code == '0') {
                    success('创建成功！');
                    window.location.replace('#/dashboard');
                } else {
                    error(data.msg);
                }
            }
        });
    }
    // addDashboard(dashboardOptions) {
    //     xhr({
    //         url: '/DashboardManager/create',
    //         data: dashboardOptions,
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 success('创建成功！');
    //                 window.location.replace('#/dashboard');
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    // }

    /**
     * 仪表板更新事件
     * @param options
     */
    async updateDashboard(dashboardOptions) {
        return fetch({
            url: '/DashboardManager/modify',
            data: dashboardOptions,
            success: function (data) {
                if (data.code == '0') {
                    success('更新成功！');
                    window.location.replace('#/dashboard');
                } else {
                    error(data.msg);
                }
            }
        });
    }
    // updateDashboard(dashboardOptions) {
    //     xhr({
    //         url: '/DashboardManager/modify',
    //         data: dashboardOptions,
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 success('更新成功！');
    //                 window.location.replace('#/dashboard');
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    // }

    /**
     * 获取报表列表请求逻辑
     * @returns {{}}
     */
    async getReportList() {
        return fetch({
            url: '/DashboardManager/list',
            success: function (data) {
                if (data.code == '0') {
                    return data.result.data;
                }
                error(data.msg);
                return [];
            }
        });
    }
    // getReportList() {
    //     let reportList = {};
    //     xhr({
    //         url: '/ReportManager/list',
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 reportList = data;
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return reportList;
    // }

    /**
     * 报表保存事件
     * @param reportName
     */
    async selectReport(reportName) {
        return fetch({
            url: '/ReportManager/get',
            data: {
                reportName: reportName
            },
            success: function (data) {
                if (data.code == '0') {
                    if (data.result.detail) {
                        return data.result.detail;
                    } else {
                        return {'reportName': reportName};
                    }
                } else {
                    error(data.msg);
                    return {};
                }
            }
        });
    }
    // selectReport(reportName) {
    //     let report = {};
    //     xhr({
    //         url: '/ReportManager/get',
    //         data: {
    //             reportName: reportName
    //         },
    //         async: false,
    //         success: function (data) {
    //             if (data.code == '0') {
    //                 if (data.result.detail) {
    //                     report = data.result.detail;
    //                 } else {
    //                     report.reportName = reportName;
    //                 }
    //             } else {
    //                 error(data.msg);
    //             }
    //         }
    //     });
    //     return report;
    // }

    // 仪表板发布

    /**
     * 仪表板发布登录请求事件
     * @param dashBoard
     */
    async login(data) {
        return fetch({
            url: '/DashboardManager/login',
            data: data,
            success: function (data) {
                if (data.code == '0') {
                    return data;
                }
                error(data.msg);
                return {};
            }
        });
    }

    /**
     * 仪表板发布请求数据事件
     * @param dashBoard
     */
    async dashBoardTransform(data, username) {
        let obj = {
            url: '/DashboardManager/dashBoardTransform',
            success: function (data) {
                if (data.code == '0') {
                    return data.result.detail;
                }
                error(data.msg);
                return {};
            }
        };
        if (username) {
            obj.url = '/DashboardManager/dashBoardTransform?username=' + username;
            obj.type = 'GET';
        } else {
            obj.data = data;
        }
        return fetch(obj);
    }

}

// 导出实例化对象
export default new DashboardService()
