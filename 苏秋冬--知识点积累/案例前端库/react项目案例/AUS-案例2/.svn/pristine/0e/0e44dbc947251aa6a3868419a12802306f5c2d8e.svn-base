// import xhr from './xhr/';
import fetch from './fetch';
import { error, success } from 'UTIL/notification';

class DataSourceConfService {
    // 读取数据源列表
    async readDataset() {
        return fetch({
            url: '/DataSource/list',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    return data;
                } else {
                    error(data.msg);
                }
            }
        });
    }

    /*
    readDataset() {
        let dataSourceList = {};
        xhr({
            url: '/DataSource/list',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    dataSourceList = data;

                } else {
                    error(data.msg);
                }
            }
        });
        return dataSourceList;
    }*/
    // 删除数据源
    async deleteDataSource(DataSourceName) {
        return fetch({
            url: '/DataSource/delete',
            async: false,
            data: DataSourceName,
            success: function (data) {
                if (data.code == '0') {
                    success('删除成功！');
                    return data.code;
                } else {
                    error(data.msg);
                }
            }
        });
    }
    /*
    deleteDataSource(DataSourceName) {
        xhr({
            url: '/DataSource/delete',
            async: false,
            data: DataSourceName,
            success: function (data) {
                if (data.code == '0') {
                    success('删除成功！');
                } else {
                    error(data.msg);
                }
            }
        });
    }
    */
    // 创建数据源
    async createDataScource(dataSourceOptions) {
        return fetch({
            url: '/DataSource/add',
            data: dataSourceOptions,
            success: function (data) {
                if (data.code == '0') {
                    success('创建成功！');
                    return data;
                } else {
                    error(data.msg);
                }
            }
        });
    }
    /*
    createDataScource(dataSourceOptions) {
        let code = {};
        xhr({
            url: '/DataSource/add',
            data: dataSourceOptions,
            success: function (data) {
                code = data;
                if (data.code == '0') {
                    success('创建成功！');
                } else {
                    error(data.msg);
                }
            }
        });
        return code;
    }*/

    // 更新及查看详情时，查询数据源详细信息
    async getDataSource(DataSource) {
        return fetch({
            url: '/DataSource/detail',
            data: DataSource,
            success: function (data) {
                if (data.code == '0') {
                    return data.result.detail;
                } else {
                    error(data.msg);
                }
            }
        });
    }
    /*
    getDataSource(DataSource) {
        let dataSourceDetail = {};
        xhr({
            url: '/DataSource/detail',
            data: DataSource,
            success: function (data) {
                if (data.code == '0') {
                    dataSourceDetail = data.result.detail;
                } else {
                    error(data.msg);
                }
            }
        });
        // 此时拿到数据源对象
        return dataSourceDetail;
    }*/
    // 判断数据源名称是否存在
    async isExists(dataSourceName) {
        return fetch({
            url: '/DataSource/list',
            async: false,
            data: dataSourceName,
            success: function (data) {
                let date = data.result.data;
                for (let i = 0; i < date.length; i++) {
                    if (date[i].dataSourceName == dataSourceName) {
                        return true;
                    }
                }
            }
        });
    }
    /*
    isExists(dataSourceName) {
        var isExists = false;
        xhr({
            url: '/DataSource/list',
            async: false,
            data: dataSourceName,
            success: function (data) {
                var date = data.result.data;
                for (let i = 0; i < date.length; i++) {
                   if (date[i].dataSourceName == dataSourceName) {
                      isExists = true;
                   }
                }
            }
        });
        return isExists;
    }*/

    // 修改数据集
    async modifyDataSource(dataSourceOptions) {
        return fetch({
            url: '/DataSource/modify',
            data: dataSourceOptions,
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    success('保存成功！');
                    return true;
                } else {
                    error(data.msg);
                }
            }
        });
    }
    /*
    modifyDataSource(dataSourceOptions) {
        var hasModified = false;
        xhr({
            url: '/DataSource/modify',
            data: dataSourceOptions,
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    success('保存成功！');
                    hasModified = true;
                } else {
                    error(data.msg);
                }
            }
        });
        if (hasModified) {
            return dataSourceOptions.dataSourceName;
        }
    }*/
    // 服务重启
    async restart() {
        return fetch({
            url: '/DataSource/restart',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    success('重启成功！');
                   return data.result.data;
                } else {
                    error(data.msg);
                }
            }
        });
    }
    /*
    restart() {
        let dataRestart = {};
        xhr({
            url: '/DataSource/restart',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    dataRestart = data.result.data;
                    success('重启成功！');
                } else {
                    error(data.msg);
                }
            }
        });
        return dataRestart;
    }*/
    // 测试数据源链接
    async testConnect(dataSource) {
        return fetch({
            url: '/DataSource/testConnect',
            async: false,
            data: dataSource,
            success: function (data) {
                if (data.code == '0') {
                    success('链接成功');
                    return true;
                } else {
                    error(data.msg);
                }
            }
        });
    }
    /*
    testConnect(dataSource) {
        let testIsEixt = false;
        xhr({
            url: '/DataSource/testConnect',
            async: false,
            data: dataSource,
            success: function (data) {
                if (data.code == '0') {
                    testIsEixt = true;
                    success('链接成功');
                } else {
                    error(data.msg);
                }
            }
        })
        return testIsEixt;
    }*/

    async syncSchemaInfo(dataSourceName) {
        return fetch({
            url: '/DataSource/syncSchemaInfo',
            async: false,
            data: dataSourceName,
            success: function (data) {
                if (data.code == '0') {
                    success('同步表信息成功');
                    return data.code;
                } else {
                    error(data.msg);
                    return -1;
                }
            }
        });
    }
    /*
    // 同步表信息
    syncSchemaInfo(dataSourceName) {
        let datalist = {};
        xhr({
            url: '/DataSource/syncSchemaInfo',
            async: false,
            data: dataSourceName,
            success: function (data) {
                if (data.code == '0') {
                    datalist = data.code;
                    success('同步表信息成功');
                } else {
                    error(data.msg);
                }
            }
        });
        return datalist;
    }*/
}

export default new DataSourceConfService();
