/**
 * Created by zhangaoxiang on 2016/12/21.
 */
import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ resPrivilege }) => ({ resPrivilege }),
    require('ACTION/resPrivilege').default
);

export default {
    path: ':type/accredit/:id',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            cb(null, connectComponent(require('COMPONENT/ResPrivilege/ResPrivilege').default))
        }, 'resPrivilege')
    }
}
