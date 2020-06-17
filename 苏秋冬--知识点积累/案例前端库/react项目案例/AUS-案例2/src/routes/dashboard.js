import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ dashboard }) => ({ dashboard }),
    require('ACTION/dashboard').default
);

export default {
    path: 'dashboard',

    indexRoute: { // 对应 /dashboard
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/Dashboard/Dashboard').default))
            }, 'Dashboard')
        }
    },

    childRoutes: [
        { // 对应 /dashboard/add
            path: 'add',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Dashboard/DashboardAdd').default))
                }, 'AddDashboard')
            }
        },

        { // 对应 /dashboard/detail:dashboardName
            path: 'detail/:dashboardName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Dashboard/DashboardDetail').default))
                }, 'DashboardDetail')
            }
        },

        { // 对应 /dashboard/analysis:id
            path: 'analysis/:dashboardName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Dashboard/DashboardAnalysis').default))
                }, 'DashboardAnalysis')
            }
        },

        { // 对应 /report/update:dashboardName
            path: 'update/:dashboardName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/Dashboard/DashboardUpdate').default))
                }, 'DashboardUpdate')
            }
        }]
}
