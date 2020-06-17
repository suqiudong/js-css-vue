import jobManageService from 'SERVICE/jobManageService'
import pluginManageService from 'SERVICE/pluginManageService'
// ================================
// Action Type
// ================================
const READ_JOB_LIST = 'READ_JOB_LIST';
const SELECT_JOB = 'SELECT_JOB';
const JOB_ONLINE = 'JOB_ONLINE';
const JOB_OFFLINE = 'JOB_OFFLINE';
const JOB_REMOVE = 'JOB_REMOVE';
const JOB_STOP = 'JOB_STOP';
const JOB_START = 'JOB_START';
const READ_PLUGIN_LIST = 'READ_PLUGIN_LIST';
const DATA_SETS_NAME = 'DATA_SETS_NAME';
const JOB_ADD = 'JOB_ADD';
const READ_JOB_INFOR = 'READ_JOB_INFOR';
const REDIO = 'REDIO';
const CONFIGS = 'CONFIGS';
const JOB_UPDATE = 'JOB_UPDATE';
const CROEXPRESSION = 'CROEXPRESSION';
const ISRUNNING = 'ISRUNNING';
const LOG = 'LOG';


// ================================
// Action Creator
// ================================
const readJobList = () => {
	let jobList = jobManageService.readJobList();
    if (jobList.code == 0) {
        for (let i = 0; i < jobList.result.data.length; i++) {
            jobList.result.data[i].runStatus == 'RUNNING' ? jobList.result.data[i].runStatus = '执行中' : jobList.result.data[i].runStatus = '待执行'
            jobList.result.data[i].scheduleStrategy == 'CYCLE' ? jobList.result.data[i].scheduleStrategy = '周期' : jobList.result.data[i].scheduleStrategy = '一次'
        }
    }
    console.log(jobList)
    return {
        type: 'READ_JOB_LIST',
        payload: {
            jobList: jobList
        }
    }
};

const readPluginList = () => {
    let pluginList = pluginManageService.pluginList();
    return {
        type: 'READ_PLUGIN_LIST',
        payload: {
            pluginList: pluginList
        }
    }
};

const saveSelectjob = (selectJobDate) => {
    return {
        type: 'SELECT_JOB',
        payload: {
            selectJobDate: selectJobDate
        }
    }
};

const jobOnline = (jobName) => {
    let isOnlineSuccess = jobManageService.jobOnline(jobName);
    return {
        type: 'JOB_ONLINE',
        payload: {
            isOnlineSuccess: isOnlineSuccess
        }
    }
};

const jobOffline = (jobName) => {
    let isOfflineSuccess = jobManageService.jobOffline(jobName);
    return {
        type: 'JOB_OFFLINE',
        payload: {
            isOfflineSuccess: isOfflineSuccess
        }
    }
};

const jobRemove = (jobName) => {
    let isRemoveSuccess = jobManageService.jobRemove(jobName);
    return {
        type: 'JOB_REMOVE',
        payload: {
            isRemoveSuccess: isRemoveSuccess
        }
    }
};

const jobStop = (jobName) => {
    let isStopSuccess = jobManageService.jobStop(jobName);
    return {
        type: 'JOB_STOP',
        payload: {
            isStopSuccess: isStopSuccess
        }
    }
};

const jobStart = (jobName) => {
    let isSartSuccess = jobManageService.jobStart(jobName);
    return {
        type: 'JOB_START',
        payload: {
            isSartSuccess: isSartSuccess
        }
    }
};

const dataSetsName = () => {
    let dataSetsName = jobManageService.dataSetsName();
    return {
        type: 'DATA_SETS_NAME',
        payload: {
            dataSetsName: dataSetsName
        }
    }
};

const jobAdd = (jobInfor) => {
    let isjobAddSuccess = jobManageService.jobAdd(jobInfor);
    return {
        type: 'JOB_ADD',
        payload: {
            isjobAddSuccess: isjobAddSuccess
        }
    }
};

const readJobinfor = (jobName) => {
    let jobInfor = jobManageService.readJobinfor(jobName);
    return {
        type: 'READ_JOB_INFOR',
        payload: {
            jobInfor: jobInfor
        }
    }
};

