import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ logQuery}) => ({logQuery}),
    require('ACTION/logQuery').default
);

export default {
    path: 'logQuery',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            cb(null, connectComponent(require('COMPONENT/Log/Log').default))
        }, 'Log')
    }
}
