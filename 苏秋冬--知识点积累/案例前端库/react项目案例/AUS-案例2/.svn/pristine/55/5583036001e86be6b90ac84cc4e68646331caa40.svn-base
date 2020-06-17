import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ nodeMonitor, router }) => ({nodeMonitor, router}),
    require('ACTION/nodeMonitor').default
);

export default {
    path: 'NodeMonitor',

    indexRoute: { // 对应 /roleManage
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/NodeMonitor/NodeMonitor').default))
            }, 'NodeMonitor')
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
