/**
 * 系统权限管理组件
 * User: zhangax
 * Date: 2016/12/21
 * Time: 10:18
 */
import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createSelect, { bindSelectEvent } from 'UTIL/baseSelect2';
import createiCheck from 'UTIL/baseiCheck';
import { error } from 'UTIL/notification';

class SystemPrivilege extends Component {
    constructor(props) {
        super(props);
        this.createSelect = this.createSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.privilege = this.privilege.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.modelContent = this.modelContent.bind(this);
        this.checkAllHandler = this.checkAllHandler.bind(this);
        this.uncheckAllHandler = this.uncheckAllHandler.bind(this);
    }
    componentWillMount() {
        // 读取 action 里面 ajax 请求到的数据
        this.props.readPrivilege();
        this.props.getSysPrivilege();
    }
    componentDidMount() {
        if (this.props.params.id) {
            this.handleEdit();
        } else {
            this.handleChange();
            let obj = [];
            let roleName = this.props.systemPrivilege.systemPrivilegeData.result.data;
            for (var i = 0; i < roleName.length; i++) {
                let param = {};
                param.id = roleName[i].roleName;
                param.text = roleName[i].roleName;
                obj.push(param);
            }
            this.createSelect(obj);
        }

    }

    // select2 下拉框
    createSelect(data) {
        let selectConfig = {};
        selectConfig.id = 'select_role';
        selectConfig.data = data;
        selectConfig.tags = false;
        selectConfig.placeholder = '输入角色名快速查找';
        selectConfig.minimumResultsForSearch = 2;
        createSelect(selectConfig);
        bindSelectEvent('select_role', 'select2:select', this.handleChange);
    }

    /**
     componentDidUpdate() {
        let spDetail = this.props.systemPrivilege.systemPrivilegeData.result.data[0].sysPrivilege.split(' ');
        let spClass = $('.sp_detail');
        spClass.each((n, e) =>{
            if ($.inArray(e.name, spDetail) != -1) {
                e.checked = true;
            };
            e.disabled = true;
        });
        /**
         *接口是对象时
         for (var ca in a) {
        }
    }*/
    // 选择角色权限
    handleChange() {
        this.props.readPrivilege();
        $('.checkAll').addClass('hide');
        $('.cancelCheck').addClass('hide');
        $('.sp_select_role').attr('disabled', false);
        let spDetail = this.props.systemPrivilege.systemPrivilegeData.result.data;
        let spClass = $('.sp_detail');
        let roleId = $('.sp_select_role').val();
        for (var i = 0; i < spDetail.length; i++) {
            if (spDetail[i].roleName == roleId) {
                for (let key in spDetail[i].privilege) {
                    spClass.each((n, e) => {
                        if (e.name == key) {
                            if ($.inArray($(e).attr('data-name'), spDetail[i].privilege[key]) != -1) {
                                $(e).parents('label').css('color', '#000');
                                e.checked = true;
                                createiCheck(e);
                            } else {
                                $(e).parents('label').css('color', '#d2d6de');
                                e.checked = false;
                                createiCheck(e);
                            }
                        }
                        e.disabled = true;
                        createiCheck(e);
                    });
                }
            }

        }
        $('.modify').attr('disabled', false);
        $('.cancel').attr('disabled', true);
        $('.ensure').attr('disabled', true);
    }
    // 点击修改权限
    handleEdit(e) {
        $('.ensure').attr('disabled', false);
        $('.modify').attr('disabled', true);
        $('.cancel').attr('disabled', false);
        $('.checkAll').removeClass('hide');
        $('.cancelCheck').removeClass('hide');
        $('.sp_select_role').attr('disabled', true);
        let spClass = $('.sp_detail');
        spClass.each((n, e) => {
            $(e).parents('label').css('color', '#000');
            e.disabled = false;
            createiCheck(e);
        });
    };
    // 修改权限确认
    handleModify() {
        let roleId = $('.sp_select_role').val();
        let spClass = $('.sp_detail');
        let datas = [];
        let data = {};
        data.roleName = roleId;
        data.privilege = {};
        data.privilege.USER = [];
        data.privilege.REPORT = [];
        data.privilege.ROLE = [];
        data.privilege.DATASET = [];
        data.privilege.DASHBOARD = [];
        data.privilege.JOB = [];
        data.privilege.PLUGIN = [];
        spClass.each((n, e) => {
            if (e.checked) {
                if (e.name == 'USER') {
                    data.privilege.USER.push($(e).attr('data-name'));
                }
                if (e.name == 'REPORT') {
                    data.privilege.REPORT.push($(e).attr('data-name'));
                }
                if (e.name == 'ROLE') {
                    data.privilege.ROLE.push($(e).attr('data-name'));
                }
                if (e.name == 'DATASET') {
                    data.privilege.DATASET.push($(e).attr('data-name'));
                }
                if (e.name == 'DASHBOARD') {
                    data.privilege.DASHBOARD.push($(e).attr('data-name'));
                }
                if (e.name == 'JOB') {
                    data.privilege.JOB.push($(e).attr('data-name'));
                }
                if (e.name == 'PLUGIN') {
                    data.privilege.PLUGIN.push($(e).attr('data-name'));
                }
            }
        });
        datas.push(data);
        this.props.checkSysPrivilege(datas);
        let checkRes = this.props.systemPrivilege.checkSysPrivilege;
        let add = checkRes.result.detail.add;
        let remove = checkRes.result.detail.remove;
        if (checkRes.code == '0') {
            let a = '';
            if (add.length == 0 && remove.length == 0) {
                return;
            } else {
                for (let i = 0; i < add.length; i++) {
                    a = `<li>因 <mark>${add[i].dependency}</mark> 权限添加, 其依赖权限影响的 <u> ${add[i].privileges} </u> 权限将被 <strong>自动添加</strong> ;</li>`
                    $('#dependency').append(a);
                }
                for (let i = 0; i < remove.length; i++) {
                    a = `<li>因 <mark>${remove[i].dependency}</mark> 权限移除, 其依赖权限影响的 <u>${remove[i].privileges}</u> 权限将被 <strong>自动移除</strong> ;</li>`
                    $('#dependency').append(a);
                }
            }
        } else {
            error(checkRes.msg);
            return;
        }
    }

