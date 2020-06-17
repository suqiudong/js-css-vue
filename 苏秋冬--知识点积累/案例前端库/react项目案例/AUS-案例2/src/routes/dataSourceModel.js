/**
 * Created by xdata on 7/12.
 */
import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({dataSourceModel, router }) => ({dataSourceModel, router }), // mapStateToProps
    require('ACTION/dataSourceModel').default               // mapActionCreators
);

export default {
    path: 'dataSourceModel',
    indexRoute: {
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/DataSourceModel/DataSourceModel').default))
            }, 'DataSourceModel')
        }
    },
    childRoutes: [
        {
            path: 'add',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/DataSourceModel/DataSourceModelAdd').default))
                }, 'DataSourceModelAdd')
            }

        },
        {
            path: 'update/:modelName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/DataSourceModel/DataSourceModelUpdate').default))
                }, 'DataSourceModelUpdate')
            }
        }
    ]
}
