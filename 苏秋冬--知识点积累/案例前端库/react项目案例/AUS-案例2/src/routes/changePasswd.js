import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ changePasswd, router }) => ({changePasswd, router}),
    require('ACTION/changePasswd').default
);

export default {
    path: 'changepasswd',

    indexRoute: { // 对应 /usercenter
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/changepasswd/changepasswd').default))
            }, 'changepasswd')
        }
    }
}
