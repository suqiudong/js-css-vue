import xhr from './xhr/';
import { error, success } from 'UTIL/notification';

class DatasetService {
    // 读取数据集列表
    readDataset() {
        let datasetList = {};
        xhr({
            url: '/DatasetManager/listDataset',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    datasetList = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return datasetList;
    }
    // 删除数据集
    deleteDataset(DatasetId) {
        var isDelSuccess = false;
        xhr({
            url: '/DatasetManager/deleteDataset',
            async: false,
            data: {
                names: DatasetId
            },
            success: function (data) {
                if (data.code == '0') {
                    success('删除成功！');
                    isDelSuccess = true;
                } else {
                    for (let key in data.result.status) {
                        error('数据集[' + key + ']删除失败！' + data.result.status[key]);
                    }
                }
            }
        });
        if (isDelSuccess) {
            return DatasetId;
        }
    }
    // 创建数据集
    createDataset(datasetOptions) {
        let code = {};
        xhr({
            url: '/DatasetManager/createDataset',
            data: datasetOptions,
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
    }
    // 查看数据集详情
    getDataset(DatasetId) {
        let datasetDetail = {};
        xhr({
            url: '/DatasetManager/get',
            data: {
                datasetName: DatasetId
            },
            success: function (data) {
                if (data.code == '0') {
                    datasetDetail = data.result.detail;
                } else {
                    error(data.msg);
                }
            }
        });
        // 此时拿到数据集对象
        return datasetDetail;
    }
    // 修改数据集
    modifyDataset(datasetOptions) {
        var hasModified = false;
        xhr({
            url: '/DatasetManager/modifyDataset',
            data: datasetOptions,
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    success('修改成功！');
                    hasModified = true;
                } else {
                    error(data.msg);
                }
            }
        });
        if (hasModified) {
            return datasetOptions.datasetName;
        }
    }

    isExists(datasetName) {
        var isExists = false;
        xhr({
            url: '/DatasetManager/isExists',
            async: false,
            data: {
                datasetName: datasetName
            },
            success: function (data) {
                if (data.result.detail == true) {
                    isExists = true;
                }
            }
        });
        return isExists;
    }

    listAnalyzers() {
        let datasetDetail = {};
        xhr({
            url: '/DatasetManager/listAnalyzers',
            success: function (data) {
                if (data.code == '0') {
                    datasetDetail = data.result.data;
                } else {
                    error(data.msg);
                }
            }
        });
        return datasetDetail;
    }

    getMaxSettingNums() {
        let maxSettingNums = {};
        xhr({
            url: '/DatasetManager/getMaxSettingNums',
            success: function (data) {
                if (data.code == '0') {
                    maxSettingNums = JSON.parse(data.result);
                } else {
                    error(data.msg);
                }
            }
        });
        return maxSettingNums;
    }
}

export default new DatasetService();
