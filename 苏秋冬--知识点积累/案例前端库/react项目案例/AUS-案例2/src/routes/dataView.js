import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ dataView, router }) => ({dataView, router}),
    require('ACTION/dataView').default
);

export default {
    path: 'dataView',

    indexRoute: { // 对应 /roleManage
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/DataView/DataView').default))
            }, 'DataView')
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
