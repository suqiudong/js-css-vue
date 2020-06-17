/**
 * 页脚组件
 * User: gaogy
 * Date: 2016/11/25
 * Time: 14:58
 */
import React, { Component } from 'react';
class Footer extends Component {
    componentWillMount() {

    }

    render() {
        return (
            <footer className="main-footer">
                <span>版权所有&nbsp;<strong>&copy; 2012-2017 <a href="http://www.sugon.com/" target="_blank">曙光信息产业（北京）有限公司</a></strong></span>
            </footer>
        )
    }
}
export default Footer;
