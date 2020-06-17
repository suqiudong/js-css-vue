/**
 *插件管理组件
 * User: jiaomx
 * Date: 2017/2/5
 * Time: 10:40
 */

import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createList, { bindTableEvent } from 'UTIL/baseList';

let driverName;

class DriverManage extends Component {
	constructor(props) {
        super(props);
        this.createDriver = this.createDriver.bind(this);
        this.driverDetail = this.driverDetail.bind(this);
        this.driverUpdate = this.driverUpdate.bind(this);
        this.driverForceUpdateOKHandler = this.driverForceUpdateOKHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.RemoveOKHandler = this.RemoveOKHandler.bind(this);
        this.privilegeHandler = this.privilegeHandler.bind(this);
    }

	componentWillMount() {
        // 读取用户列表数据
        this.props.readDriverList();
    }
    
    componentDidUpdate() {
        this.createTable(this.props.driverManage.driverList.result.data);
    }

    // 新建插件
    createDriver() {
        this.props.driverManage.fileInfo = {};
        this.props.history.replace('/driver/add');
    }


    createTable(data) {
        // 获取自己用户名
        // let XDataUserName = sessionStorage.getItem('XDataUserName');
        // 构造列表配置项
        let tableConfig = {};

        tableConfig.id = 'driverList';

        // 定义用户列字段数据
        tableConfig.columns = [
            { data: 'driverName', 'defaultContent': '-' },
            { data: 'description', 'defaultContent': '-' },
            { data: 'owner', 'defaultContent': '-' },
            { data: 'time', 'defaultContent': '-' },
            { data: 'privilege', 'defaultContent': '-' }
        ];

        // 定义列表内操作列
        tableConfig.columnDefs = [{
            'targets': 4, // 操作列生成位置，当前为列表第4列
            'render': function (data, type, row) {
                let html = '';
                        // html += `<a href='javascript:void(0);'  class='driverDetail btn btn-default btn-xs'><i class='fa fa-file-text-o'></i> 详情</a> `;
                        // html += `<a href='javascript:void(0);' class='privilege btn btn-default btn-xs'><i class='fa fa-wrench'></i> 授权</a> `;
                        html += `<a href='javascript:void(0);' class='driverRemove btn btn-default btn-xs'><i class='fa fa-trash-o'></i> 卸载</a> `;
                        html += `<a href='javascript:void(0);' class='driverUpdate btn btn-default btn-xs'><i class='fa fa-pencil-square-o'></i> 更新</a> `;
                return html;
            }
        }];

        // 获取用户列表内数据列
        tableConfig.data = data;

        // 生成插件列表
        createList(tableConfig);

        // 插件列表内卸载事件绑定
        bindTableEvent('driverList', 'click', 'a.driverRemove', this.removeHandler);

        // 插件列表内查看详细事件绑定
        bindTableEvent('driverList', 'click', 'a.driverDetail', this.driverDetail);

        // 插件列表内修改事件绑定
        bindTableEvent('driverList', 'click', 'a.driverUpdate', this.driverUpdate);

        // 列表内授权事件绑定
        bindTableEvent('driverList', 'click', 'a.privilege', this.privilegeHandler);
    }

    privilegeHandler(e) {
        let selectedRecord = this.selectDriver(e);
        this.props.history.replace('/driver/accredit/' + selectedRecord.driverName);
    }
    
    // 保存组件单条数据
    selectDriver(e) {
        let driverData = $('#driverList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.saveSelectDriver(driverData);
        return driverData;
    }

    // 插件查看组件
    driverDetail(e) {
        this.selectDriver(e);
        this.props.history.replace('/driver/detail');
    }

    // 卸载插件
    removeHandler(e) {
        let driverData = this.selectDriver(e);
        $('#driverRemove1').modal();
        this.refs.driverRemove1.setContent('您确定要卸载 ' + driverData.driverName + ' 驱动吗？');
    }

    returnHandler() {
        this.props.readDriverList();
    }

    // 未作业时删除
    RemoveOKHandler() {
        let driverRemove = {driverName: this.props.driverManage.driverData.driverName};
        this.props.driverRemove(driverRemove, this.returnHandler.bind(this));
        $('#driverRemove1').modal('hide');
        // this.props.readDriverList();
    }

    // 更新插件
    driverUpdate(e) {
        let driverData = this.selectDriver(e);
        driverName = driverData.driverName;
        $('#driverUpdate').modal();
        this.refs.driverUpdate.setContent('您确定要更新' + driverData.driverName + ' 驱动吗？')
    }
    // 插件强制更新
    driverForceUpdateOKHandler() {
        $('#driverUpdate').modal('hide');
        this.props.history.replace('/driver/update/' + driverName);
    }


	render() {
        // 判断插件操作权限
        let thTpl =
            <tr>
                <th>驱动名</th>
                <th>描述</th>
                <th>所有者</th>
                <th>安装时间</th>
            <th>操作</th>
        </tr>;
        let btn;
        btn = <button type="submit" className="btn btn-primary" onClick={ this.createDriver}>新建</button>
		return (
			<div id="driverManage" className="box box-primary" >
                <div className="row">
                    <div className="col-md-12">
                        <div className="box-header" style={{float: 'left'}}>
                        {btn}
                        </div>
                        <div className="box-body">
                            <table id="driverList" className="table table-striped table-bordered">
                                <thead>
                                    {thTpl}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal modalId="driverUpdate" ref='driverUpdate' title="驱动更新" okHandler={ this.driverForceUpdateOKHandler } />
                <Modal modalId="driverRemove1" ref='driverRemove1' title="插件删除" okHandler={ this.RemoveOKHandler }/>
            </div>
		)
	}
}
export default DriverManage;
