import logService from 'SERVICE/logService'
import usermanageService from 'SERVICE/usermanageService'

// ================================
// Action Type
// ================================
const LOG_QUERY = 'LOG_QUERY';
const LOG_READ_ALL_USER = 'LOG_READ_ALL_USER';

// ================================
// Action Creator
// ================================

// const logQueryData = (option) => {
//     let logQueryData = logService.logQuery(option);
//     return {
//         type: 'LOG_QUERY',
//         payload: {
//             logQueryData: logQueryData
//         }
//     }
// };

const clearLogQueryData = () => {
    return {
        type: LOG_QUERY,
        payload: {
            logQueryData: []
        }
    }
};

const logQueryData = (option) => {
    return async function(dispatch) {
        let logQueryData = await logService.logQuery(option);
        dispatch({
            type: LOG_QUERY,
            payload: {
                logQueryData: logQueryData
            }
        })
    }
};

// // 请求所有用户接口
// const allUserList = () => {
//     let allUserList = usermanageService.readUsermanages().result.data;
//     let allUserList1 = {};
//     allUserList1.member = [];
//     for (let i = 0; i < allUserList.length; i++) {
//         let user = {};
//         user.name = allUserList[i].name;
//         user.userName = allUserList[i].userName;
//         allUserList1.member.push(user);
//     }
//     return {
//         type: 'LOG_READ_ALL_USER',
//         payload: {
//             allUserList: allUserList1
//         }
//     }
// };

const allUserList = () => {
    return async function(dispatch) {
        let allUserList = await usermanageService.readUsermanages();
        allUserList = allUserList.result.data;
        let allUserList1 = {};
        allUserList1.member = [];
        for (let i = 0; i < allUserList.length; i++) {
            let user = {};
            user.name = allUserList[i].name;
            user.userName = allUserList[i].userName;
            allUserList1.member.push(user);
        }
        dispatch({
            type: LOG_READ_ALL_USER,
            payload: {
                allUserList: allUserList1
            }
        })
    }
};

/* default 导出所有 Actions Creator */
export default {
    logQueryData, allUserList, clearLogQueryData
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    // [LOG_READ_ALL_USER]: (logQuery, { payload }) => { logQuery.allUserList = payload.allUserList; return logQuery; },
    // [LOG_QUERY]: (logQuery, { payload }) => { logQuery.logQueryData = payload.logQueryData; return logQuery; }
    [LOG_READ_ALL_USER]: (logQuery, { payload }) => Object.assign({}, logQuery, {allUserList: payload.allUserList}),
    [LOG_QUERY]: (logQuery, { payload }) => Object.assign({}, logQuery, {logQueryData: payload.logQueryData})
};
