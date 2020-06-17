/**
 *插件管理组件
 * User: jiaomx
 * Date: 2017/2/5
 * Time: 10:40
 */

import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createList, { bindTableEvent } from 'UTIL/baseList';
import { error } from 'UTIL/notification';
import { cutStr } from 'UTIL/util';

let pluginName;

class PluginManage extends Component {
	constructor(props) {
        super(props);
        this.createPlugin = this.createPlugin.bind(this);
        this.pluginDetail = this.pluginDetail.bind(this);
        this.pluginUpdate = this.pluginUpdate.bind(this);
        this.pluginForceUpdateOKHandler = this.pluginForceUpdateOKHandler.bind(this);
        this.pluginSafeUpdateOKHandler = this.pluginSafeUpdateOKHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.pluginForceRemoveOKHandler = this.pluginForceRemoveOKHandler.bind(this);
        this.pluginSafeRemoveOKHandler = this.pluginSafeRemoveOKHandler.bind(this);
        this.RemoveOKHandler = this.RemoveOKHandler.bind(this);
        this.privilegeHandler = this.privilegeHandler.bind(this);
        this.pluginUpdata = this.pluginUpdata.bind(this);
    }

	componentWillMount() {
        // 读取用户列表数据
        this.props.readPluginList();
    }
    
    componentDidUpdate() {
        this.createTable(this.props.pluginManage.pluginList.result.data);
    }

    // 新建插件
    createPlugin() {
        this.props.pluginManage.fileInfo = {};
        this.props.history.replace('/plugin/add');
    }


    createTable(data) {
        // 获取自己用户名
        // let XDataUserName = sessionStorage.getItem('XDataUserName');
        // 构造列表配置项
        let tableConfig = {};

        tableConfig.id = 'pluginList';

        // 定义用户列字段数据
        tableConfig.columns = [
            // { data: 'pluginName', 'defaultContent': '-' },
            {
                data: 'pluginName',
                render: function (data, type, row, meta) {
                    if (data.length > 20) {
                        return `<span title=${data}>${cutStr(data, 20)}...</span>`
                    }
                    return data;
                },
                'defaultContent': '-'
            },
            // { data: 'jarName', 'defaultContent': '-' },
            {
                data: 'jarName',
                render: function (data, type, row, meta) {
                    if (data.length > 20) {
                        return `<span title=${data}>${cutStr(data, 20)}...</span>`
                    }
                    return data;
                },
                'defaultContent': '-'
            },
            { data: 'owner', 'defaultContent': '-' },
            { data: 'time', 'defaultContent': '-' },
            { data: 'status', 'defaultContent': '-' },
            { data: 'version', 'defaultContent': '-' },
            { data: 'privilege', 'defaultContent': '-' }
        ];

        let userRolePermission = sessionStorage.getItem('userRolePermission');
        // 定义列表内操作列
        if (userRolePermission.indexOf('PLUGIN_QUERY') != -1) {
            tableConfig.columnDefs = [{
                'targets': 6, // 操作列生成位置，当前为列表第4列
                'render': function (data, type, row) {
                    let html = '';
                    if (row.privilege.PLUGIN.length !== 0) {
                        if (row.privilege.PLUGIN.indexOf('查看') != -1) {
                            html += `<a href='javascript:void(0);'  class='pluginDetail btn btn-default btn-xs'><i class='fa fa-file-text-o'></i> 详情</a> `;
                        }
                        if (row.privilege.PLUGIN.indexOf('修改') != -1) {
                            html += `<a href='javascript:void(0);' class='pluginUpdate btn btn-default btn-xs'><i class='fa fa-pencil-square-o'></i> 更新</a> `;
                        }
                        if (row.privilege.PLUGIN.indexOf('授权') != -1) {
                            html += `<a href='javascript:void(0);' class='privilege btn btn-default btn-xs'><i class='fa fa-wrench'></i> 授权</a> `;
                        }
                        if (row.privilege.PLUGIN.indexOf('卸载') != -1) {
                            html += `<a href='javascript:void(0);' class='pluginRemove btn btn-default btn-xs'><i class='fa fa-trash-o'></i> 卸载</a></div>`;
                        }
                    } else {
                        html += `<span>  无操作权限<span/>`
                    }

                    return html;
                }
            }];
        }

        // 获取用户列表内数据列
        tableConfig.data = data;
        // tableConfig.scrollX = true;

        // 生成插件列表
        createList(tableConfig);

        // 插件列表内卸载事件绑定
        bindTableEvent('pluginList', 'click', 'a.pluginRemove', this.removeHandler);

        // 插件列表内查看详细事件绑定
        bindTableEvent('pluginList', 'click', 'a.pluginDetail', this.pluginDetail);

        // 插件列表内修改事件绑定
        bindTableEvent('pluginList', 'click', 'a.pluginUpdate', this.pluginUpdate);

        // 列表内授权事件绑定
        bindTableEvent('pluginList', 'click', 'a.privilege', this.privilegeHandler);
    }

    privilegeHandler(e) {
        let selectedRecord = this.selectPlugin(e);
        this.props.history.replace('/plugin/accredit/' + selectedRecord.pluginName);
    }
    
