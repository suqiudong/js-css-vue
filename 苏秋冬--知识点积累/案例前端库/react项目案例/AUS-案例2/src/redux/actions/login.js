import loginService from 'SERVICE/loginService'
// ================================
// Action Type
// ================================
const LOGIN = 'LOGIN';
const LOGOFF = 'LOGOFF';
const USER_ROLE_PERMISSION = 'USER_ROLE_PERMISSION';
const GET_ACTIVE = 'GET_ACTIVE';
const LISCENSE_UPLOAD = 'LISCENSE_UPLOAD';

// ================================
// Action Creator
// ================================
const userLogin = (userName, passwd) => {
    let login = loginService.login(userName, passwd);
    return {
        type: 'LOGIN',
        payload: {
            login: login
        }
    }
};

const userRole = (userName) => {
    let userRolePermission = loginService.userRolePermission(userName);
    return {
        type: 'USER_ROLE_PERMISSION',
        payload: {
            userRolePermission: userRolePermission
        }
    }
};

const userLogoff = (userName) => {
    let logoff = loginService.logoff(userName);
    return {
        type: 'LOGOFF',
        payload: {
            logoff: logoff
        }
    }
};

const getActive = () => {
    let isActive = loginService.getActive();
    return {
        type: 'GET_ACTIVE',
        payload: {
            isActive: isActive
        }
    }
};
const licenseUpload = (isUploadSuccess) => {
    return {
        type: 'LISCENSE_UPLOAD',
        payload: {
            isUploadSuccess: isUploadSuccess
        }
    }
};


/* default 导出所有 Actions Creator */
export default {
    userLogin, userRole, userLogoff, getActive, licenseUpload
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [LOGIN]: (login, { payload }) => { login.loginData = payload.login; return login; },
    [LOGOFF]: (login, { payload }) => { login.logoff = payload.logoff; return login; },
    [USER_ROLE_PERMISSION]: (login, { payload }) => { login.userRolePermission = payload.userRolePermission; return login; },
    [GET_ACTIVE]: (login, { payload }) => { login.isActive = payload.isActive; return login; },
    [LISCENSE_UPLOAD]: (login, { payload }) => Object.assign({}, login, { isUploadSuccess: payload.isUploadSuccess })
};
