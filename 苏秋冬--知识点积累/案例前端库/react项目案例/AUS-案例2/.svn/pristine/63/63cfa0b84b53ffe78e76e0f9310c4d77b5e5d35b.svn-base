/**
 *角色列表组件
 * User: jiaomx
 * Date: 2017/5/23
 * Time: 14:40
 */

import React, { Component } from 'react';

class UnInstall extends Component {
    constructor(props) {
        super(props);
        this.replayHandler = this.replayHandler.bind(this);
        this.uninstallHandler = this.uninstallHandler.bind(this);
    }

    componentWillMount() {
        //
    }

    componentDidUpdate() {
        //
    }

    replayHandler () {
        console.log('replay');
    }

    uninstallHandler () {
        console.log('uninstall');
    }


    render() {
        return (
            <div>
                <div className="portlet light">
                    <div className="row" style={{ marginTop: '100px' }}>
                        <div className="col-md-4 col-md-offset-4">
                            <button type="button" className="btn btn-default btn-lg btn-block" onClick={ this.replayHandler }>重装系统</button>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '30px' }}>
                        <div className="col-md-4 col-md-offset-4">
                            <button type="button" className="btn btn-default btn-lg btn-block" onClick={ this.uninstallHandler }>卸载系统</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UnInstall;
