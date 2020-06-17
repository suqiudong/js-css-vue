import driverManageService from 'SERVICE/driverManageService'
// ================================
// Action Type
// ================================
const READ_DRIVER_LIST = 'READ_DRIVER_LIST';
const DRIVER_FILE_INFO = 'DRIVER_FILE_INFO';
const SAVE_SELECT_DRIVER = 'SAVE_SELECT_DRIVER';
const IS_USE_DRIVER = 'IS_USE_DRIVER';
const DRIVER_UPDATE_TYPE = 'DRIVER_UPDATE_TYPE';
const LAST_DRIVER_INFO = 'LAST_DRIVER_INFO';
const DRIVER_INSTALL = 'DRIVER_INSTALL';
const DRIVER_UPDATE = 'DRIVER_UPDATE';
const DRIVER_REMOVE = 'DRIVER_REMOVE';
const JOB_DRIVER_INFO = 'JOB_DRIVER_INFO';


// ================================
// Action Creator
// ================================

const readDriverList = () => {
    return async function(dispatch) {
        let driverList = await driverManageService.driverList();
        dispatch({
            type: 'READ_DRIVER_LIST',
            payload: {
                driverList: driverList
            }
        })
    }
};
// const readDriverList = () => {
// 	let driverList = driverManageService.driverList();
//     return {
//         type: 'READ_DRIVER_LIST',
//         payload: {
//             driverList: driverList
//         }
//     }
// };

const driverFileInfo = (fileInfo) => {
    return {
        type: 'DRIVER_FILE_INFO',
        payload: {
            fileInfo: fileInfo
        }
    }
};

const saveSelectDriver = (driverData) => {
    return {
        type: 'SAVE_SELECT_DRIVER',
        payload: {
            driverData: driverData
        }
    }
};

const isUseDriver = (driverName) => {
    let isUse = driverManageService.isUseDriver(driverName);
    return {
        type: 'IS_USE_DRIVER',
        payload: {
            isUse: isUse
        }
    }
};
const driverUpdateType = (opType) => {
    return {
        type: 'DRIVER_UPDATE_TYPE',
        payload: {
            opType: opType
        }
    }
};
const lastDriverInfo = (driverName) => {
    let lastDriverData = driverManageService.lastDriverInfo(driverName);
    return {
        type: 'LAST_DRIVER_INFO',
        payload: {
            lastDriverData: lastDriverData
        }
    }
};

const jobDriverInfo = (driverName) => {
    let jobList = driverManageService.JobList(driverName);
    return {
        type: 'JOB_DRIVER_INFO',
        payload: {
            jobList: jobList
        }
    }
};

const driverInstall = (install, callback) => {
    return async function(dispatch) {
        let isInstall = await driverManageService.driverInstall(install, callback);
        dispatch({
            type: 'DRIVER_INSTALL',
            payload: {
                isRemoveSuccess: isInstall
            }
        })
    }
};
// const driverInstall = (install) => {
//     let isInstall = driverManageService.driverInstall(install);
//     return {
//         type: 'DRIVER_INSTALL',
//         payload: {
//             isInstall: isInstall
//         }
//     }
// };

const driverUpdate = (install) => {
    let isUpdateSuccess = driverManageService.driverUpdate(install);
    return {
        type: 'DRIVER_UPDATE',
        payload: {
            isUpdateSuccess: isUpdateSuccess
        }
    }
};

const driverRemove = (driverRemove, callback) => {
    return async function(dispatch) {
        let isRemoveSuccess = await driverManageService.driverRemove(driverRemove, callback);
        dispatch({
            type: 'DRIVER_REMOVE',
            payload: {
                isRemoveSuccess: isRemoveSuccess
            }
        })
    }
};
// const driverRemove = (driverRemove) => {
//     let isRemoveSuccess = driverManageService.driverRemove(driverRemove);
//     return {
//         type: 'DRIVER_REMOVE',
//         payload: {
//             isRemoveSuccess: isRemoveSuccess
//         }
//     }
// };

/* default 导出所有 Actions Creator */
export default {
    readDriverList, driverFileInfo, saveSelectDriver, isUseDriver, driverUpdateType, lastDriverInfo, driverInstall, driverUpdate, driverRemove, jobDriverInfo
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_DRIVER_LIST]: (driverManage, { payload }) => Object.assign({}, driverManage, { driverList: payload.driverList}),
    [DRIVER_FILE_INFO]: (driverManage, { payload }) => Object.assign({}, driverManage, { fileInfo: payload.fileInfo}),
    [SAVE_SELECT_DRIVER]: (driverManage, { payload }) => Object.assign({}, driverManage, { driverData: payload.driverData}),
    [IS_USE_DRIVER]: (driverManage, { payload }) => Object.assign({}, driverManage, { isUse: payload.isUse}),
    [DRIVER_UPDATE_TYPE]: (driverManage, { payload }) => Object.assign({}, driverManage, { opType: payload.opType}),
    // [DRIVER_UPDATE]: (driverManage, { payload }) => Object.assign({}, driverManage, { isUpdateSuccess: payload.isUpdateSuccess}),
    // [DRIVER_INSTALL]: (driverManage, { payload }) => Object.assign({}, driverManage, { isInstall: payload.isInstall}),
    [LAST_DRIVER_INFO]: (driverManage, { payload }) => { driverManage.lastDriverData = payload.lastDriverData; return driverManage; },
    [DRIVER_INSTALL]: (driverManage, { payload }) => { driverManage.isInstall = payload.isInstall; return driverManage; },
    [DRIVER_UPDATE]: (driverManage, { payload }) => { driverManage.isUpdateSuccess = payload.isUpdateSuccess; return driverManage; },
    [DRIVER_REMOVE]: (driverManage, { payload }) => { driverManage.isRemoveSuccess = payload.isRemoveSuccess; return driverManage; },
    [JOB_DRIVER_INFO]: (driverManage, { payload }) => { driverManage.jobList = payload.jobList; return driverManage; }
};
