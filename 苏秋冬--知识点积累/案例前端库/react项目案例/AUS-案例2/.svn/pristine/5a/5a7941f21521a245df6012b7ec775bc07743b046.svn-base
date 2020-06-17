/**
 *角色列表组件
 * User: jiaomx
 * Date: 2017/5/23
 * Time: 14:40
 */

import React, { Component } from 'react';

class Install extends Component {
    constructor(props) {
        super(props);
        this.labelStyle = {
            padding: '15px 20px',
            borderRadius: '10px'
        };
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }

    componentWillMount() {
        this.props.now(1);
    }

    componentDidUpdate() {
    }

    prev () {
        //
        let step = this.props.install.nowStep
        this.props.prev(step);
    }

    next () {
        let step = this.props.install.nowStep;
        this.props.next(step);
    }

    render() {
        let step = this.props.install.nowStep;
        let firstDisable, lastDisable;
        if (step == 1) {
            firstDisable = true;
        } else {
            firstDisable = false;
        }
        if (step == 5) {
            lastDisable = true;
        } else {
            lastDisable = false;
        }
        let labelDefault = 'label label-default';
        let labelSuccess = 'label label-success';
        return (
            <div>
                <div className="box box-primary">
                    <div className="box-header with-border hide">
                        <h3 className="box-title"></h3>
                    </div>
                    <div className="box-body">
                        <div className="portlet light">
                            <div className="row" style={{ margin: '30px 0' }}>
                                <div className="col-md-12">
                                    <div className="step text-center" style={{ height: '80px' }}>
                                        <label className={ (step == 1) ? labelSuccess : labelDefault } style={this.labelStyle}>数据源</label>
                                        {" > "}
                                        <label className={ (step == 2) ? labelSuccess : labelDefault } style={this.labelStyle}>配置机柜</label>
                                        {" > "}
                                        <label className={ (step == 3) ? labelSuccess : labelDefault } style={this.labelStyle}>配置节点</label>
                                        {" > "}
                                        <label className={ (step == 4) ? labelSuccess : labelDefault } style={this.labelStyle}>配置安全策略</label>
                                        {" > "}
                                        <label className={ (step == 5) ? labelSuccess : labelDefault } style={this.labelStyle}>安装节点</label>
                                    </div>
                                </div>
                                <div className="horizontal">
                                    <p className="col-md-11 col-md-offset-1">数据源:</p>
                                    <div className="col-md-9 col-md-offset-1">
                                        <pre style={{ padding: '20px' }}>
                                            <div className="col-md-12">
                                                <div className="checkbox">
                                                    <label><input type="checkbox" name="" /> HDFS,一个分布式系统</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkbox">
                                                    <label><input type="checkbox" name="" /> HDFS,一个分布式系统</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkbox">
                                                    <label><input type="checkbox" name="" /> HDFS,一个分布式系统</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkbox">
                                                    <label><input type="checkbox" name="" /> HDFS,一个分布式系统</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkbox">
                                                    <label><input type="checkbox" name="" /> HDFS,一个分布式系统</label>
                                                </div>
                                            </div>
                                        </pre>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="row">
                                            <p className="col-md-12">
                                                <button type="button" className="btn btn-primary" disabled = {firstDisable} onClick = {this.prev} title="上一步"><i className="fa fa-chevron-left"></i></button>
                                            </p>
                                            <p className="col-md-12">
                                                <button type="button" className="btn btn-primary" disabled={lastDisable} onClick={this.next} title="下一步"><i className="fa fa-chevron-right"></i></button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Install;
