import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/roleManage'
import initState from 'STORE/initState'

export default createReducer(initState.roleManage, ACTION_HANDLERS);
