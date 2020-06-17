import { connect } from 'react-redux'

/**
 * 将展示组件变成容器组件
 * @param  {Function} mapStateToProps
 * @param  {Object}   mapDispatchToProps
 * @param  {component}
 * @return {Connect : Container}
 */
export default function createContainer(mapStateToProps, mapDispatchToProps, component) {
  const connectComponent = connect(mapStateToProps, mapDispatchToProps);
  return component ? connectComponent(component) : connectComponent;
}
