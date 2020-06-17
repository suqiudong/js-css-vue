/**
 *用户中心组件
 * User: jiaomx
 * Date: 2016/12/28
 * Time: 17：00
 */

import React, { Component } from 'react';
import { baseValidate } from 'UTIL/baseValidate';

class UserCenter extends Component {
    constructor(props) {
        super(props);
        this.returnHandler = this.returnHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.userUpdateSave = this.userUpdateSave.bind(this);
    }
    componentWillMount() {
        // 读取用户详细信息
        let userName = sessionStorage.getItem('XDataUserName');
        this.props.readUserInfo(userName);
    }

    componentDidUpdate() {
        this.refs.operator.value = this.props.userCenter.userCenterData.result.detail.userName;
        this.refs.department.value = this.props.userCenter.userCenterData.result.detail.department;
        this.refs.email.value = this.props.userCenter.userCenterData.result.detail.email;
        this.refs.position.value = this.props.userCenter.userCenterData.result.detail.position;
        this.refs.name.value = this.props.userCenter.userCenterData.result.detail.name;
        this.refs.phoneNo.value = this.props.userCenter.userCenterData.result.detail.phoneNo;
        document.addEventListener('keydown', (e) => {
            if (e && e.keyCode == 13) {
                this.userUpdateSave();
            }
        });
    }
    // 修改input的值
    handleChange(e) {
        
    }
    // 返回事件
    returnHandler() {
        this.props.history.replace('/');
    }

    // 用户保存
    userUpdateSave() {
        let detail = {};

        let constraints = {
            email: {
                // 必须邮箱格式
                email: {
                    message: '请输入正确的邮箱格式'
                }
            },
            name: {
                // 长度限制
                length: {
                    maximum: 20,
                    message: '长度20位字符以内'
                }
            },
            phoneNo: {
                format: {
                    // 字母和数字
                    pattern: /^[0][0-9]{2,3}-\d{7,8}|^1[34578]\d{9}$/,
                    message: '请输入正确号码格式,例如"010-XXXXXXXX或者131XXXXXXXX"'
                },
                length: {
                    minimum: 11,
                    maximum: 13,
                    message: '请输入正确号码长度'
                }
            },
            department: {
                // 长度限制
                length: {
                    maximum: 20,
                    message: '长度20位字符以内'
                }
            },
            position: {
                // 长度限制
                length: {
                    maximum: 20,
                    message: '长度20位字符以内'
                }
            }
        };

        detail.userName = this.refs.operator.value;
        detail.department = this.refs.department.value;
        detail.email = this.refs.email.value;
        detail.position = this.refs.position.value;
        detail.name = this.refs.name.value;
        detail.phoneNo = this.refs.phoneNo.value;
        this.refs.save.disabled = true;
        let isValidate = baseValidate($('#userUpdeta'), constraints);
        if (!isValidate) {
            (async () => {
                await this.props.userCenterUpdate(detail);
                if (this.props.userCenter.isSaveSuccess.code) {
                    this.refs.save.disabled = false;
                }
                if (this.props.userCenter.isSaveSuccess.code == 0) {
                    setTimeout(() => {
                        this.props.history.replace('/');
                    }, 1000);
                }
            })();
        }else {
            this.refs.save.disabled = false;
            return;
        }
    }

    render() {
        let result = this.props.userCenter.userCenterData.result;
        let roleName = (result == undefined) ? '' : result.detail.roleName;
        return (
            <div id="userUpdeta" className="box box-primary" >
                <div className="row">
                    <div className="box-body col-md-12">

                        <div className="col-md-5">
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputOperator">用户名：</label>
                                <input type="text" ref="operator" className="form-control operator" id="exampleInputOperator" disabled/>
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputName">姓名：</label><span className="messages"></span>
                                <input type="text" ref="name" name="name" maxLength={20} className="form-control" id="exampleInputName" onChange={this.handleChange} />

                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputEmail1">邮箱：</label><span className="messages"></span>
                                <input type="email" ref="email" name="email" maxLength={30} className="form-control" id="exampleInputEmail1" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputTel">电话：</label><span className="messages"></span>
                                <input type="text" ref="phoneNo" name="phoneNo" maxLength={13} className="form-control" id="exampleInputTel" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputDepartment">部门：</label><span className="messages"></span>
                                <input type="text" ref="department" name="department" maxLength={20} className="form-control" id="exampleInputDepartment" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputPosition">职位：</label><span className="messages"></span>
                                <input type="text" ref="position" name="position" maxLength={20} className="form-control" id="exampleInputPosition" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-12">
                                <label>角色名称：</label>
                                <input className="form-control roleName" value={roleName} disabled/>
                            </div>
                        </div>
                        <div className="box-button col-md-12">
                            <button className="btn btn-primary" onClick={this.returnHandler}>返回</button>
                            <button className="btn btn-primary" ref="save" onClick={this.userUpdateSave}>保存</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserCenter;
