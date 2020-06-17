import quickLinkService from 'SERVICE/quickLinkService'
// ================================
// Action Type
// ================================
const GET_USER_INFO = 'GET_USER_INFO';
const SET_USER_INFO = 'SET_USER_INFO';
const GET_DATASOURCEINFO = 'GET_DATASOURCEINFO';
// ================================
// Action Creator
// ================================

const getDataSoucerInfo = ()=>{
    return async function(dispatch) {
        dispatch({
            type: GET_DATASOURCEINFO,
            payload: {
                DataSoucerInfo: await quickLinkService.getDataSoucerInfo()
            }
        })
    }
}
const getUserInfo = () => {
    return async function(dispatch) {
        let userInfo = await quickLinkService.getQuickLinkInfo();
        dispatch({
            type: GET_USER_INFO,
            payload: {
                userInfo: userInfo
            }
        })
    }
};
// const getUserInfo = () => {
//     return {
//         type: 'GET_USER_INFO',
//         payload: {
//             userInfo: quickLinkService.getQuickLinkInfo()
//         }
//     }
// };

const setUserInfo = (quickLinkInfo) => {
    return async function(dispatch) {
        let userInfo = await quickLinkService.setQuickLinkInfo(quickLinkInfo);
        dispatch({
            type: SET_USER_INFO,
            payload: {
                userInfo: userInfo
            }
        })
    }
};
// const setUserInfo = (quickLinkInfo) => {
//     return {
//         type: 'SET_USER_INFO',
//         payload: {
//             userInfo: quickLinkService.setQuickLinkInfo(quickLinkInfo)
//         }
//     }
// };

/* default 导出所有 Actions Creator */
export default {
    getUserInfo, setUserInfo, getDataSoucerInfo
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [GET_USER_INFO]: (quickLink, { payload }) => Object.assign({}, quickLink, { userInfo: payload.userInfo }),
    [SET_USER_INFO]: (quickLink, { payload }) => Object.assign({}, quickLink, { userInfo: payload.userInfo }),
    [GET_DATASOURCEINFO]: (quickLink, { payload }) => Object.assign({}, quickLink, { DataSoucerInfo: payload.DataSoucerInfo })
};
