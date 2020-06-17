import usermanageService from 'SERVICE/usermanageService'
import systemPrivilegeService from 'SERVICE/systemPrivilegeService'
// ================================
// Action Type
// ================================
const READ_USER = 'READ_USER';
const SELECT_USER = 'SELECT_USER';
const DEL_USER = 'DEL_USER';
const RES_USER_PASS = 'RES_USER_PASS';
const USER_DETAIL = 'USER_DETAIL';
const USER_UPDATE = 'USER_UPDATE';
const USER_UPDATE_SAVE = 'USER_UPDATE_SAVE';
const ADD_USER_SAVE = 'ADD_USER_SAVE';
const USER_SYS_PRIVILEGE = 'USER_SYS_PRIVILEGE';
const MODIFY_USER_PRIVILEGE = 'MODIFY_USER_PRIVILEGE';
const GET_SYS_PRIVILEGE = 'GET_SYS_PRIVILEGE';
const CHECK_SYS_PRIVILEGE = 'CHECK_SYS_PRIVILEGE';

// ================================
// Action Creator
// ================================
const readUser = () => {
    return async function(dispatch) {
        let usermanagesData = await usermanageService.readUsermanages();
        dispatch({
            type: READ_USER,
            payload: {
                usermanagesData: usermanagesData
            }
        })
    }
};
// const readUser = () => {
//     return {
//         type: 'READ_USER',
//         payload: {
//             usermanagesData: usermanageService.readUsermanages()
//         }
//     }
// };

const selectUser = (selectedRecord) => {
    return {
        type: 'SELECT_USER',
        payload: {
            selectedRecord: selectedRecord
        }
    }
};

// 删除用户
const delUser = (userRecordUserName) => {
    return async function(dispatch) {
        let delUserName = await usermanageService.delUser(userRecordUserName);
        dispatch({
            type: 'DEL_USER',
            payload: {
                userRecordUserName: delUserName
            }
        })
    }
};
// const delUser = (userRecordUserName) => {
//     let delUserName = usermanageService.delUser(userRecordUserName);
//     return {
//         type: 'DEL_USER',
//         payload: {
//             userRecordUserName: delUserName
//         }
//     }
// };

// 重置密码
const resUserPass = (userRecordUserName, passwd) => {
    return async function(dispatch) {
        let resUserPasswd = await usermanageService.resUserPass(userRecordUserName, passwd);
        dispatch({
            type: 'RES_USER_PASS',
            payload: {
                resUserPasswd: resUserPasswd
            }
        })
    }
};
// const resUserPass = (userRecordUserName, passwd) => {
//     let resUserPasswd = usermanageService.resUserPass(userRecordUserName, passwd);
//     return {
//         type: 'RES_USER_PASS',
//         payload: {
//             resUserPasswd: resUserPasswd
//         }
//     }
// };

const userDetail = (userName) => {
    return async function(dispatch) {
        let userDetail = await usermanageService.userDetail(userName);
        dispatch({
            type: 'USER_DETAIL',
            payload: {
                userDetail: userDetail
            }
        })
    }
};
// const userDetail = (userName) => {
//     let userDetail = usermanageService.userDetail(userName);
//     return {
//         type: 'USER_DETAIL',
//         payload: {
//             userDetail: userDetail
//         }
//     }
// };

const userUpdate = (str, value) => {
    return {
        type: 'USER_UPDATE',
        payload: {
            str: str,
            value1: value
        }
    }
};

const userUpdateSave = (userDetailObj) => {
    return async function(dispatch) {
        let isSaveSuccess = await usermanageService.userUpdateSave(userDetailObj);
        dispatch({
            type: 'USER_UPDATE_SAVE',
            payload: {
                isSaveSuccess: isSaveSuccess
            }
        })
    }
};
// const userUpdateSave = (userDetailObj) => {
//     let isSaveSuccess = usermanageService.userUpdateSave(userDetailObj);
//     return {
//         type: 'USER_UPDATE_SAVE',
//         payload: {
//           isSaveSuccess: isSaveSuccess
//         }
//
//     }
// };

