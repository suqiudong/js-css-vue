/**
 * 用户系统权限管理组件
 * User: zhangax
 * Date: 2016/12/21
 * Time: 10:18
 */
import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createSelect from 'UTIL/baseSelect2';
import createiCheck from 'UTIL/baseiCheck';
import { error } from 'UTIL/notification';

class UserSysPrivilege extends Component {
    constructor(props) {
        super(props);
        this.createSelect = this.createSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.privilege = this.privilege.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.modelContent = this.modelContent.bind(this);
    }
    componentWillMount() {
        // 读取 action 里面 ajax 请求到的数据
        this.props.userSysPrivilege(this.props.usermanage.selectedRecord.userName);
        this.props.getSysPrivilege();
    }

    componentDidMount() {
        this.handleChange();
        /*
         // 这里是 选择角色用
         let obj = [];
         let userName = this.props.usermanage.userSysPrivilege.result.detail;
         let param = {};
         param.id = userName.userName;
         param.text = userName.userName;
         obj.push(param);
         this.createSelect(obj);
        */

    }

    // select2 下拉框
    createSelect(data) {
        let selectConfig = {};
        selectConfig.id = 'select_user';
        selectConfig.data = data;
        selectConfig.tags = false;
        selectConfig.minimumResultsForSearch = -1;
        createSelect(selectConfig);
    }

    /**
    componentDidUpdate() {
        let spDetail = this.props.usermanage.userSysPrivilege.result.detail.sysPrivilege.split(' ');
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
    // 取消按钮
    handleChange() {
        let spDetail = this.props.usermanage.userSysPrivilege.result.detail.privilege;
        let spClass = $('.sp_detail');
        for (let key in spDetail) {
            spClass.each((n, e) => {
                if (e.name == key) {
                    if ($.inArray($(e).attr('data-name'), spDetail[key]) != -1) {
                        $(e).parents('label').css('color', '#000');
                        e.checked = true;
                        // createiCheck(e);
                    } else {
                        $(e).parents('label').css('color', '#d2d6de');
                        // createiCheck(e);
                    }
                }
                e.disabled = true;
                createiCheck(e);
            });
        }
        $('.modify').attr('disabled', false);
        $('.cancel').attr('disabled', true);
        $('.ensure').attr('disabled', true);

    }
    // 点击修改权限
    handleEdit(e) {
        // this.props.userSysPrivilege(this.props.usermanage.selectedRecord.userName);
        $('.ensure').attr('disabled', false);
        $('.modify').attr('disabled', true);
        $('.cancel').attr('disabled', false);
        let spClass = $('.sp_detail');
        spClass.each((n, e) => {
            $(e).parents('label').css('color', '#000');
            e.disabled = false;
            createiCheck(e);
        });
    };

    // 权限 check 确认
    handleModify() {
        let userId = $('.sp_select_user').val();
        let spClass = $('.sp_detail');
        let datas = [];
        let data = {};
        data.userName = userId;
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
        let checkRes = this.props.usermanage.checkSysPrivilege;
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
        }
    }
    // 弹框生成 li
    modelContent() {
        let userId = $('.sp_select_user').val();
        let content = <ol id="dependency" className='todo-list ui-sortable'><li>您确定要修改用户： <strong>{userId}</strong> 的系统权限吗？</li></ol>
        $('#dependency').html('');
        this.refs.sp_modify.setContent(content);

    }

    // 修改并 check 确定后提交
    modifyOKHandle() {
        let userId = $('.sp_select_user').val();
        let spClass = $('.sp_detail');
        let data = {};
        data.userName = userId;
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
        this.props.modifyUserSysPrivilege(data);
        $('.ensure').attr('disabled', true);
        $('.cancel').attr('disabled', true);
        $('.modify').attr('disabled', false);
        $('#sp_modify').modal('hide');
        this.props.history.replace('/usermanage/sysPrivilege/' + this.props.usermanage.selectedRecord.userName);
    };
    // 返回按钮
    return() {
        this.props.history.replace('/usermanage');
    }
    // 权限判断分配
    privilege(e, key) {
        let p = e[key].map((i)=>{
            return <label className="col-xs-3 col-sm-2 sp_label"> <input className="sp_users_detail sp_detail" name={key} data-Name={i} type="checkbox" /> <span> {i} </span> </label>
        });
        return p;
    }
    render() {
        let userPrivilege, reportPrivilege, rolePrivilege, datasetPrivilege, dashBoardPrivilege, jobPrivilege, pluginPrivilege;
        let sysPrivilege = this.props.usermanage.getSysPrivilege.result.detail;
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
        let user = this.props.usermanage.userSysPrivilege.result.detail.userName;
        return (
            <div className="box box-primary">
                <p className="box-header with-border sp_user_info"><h4 className="ml15">权限管理</h4></p>
                <div className="row sp_content">
                    <div className="col-sm-2 hidden-xs text-right">
                        <p className="sp_user">用户名 : </p>
                        <p className="sp_user_set">用户权限设置 : </p>
                    </div>
                    <div className="col-sm-8 col-xs-12">
                        <div className="sp_select_user_div">
                            {/*
                            <select className="sp_select_user form-control" onChange={ this.handleChange.bind(this) }>
                                <option value="sm_00001">超级管理员</option>
                                <option value="m_00001">管理员</option>
                                <option value="u_00001">角色1</option>
                                <option value="u_00002">角色2</option>
                            </select>
                            */}
                            <select className="sp_select_user form-control" disabled name="" id="select_user">
                                <option value={user}>{ user }</option>
                            </select>
                        </div>
                        <div className="nav-tabs-custom" style={{userSelect: 'none'}}>
                            <ul className="nav nav-tabs" user="tablist">
                                <li user="presentation" className="active"><a className="sp_presentation" href="#home" user="tab" data-toggle="tab">系统权限管理</a></li>
                                <li className="pull-right header"><button type="submit" className="return btn btn-primary" onClick={this.return.bind(this)}>返回</button></li>
                                <li className="pull-right header"><button type="submit" className="modify btn btn-primary" onClick={this.handleEdit.bind(this)}>修改</button></li>
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
                        <button type="button" className="cancel btn btn-primary sp_btn" onClick={this.handleChange}>取消</button>
                    </div>
                </div>
                <Modal modalId="sp_modify" ref='sp_modify' title="修改权限确认" loadModalControlHandler = {this.handleModify} okHandler={this.modifyOKHandle.bind(this)} />
            </div>
        )
    }
}
export default UserSysPrivilege;
