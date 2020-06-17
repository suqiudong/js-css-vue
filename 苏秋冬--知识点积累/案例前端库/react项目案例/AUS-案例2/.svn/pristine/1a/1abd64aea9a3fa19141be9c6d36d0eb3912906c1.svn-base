import roleManageService from 'SERVICE/roleManageService'
import usermanageService from 'SERVICE/usermanageService'

// ================================
// Action Type
// ================================
const READ_ROLE = 'READ_ROLE';
const SELECT_ROLE = 'SELECT_ROLE';
const ROLE_USER_LIST = 'ROLE_USER_LIST';
const READ_ALL_USER = 'READ_ALL_USER';
const ADD_ROLE_USER_LIST = 'ADD_ROLE_USER_LIST';
const SAVE_USER_ROLE = 'SAVE_USER_ROLE';
const DELETE_ROLE = 'DELETE_ROLE';
const GET_ROLE = 'GET_ROLE';
const CREATE_ROLE = 'CREATE_ROLE';

// ================================
// Action Creator
// ================================
const readRole = () => {
    return async function(dispatch) {
        let roleManagesData = await roleManageService.readRoleManage();
        dispatch({
            type: 'READ_ROLE',
            payload: {
                roleManagesData: roleManagesData
            }
        })
    }
};
// const readRole = () => {
// 	let roleManagesData = roleManageService.readRoleManage();
//     return {
//         type: 'READ_ROLE',
//         payload: {
//             roleManagesData: roleManagesData
//         }
//     }
// };

const selectRole = (selectRole) => {
    return {
        type: 'SELECT_ROLE',
        payload: {
            selectRole: selectRole
        }
    }
};

const roleManageUserList = (roleName) => {
    return async function(dispatch) {
        let roleManageUserList = await roleManageService.readRoleManage();
        roleManageUserList = roleManageUserList.result.data;
        let roleUserList = {};
        for (let i = 0; i < roleManageUserList.length; i++) {
            if (roleManageUserList[i].roleName == roleName) {
                roleUserList.member = roleManageUserList[i].member
            }
        }
        dispatch({
            type: 'ROLE_USER_LIST',
            payload: {
                roleUserList: roleUserList
            }
        })
    }
};
// const roleManageUserList = (roleName) => {
// 	let roleManageUserList = roleManageService.readRoleManage().result.data;
// 	let roleUserList = {};
// 	for (let i = 0; i < roleManageUserList.length; i++) {
// 		if (roleManageUserList[i].roleName == roleName) {
// 			roleUserList.member = roleManageUserList[i].member
// 		}
// 	}
//     return {
//         type: 'ROLE_USER_LIST',
//         payload: {
//             roleUserList: roleUserList
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
            type: 'READ_ALL_USER',
            payload: {
                allUserList: allUserList1
            }
        })
    }
};
// const allUserList = () => {
// 	let allUserList = usermanageService.readUsermanages().result.data;
//     let allUserList1 = {};
//     allUserList1.member = [];
//     for (let i = 0; i < allUserList.length; i++) {
//         let user = {};
//         user.name = allUserList[i].name;
//         user.userName = allUserList[i].userName;
//         allUserList1.member.push(user);
//     }
//     return {
//         type: 'READ_ALL_USER',
//         payload: {
//             allUserList: allUserList1
//         }
//     }
// };

const addUserORRemoveToRole = (roleUserList) => {
    return {
        type: 'ADD_ROLE_USER_LIST',
        payload: {
            roleUserList: roleUserList
        }
    }
}

const saveUserRole = (roleName, roleUserList) => {
    return async function(dispatch) {
        let isSave = await roleManageService.saveUserRole(roleName, roleUserList);
        dispatch({
            type: 'SAVE_USER_ROLE',
            payload: {
                isSave: isSave
            }
        })
    }
};
// const saveUserRole = (roleName, roleUserList) => {
//     let isSave = roleManageService.saveUserRole(roleName, roleUserList)
//     return {
//         type: 'SAVE_USER_ROLE',
//         payload: {
//             isSave: isSave
//         }
//     }
// };

const deleteRole = (roleID, callback) => {
    return async function(dispatch) {
        let deleteRole = await roleManageService.deleteRole(roleID, callback);
        dispatch({
            type: 'DELETE_ROLE',
            payload: {
                deleteRole: deleteRole
            }
        })
    }
};
// const deleteRole = (roleID) => {
//     return {
//         type: 'DELETE_ROLE',
//         payload: {
//             deleteRole: roleManageService.deleteRole(roleID)
//         }
//     }
// };

const getRole = (roleName) => {
    return {
        type: 'GET_ROLE',
        payload: {
            getRole: roleManageService.getRole(roleName)
        }
    }
};

const createRole = (options) => {
    return async function(dispatch) {
        let createRole = await roleManageService.createRole(options);
        dispatch({
            type: 'CREATE_ROLE',
            payload: {
                createRole: createRole
            }
        })
    }
};
// const createRole = (options) => {
//     return {
//         type: 'CREATE_ROLE',
//         payload: {
//             createRole: roleManageService.createRole(options)
//         }
//     }
// }

/* default 导出所有 Actions Creator */
export default {
    readRole, selectRole, roleManageUserList, allUserList, addUserORRemoveToRole, saveUserRole, deleteRole, getRole, createRole
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_ROLE]: (roleManage, { payload }) => Object.assign({}, roleManage, { roleManagesData: payload.roleManagesData}),
    [SELECT_ROLE]: (roleManage, { payload }) => { roleManage.selectRole = payload.selectRole; return roleManage; },
    // [ROLE_USER_LIST]: (roleManage, { payload }) => { roleManage.roleUserList = payload.roleUserList; return roleManage; },
    [ROLE_USER_LIST]: (roleManage, { payload }) => Object.assign({}, roleManage, { roleUserList: payload.roleUserList}),
    // [READ_ALL_USER]: (roleManage, { payload }) => { roleManage.allUserList = payload.allUserList; return roleManage; },
    [READ_ALL_USER]: (roleManage, { payload }) => Object.assign({}, roleManage, { allUserList: payload.allUserList}),
    [SAVE_USER_ROLE]: (roleManage, { payload }) => { roleManage.isSave = payload.isSave; return roleManage; },
    [ADD_ROLE_USER_LIST]: (roleManage, { payload }) => Object.assign({}, roleManage, { roleUserList: payload.roleUserList}),
    [DELETE_ROLE]: (roleManage, { payload }) => Object.assign({}, roleManage, { selectRole: payload.selectRole}),
    [GET_ROLE]: (roleManage, { payload }) => Object.assign({}, roleManage, { selectRole: payload.selectRole}),
    [CREATE_ROLE]: (roleManage, { payload }) => { roleManage.createRole = payload.createRole; return roleManage; }
};
