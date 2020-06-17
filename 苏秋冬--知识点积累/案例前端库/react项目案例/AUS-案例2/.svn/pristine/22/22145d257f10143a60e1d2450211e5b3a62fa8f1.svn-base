/**
 *角色编辑组件
 * User: jiaomx
 * Date: 2016/12/22
 * Time: 17:10
 */

import React, { Component } from 'react';
import createList from 'UTIL/baseList';

class RoleDetail extends Component {
    constructor(props) {
        super(props);
        this.createTable = this.createTable.bind(this);
        this.modiftyRoleHander = this.modiftyRoleHander.bind(this);
        this.returnHander = this.returnHander.bind(this);
    }
    componentWillMount() {
        // 读取角色下用户详细信息
        // let roleName = this.props.roleManage.selectRole.roleName;
        this.props.roleManageUserList(this.props.params.id);
    }
    componentDidUpdate() {
        this.createTable();
    }
    createTable() {
        let tableConfig = {};
        tableConfig.id = 'userList';
        tableConfig.columns = [
            {
                data: 'userName', defaultContent: '-'
            },
            {
                data: 'name',
                orderable: false, defaultContent: '-'
            },
            { data: 'email',
                orderable: false, defaultContent: '-'
            },
            { data: 'phoneNo',
                orderable: false, defaultContent: '-' },
            { data: 'department',
                orderable: false, defaultContent: '-'
            },
            { data: 'position',
                orderable: false, defaultContent: '-'
            }
        ];
        tableConfig.scrollX = true;
        tableConfig.data = this.props.roleManage.roleUserList.member;
        tableConfig.order = [[ 0, 'asc' ]];
        createList(tableConfig);
    }
    modiftyRoleHander() {
        this.props.history.replace('/roleManage/edit/' + this.props.params.id);
    }
    returnHander () {
        this.props.history.replace('/roleManage');
    }
    render() {

        return (
            <div id="roleDetail">

                {/**
                 基本信息
                 */}

                <div className="box box-primary" >
                    <div className="box-header with-border ">
                        <p className="box-title">基本信息</p>
                    </div>
                    <div className="box-body">
                        <div className="">
                            <div className="roleNameDiv col-md-6 form-group">
                                <label htmlFor="roleName" > 角色名 : </label>
                                <span className="detailSpan ml10">{ this.props.params.id }</span>
                            </div>
                        </div>
                        <div className="">
                            <div className="descDiv col-md-8 form-group">
                                <label>描述: </label><span className="messages"></span>
                                <span className="detailSpan ml10">{ this.props.roleManage.selectRole.desc }</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/**
                用户列表
                */}

                <div className="box box-primary" >
                    <div className="box-header with-border ">
                        <p className="box-title">用户信息</p>
                    </div>
                    <div className="box-body">
                        <table id="userList" className="table table-striped table-bordered" style={{ width: '100%' }}>
                            <thead>
                            <tr>
                                <th>用户名</th>
                                <th>姓名</th>
                                <th>邮箱</th>
                                <th>电话</th>
                                <th>部门</th>
                                <th>职位</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={ this.returnHander }>返回</button>
                <button type="submit" className="btn btn-primary ml15" ref="save" onClick={ this.modiftyRoleHander }>修改</button>
            </div>
        )
    }
}
export default RoleDetail;
