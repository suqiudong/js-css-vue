import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ install, router }) => ({install, router}),
    require('ACTION/install').default
);

export default {
    path: 'install',

    indexRoute: { // 对应 /roleManage
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/Install/Install').default))
            }, 'Install')
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
