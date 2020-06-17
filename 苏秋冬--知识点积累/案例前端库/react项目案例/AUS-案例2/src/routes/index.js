/**
 * 开发环境配置
 * User: gaogy
 * Date: 2016/11/25
 * Time: 15:09
 */
export default {
    // 根路径
    path: '/',

    // 根组件
    component: require('COMPONENT/App').default,

    // 初始路由
    indexRoute: {
        component: require('COMPONENT/QuickLink/QuickLink').default
    },

    // 子路由
    childRoutes: [
        // 路由按模块组织分离，避免单文件代码量过大
        require('./report').default,
        require('./usermanage').default,
        require('./roleManage').default,
        require('./systemPrivilege').default,
        require('./dataSet').default,
        require('./dataSourceConf').default,
        require('./dataSourceModel').default,
        require('./usercenter').default,
        require('./changepasswd').default,
        require('./dashboard').default,
        require('./driver').default,
        require('./job').default,
        require('./resPrivilege').default,
        require('./installChoice').default,
        require('./install').default,
        require('./UnInstall').default,
        require('./dataView').default,
        require('./nodeServerManage').default,
        require('./serviceMonitor').default,
        require('./nodeMonitor').default,
        require('./log').default,
        require('./plugin').default,
        // require('./dataSource').default,
        // require('./dashboardTransform').default,


        // 强制“刷新”页面的 hack
        // {path: 'redirect', component: require('COMPONENT/Redirect').default},

        // 无路由匹配的情况一定要放到最后，否则会拦截所有路由
        {path: '*', component: require('COMPONENT/QuickLink/QuickLink').default}
    ]
}
