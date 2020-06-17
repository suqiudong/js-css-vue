import pluginManageService from 'SERVICE/pluginManageService'
// ================================
// Action Type
// ================================
const READ_PLUGIN_LIST = 'READ_PLUGIN_LIST';
const PLUGIN_FILE_INFO = 'PLUGIN_FILE_INFO';
const SAVE_SELECT_PLUGIN = 'SAVE_SELECT_PLUGIN';
const IS_USE_PLUGIN = 'IS_USE_PLUGIN';
const PLUGIN_UPDATE_TYPE = 'PLUGIN_UPDATE_TYPE';
const LAST_PLUGIN_INFO = 'LAST_PLUGIN_INFO';
const PLUGIN_INSTALL = 'PLUGIN_INSTALL';
const PLUGIN_UPDATE = 'PLUGIN_UPDATE';
const PLUGIN_REMOVE = 'PLUGIN_REMOVE';
const JOB_PLUGIN_INFO = 'JOB_PLUGIN_INFO';


// ================================
// Action Creator
// ================================
const readPluginList = () => {
	let pluginList = pluginManageService.pluginList();
    return {
        type: 'READ_PLUGIN_LIST',
        payload: {
            pluginList: pluginList
        }
    }
};

const pluginFileInfo = (fileInfo) => {
    return {
        type: 'PLUGIN_FILE_INFO',
        payload: {
            fileInfo: fileInfo
        }
    }
};

const saveSelectPlugin = (pluginData) => {
    return {
        type: 'SAVE_SELECT_PLUGIN',
        payload: {
            pluginData: pluginData
        }
    }
};

const isUsePlugin = (pluginName) => {
    let isUse = pluginManageService.isUsePlugin(pluginName);
    return {
        type: 'IS_USE_PLUGIN',
        payload: {
            isUse: isUse
        }
    }
};
const pluginUpdateType = (opType) => {
    return {
        type: 'PLUGIN_UPDATE_TYPE',
        payload: {
            opType: opType
        }
    }
};
const lastPluginInfo = (pluginName) => {
    let lastPluginData = pluginManageService.lastPluginInfo(pluginName);
    return {
        type: 'LAST_PLUGIN_INFO',
        payload: {
            lastPluginData: lastPluginData
        }
    }
};

const jobPluginInfo = (pluginName) => {
    let jobList = pluginManageService.JobList(pluginName);
    return {
        type: 'JOB_PLUGIN_INFO',
        payload: {
            jobList: jobList
        }
    }
};

const pluginInstall = (install) => {
    let isInstall = pluginManageService.pluginInstall(install);
    return {
        type: 'PLUGIN_INSTALL',
        payload: {
            isInstall: isInstall
        }
    }
};

const pluginUpdate = (install) => {
    let isUpdateSuccess = pluginManageService.pluginUpdate(install);
    return {
        type: 'PLUGIN_UPDATE',
        payload: {
            isUpdateSuccess: isUpdateSuccess
        }
    }
};

const pluginRemove = (pluginRemove) => {
    let isRemoveSuccess = pluginManageService.pluginRemove(pluginRemove);
    return {
        type: 'PLUGIN_REMOVE',
        payload: {
            isRemoveSuccess: isRemoveSuccess
        }
    }
};

/* default 导出所有 Actions Creator */
export default {
    readPluginList, pluginFileInfo, saveSelectPlugin, isUsePlugin, pluginUpdateType, lastPluginInfo, pluginInstall, pluginUpdate, pluginRemove, jobPluginInfo
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_PLUGIN_LIST]: (pluginManage, { payload }) => Object.assign({}, pluginManage, { pluginList: payload.pluginList}),
    [PLUGIN_FILE_INFO]: (pluginManage, { payload }) => Object.assign({}, pluginManage, { fileInfo: payload.fileInfo}),
    [SAVE_SELECT_PLUGIN]: (pluginManage, { payload }) => Object.assign({}, pluginManage, { pluginData: payload.pluginData}),
    [IS_USE_PLUGIN]: (pluginManage, { payload }) => Object.assign({}, pluginManage, { isUse: payload.isUse}),
    [PLUGIN_UPDATE_TYPE]: (pluginManage, { payload }) => Object.assign({}, pluginManage, { opType: payload.opType}),
    // [PLUGIN_UPDATE]: (pluginManage, { payload }) => Object.assign({}, pluginManage, { isUpdateSuccess: payload.isUpdateSuccess}),
    // [PLUGIN_INSTALL]: (pluginManage, { payload }) => Object.assign({}, pluginManage, { isInstall: payload.isInstall}),
    [LAST_PLUGIN_INFO]: (pluginManage, { payload }) => { pluginManage.lastPluginData = payload.lastPluginData; return pluginManage; },
    [PLUGIN_INSTALL]: (pluginManage, { payload }) => { pluginManage.isInstall = payload.isInstall; return pluginManage; },
    [PLUGIN_UPDATE]: (pluginManage, { payload }) => { pluginManage.isUpdateSuccess = payload.isUpdateSuccess; return pluginManage; },
    [PLUGIN_REMOVE]: (pluginManage, { payload }) => { pluginManage.isRemoveSuccess = payload.isRemoveSuccess; return pluginManage; },
    [JOB_PLUGIN_INFO]: (pluginManage, { payload }) => { pluginManage.jobList = payload.jobList; return pluginManage; }
};
