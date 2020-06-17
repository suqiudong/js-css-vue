import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({dataSourceConf, router }) => ({dataSourceConf, router }), // mapStateToProps
    require('ACTION/dataSourceConf').default               // mapActionCreators
);

/*
 进入资源权限另一种方式
 const connectComponent1 = createContainer(
 ({ resPrivilege, router }) => ({ resPrivilege, router }), // mapStateToProps
 require('ACTION/resPrivilege').default               // mapActionCreators
 );
 */
export default {
    path: 'dataSourceConf',
    indexRoute: { // 对应 /msg
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/DataSourceConf/DataSourceConf').default))
            }, 'DataSourceConf')
        }
    },

    childRoutes: [
        /*
         { // 对应 /accredit:datasetName
         path: 'accredit/:datasetName',
         getComponent (nextState, cb) {
         require.ensure([], (require) => {
         cb(null, connectComponent1(require('COMPONENT/ResPrivilege/ResPrivilege').default))
         }, 'resPrivilege')
         }
         },
         */
        { // 对应 /msg/detail/:datasetName
            path: 'detail/:dataSourceName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/DataSourceConf/DataSourceConfDetail').default))
                }, 'DataSourceConfDetail')
            }
        },
        { // 对应 /msg/add
            path: 'add',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/DataSourceConf/DataSourceConfAdd').default))
                }, 'DataSourceConfAdd')
            }
        },
        { // 对应 /msg/:datasetName
            path: 'update/:dataSourceName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/DataSourceConf/DataSourceConfUpdate').default))
                }, 'DataSourceConfUpdate')
            }
        }]
}
