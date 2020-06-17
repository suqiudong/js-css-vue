import usermanageService from 'SERVICE/usermanageService'

// ================================
// Action Type
// ================================
const READ_CENTER_USER = 'READ_CENTER_USER';
const USER_CENTER_UPDATE = 'USER_CENTER_UPDATE';

// ================================
// Action Creator
// ================================
const readUserInfo = (userName) => {
    return async function(dispatch) {
        let userCenterData = await usermanageService.userDetail(userName);
        dispatch({
            type: READ_CENTER_USER,
            payload: {
                userCenterData: userCenterData
            }
        })
    }
};
// const readUserInfo = (userName) => {
//     return {
//         type: 'READ_CENTER_USER',
//         payload: {
//             userCenterData: usermanageService.userDetail(userName)
//         }
//     }
// };

const userCenterUpdate = (datail) => {
    return async function(dispatch) {
        let isSaveSuccess = await usermanageService.userUpdateSave(datail);
        dispatch({
            type: USER_CENTER_UPDATE,
            payload: {
                isSaveSuccess: isSaveSuccess
            }
        })
    }
};
// const userCenterUpdate = (datail) => {
//     let isSaveSuccess = usermanageService.userUpdateSave(datail);
//     return {
//         type: 'USER_CENTER_UPDATE',
//         payload: {
//            isSaveSuccess: isSaveSuccess
//         }
//     }
// };


/* default 导出所有 Actions Creator */
export default {
    readUserInfo, userCenterUpdate
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    // [READ_CENTER_USER]: (userCenter, { payload }) => { userCenter.userCenterData = payload.userCenterData; return userCenter; },
    // [USER_CENTER_UPDATE]: (userCenter, { payload }) => { userCenter.isSaveSuccess = payload.isSaveSuccess; return userCenter; }
    [READ_CENTER_USER]: (userCenter, { payload }) => Object.assign({}, userCenter, {userCenterData: payload.userCenterData}),
    [USER_CENTER_UPDATE]: (userCenter, { payload }) => Object.assign({}, userCenter, {isSaveSuccess: payload.isSaveSuccess})

};
