/**
 * 对应后端涉及的 API
 * User: jiaomx
 * Date: 2017/2/21
 * Time: 17:26
 */
import xhr from './xhr/';
import { error, success} from 'UTIL/notification';
class JobManageService {

    /**
     * 作业列表
     * @returns {{}}
     */
    readJobList() {
        let jobList = {};
        xhr({
            url: '/JobManager/list',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    jobList = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return jobList;
    }

    /**
     * 作业上线
     * @returns {{}}
     */
    jobOnline(jobName) {
        let isOnlineSuccess = {};
        xhr({
            url: '/JobManager/onsch',
            async: false,
            data: {jobName: jobName},
            success: function (data) {
                if (data.code == '0') {
                    isOnlineSuccess = data;
                    success('上线成功！');
                } else {
                    error(data.msg);
                }
            }
        });
        return isOnlineSuccess;
    }

    /**
     * 作业下线
     * @returns {{}}
     */
    jobOffline(jobName) {
        let isOfflineSuccess = {};
        xhr({
            url: '/JobManager/offsch',
            async: false,
            data: {jobName: jobName},
            success: function (data) {
                if (data.code == '0') {
                    isOfflineSuccess = data;
                    success('下线成功！');
                } else {
                    error(data.msg);
                }
            }
        });
        return isOfflineSuccess;
    }


    /**
     * 作业删除
     * @returns {{}}
     */
    jobRemove(jobName) {
        let isRemoveSuccess = {};
        xhr({
            url: '/JobManager/delete',
            async: false,
            data: {jobName: jobName},
            success: function (data) {
                if (data.code == '0') {
                    isRemoveSuccess = data;
                    success('删除成功！');
                } else {
                    error(data.msg);
                }
            }
        });
        return isRemoveSuccess;
    }

    /**
     * 作业停止
     * @returns {{}}
     */
    jobStop(jobName) {
        let isStopSuccess = {};
        xhr({
            url: '/JobManager/killCurrent',
            async: false,
            data: {jobName: jobName},
            success: function (data) {
                if (data.code == '0') {
                    isStopSuccess = data;
                    success('作业停止成功！');
                } else {
                    error(data.msg);
                }
            }
        });
        return isStopSuccess;
    }

    /**
     * 作业执行
     * @returns {{}}
     */
    jobStart(jobName) {
        let isStartSuccess = {};
        xhr({
            url: '/JobManager/runOnce',
            async: false,
            data: {jobName: jobName},
            success: function (data) {
                if (data.code == '0') {
                    isStartSuccess = data;
                    success('作业开始执行！');
                } else {
                    error(data.msg);
                }
            }
        });
        return isStartSuccess;
    }

    /**
     * 数据集列表
     * @returns {{}}
     */
    dataSetsName() {
        let dataSetsName = {};
        xhr({
            url: '/DatasetManager/list',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    dataSetsName = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return dataSetsName;
    }

    /**
     * 新建作业
     * @returns {{}}
     */
    jobAdd(jobInfor) {
        let isAddSuccess = {};
        xhr({
            url: '/JobManager/create',
            async: false,
            data: jobInfor,
            success: function (data) {
                if (data.code == '0') {
                    isAddSuccess = data;
                    success('作业创建成功！')
                } else {
                    error(data.msg);
                }
            }
        });
        return isAddSuccess;
    }

    /**
     * 读取作业信息
     * @returns {{}}
     */
    readJobinfor(jobName) {
        let jobInfor = {};
        xhr({
            url: '/JobManager/get',
            async: false,
            data: {jobName: jobName},
            success: function (data) {
                if (data.code == '0') {
                    jobInfor = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return jobInfor;
    }

    /**
     * 修改作业
     * @returns {{}}
     */
    jobUpdate(jobInfor) {
        let isUpdateSuccess = {};
        xhr({
            url: '/JobManager/modify',
            async: false,
            data: jobInfor,
            success: function (data) {
                if (data.code == '0') {
                    isUpdateSuccess = data;
                    success('作业更新成功！')
                } else {
                    error(data.msg);
                }
            }
        });
        return isUpdateSuccess;
    }

     /**
     * 验证调度表达式
     */
    cronExpression(cronExpressionValue) {
        let iscronExpression = {};
        xhr({
            url: '/JobManager/cronValidate',
            async: false,
            data: {cronExpression: cronExpressionValue},
            success: function (data) {
                if (data.code == '0') {
                    iscronExpression = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return iscronExpression;
    }

     /**
     * 验证是否run
     */
    isRun(jobName) {
        let isRunning = {};
        xhr({
            url: '/JobManager/prepareModify',
            async: false,
            data: {jobName: jobName},
            success: function (data) {
                if (data.code == '0') {
                    isRunning = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return isRunning;
    }
    

     /**
     * 获取日志信息
     */
    logFile(jobName) {
        let log = {};
        xhr({
            url: '/JobManager/getLog',
            async: false,
            data: {jobName: jobName},
            success: function (data) {
                if (data.code == '0') {
                    log = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return log;
    }
}

// 导出实例化对象
export default new JobManageService()
