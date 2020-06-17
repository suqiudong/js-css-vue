import nodeServerManageService from 'SERVICE/nodeServerManage'
// ================================
// Action Type
// ================================
const GET_NODESERVERLIST = 'GET_NODESERVERLIST';
const GET_SERVERLIST = 'GET_SERVERLIST';
const ADD_NODESERVERLIST = 'ADD_NODESERVERLIST';
// ================================
// Action Creator
// ================================

const getNodeServerList = () => {
    let nodeList = nodeServerManageService.getNodeServerList();
    return {
        type: GET_NODESERVERLIST,
        payload: {
            nodeList: nodeList
        }
    }
};

const getServerList = () => {
    let serviceList = nodeServerManageService.getServerList();
    return {
        type: GET_SERVERLIST,
        payload: {
            serviceList: serviceList
        }
    }
};

const addNodeServerList = (options) => {
    let serviceList = nodeServerManageService.addNodeServerList(options);
    return {
        type: ADD_NODESERVERLIST,
        payload: {
            serviceList: serviceList
        }
    }
};

/* default 导出所有 Actions Creator */
export default {
    getNodeServerList, getServerList, addNodeServerList
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [GET_NODESERVERLIST]: (nodeServerManage, { payload }) => Object.assign({}, nodeServerManage, {nodeManage: payload.nodeList}),
    [GET_SERVERLIST]: (nodeServerManage, { payload }) => Object.assign({}, nodeServerManage, {serverManage: payload.serviceList})
}
