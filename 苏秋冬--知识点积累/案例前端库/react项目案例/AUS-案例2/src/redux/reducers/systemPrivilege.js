/**
 * Created by zhangaoxiang on 2016/12/21.
 */
import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/systemPrivilege'
import initState from 'STORE/initState'

export default createReducer(initState.systemPrivilege, ACTION_HANDLERS);