const radio = (radioType) => {
    return {
        type: 'REDIO',
        payload: {
            radioType: radioType
        }
    }
};

const configs = (config) => {
    return {
        type: 'CONFIGS',
        payload: {
            config: config
        }
    }
};

const jobUpdate = (jobInfor) => {
    let isjobUpdateSuccess = jobManageService.jobUpdate(jobInfor);
    return {
        type: 'JOB_UPDATE',
        payload: {
            isjobUpdateSuccess: isjobUpdateSuccess
        }
    }
};

const cronExpression = (cronExpressionValue) => {
    let iscronExpression = jobManageService.cronExpression(cronExpressionValue);
    return {
        type: 'CROEXPRESSION',
        payload: {
            iscronExpression: iscronExpression
        }
    }
};

const isRun = (jobName) => {
    let isRunning = jobManageService.isRun(jobName);
    return {
        type: 'ISRUNNING',
        payload: {
            isRunning: isRunning
        }
    }
};

const logFile = (jobName) => {
    let log = jobManageService.logFile(jobName);
    return {
        type: 'LOG',
        payload: {
            log: log
        }
    }
};

/* default 导出所有 Actions Creator */
export default {
    readJobList, saveSelectjob, jobOnline, jobOffline, jobRemove, jobStop, jobStart, readPluginList, dataSetsName, jobAdd, readJobinfor, radio, configs, jobUpdate, cronExpression, isRun, logFile
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_JOB_LIST]: (jobManage, { payload }) => Object.assign({}, jobManage, { jobList: payload.jobList}),
    [SELECT_JOB]: (jobManage, { payload }) => Object.assign({}, jobManage, { selectJobDate: payload.selectJobDate}),
    [JOB_ONLINE]: (jobManage, { payload }) => Object.assign({}, jobManage, { isOnlineSuccess: payload.isOnlineSuccess}),
    [JOB_OFFLINE]: (jobManage, { payload }) => Object.assign({}, jobManage, { isOfflineSuccess: payload.isOfflineSuccess}),
    [JOB_REMOVE]: (jobManage, { payload }) => Object.assign({}, jobManage, { isRemoveSuccess: payload.isRemoveSuccess}),
    [JOB_STOP]: (jobManage, { payload }) => Object.assign({}, jobManage, { isStopSuccess: payload.isStopSuccess}),
    [JOB_START]: (jobManage, { payload }) => Object.assign({}, jobManage, { isSartSuccess: payload.isSartSuccess}),
    [READ_PLUGIN_LIST]: (jobManage, { payload }) => { jobManage.pluginList = payload.pluginList; return jobManage; },
    // [DATA_SETS_NAME]: (jobManage, { payload }) => { jobManage.dataSetsName = payload.dataSetsName; return jobManage; },
    [JOB_ADD]: (jobManage, { payload }) => { jobManage.isjobAddSuccess = payload.isjobAddSuccess; return jobManage; },
    [READ_JOB_INFOR]: (jobManage, { payload }) => { jobManage.jobInfor = payload.jobInfor; return jobManage; },
    [REDIO]: (jobManage, { payload }) => Object.assign({}, jobManage, { radioType: payload.radioType}),
    [CONFIGS]: (jobManage, { payload }) => Object.assign({}, jobManage, { config: payload.config}),
    [DATA_SETS_NAME]: (jobManage, { payload }) => Object.assign({}, jobManage, { dataSetsName: payload.dataSetsName}),
    // [JOB_UPDATE]: (jobManage, { payload }) => Object.assign({}, jobManage, { isjobUpdateSuccess: payload.isjobUpdateSuccess}),
    [JOB_UPDATE]: (jobManage, { payload }) => { jobManage.isjobUpdateSuccess = payload.isjobUpdateSuccess; return jobManage; },
    [CROEXPRESSION]: (jobManage, { payload }) => { jobManage.iscronExpression = payload.iscronExpression; return jobManage; },
    [ISRUNNING]: (jobManage, { payload }) => { jobManage.isRunning = payload.isRunning; return jobManage; },
    [LOG]: (jobManage, { payload }) => { jobManage.log = payload.log; return jobManage; }
};
