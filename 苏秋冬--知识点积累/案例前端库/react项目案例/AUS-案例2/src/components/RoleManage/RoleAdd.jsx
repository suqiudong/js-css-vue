/**
 *角色编辑组件
 * User: jiaomx
 * Date: 2016/12/22
 * Time: 17:10
 */

import React, { Component } from 'react';
import { baseValidate } from 'UTIL/baseValidate';

let roleUserList = {};
roleUserList.member = [];
class RoleAdd extends Component {
    constructor(props) {
        super(props);
        this.addRoleHander = this.addRoleHander.bind(this);
        this.removeRoleHander = this.removeRoleHander.bind(this);
        this.saveRoleHander = this.saveRoleHander.bind(this);
        this.saveRoleToPrivilege = this.saveRoleToPrivilege.bind(this);
        this.isNameExistsHandler = this.isNameExistsHandler.bind(this);
        this.allRoleName = this.allRoleName.bind(this);
    }
    componentWillMount() {
        // 读取所有的用户
        this.props.allUserList();
        this.props.readRole();
    }
    componentDidMount () {
        roleUserList = {};
        roleUserList.member = [];
        this.props.addUserORRemoveToRole(roleUserList);
    }

    /**
     * 判断角色名称是否存在且输入格式正确
     */

    isNameExistsHandler() {
        let allRoleName = this.allRoleName();
        let constraints = {
            'roleName': {
                // 必填
                presence: {
                    message: '请输入角色名'
                },
                format: {
                    pattern: '^(?!_)(?!.*?_$)[\u4e00-\u9fa5a-zA-Z]+[\u4e00-\u9fa5a-zA-Z0-9\-_]*$',
                    message: '请输入正确的角色名'
                },
                length: {
                    maximum: 20,
                    message: '不能超过20个字符'
                }
            }
        };
        baseValidate($('.roleNameDiv'), constraints);
        if ($('#roleName').val().trim() != '') {
            if (allRoleName.indexOf($('#roleName').val()) !== -1) {
                let constraints = {
                    'roleName': {
                        format: {
                            pattern: '!^[\u4e00-\u9fa5a-zA-Z]+[\u4e00-\u9fa5a-zA-Z0-9\-_]*$',
                            message: '角色名已存在, 请重新输入 !'
                        }
                    }
                };
                baseValidate($('.roleNameDiv'), constraints);
                return;
            }
        }
    }
    allRoleName() {
        let roleArr = [];
        let allRoleList = this.props.roleManage.roleManagesData.result.data;
        for (let i = 0; i < allRoleList.length; i++) {
            roleArr.push(allRoleList[i].roleName);
        }
        return roleArr;
    }
    addRoleHander(e) {
        let allUserList = this.props.roleManage.allUserList;
        for (let i = 0; i < allUserList.member.length; i++) { // 去掉admin
            if (allUserList.member[i].userName == 'admin') {
                allUserList.member.splice(i, 1);
            }
        }
        let select = document.querySelector('#select1');
        // 获取选中option的index
        let selectUserIndex = [];
        for (let i = 0;i < select.length;i++) {
            if (select.options[i].selected) {
                selectUserIndex.push(select[i].index);
            }
        }
        // 处理显示在所有用户
        let allUserListDeal = [];
        for (let i = 0; i < allUserList.member.length; i++) {
            let flag = true;
            for (let j = 0; j < roleUserList.member.length; j++) {
                if (roleUserList.member[j].userName == allUserList.member[i].userName || allUserList.member[i].userName == 'admin') {
                    flag = false;
                }
            }
            if (flag) {
                allUserListDeal.push(allUserList.member[i]);
            }
        }
        for (let i = 0; i < selectUserIndex.length; i++) {
            roleUserList.member.push(allUserListDeal[selectUserIndex[i]])
        }
        if (selectUserIndex.length > 0) {
            this.props.addUserORRemoveToRole(roleUserList);
        }
    }
    // 从角色中移除用户
    removeRoleHander() {
        let allUserList = this.props.roleManage.allUserList;
        for (let i = 0; i < allUserList.member.length; i++) { // 去掉admin
            if (allUserList.member[i].userName == 'admin') {
                allUserList.splice(i, 1);
            }
        }
        let select = document.querySelector('#select2');
        // 获取选中option的index
        let selectUserIndex = [];
        for (let i = 0;i < select.length;i++) {
            if (select.options[i].selected) {
                selectUserIndex.push(select[i].index);
            }
        }

        selectUserIndex.sort().reverse();
        for (let i = 0; i < selectUserIndex.length; i++) {
            roleUserList.member.splice(selectUserIndex[i], 1)
        }
        if (selectUserIndex.length > 0) {
            this.props.addUserORRemoveToRole(roleUserList);
        }
    }

