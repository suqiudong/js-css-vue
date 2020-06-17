import serviceMonitorService from 'SERVICE/serviceMonitor'
// ================================
// Action Type
// ================================
const GET_SERVICENAME = 'GET_SERVICENAME';
const GET_SERVICELIST = 'GET_SERVICELIST';
// ================================
// Action Creator
// ================================

const getServiceName = () => {
    return async function(dispatch) {
        let serviceName = await serviceMonitorService.getServiceName();
        dispatch({
            type: GET_SERVICENAME,
            payload: {
                name: serviceName
            }
        })
    }
};

// const getServiceName = () => {
//     let serviceName = serviceMonitorService.getServiceName();
//     return {
//         type: GET_SERVICENAME,
//         payload: {
//             name: serviceName
//         }
//     }
// };

const getServiceMonitorList = (mqlOptions) => {
    return async function(dispatch) {
        let serviceList = await serviceMonitorService.getServiceMonitorList(mqlOptions);
        dispatch({
            type: GET_SERVICELIST,
            payload: {
                list: serviceList
            }
        })
    }
};

// const getServiceMonitorList = (mqlOptions) => {
//     let serviceList = serviceMonitorService.getServiceMonitorList(mqlOptions);
//     return {
//         type: GET_SERVICELIST,
//         payload: {
//             list: serviceList
//         }
//     }
// };

/* default 导出所有 Actions Creator */
export default {
    getServiceName, getServiceMonitorList
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    // [GET_SERVICELIST]: (serviceMonitor, { payload }) => {serviceMonitor.serviceList = payload.list; return serviceMonitor },
    // [GET_SERVICENAME]: (serviceMonitor, { payload }) => {serviceMonitor.serviceName = payload.name; return serviceMonitor }
    [GET_SERVICENAME]: (serviceMonitor, { payload }) => Object.assign({}, serviceMonitor, {serviceName: payload.name}),
    [GET_SERVICELIST]: (serviceMonitor, { payload }) => Object.assign({}, serviceMonitor, {serviceList: payload.list})
}
