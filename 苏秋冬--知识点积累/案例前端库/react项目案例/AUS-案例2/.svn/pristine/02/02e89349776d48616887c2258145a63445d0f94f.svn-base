/**
 * Created by zhangaoxiang on 2016/12/21.
 */
import systemPrivilegeService from 'SERVICE/systemPrivilegeService';
import usermanageService from 'SERVICE/usermanageService';

const READ_PRIVILEGE = 'READ_PRIVILEGE';
const MODIFY_PRIVILEGE = 'MODIFY_PRIVILEGE';
const CHECK_SYS_PRIVILEGE = 'CHECK_SYS_PRIVILEGE';
const GET_SYS_PRIVILEGE = 'GET_SYS_PRIVILEGE';

const readPrivilege = () => {
    return {
        type: 'READ_PRIVILEGE',
        payload: {
            systemPrivilegeData: systemPrivilegeService.readSystemPrivilege()
        }
    }
};
const modifyPrivilege = (roleId) => {
    return {
        type: 'MODIFY_PRIVILEGE',
        payload: {
            modifySystemPrivilegeData: systemPrivilegeService.modifySystemPrivilege(roleId)
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

const checkSysPrivilege = (data) => {
    return {
        type: 'CHECK_SYS_PRIVILEGE',
        payload: {
            checkSysPrivilege: systemPrivilegeService.checkSysPrivilege(data)
        }
    }
}
export default { readPrivilege, modifyPrivilege, checkSysPrivilege, getSysPrivilege }

export const ACTION_HANDLERS = {
    [READ_PRIVILEGE]: (systemPrivilege, { payload }) => { systemPrivilege.systemPrivilegeData = payload.systemPrivilegeData; return systemPrivilege; },
    [MODIFY_PRIVILEGE]: (systemPrivilege, { payload }) => { systemPrivilege.modifySystemPrivilegeData = payload.modifySystemPrivilegeData; return systemPrivilege; },
    [CHECK_SYS_PRIVILEGE]: (systemPrivilege, { payload }) => { systemPrivilege.checkSysPrivilege = payload.checkSysPrivilege; return systemPrivilege; },
    [GET_SYS_PRIVILEGE]: (systemPrivilege, { payload }) => { systemPrivilege.getSysPrivilege = payload.getSysPrivilege; return systemPrivilege; }
};
