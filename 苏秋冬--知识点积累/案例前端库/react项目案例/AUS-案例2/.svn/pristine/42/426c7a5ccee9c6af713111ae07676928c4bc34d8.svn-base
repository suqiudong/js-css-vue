import reportService from 'SERVICE/reportService';
// ================================
// Action Type
// ================================
const READ_REPORT = 'READ_REPORT';
const SELECT_REPORT = 'SELECT_REPORT';
const DEL_REPORT = 'DEL_REPORT';
const MQL_SEARCH = 'MQL_SEARCH';
const ADD_REPORT = 'ADD_REPORT';
const GET_REPORT = 'GET_REPORT';
const UPDATE_REPORT = 'UPDATE_REPORT';
const CHANG_CHART_TYPE = 'CHANG_CHART_TYPE';
const LIST_REPORT = 'LIST_REPORT';
// ================================
// Action Creator
// ================================
// 查询模型列表
const ListReport = () => {
    return async function(dispatch) {
        let modelist = await reportService.ListReport();
        dispatch({
            type: 'LIST_REPORT',
            payload: {
                ListReport: modelist
            }
        })
    }
};
const readReport = () => {
    return {
        type: 'READ_REPORT',
        payload: {
            reportsData: reportService.readReport()
        }
    }
};

const selectReport = (selectedRecord) => {
    return {
        type: 'SELECT_REPORT',
        payload: {
            selectedRecord: selectedRecord
        }
    }
};

const delReport = (reportRecordId) => {
    let delId = reportService.delReport(reportRecordId);
    return {
        type: 'DEL_REPORT',
        payload: {
            reportRecordId: delId
        }
    }
};

const mqlSearch = (options) => {
    return {
        type: 'MQL_SEARCH',
        payload: {
            mqlResult: reportService.mqlSearch(options)
        }
    }
};

const addReport = (options) => {
    return {
        type: 'ADD_REPORT',
        payload: {
            selectedRecord: reportService.addReport(options)
        }
    }
};

const getReport = (reportName) => {
    return {
        type: 'GET_REPORT',
        payload: {
            report: reportService.getReport(reportName)
        }
    }
};

const updateReport = (options) => {
    return {
        type: 'UPDATE_REPORT',
        payload: {
            report: reportService.updateReport(options)
        }
    }
};

const changeChartType = (chartType) => {
    return {
        type: 'CHANG_CHART_TYPE',
        payload: {
            selectedRecord: {
                chartType: chartType
            }
        }
    }
};

/* default 导出所有 Actions Creator */
export default {
    ListReport, readReport, selectReport, delReport, mqlSearch, addReport, getReport, updateReport, changeChartType
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_REPORT]: (report, { payload }) => Object.assign({}, report, { reportsData: payload.reportsData, selectedRecord: {} }),
    [SELECT_REPORT]: (report, { payload }) => Object.assign({}, report, { selectedRecord: payload.selectedRecord }),
    [DEL_REPORT]: (report, { payload }) => Object.assign({}, report, { reportRecordId: payload.reportRecordId }),
    [MQL_SEARCH]: (report, { payload }) => Object.assign({}, report, { mqlResult: payload.mqlResult }),
    [ADD_REPORT]: (report, { payload }) => Object.assign({}, report, { selectedRecord: payload.selectedRecord }),
    [UPDATE_REPORT]: (report, { payload }) => Object.assign({}, report, { reportRecordId: payload.reportRecordId }),
    [GET_REPORT]: (report, { payload }) => Object.assign({}, report, { selectedRecord: payload.report }),
    [CHANG_CHART_TYPE]: (report, { payload }) => {
        let reportObj = report;
        reportObj.selectedRecord.chartType = payload.selectedRecord.chartType;
        reportObj.selectedRecord.chartConfig = '{\"chartType\":\"\"}';
        return Object.assign({}, report, reportObj);
    },
    [LIST_REPORT]: (report, { payload }) => Object.assign({}, report, { ListReport: payload.ListReport })

};
