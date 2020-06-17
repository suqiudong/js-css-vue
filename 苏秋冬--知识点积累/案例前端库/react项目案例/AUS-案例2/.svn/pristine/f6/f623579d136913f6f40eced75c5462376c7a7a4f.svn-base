/**
 *修改密码组件
 * User: jiaomx
 * Date: 2016/12/28
 * Time: 19：43
 */

import React, { Component } from 'react';
import { success, error} from 'UTIL/notification';
import { baseValidate } from 'UTIL/baseValidate';
import md5 from 'UTIL/md5';

class ChangePasswd extends Component {
    constructor(props) {
        super(props);
        this.returnHandler = this.returnHandler.bind(this);
        this.userUpdateSave = this.userUpdateSave.bind(this);
    }
    componentWillMount() {
        // 读取用户详细信息
        let userName = sessionStorage.getItem('XDataUserName');
        this.props.readUserPasswd(userName);
    }

    componentDidUpdate() {
        this.refs.operator.value = this.props.changePasswd.userInfo.result.detail.userName;
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
        let oldPasswd = this.props.changePasswd.userInfo.result.detail.password;
        let inputOldPasswd = md5(this.refs.OldPass.value).toUpperCase();
        if (oldPasswd != inputOldPasswd) {
            error('原密码错误！');
            this.refs.OldPass.value = '';
            this.refs.OldPass.focus();
            return;
        }
        let NewPass = md5(this.refs.NewPass.value).toUpperCase();
        if (oldPasswd == NewPass) {
            error('新密码不能和原密码相同！');
            this.refs.NewPass.value = '';
            this.refs.NewPass2.value = '';
            this.refs.NewPass.focus();
            return;
        }
        let constraints = {
            oldPasswd: {
                presence: {
                    message: '原密码不能为空'
                },
                length: {
                    minimum: 6,
                    message: '密码至少6位有效字符'
                },
                format: {
                    // 字母和数字
                    pattern: '[a-z0-9]+',
                    message: '只能包含字母和数字'
                }
            },
            newPass: {
                presence: {
                    message: '新密码不能为空'
                },
                length: {
                    minimum: 6,
                    message: '密码至少6位有效字符'
                },
                format: {
                    // 字母和数字
                    pattern: '[a-z0-9]+',
                    message: '只能包含字母和数字'
                }
            },
            confirmPasswd: {
                presence: {
                    message: '确认密码不能为空'
                },
                equality: {
                    attribute: 'newPass',
                    message: '两次输入密码不一致'
                }
            }
        };

        let detail = {}
        detail.userName = this.refs.operator.value;
        detail.inputNewPasswd = md5(this.refs.NewPass.value).toUpperCase();
        this.refs.save.disabled = true;
        let isValidate = baseValidate($('#userUpdeta'), constraints);
        if (!isValidate) {
            (async () => {
                await this.props.changePasswdSave(detail);
                if (this.props.changePasswd.resUserPasswd.code) {
                    this.refs.save.disabled = false;
                }
                if (this.props.changePasswd.resUserPasswd.code == 0) {
                    success('修改成功！');
                    this.refs.NewPass.value = '';
                    this.refs.NewPass2.value = '';
                    this.refs.OldPass.value = '';
                    // this.props.history.replace('/');
                }
            })();
        }else {
            this.refs.save.disabled = false;
            return;
        }
    }
    
    render() {
        return (
            <div id="userUpdeta" className="box box-primary" >
                <div className="row">
                    <div className="box-body col-md-4">
                        <div className=" form-group col-md-12">
                            <label htmlFor="exampleInputOperator">用户名：</label>
                            <input type="text" ref="operator" className="form-control operator col-md-5" id="exampleInputOperator" disabled/>
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="exampleInputDepartment">旧密码：</label><span className="messages"></span>
                            <input type="password" ref="OldPass" maxLength={100} name="oldPasswd" className="form-control" id="exampleInputOldPass" onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="exampleInputName">新密码：</label><span className="messages"></span>
                            <input type="password" ref="NewPass" maxLength={100} name="newPass" className="form-control" id="exampleInputNewPass" onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="exampleInputPosition">确认密码：</label><span className="messages"></span>
                            <input type="password" ref="NewPass2" maxLength={100} name="confirmPasswd" className="form-control" id="exampleInputNewPass2" onChange={this.handleChange} />
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
export default ChangePasswd;
