/**
 * 同步 history 配置
 * User: gaogy
 * Date: 2016/11/28
 * Time: 15:00
 */
import { useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

const hashHistory = useRouterHistory(createHashHistory)({
    basename: '' // 相当于 rootPath
});

export const historyMiddleware = routerMiddleware(hashHistory);

/**
 * history的变化会更新state
 * @param  {Store}
 * @return {History}
 */
export default function (store) {
    return syncHistoryWithStore(
        hashHistory,
        store,
        {selectLocationState: (state) => state.router}
    );
}