    // 保存组件单条数据
    selectPlugin(e) {
        let pluginData = $('#pluginList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.saveSelectPlugin(pluginData);
        return pluginData;
    }

    // 插件查看组件
    pluginDetail(e) {
        let pluginData = this.selectPlugin(e);
        this.props.history.replace('/plugin/detail/' + pluginData.pluginName);
    }

    // 卸载插件
    removeHandler(e) {
        let pluginData = this.selectPlugin(e);
        this.props.isUsePlugin(pluginData.pluginName);
        if (this.props.pluginManage.isUse.result) {
            error('无法卸载' + pluginData.pluginName + '插件,您的插件正在作业！');
            // $('#pluginRemove').modal();
            // this.refs.pluginRemove.setContent('检测到您的插件正在作业，您确定要卸载' + pluginData.pluginName + '插件吗？');
        } else {
            $('#pluginRemove1').modal();
            this.refs.pluginRemove1.setContent('您确定要卸载' + pluginData.pluginName + '插件吗？');
        }
    }
    // 强制删除
    pluginForceRemoveOKHandler() {
        let pluginRemove = {pluginName: this.props.pluginManage.pluginData.pluginName, opType: 'FORCE'};
        this.props.pluginRemove(pluginRemove);
        $('#pluginRemove').modal('hide');
        this.props.readPluginList();
    }

    // 安全删除
    pluginSafeRemoveOKHandler() {
        let pluginRemove = {pluginName: this.props.pluginManage.pluginData.pluginName, opType: 'SAFE'};
        this.props.pluginRemove(pluginRemove);
        $('#pluginRemove').modal('hide');
        this.props.readPluginList();
    }

    // 未作业时删除
    RemoveOKHandler() {
        let pluginRemove = {pluginName: this.props.pluginManage.pluginData.pluginName};
        this.props.pluginRemove(pluginRemove);
        $('#pluginRemove1').modal('hide');
        this.props.readPluginList();
    }

    // 更新插件
    pluginUpdate(e) {
        let pluginData = this.selectPlugin(e);
        this.props.isUsePlugin(pluginData.pluginName);
        if (this.props.pluginManage.isUse.result) {
            pluginName = pluginData.pluginName;
            $('#pluginUpdate').modal();
            let ele = <div>
                <p>'检测到您的插件正在作业，您确定要更新' + {pluginData.pluginName} + '插件吗？'</p>
                <p className="users-list-date">
                    <small> 强制更新：立即停止所有关联的作业（kill 进程），作业下线不再调度，并更新插件</small>
                </p>
                <p className="users-list-date" style={{ overflow: 'hidden' }}>
                    <small className="pull-left">安全更新：</small>
                    <small className="pull-left">
                        <p>如果是周期调度作业则会在下调度之前Kill作业，然后下调度</p>
                        <p>如果是一次执行作业则不作处理</p>
                    </small>
                </p>
            </div>
            this.refs.pluginUpdate.setContent(ele)
        }else {
            this.props.history.replace('/plugin/update/' + pluginData.pluginName);
        }
    }

    // 插件强制更新
    pluginForceUpdateOKHandler() {
        let opType = 'FORCE';
        this.pluginUpdata(opType);
    }
    pluginSafeUpdateOKHandler() {
        let opType = 'SAFE';
        this.pluginUpdata(opType);
    }
    pluginUpdata (opType) {
        this.props.pluginUpdateType(opType);
        $('#pluginUpdate').removeClass('fade');
        $('#pluginUpdate').modal('hide');
        this.props.history.replace('/plugin/update/' + pluginName);
    }


	render() {
        // 判断插件操作权限
        let thTpl = <tr>
                <th>插件名</th>
                <th>包名称</th>
                <th>所有者</th>
                <th>安装时间</th>
                <th>状态</th>
                <th>版本号</th>
            </tr>;
        let userRolePermission = sessionStorage.getItem('userRolePermission');
        if (userRolePermission.indexOf('PLUGIN_') != -1) {
            thTpl = <tr>
                    <th>插件名</th>
                    <th>包名称</th>
                    <th>所有者</th>
                    <th>安装时间</th>
                    <th>状态</th>
                    <th>版本号</th>
                    <th>操作</th>
                </tr>;
        }
        let btn;
        if (userRolePermission.indexOf('PLUGIN_INSTALL') != -1) {
            btn = <button type="submit" className="btn btn-primary" onClick={ this.createPlugin}>新建</button>
        }
		return (
			<div id="pluginManage" className="box box-primary" >
                <div className="row">
                    <div className="col-md-12">
                        <div className="box-header" style={{float: 'left'}}>
                        {btn}
                        </div>
                        <div className="box-body">
                            <table id="pluginList" className="table table-striped table-bordered">
                                <thead>
                                    {thTpl}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal modalId="pluginUpdate" button='threeButton' ref='pluginUpdate' title="插件更新" okBtn='强制更新' safeokBtn='安全更新' okHandler={ this.pluginForceUpdateOKHandler } safeokHandler={ this.pluginSafeUpdateOKHandler }/>
                <Modal modalId="pluginRemove" button='threeButton' ref='pluginRemove' title="插件删除" okBtn='强制删除' safeokBtn='安全删除' okHandler={ this.pluginForceRemoveOKHandler } safeokHandler={ this.pluginSafeRemoveOKHandler }/>
                <Modal modalId="pluginRemove1" ref='pluginRemove1' title="插件删除" okHandler={ this.RemoveOKHandler }/>
            </div>
		)
	}
}
export default PluginManage;