    saveRoleHander() {
        this.isNameExistsHandler();
        if ($('span.messages').find('p').length > 0) {
            return;
        };
        let data = {};
        data.roleName = $('#roleName').val();
        data.desc = $('#desc').val();
        data.member = [];
        for (let i = 0; i < roleUserList.member.length; i++) {
            data.member.push(roleUserList.member[i].userName);
        }
        (async () => {
            await this.props.createRole(data);
            if (this.props.roleManage.createRole.code == 0) {
                this.props.history.replace('/roleManage');
            }
        })();

    }

    saveRoleToPrivilege () {
        this.isNameExistsHandler();
        if ($('span.messages').find('p').length > 0) {
            return;
        };
        let data = {};
        data.roleName = $('#roleName').val();
        data.desc = $('#desc').val();
        data.member = [];
        for (let i = 0; i < roleUserList.member.length; i++) {
            data.member.push(roleUserList.member[i].userName);
        }
        (async () => {
            await this.props.createRole(data);
            if (this.props.roleManage.createRole.code == 0) {
                this.props.history.replace('/systemPrivilege/roleSys/' + data.roleName);
            }
        })();
    }


    render() {

        let option1;
        let option2;
        if (this.props.roleManage.allUserList.member != undefined) {
            let allUserList = this.props.roleManage.allUserList.member;
            for (let i = 0; i < allUserList.length; i++) { // 去掉admin
                if (allUserList[i].userName == 'admin') {
                    allUserList.splice(i, 1);
                }
            }
            option1 = roleUserList.member.map((elememt, index) =>{
                return <option value={elememt.userName}>{elememt.userName + ' (' + elememt.name + ')'}</option>
            });
            let allUserListDeal = [];
            for (let i = 0; i < allUserList.length; i++) {
                let flag = true;
                for (let j = 0; j < roleUserList.member.length; j++) {
                    if (roleUserList.member[j].userName == allUserList[i].userName || allUserList[i].userName == 'admin') {
                        flag = false;
                    }
                }
                if (flag) {
                    allUserListDeal.push(allUserList[i]);
                }
            }
            option2 = allUserListDeal.map((elememt, index) =>{
                return <option value={elememt.userName}>{elememt.userName + ' (' + elememt.name + ')'}</option>
            });
        }else {
            option1 = option2 = '';
        }

        return (
            <div id="roleAdd">
                {/**
                    基本信息
                */}
                <div className="box box-primary" >
                    <div className="box-header with-border ">
                        <p className="box-title">基本信息</p>
                    </div>
                    <div className="box-body">
                        <div className="row">
                            <div className="roleNameDiv col-md-6 form-group">
                                <label htmlFor="roleName" ><span className="identify">* </span>角色名 : </label><span className="messages"></span>
                                <input type="text" id="roleName" onBlur={this.isNameExistsHandler} name="roleName" className="form-control" placeholder="角色名唯一且首字母不为下划线" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="descDiv col-md-8 form-group">
                                <label>描述: </label><span className="messages"></span>
                                <textarea style={{maxWidth: '1083px'}} placeholder="添加对该角色的描述" name="desc" id="desc" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
                {/**
                 用户分配
                 */}
                <div className="box box-primary" >
                    <div className="box-header with-border ">
                        <p className="box-title">用戶分配</p>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box-body">
                                <div className="form-group col-md-4">
                                    <label>可添加用户</label>
                                    <select multiple="multiple" id="select1" ref="select1" className="form-control" size="8" >
                                        {option2}
                                    </select>
                                </div>
                                <div className="col-md-2 dir">
                                    <div className="dir-button">
                                        <button ref="add" onClick={ this.addRoleHander}><i className="fa fa-long-arrow-right col-md-12 dir-right"></i></button>
                                        <button ref="remove" onClick={ this.removeRoleHander}><i className="fa fa-long-arrow-left col-md-12 dir-left"></i></button>
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>角色内用户</label>
                                    <select multiple="multiple" id="select2" ref="select2" className="form-control" size="8">
                                        {option1}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" ref="save" onClick={ this.saveRoleHander }>保存</button>
                <button type="submit" className="btn btn-primary ml15" onClick={ this.saveRoleToPrivilege }>保存并配置权限</button>
            </div>
        )
    }
}
export default RoleAdd;
