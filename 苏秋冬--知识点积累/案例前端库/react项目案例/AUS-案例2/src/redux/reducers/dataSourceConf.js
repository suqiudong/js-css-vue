import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/dataSourceConf'
import initState from 'STORE/initState'

export default createReducer(initState.dataSourceConf, ACTION_HANDLERS);
