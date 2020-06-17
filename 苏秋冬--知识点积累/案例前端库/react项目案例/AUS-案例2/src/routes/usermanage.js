import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ usermanage, router }) => ({usermanage, router}),
    require('ACTION/usermanage').default
);

export default {
    path: 'usermanage',

    indexRoute: { // 对应 /usermanage
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/UserManage/UserManage').default))
            }, 'UserManage')
        }
    },

    childRoutes: [
        { // 对应 /usermanage/add
            path: 'add',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/UserManage/Adduser').default))
                }, 'Adduser')
            }
        },

        { // 对应 /usermanage/detail
            path: 'detail/:id',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/UserManage/UserDetail').default))
                }, 'UserDetail')
            }
        },
       
        { // 对应 /usermanage/update:id
            path: 'update/:id',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/UserManage/UserUpdate').default))
                }, 'UserUpdate')
            }
        },

        { // 对应 /usermanage/sysManage:id
            path: 'sysPrivilege/:id',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/UserManage/UserSysPrivilege').default))
                }, 'UserSysPrivilege')
            }
        }
    ]
}
