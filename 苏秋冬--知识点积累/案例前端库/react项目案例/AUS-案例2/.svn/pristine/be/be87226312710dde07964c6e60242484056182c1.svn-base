/**
 * Created by sugon007 on 2017/5/24.
 */
import dataViewService from 'SERVICE/dataView';
// ================================
// Action Type
// ================================
const GET_SQLDATAVIEW = 'GET_SQLDATAVIEW';
const GET_PLANDATAVIEW = 'GET_PLANDATAVIEW';
const SET_TOGGLE = 'SET_TOGGLE';
// ================================
// Action Creator
// ================================

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
};

// const getSqlResult = (mqlOptions) => {
//     let mqlResult = dataViewService.getSqlResult(mqlOptions);
//     return {
//         type: GET_SQLDATAVIEW,
//         payload: {
//             mqlResult: mqlResult
//         }
//     }
// };


// const getResult = (mqlResult) => {
//     return {
//         type: GET_SQLDATAVIEW,
//         payload: {
//             mqlResult: mqlResult
//         }
//     }
// };
//
// // 获取数据
// const getSqlResult = (mqlOptions) => {
//     return dispatch => {
//         return fetch('/DataSource/explain', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(mqlOptions)
//         }).then(response =>
//             response.json()
//         ).then((data)=>{
//             dispatch(getResult(data.result));
//         }).catch(error => console.log(error))
//     }
// }

const clearSqlResult = () => {
    return {
        type: GET_SQLDATAVIEW,
        payload: {
            mqlResult: ''
        }
    }
};

const getPlanResult = (mqlOptions) => {
    return async function(dispatch) {
        let planResult = await dataViewService.getPlanResult(mqlOptions);
        // let time = new Date().getTime();
        // if (time % 5 == 0) {
        //     planResult = [{id: '1'}, {id: '2'}]
        //     if (time % 2 == 0) {
        //         planResult = []
        //     }
        // }
        dispatch({
            type: GET_PLANDATAVIEW,
            payload: {
                planResult: planResult
            }
        })
    }
};

const clearPlanResult = () => {
    return {
        type: GET_PLANDATAVIEW,
        payload: {
            planResult: []
        }
    }
};

const setToggle = (bool) => {
    return {
        type: SET_TOGGLE,
        payload: {
            toggle: bool
        }
    }
};

/* default 导出所有 Actions Creator */
export default {
    getSqlResult, getPlanResult, clearSqlResult, clearPlanResult, setToggle
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [GET_SQLDATAVIEW]: (dataView, { payload }) => Object.assign({}, dataView, {mqlResult: payload.mqlResult, toggle: true}),
    // [GET_PLANDATAVIEW]: (dataView, { payload }) => {dataView.planResult = payload.planResult; return dataView }
    // [GET_PLANDATAVIEW]: (dataView, { payload }) => {dataView.mqlResult = payload.mqlResult; return dataView },
    [GET_PLANDATAVIEW]: (dataView, {payload}) => Object.assign({}, dataView, {planResult: payload.planResult}),
    [SET_TOGGLE]: (dataView, {payload}) => Object.assign({}, dataView, {toggle: payload.toggle})
}
