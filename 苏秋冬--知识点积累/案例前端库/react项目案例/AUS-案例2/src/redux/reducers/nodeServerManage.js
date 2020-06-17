import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/nodeServerManage'
import initState from 'STORE/initState'

export default createReducer(initState.nodeServerManage, ACTION_HANDLERS);
