/**
 * 生成新的Reducer，存在Handler则返回处理后的状态，不存在则返回初始状态
 * @param  {initState}
 * @param  {Object} handlers
 * @return {Reducer}
 */
export default function createReducer(initState, handlers) {
  return function reducer(state = initState, action) {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
  }
}
