/**
 *角色列表组件
 * User: jiaomx
 * Date: 2017/5/23
 * Time: 14:40
 */

import React, { Component } from 'react';
import createChart from 'UTIL/baseChart';
import createSelect, { bindSelectEvent } from 'UTIL/baseSelect2';

class NodeMonitor extends Component {
    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentWillMount() {
        // 获取节点列表数据
        this.props.getNodeMonitorList();
        setTimeout(()=>{
            this.props.setNodeListDetail(this.props.nodeMonitor.nodeList[0]);
        }, 100);
    }

    componentDidMount() {
        var opts = {
            id: 'barChart',
            title: '可视化分析',
            subtitle: '',
            categories: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月'
            ],
            crosshair: true,
            yAxisMin: 0,
            yAxisTitle: '', // 左侧说明
            series: [{
                name: '东京',
                color: '#00a65a',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]
            }, {
                name: '纽约',
                color: '#c4c7ce',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3]
            }]

        }
        createChart(opts);
    }

    componentDidUpdate() {
        let obj = [];
        let nodeList = this.props.nodeMonitor.nodeList;
        for (let i = 0; i < nodeList.length; i++) {
            obj.push({
                id: nodeList[i].nodeID,
                text: nodeList[i].name
            });
        }
        this.createSelect(obj);
    }

    // select2 下拉框
    createSelect(data) {
        let selectConfig = {
            id: 'nodeSelect',
            tags: false,
            data: data,
            placeholder: '请选择节点',
            minimumResultsForSearch: 2
        };
        createSelect(selectConfig);
        bindSelectEvent('nodeSelect', 'select2:select', this.changeHandler);
    }

    changeHandler () {
        let nodeId = $('#nodeSelect').val();
        let nodeList = this.props.nodeMonitor.nodeList;
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeID == nodeId) {
                this.props.setNodeListDetail(nodeList[i]);
            }
        }
    }

    render() {
        return (
            <div>
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">基本信息</h3>
                    </div>
                    <div className="box-body form-horizontal">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label><small>节点：</small></label>
                                <select className="form-control select2me" id="nodeSelect">
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="portlet light">
                                        <div className="portlet-title">
                                            节点信息
                                        </div>
                                        <div className="portlet-body">
                                            <div className="tab-content">
                                                <table className="table table-bordered" id="nodeMonitorList">
                                                    <tbody>
                                                        <tr>
                                                            <td>IP</td>
                                                            <td>{this.props.nodeMonitor.nodeDetail.ip}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>角色配置</td>
                                                            <td>{this.props.nodeMonitor.nodeDetail.role}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>网络读写速率</td>
                                                            <td>{this.props.nodeMonitor.nodeDetail.speed}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="portlet light">
                                        <div className="portlet-title">
                                            使用情况
                                        </div>
                                        <div className="portlet-body">
                                            <div className="tab-content">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <button type="button" className="btn btn-primary">加入对比</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box box-success">
                    <div className="box-header with-border">
                        <h3 className="box-title">节点对比</h3>
                        <div className="box-tools pull-right">
                            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                            </button>
                            <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                        </div>
                    </div>
                    <div className="box-body no-padding">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="barChart"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default NodeMonitor;