const addUser = (addUserinfoObj) => {
    return async function(dispatch) {
        let isAddSuccess = await usermanageService.addUserSave(addUserinfoObj);
        dispatch({
            type: 'ADD_USER_SAVE',
            payload: {
                isAddSuccess: isAddSuccess
            }
        })
    }
};
// const addUser = (addUserinfoObj) => {
//     let isAddSuccess = usermanageService.addUserSave(addUserinfoObj);
//     return {
//         type: 'ADD_USER_SAVE',
//         payload: {
//           isAddSuccess: isAddSuccess
//         }
//     }
// };

const userSysPrivilege = (userName) => {
    return {
        type: 'USER_SYS_PRIVILEGE',
        payload: {
            userSysPrivilege: usermanageService.userSysPrivilege(userName)
        }
    }
};

/**
 * 系统所有权限获取
 */
const getSysPrivilege = () => {
    return {
        type: 'GET_SYS_PRIVILEGE',
        payload: {
            getSysPrivilege: usermanageService.getSysPrivilege()
        }
    }
};

const modifyUserSysPrivilege = (userName) => {
    let isModifySuccess = usermanageService.modifyUserSysPrivilege(userName);
    return {
        type: 'MODIFY_USER_PRIVILEGE',
        payload: {
            isModifySuccess: isModifySuccess
        }
    }
};

const checkSysPrivilege = (data) => {
    let checkSysPrivilege = systemPrivilegeService.checkSysPrivilege(data);
    return {
        type: 'CHECK_SYS_PRIVILEGE',
        payload: {
            checkSysPrivilege: checkSysPrivilege
        }
    }
};

/* default 导出所有 Actions Creator */
export default {
    readUser, selectUser, delUser, resUserPass, userDetail, userUpdate, userUpdateSave, addUser, userSysPrivilege, modifyUserSysPrivilege, getSysPrivilege, checkSysPrivilege
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_USER]: (usermanage, { payload }) => Object.assign({}, usermanage, { usermanagesData: payload.usermanagesData}),
    [SELECT_USER]: (usermanage, { payload }) => { usermanage.selectedRecord = payload.selectedRecord; return usermanage; },
    [DEL_USER]: (usermanage, { payload }) => { usermanage.userRecordUserName = payload.userRecordUserName; return usermanage; },
    [RES_USER_PASS]: (usermanage, { payload }) => { usermanage.resUserPasswd = payload.resUserPasswd; return usermanage; },
    // [USER_DETAIL]: (usermanage, { payload }) => { usermanage.userDetail = payload.userDetail; return usermanage; },
    [USER_DETAIL]: (usermanage, { payload }) => Object.assign({}, usermanage, { userDetail: payload.userDetail}),
    [USER_UPDATE]: (usermanage, { payload }) => { usermanage.userDetail.result.detail[payload.str] = payload.value1; return usermanage; },
    [USER_UPDATE_SAVE]: (usermanage, { payload }) => { usermanage.isSaveSuccess = payload.isSaveSuccess; return usermanage; },
    [ADD_USER_SAVE]: (usermanage, { payload }) => { usermanage.isAddSuccess = payload.isAddSuccess; return usermanage; },
    [USER_SYS_PRIVILEGE]: (usermanage, { payload }) => { usermanage.userSysPrivilege = payload.userSysPrivilege; return usermanage; },
    [MODIFY_USER_PRIVILEGE]: (usermanage, { payload }) => { usermanage.isModifySuccess = payload.isModifySuccess; return usermanage; },
    [GET_SYS_PRIVILEGE]: (usermanage, { payload }) => { usermanage.getSysPrivilege = payload.getSysPrivilege; return usermanage; },
    [CHECK_SYS_PRIVILEGE]: (usermanage, { payload }) => { usermanage.checkSysPrivilege = payload.checkSysPrivilege; return usermanage; }
};
