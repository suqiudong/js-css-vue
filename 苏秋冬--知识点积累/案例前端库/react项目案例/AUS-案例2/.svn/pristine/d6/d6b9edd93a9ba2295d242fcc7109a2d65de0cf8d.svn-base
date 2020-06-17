import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ report, router }) => ({report, router}),
    require('ACTION/report').default
);

export default {
    path: 'report',

    indexRoute: { // 对应 /report
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/Report/Report').default))
            }, 'Report')
        }
    },

    childRoutes: [
        { // 对应 /report/add
            path: 'add',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Report/ReportAdd').default))
                }, 'ReportAdd')
            }
        },

        { // 对应 /report/detail:reportName
            path: 'detail/:reportName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Report/ReportDetail').default))
                }, 'ReportDetail')
            }
        },

        { // 对应 /report/delete:id
            path: 'delete',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Report/Report').default))
                }, 'ReportDelete')
            }
        },
        { // 对应 /report/analysis:reportName
            path: 'analysis/:reportName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Report/ReportAnalysis').default))
                }, 'ReportAnalysis')
            }
        },
        { // 对应 /report/update:reportName
            path: 'update/:reportName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Report/ReportUpdate').default))
                }, 'ReportUpdate')
            }
        }]
}
