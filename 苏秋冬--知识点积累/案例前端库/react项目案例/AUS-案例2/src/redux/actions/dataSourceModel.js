/**
 * Created by xdata on 7/12.
 */
// ================================
// Action Type
// ================================
import dataSourceModelService from 'SERVICE/dataSourceModelService'
const READ_DATASOURCEMODEL = 'READ_DATASOURCEMODEL';
const GET_MODELLIST = 'GET_MODELLIST';
const GET_MODEL_DATE = 'GET_MODEL_DATE';
const GET_MODEL_RUNING = 'GET_MODEL_RUNING';
const GET_MODEL_SCH = 'GET_MODEL_SCH';
const MODEL_ONSCH = 'MODEL_ONSCH';
const MODEL_OFFSCH = 'MODEL_OFFSCH';
const MODEL_KILLCURRENT = 'MODEL_KILLCURRENT';
const MODEL_RUNONCE = 'MODEL_RUNONCE';
// const GET_DATASOURCETABEL = 'GET_DATASOURCETABEL';
// const GET_PLANRESULT = 'GET_PLANRESULT';
// ================================
// Action Creator
// ================================
/*
const getSqlResult = (mqlOptions) => {
    return async function(dispatch) {
        let mqlResult = await dataViewService.getSqlResult(mqlOptions);
        dispatch({
            type: GET_SQLDATAVIEW,
            payload: {
                mqlResult: mqlResult
            }
        })
    }
};*/
// 查询数据源
const readDataSource = () => {
    return async function(dispatch) {
        let readDataSource = await dataSourceModelService.readDataSource();
        dispatch({
            type: 'READ_DATASOURCEMODEL',
            payload: {
                dataSourceModelList: readDataSource
            }
        })
    }
};
/*
// 获取数据源表信息
const getDataSourceTabel = (DataSourceName) => {
    return async function(dispatch) {
        // let getDataSource = await dataSourceModelService.getDataSource(DataSourceName);
        dispatch({
            type: 'GET_DATASOURCETABEL',
            payload: {
                DataSourceTabel: await dataSourceModelService.getDataSource(DataSourceName)
            }
        })
    };
};
// 查询数据集
const getPlanResult = (Data) => {
        return async function(dispatch) {
            dispatch({
                type: 'GET_PLANRESULT',
                payload: {
                    getPlanResults: await dataSourceModelService.getPlanResult(Data)
                }
            })
        }
};*/
// 查询模型列表
const ModelManagerList = () => {
    return async function(dispatch) {
        let modelist = await dataSourceModelService.dataModelManagerList();
        dispatch({
            type: 'GET_MODELLIST',
            payload: {
                modelList: modelist
            }
        })
    }
};
// 删除模型
const deleteModel = (Data) => {
    return async function() {
       await dataSourceModelService.deleteModelSer(Data);
    }
};
// 上线
const onSch = (Data) => {
    return async function(dispatch) {
        let Sch = await dataSourceModelService.onSch(Data);
        dispatch({
            type: 'MODEL_ONSCH',
            payload: {
                schStatus: Sch
            }
        })
    }
};
// 下线
const offSch = (Data) => {
    return async function(dispatch) {
        let Sch = await dataSourceModelService.offSch(Data);
        dispatch({
            type: 'MODEL_OFFSCH',
            payload: {
                schStatus: Sch
            }
        })
    }
};
// 停止当前同步
const killCurrent = (Data) => {
    return async function(dispatch) {
        let sync = await dataSourceModelService.killCurrent(Data);
        dispatch({
            type: 'MODEL_KILLCURRENT',
            payload: {
                runStatus: sync
            }
        })
    }
};

// 运行同步
const runOnce = (Data) => {
    return async function(dispatch) {
        let sync = await dataSourceModelService.runOnce(Data);
        dispatch({
            type: 'MODEL_RUNONCE',
            payload: {
                runStatus: sync
            }
        })
    }
};
// 修改数据模型
const modifybasic = (Data) => {
    return async function() {
        await dataSourceModelService.modifybasic(Data);
    }
};
// 获取详情
const getModel = (data) => {
    return async function(dispatch) {
        let modelist = await dataSourceModelService.getModel(data);
        dispatch({
            type: 'GET_MODEL_DATE',
            payload: {
                getModel: modelist
            }
        })
    }
};
// 获取同步信息状态
const isRunningBatch = (data) => {
    return async function(dispatch) {
        let modelist = await dataSourceModelService.isRunningBatch(data);
        dispatch({
            type: 'GET_MODEL_RUNING',
            payload: {
                getRuning: modelist
            }
        })
    }
};
// 获取上线信息状态
const isOnSchBatch = (data) => {
    return async function(dispatch) {
        let modelist = await dataSourceModelService.isOnSchBatch(data);
        dispatch({
            type: 'GET_MODEL_SCH',
            payload: {
                sch: modelist
            }
        })
    }
};
export default {readDataSource, ModelManagerList, deleteModel, onSch, offSch, killCurrent, runOnce, modifybasic, getModel, isRunningBatch, isOnSchBatch}
// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_DATASOURCEMODEL]: (dataSourceModel, { payload }) => Object.assign({}, dataSourceModel, {dataSourceModelList: payload.dataSourceModelList}),
    // [GET_DATASOURCETABEL]: (dataSourceModel, { payload }) => Object.assign({}, dataSourceModel, {DataSourceTabel: payload.DataSourceTabel}),
    // [GET_PLANRESULT]: (dataSourceModel, { payload }) => Object.assign({}, dataSourceModel, {getPlanResults: payload.getPlanResults})
    [GET_MODELLIST]: (dataSourceModel, { payload }) => Object.assign({}, dataSourceModel, {modelList: payload.modelList}),
    [GET_MODEL_DATE]: (dataSourceModel, { payload }) => Object.assign({}, dataSourceModel, {getModel: payload.getModel}),
    [GET_MODEL_RUNING]: (dataSourceModel, { payload }) => Object.assign({}, dataSourceModel, {getRuning: payload.getRuning}),
    [GET_MODEL_SCH]: (dataSourceModel, { payload }) => Object.assign({}, dataSourceModel, {sch: payload.sch}),
    [MODEL_OFFSCH]: (dataSourceModel, { payload }) => Object.assign({}, dataSourceModel, {schStatus: payload.schStatus}),
    [MODEL_ONSCH]: (dataSourceModel, { payload }) => Object.assign({}, dataSourceModel, {schStatus: payload.schStatus}),
    [MODEL_KILLCURRENT]: (dataSourceModel, { payload }) => Object.assign({}, dataSourceModel, {runStatus: payload.runStatus}),
    [MODEL_RUNONCE]: (dataSourceModel, { payload }) => Object.assign({}, dataSourceModel, {runStatus: payload.runStatus})
};

