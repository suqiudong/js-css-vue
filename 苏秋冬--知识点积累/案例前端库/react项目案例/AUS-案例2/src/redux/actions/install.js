// import installService from 'SERVICE/install'
// ================================
// Action Type
// ================================
const NEXT = 'NEXT';
const PREV = 'PREV';
const NOW = 'NOW';

// ================================
// Action Creator
// ================================
const now = (nowStep) => {
    return {
        type: NOW,
        payload: {
            nowStep: nowStep
        }
    }
};

const next = (nowStep) => {
    nowStep += 1;
    return {
        type: NEXT,
        payload: {
            nowStep: nowStep
        }
    }
};

const prev = (nowStep) => {
    nowStep -= 1;
    return {
        type: PREV,
        payload: {
            nowStep: nowStep
        }
    }
};


export default {
    next, prev, now
}

export const ACTION_INSTALL = {
    [NEXT]: (installStep, { payload }) => Object.assign({}, installStep, {nowStep: payload.nowStep}),
    [PREV]: (installStep, { payload }) => Object.assign({}, installStep, {nowStep: payload.nowStep}),
    [NOW]: (installStep, { payload }) => Object.assign({}, installStep, {nowStep: payload.nowStep})
}
