import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/usermanage'
import initState from 'STORE/initState'

export default createReducer(initState.usermanage, ACTION_HANDLERS);
