import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ userCenter, router }) => ({userCenter, router}),
    require('ACTION/userCenter').default
);

export default {
    path: 'usercenter',

    indexRoute: { // 对应 /usercenter
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/usercenter/usercenter').default))
            }, 'usercenter')
        }
    }
}
