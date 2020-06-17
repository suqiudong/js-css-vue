// ================================
// Action Type
// ================================
import dataSourceConfService from 'SERVICE/dataSourceService'
const READ_DATASOURCE = 'READ_DATASOURCE';
const CREATE_DATASOURCE = 'CREATE_DATASOURCE';
const GET_DATASOURCE = 'GET_DATASOURCE';
const IS_EXISTS = 'IS_EXISTS';
const SELECT_DATASOURCE = 'SELECT_DATASOURCE';
const DELETE_DATASOURCE = 'DELETE_DATASOURCE';
const MODIFY_DATASOURCE = 'MODIFY_DATASOURCE';
const RESTART_DATASOURCE = 'RESTART_DATASOURCE';
const FILEINFO = 'FILEINFO';
const TESTCONTENT = 'TESTCONTENT';
const SYNCSCHEMAINFO = 'SYNCSCHEMAINFO';
// ================================
// Action Creator
// ================================
// 查询数据源
const readDataSource = () => {
    return async function(dispatch) {
        dispatch({
            type: 'READ_DATASOURCE',
            payload: {
                dataSourceList: await dataSourceConfService.readDataset()
            }
        })
    }
};
// 新建数据源
const createDataScource = (options) => {
    return async function(dispatch) {
        dispatch({
            type: 'CREATE_DATASOURCE',
            payload: {
                dataSourceList: await dataSourceConfService.createDataScource(options)
            }
        })
    }
};
// 删除数据源
const deleteDataSource = (dataSourceName) => {
    return async function(dispatch) {
        dispatch({
            type: 'DELETE_DATASOURCE',
            payload: {
                delDataSourceName: await dataSourceConfService.deleteDataSource(dataSourceName)
            }
        })
    }
};
// 获取数据源
const getDataSource = (dataSourceName) => {
    return async function(dispatch) {
        dispatch({
            type: 'GET_DATASOURCE',
            payload: {
                dataSourceDetail: await dataSourceConfService.getDataSource(dataSourceName)
            }
        })
    }
};
const isExists = (dataSourceName) => {
    return async function(dispatch) {
        dispatch({
            type: 'IS_EXISTS',
            payload: {
                isExists: await dataSourceConfService.isExists(dataSourceName)
            }
        })
    }
};
const selectDataSource = (selectedRecord) => {
    return async function(dispatch) {
        dispatch({
            type: 'SELECT_DATASOURCE',
            payload: {
                selectedRecord: selectedRecord
            }
        })
    }
};
// 修改数据源

const modifyDataSourceConf = (options) => {
    return async function(dispatch) {
        dispatch({
            type: 'MODIFY_DATASOURCE',
            payload: {
                modifyDatesetId: await dataSourceConfService.modifyDataSource(options)
            }
        })
    }
};
// 服务重启
const restartDataSourceConf = () => {
    return async function(dispatch) {
        dispatch({
            type: 'RESTART_DATASOURCE',
            payload: {
                restart: await dataSourceConfService.restart()
            }
        })
    }
};
// 上传文件
const FileInfo = (file) =>{
    return async function(dispatch) {
        dispatch({
            type: 'FILEINFO',
            payload: {
                fileInfo: file
            }
        })
    }
};
// 链接测试
const testConnect = (dataSource) => {
    return async function(dispatch) {
        let testIsExit = await dataSourceConfService.testConnect(dataSource);
        dispatch({
            type: 'TESTCONTENT',
            payload: {
                testIsExit: testIsExit
            }
        })
    }
};

// 同步表信息
const syncSchemaInfo = (dataSourceName) => {
    return async function(dispatch) {
        dispatch({
            type: 'SYNCSCHEMAINFO',
            payload: {
                syncSchemaInfo: await dataSourceConfService.syncSchemaInfo(dataSourceName)
            }
        })
    }
};

export default {readDataSource, createDataScource, getDataSource, isExists, selectDataSource, deleteDataSource, modifyDataSourceConf, restartDataSourceConf, FileInfo, testConnect, syncSchemaInfo}
// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_DATASOURCE]: (dataSourceConf, { payload }) => Object.assign({}, dataSourceConf, {dataSourceList: payload.dataSourceList}),
    [CREATE_DATASOURCE]: (dataSourceConf, { payload }) => { dataSourceConf.code = payload.code; return dataSourceConf; },
    [IS_EXISTS]: (dataSourceConf, { payload }) => Object.assign({}, dataSourceConf, {isExists: payload.isExists}),
    [SELECT_DATASOURCE]: (dataSourceConf, { payload }) => Object.assign({}, dataSourceConf, {selectedRecord: payload.selectedRecord}),
    [GET_DATASOURCE]: (dataSourceConf, { payload }) => Object.assign({}, dataSourceConf, {dataSourceDetail: payload.dataSourceDetail}),
    [DELETE_DATASOURCE]: (dataSourceConf, { payload }) => Object.assign({}, dataSourceConf, {delDataSourceName: payload.delDataSourceName}),
    [MODIFY_DATASOURCE]: (dataSourceConf, { payload }) => Object.assign({}, dataSourceConf, {modifyData: payload.modifyData}),
    [RESTART_DATASOURCE]: (dataSourceConf, { payload }) => Object.assign({}, dataSourceConf, {restart: payload.restart}),
    [FILEINFO]: (dataSourceConf, { payload }) => Object.assign({}, dataSourceConf, {fileInfo: payload.fileInfo}),
    // [TESTCONTENT]: (dataSourceConf, { payload }) => Object.assign({}, dataSourceConf, {testIsExit: payload.testIsExit}),
    [TESTCONTENT]: (dataSourceConf, { payload }) => { dataSourceConf.testIsExit = payload.testIsExit; return dataSourceConf; },
    [SYNCSCHEMAINFO]: (dataSourceConf, { payload }) => Object.assign({}, dataSourceConf, {syncSchemaInfo: payload.syncSchemaInfo})
};

