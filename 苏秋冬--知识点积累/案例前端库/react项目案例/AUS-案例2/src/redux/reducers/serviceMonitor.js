import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/serviceMonitor'
import initState from 'STORE/initState'

export default createReducer(initState.serviceMonitor, ACTION_HANDLERS);
