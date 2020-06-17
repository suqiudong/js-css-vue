import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ installChoice, router }) => ({installChoice, router})
    // require('ACTION/UnInstall').default
);

export default {
    path: 'installChoice',

    indexRoute: { // 对应 /roleManage
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/InstallChoice/InstallChoice').default))
            }, 'InstallChoice')
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
/**
 * Created by sugon007 on 2017/5/24.
 */
