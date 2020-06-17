/**
 * Created by zhangaoxiang on 2016/12/21.
 */
import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ systemPrivilege }) => ({ systemPrivilege }),
    require('ACTION/systemPrivilege').default
);

export default {
    path: 'systemPrivilege',
    indexRoute: { // 对应 /msg
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/Privilege/SystemPrivilege').default))
            }, 'SystemPrivilege')
        }
    },
    childRoutes: [
        {
            path: 'roleSys/:id',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Privilege/SystemPrivilege').default))
                }, 'SystemPrivilegeDetail')
            }
        }
    ]
}
