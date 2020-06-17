import nodeMonitorService from 'SERVICE/nodeMonitor'
// ================================
// Action Type
// ================================
const GET_NODEMONITORLIST = 'GET_NODEMONITORLIST';
const SET_NODELISTDETAIL = 'SET_NODELISTDETAIL';
// ================================
// Action Creator
// ================================

const getNodeMonitorList = () => {
    let nodeList = nodeMonitorService.getNodeMonitorList();
    return {
        type: GET_NODEMONITORLIST,
        payload: {
            nodeList: nodeList
        }
    }
};

const setNodeListDetail = (options) => {
    return {
        type: SET_NODELISTDETAIL,
        payload: {
            nodeInfo: options
        }
    }
};


/* default 导出所有 Actions Creator */
export default {
    getNodeMonitorList, setNodeListDetail
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [GET_NODEMONITORLIST]: (nodeMonitor, { payload }) => Object.assign({}, nodeMonitor, {nodeList: payload.nodeList}),
    [SET_NODELISTDETAIL]: (nodeMonitor, { payload }) => Object.assign({}, nodeMonitor, {nodeDetail: payload.nodeInfo})
}
