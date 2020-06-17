import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ pluginManage, router }) => ({pluginManage, router}),
    require('ACTION/pluginManage').default
);

export default {
    path: 'plugin',

    indexRoute: { // 对应 /plugin
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/PluginManage/PluginManage').default))
            }, 'PluginManage')
        }
    },

    childRoutes: [
        { // 对应 /plugin/add
            path: 'add',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/PluginManage/PluginAdd').default))
                }, 'PluginAdd')
            }
        },
        { // 对应 /plugin/detail
            path: 'detail/:pluginName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/PluginManage/PluginDetail').default))
                }, 'PluginDetail')
            }
        },
        { // 对应 /plugin/update
            path: 'update/:pluginName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/PluginManage/PluginUpdate').default))
                }, 'PluginDetail')
            }
        }
    ]
}
