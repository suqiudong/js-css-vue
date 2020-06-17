import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/changePasswd'
import initState from 'STORE/initState'

export default createReducer(initState.changePasswd, ACTION_HANDLERS);
