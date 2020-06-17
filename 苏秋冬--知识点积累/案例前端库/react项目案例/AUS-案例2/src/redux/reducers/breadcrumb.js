import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/breadcrumb'
import initState from 'STORE/initState'

export default createReducer(initState.breadcrumb, ACTION_HANDLERS);