    modelContent() {
        let roleId = $('.sp_select_role').val();
        let content = <ol id="dependency" className='todo-list ui-sortable'><li>您确定要修改角色： <strong>{roleId}</strong> 的系统权限吗？</li></ol>
        $('#dependency').html('');
        this.refs.sp_modify.setContent(content);
    }
    // 修改提交
    modifyOKHandle() {
        $('.sp_select_role').attr('disabled', false);
        let roleId = $('.sp_select_role').val();
        let spClass = $('.sp_detail');
        let data = {};
        data.roleName = roleId;
        data.privilege = {};
        data.privilege.USER = [];
        data.privilege.REPORT = [];
        data.privilege.ROLE = [];
        data.privilege.DATASET = [];
        data.privilege.DASHBOARD = [];
        data.privilege.JOB = [];
        data.privilege.PLUGIN = [];
        spClass.each((n, e) => {
            if (e.checked) {
                if (e.name == 'USER') {
                    data.privilege.USER.push($(e).attr('data-name'));
                }
                if (e.name == 'REPORT') {
                    data.privilege.REPORT.push($(e).attr('data-name'));
                }
                if (e.name == 'ROLE') {
                    data.privilege.ROLE.push($(e).attr('data-name'));
                }
                if (e.name == 'DATASET') {
                    data.privilege.DATASET.push($(e).attr('data-name'));
                }
                if (e.name == 'DASHBOARD') {
                    data.privilege.DASHBOARD.push($(e).attr('data-name'));
                }
                if (e.name == 'JOB') {
                    data.privilege.JOB.push($(e).attr('data-name'));
                }
                if (e.name == 'PLUGIN') {
                    data.privilege.PLUGIN.push($(e).attr('data-name'));
                }
            } else {
                $(e).parents('label').css('color', '#d2d6de');
            }
            e.disabled = true;
            createiCheck(e);
        });
        this.props.modifyPrivilege(data);
        $('.ensure').attr('disabled', true);
        $('.cancel').attr('disabled', true);
        $('.modify').attr('disabled', false);
        $('#sp_modify').modal('hide');
        if (this.props.params.id) {
            this.props.history.replace('/roleManage');
        } else {
            this.props.history.replace('/systemPrivilege');
        }

    };
    privilege(e, key) {
        let p = e[key].map((i)=>{
            return <label className="col-xs-3 col-sm-2 sp_label"> <input className="sp_roles_detail sp_detail" name={key} data-Name={i} type="checkbox" /> <span> {i} </span> </label>
        });
        return p;
    }

