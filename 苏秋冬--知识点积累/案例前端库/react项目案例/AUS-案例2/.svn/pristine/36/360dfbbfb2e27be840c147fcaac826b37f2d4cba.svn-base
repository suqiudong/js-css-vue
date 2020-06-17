// ================================
// Action Type
// ================================
import datasetService from 'SERVICE/datasetServices'
const READ_DATASET = 'READ_DATASET';
const DELETE_DATASET = 'DELETE_DATASET';
const SELECT_DATASET = 'SELECT_DATASET';
const GET_DATASET = 'GET_DATASET';
const CREATE_DATASET = 'CREATE_DATASET';
const MODIFY_DATASET = 'MODIFY_DATASET';
const IS_EXISTS = 'IS_EXISTS';
const LIST_ANALYZERS = 'LIST_ANALYZERS';
const SET_DATE_FIELD = 'SET_DATE_FIELD';
const MAX_SETTING_NUM = 'MAX_SETTING_NUM';

// ================================
// Action Creator
// ================================

const readDataset = () => {
    return {
        type: 'READ_DATASET',
        payload: {
            datasetList: datasetService.readDataset()
        }
    }
};

const selectDataset = (selectedRecord) => {
    return {
        type: 'SELECT_DATASET',
        payload: {
            selectedRecord: selectedRecord
        }
    }
};

const deleteDataset = (datasetID) => {
    return {
        type: 'DELETE_DATASET',
        payload: {
            deleteDatasetID: datasetService.deleteDataset(datasetID)
        }
    }
};

const getDataset = (datasetName) => {
    return {
        type: 'GET_DATASET',
        payload: {
            selectedRecord: datasetService.getDataset(datasetName)
        }
    }
};

const createDataset = (options) => {
    let code = datasetService.createDataset(options)
    return {
        type: 'CREATE_DATASET',
        payload: {
            code: code
        }
    }
};

const modifyDataset = (options) => {
    return {
        type: 'MODIFY_DATASET',
        payload: {
            modifyDatesetId: datasetService.modifyDataset(options)
        }
    }
};

const isExists = (datasetName) => {
    return {
        type: 'IS_EXISTS',
        payload: {
            isExists: datasetService.isExists(datasetName)
        }
    }
};

const listAnalyzers = () => {
    return {
        type: 'LIST_ANALYZERS',
        payload: {
            analyzers: datasetService.listAnalyzers()
        }
    }
};

const setDateField = (dateFields) => {
    return {
        type: 'SET_DATE_FIELD',
        payload: {
            dateFields: dateFields
        }
    }
};

const getMaxSettingNums = () => {
    return {
        type: 'MAX_SETTING_NUM',
        payload: {
            maxSettingNums: datasetService.getMaxSettingNums()
        }
    }
};

export default {readDataset, deleteDataset, selectDataset, getDataset, createDataset, modifyDataset, isExists, listAnalyzers, setDateField, getMaxSettingNums}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_DATASET]: (dataset, { payload }) => Object.assign({}, dataset, {datasetList: payload.datasetList}),
    [DELETE_DATASET]: (dataset, { payload }) => Object.assign({}, dataset, {deleteDatasetID: payload.deleteDatasetID}),
    [SELECT_DATASET]: (dataset, { payload }) => Object.assign({}, dataset, {selectedRecord: payload.selectedRecord}),
    [GET_DATASET]: (dataset, { payload }) => Object.assign({}, dataset, {selectedRecord: payload.selectedRecord}),
    [CREATE_DATASET]: (dataset, { payload }) => { dataset.code = payload.code; return dataset; },
    [MODIFY_DATASET]: (dataset, { payload }) => Object.assign({}, dataset, {modifyDatasetId: payload.modifyDatasetId}),
    [IS_EXISTS]: (dataset, { payload }) => Object.assign({}, dataset, {isExists: payload.isExists}),
    [LIST_ANALYZERS]: (dataset, { payload }) => Object.assign({}, dataset, {analyzers: payload.analyzers}),
    [SET_DATE_FIELD]: (dataset, { payload }) => Object.assign({}, dataset, {dateFields: payload.dateFields}),
    [MAX_SETTING_NUM]: (dataset, { payload }) => Object.assign({}, dataset, {maxSettingNums: payload.maxSettingNums})
};
