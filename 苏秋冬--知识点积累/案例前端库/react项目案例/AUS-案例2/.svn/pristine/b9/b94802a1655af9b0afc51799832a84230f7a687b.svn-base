/**
 * 项目入口文件
 * User: gaogy
 * Date: 2016/11/25
 * Time: 14:58
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store, { history } from 'STORE';
import routes from 'ROUTE';

import 'ASSET/css/base.css';
import 'ASSET/css/layout.css';

/**
 * 检测不必要的重新渲染
 */
if (__DEV__ && __WHY_DID_YOU_UPDATE__) {
    const { whyDidYouUpdate } = require('why-did-you-update');
    whyDidYouUpdate(React);
}
if (__DEV__) {
    console.info('[当前环境] 开发环境');
}
if (__PROD__) {
    console.info('[当前环境] 生产环境');
}

// ================================
// 将根组件挂载到 DOM，启动！
// ================================
const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    MOUNT_NODE
);