    checkAllHandler() {
        $('#home .row.sp_classify input[type="checkbox"]').iCheck('check');
    }

    uncheckAllHandler() {
        $('#home .row.sp_classify input[type="checkbox"]').iCheck('uncheck');
    }

    render() {
        let userPrivilege, reportPrivilege, rolePrivilege, datasetPrivilege, dashBoardPrivilege, jobPrivilege, pluginPrivilege;
        let sysPrivilege = this.props.systemPrivilege.getSysPrivilege.result.detail;
        for (let key in sysPrivilege) {
            for (let i = 0; i < sysPrivilege[key].length; i++) {
                if (key == 'USER') {
                    userPrivilege = this.privilege(sysPrivilege, key);
                } else if (key == 'REPORT') {
                    reportPrivilege = this.privilege(sysPrivilege, key);
                } else if (key == 'ROLE') {
                    rolePrivilege = this.privilege(sysPrivilege, key);
                } else if (key == 'DATASET') {
                    datasetPrivilege = this.privilege(sysPrivilege, key);
                } else if (key == 'DASHBOARD') {
                    dashBoardPrivilege = this.privilege(sysPrivilege, key);
                } else if (key == 'JOB') {
                    jobPrivilege = this.privilege(sysPrivilege, key);
                } else if (key == 'PLUGIN') {
                    pluginPrivilege = this.privilege(sysPrivilege, key);
                }
            }
        }
        let role = this.props.systemPrivilege.systemPrivilegeData.result.data[0].roleName;
        let cancelButton = <button type="button" className="cancel btn btn-primary sp_btn" onClick={this.handleChange}>取消</button>
        if (this.props.params.id) {
            role = this.props.params.id;
            cancelButton = ''
        }
        return (
            <div className="box box-primary">
                <p className="box-header with-border sp_role_info"><h4>权限管理</h4></p>
                <div className="row sp_content">
                    <div className="col-sm-2 hidden-xs text-right">
                        <p className="sp_role">选择角色 : </p>
                        <p className="sp_role_set">角色权限设置 : </p>
                    </div>
                    <div className="col-sm-8 col-xs-12">
                        <div className="sp_select_role_div">
                            {/*
                             <select className="sp_select_role form-control" onChange={ this.handleChange.bind(this) }>
                             <option value="sm_00001">超级管理员</option>
                             <option value="m_00001">管理员</option>
                             <option value="u_00001">角色1</option>
                             <option value="u_00002">角色2</option>
                             </select>
                             */}
                            <select className="sp_select_role form-control" name="" id="select_role">
                                <option value={role}>{ role }</option>
                            </select>
                        </div>
                        <div className="nav-tabs-custom" style={{userSelect: 'none'}}>
                            <ul className="nav nav-tabs" role="tablist">
                                <li role="presentation" className="active"><a className="sp_presentation" href="#home" role="tab" data-toggle="tab">系统权限管理</a></li>
                                <li className="pull-right header">
                                    <button type="submit" className="modify btn btn-primary margin" onClick={this.handleEdit.bind(this)}>修改</button>
                                    <button type="submit" className="checkAll btn btn-primary margin hide" onClick={this.checkAllHandler.bind(this)}><i className="fa fa-check"></i> 全选</button>
                                    <button type="submit" className="cancelCheck btn btn-primary hide" onClick={this.uncheckAllHandler.bind(this)}><i className="fa fa-remove"></i> 清除</button>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div user="tabpanel" className="tab-pane active" id="home">
                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_pluginsystem">插件权限: </div>
                                        <div className="row col-xs-10 text-center">
                                            {pluginPrivilege}
                                        </div>
                                        {/*
                                         <div className="col-xs-2 sp_classify_name text-center">
                                         <label>
                                         <input className="sp_pluginsystem_all" type="checkbox" /> <span>全选</span>
                                         </label>
                                         </div>
                                         */}
                                    </div>
                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_users">用户权限: </div>
                                        <div className="userDiv row col-xs-10 text-center">
                                            {userPrivilege}
                                        </div>
                                        {/*
                                         <div className="col-xs-2 sp_classify_name text-center">
                                         <label>
                                         <input className="sp_users_all" type="checkbox" /> <span>全选</span>
                                         </label>
                                         </div>
                                         */}
                                    </div>

                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_roles">角色权限: </div>
                                        <div className="row col-xs-10 text-center">
                                            {rolePrivilege}
                                        </div>
                                        {/*
                                         <div className="col-xs-2 sp_classify_name text-center">
                                         <label>
                                         <input className="sp_users_all" type="checkbox" /> <span>全选</span>
                                         </label>
                                         </div>
                                         */}
                                    </div>

                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_dateset">数据集权限: </div>
                                        <div className="row col-xs-10 text-center">
                                            {datasetPrivilege}
                                            {/*
                                             <label className="col-xs-3 col-sm-2 sp_label">
                                             <input className="sp_dateset_manager sp_dateset_detail sp_detail" name="DATESET_ADMIN" type="checkbox" /> <span>管理</span>
                                             </label>
                                             */}
                                        </div>
                                        {/*
                                         <div className="col-xs-2 sp_classify_name text-center">
                                         <label>
                                         <input className="sp_dateset_all" type="checkbox" /> <span>全选</span>
                                         </label>
                                         </div>
                                         */}
                                    </div>
                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_report">报表权限: </div>
                                        <div className=" row col-xs-10 text-center">
                                            {reportPrivilege}
                                            {/*
                                             <label className="col-xs-3 col-sm-2 sp_label">
                                             <input className="sp_report_manager sp_report_detail sp_detail" name="REPORT_ADMIN" type="checkbox" /> <span>管理</span>
                                             </label>
                                             */}
                                        </div>
                                        {/*
                                         <div className="col-xs-2 sp_classify_name text-center">
                                         <label>
                                         <input className="sp_report_all" type="checkbox" /> <span>全选</span>
                                         </label>
                                         </div>
                                         */}
                                    </div>
                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_dashboard">仪表板权限: </div>
                                        <div className=" row col-xs-10 text-center">
                                            {dashBoardPrivilege}
                                            {/*
                                             <label className="col-xs-3 col-sm-2 sp_label">
                                             <input className="sp_dashboard_manager sp_dashboard_detail sp_detail" name="DASHBOARD_ADMIN" type="checkbox" /> <span>管理</span>
                                             </label>
                                             */}
                                        </div>
                                        {/*
                                         <div className="col-xs-2 sp_classify_name text-center">
                                         <label>
                                         <input className="sp_dashboard_all" type="checkbox" /> <span>全选</span>
                                         </label>
                                         </div>
                                         */}
                                    </div>
                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_jobsystem">作业权限: </div>
                                        <div className=" row col-xs-10 text-center">
                                            {jobPrivilege}
                                        </div>
                                        {/*
                                         <div className="col-xs-2 sp_classify_name text-center">
                                         <label>
                                         <input className="sp_jobsystem_all" type="checkbox" /> <span>全选</span>
                                         </label>
                                         </div>
                                         */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="ensure btn btn-primary sp_btn" data-toggle="modal" data-target="#sp_modify" onClick={this.modelContent}>保存</button>
                        {cancelButton}
                    </div>
                </div>
                <Modal modalId="sp_modify" ref='sp_modify' title="修改权限确认" loadModalControlHandler = {this.handleModify} okHandler={this.modifyOKHandle.bind(this)} />
            </div>
        )
    }
}
export default SystemPrivilege;
