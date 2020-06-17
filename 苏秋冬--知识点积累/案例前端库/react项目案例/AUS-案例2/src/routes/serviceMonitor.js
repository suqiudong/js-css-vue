import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ serviceMonitor, router }) => ({serviceMonitor, router}),
    require('ACTION/serviceMonitor').default
);

export default {
    path: 'ServiceMonitor',

    indexRoute: { // 对应 /roleManage
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/ServiceMonitor/ServiceMonitor').default))
            }, 'ServiceMonitor')
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
