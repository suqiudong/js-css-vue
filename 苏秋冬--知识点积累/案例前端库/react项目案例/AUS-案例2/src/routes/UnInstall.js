import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ UnInstall, router }) => ({UnInstall, router})
    // require('ACTION/UnInstall').default
);

export default {
    path: 'uninstall',

    indexRoute: { // 对应 /roleManage
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/UnInstall/UnInstall').default))
            }, 'UnInstall')
        }
    },

    childRoutes: [
        { // 对应 /Install/--
            // path: 'edit/:id',
            // getComponent (nextState, cb) {
            //     require.ensure([], (require) => {
            //         cb(null, connectComponent(require('COMPONENT/roleManage/roleEdit').default))
            //     }, 'AddroleManage')
            // }
        }
    ]
}
