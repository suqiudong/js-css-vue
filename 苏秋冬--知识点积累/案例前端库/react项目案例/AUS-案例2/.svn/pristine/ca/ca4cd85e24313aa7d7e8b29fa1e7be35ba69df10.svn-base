import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ roleManage, router }) => ({roleManage, router}),
    require('ACTION/roleManage').default
);

export default {
    path: 'roleManage',

    indexRoute: { // 对应 /roleManage
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/roleManage/roleManage').default))
            }, 'roleManage')
        }
    },

    childRoutes: [
        { // 对应 /roleManage/add
            path: 'edit/:id',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/roleManage/roleEdit').default))
                }, 'AddroleManage')
            }
        },
        {
            path: 'create',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/roleManage/roleAdd').default))
                }, 'CreateRole')
            }
        },
        {
            path: 'detail/:id',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/roleManage/roleDetail').default))
                }, 'RoleDetail')
            }
        }
    ]
}
