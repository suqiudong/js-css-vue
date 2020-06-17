/**
 *插件查看组件
 * User: jiaomx
 * Date: 2017/02/20
 * Time: 13:20
 */

import React, { Component } from 'react';

class DriverDetail extends Component {
	constructor(props) {
        super(props);
        this.returnHander = this.returnHander.bind(this);
    }

    componentWillMount() {
        let driverName = this.props.driverManage.driverData.driverName;
        this.props.lastDriverInfo(driverName);
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
    returnHander() {
        this.props.history.replace('/driver');
    }
	render() {
		return (
			<div id="pluginDetail">
                <div className="box box-primary">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box-header with-border">
                                <p className="box-title">驱动信息</p>
                            </div>
                            <div className="box-body row">
                                <div><span>驱动名：</span><p className="ml20">{this.props.driverManage.lastDriverData.result.detail.driverName}</p></div>
                                <div><span>所有者：</span><p className="ml20">{this.props.driverManage.lastDriverData.result.detail.owner}</p></div>
                                <div><span>描述信息：</span><p className="ml20">{this.props.driverManage.lastDriverData.result.detail.description}</p></div>
                                <div><span>安装时间：</span><p className="ml20">{this.props.driverManage.lastDriverData.result.detail.time}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary " onClick={ this.returnHander}>返回</button>
                </div>
            </div>
		)
	}
}
export default DriverDetail;
