// ================================
// Action Type
// ================================
const SELECT_MENU = 'SELECT_MENU';

// ================================
// Action Creator
// ================================
const selectMenu = (selectedMenu) => {
    return {
        type: 'SELECT_MENU',
        payload: {
            selectedMenu: selectedMenu
        }
    }
};

/* default 导出所有 Actions Creator */
export default {
    selectMenu
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [SELECT_MENU]: (sidebar, { payload }) => { sidebar.selectedMenu = payload.selectedMenu; return sidebar; }
};
