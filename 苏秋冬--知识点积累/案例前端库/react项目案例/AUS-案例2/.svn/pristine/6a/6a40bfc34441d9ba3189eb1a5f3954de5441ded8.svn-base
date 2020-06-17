import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ nodeServerManage, router }) => ({nodeServerManage, router}),
    require('ACTION/nodeServerManage').default
);

export default {
    path: 'nodeServerManage',

    indexRoute: { // 对应 /roleManage
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/NodeServerManage/NodeServerManage').default))
            }, 'NodeServerManage')
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
