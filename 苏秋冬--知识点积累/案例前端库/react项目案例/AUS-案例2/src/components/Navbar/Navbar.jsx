/**
 * 导航条组件
 * User: gaogy
 * Date: 2016/11/25
 * Time: 14:58
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { warning, alert, error } from 'UTIL/notification';
import Modal from 'COMPONENT/Common/Modal/Modal';
require('../../../node_modules/jquery-file-upload/css/uploadfile.css');
require('../../../node_modules/jquery-file-upload/js/jquery.uploadfile.min');

let uploadObj;
@connect(
    ({ login, router }) => ({login, router}),
    require('ACTION/login').default
    )

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.homepageHandler = this.homepageHandler.bind(this);
        this.logoff = this.logoff.bind(this);
        this.userCenter = this.userCenter.bind(this);
        this.changPasswd = this.changPasswd.bind(this);
        this.activation = this.activation.bind(this);
        this.loadModalControlHandler = this.loadModalControlHandler.bind(this);
        this.activationOKHandler = this.activationOKHandler.bind(this);
    }
    // 获取激活信息
    componentWillMount() {
        this.props.getActive();
    }

    componentWillUpdate() {
        this.props.getActive();
    }

    componentDidMount() {
        if (this.props.login.isActive.result.detail.availableDay <= 10 && this.props.login.isActive.result.detail.availableDay >= 0) {
            warning('系统许可即将到期，剩余' + this.props.login.isActive.result.detail.availableDay + '天！')
        } else if (this.props.login.isActive.result.detail.status == 0) {
            warning('系统未激活，当前为试用版!')
        }


    }
    /**
     * 返回主页事件
     */
    homepageHandler() {
        this.props.history.replace('/');
    }

    /**
     * 注销事件
     */
    logoff() {
        let userName = sessionStorage.getItem('XDataUserName');
        this.props.userLogoff(userName);
        if (this.props.login.logoff.code == 0) {
            window.location.replace(document.referrer);
        }
    }

    /**
     * 用户中心
     */
    userCenter() {
        this.props.history.replace('/usercenter');
    }

    /**
     * 密码修改
     */
    changPasswd() {
        this.props.history.replace('/changepasswd');
    }


     // 弹窗DOM
    activation() {
        let modalDom = <div className="activation-wrap">
            <div style={{margin: '10px 0', fontSize: '16px'}}>如果您的License使用期限不足，您可以由下导入新的License。</div>
            <div id="uploadId"></div>
            <a download="aus-uuid" href="./aus-uuid.dat">点击下载UUID文件</a><br/>
        </div>
        this.refs.activation.setContent(modalDom);
    }

    loadModalControlHandler() {
        let that = this;
        uploadObj = $('#uploadId').uploadFile({
            url: '/LicenseManager/uploadLicenseFile',
            multiple: false,
            maxFileCount: 1,
            showDone: false,
            returnType: 'json',
            showPreview: false,
            fileName: 'aus-license',
            dragDrop: false,
            showFileCounter: false,
            showProgress: true,
            extErrorStr: '是不允许的，只接受扩展名为：',
            uploadStr: '选择LICENSE',
            cancelStr: '取消',
            onSuccess(files, xhr) {
                if (xhr.code == 0) {
                    alert('上传成功！');
                    $('#activation').modal('hide');
                    $('.ajax-file-upload-container').empty();
                    that.props.licenseUpload(xhr);
                } else {
                    error(xhr.msg);
                    $('.ajax-file-upload-container').empty();
                    $('#activation').modal('hide');
                }
            },
            onError() {
                alert('上传失败！');
                $('#activation').modal('hide');
                $('.ajax-file-upload-container').empty();
            }
        });
        return uploadObj;
    }

    // 确定激活
    activationOKHandler() {
        // uploadObj.startUpload();
    }

    render() {
        let status;
        if (this.props.login.isActive.result.detail.status != 0) {
            status = '重新激活'
        } else {
            status = '激活'
        }

        // 权限菜单控制
        let userRolePermission = sessionStorage.getItem('userRolePermission');
        let menuItemTpl = [];
        let licenseTpl = '';

        // 用户管理菜单权限控制
        if (userRolePermission.indexOf('USER_') != -1) {
            menuItemTpl.push(<li><Link to="/usermanage"><i className="fa fa-user-plus text-aqua"></i> <span>用户管理</span></Link></li>);
        }

        // 角色管理菜单权限控制
        if (userRolePermission.indexOf('ROLE') != -1) {
            menuItemTpl.push(<li><Link to="/roleManage"><i className="fa fa-user-plus text-red"></i> <span>角色管理</span></Link></li>);
        }

        // 权限菜单
        if (sessionStorage.getItem('XDataUserName') === 'admin' || userRolePermission.indexOf('ROLE_AUTHOR') != -1) {
            menuItemTpl.push(<li><Link to="/systemPrivilege"><i className="fa fa-vcard text-yellow"></i> <span>角色权限管理</span></Link></li>);
        }

        // License菜单权限控制
        if (sessionStorage.getItem('XDataUserName') === 'admin') {
            // menuItemTpl.push(<li><Link to="/systemPrivilege"><i className="fa fa-vcard text-yellow"></i> <span>角色权限管理</span></Link></li>);
            licenseTpl = <li className="dropdown notifications-menu">
                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                    <i className="fa fa-anchor"></i>
                </a>
                <ul className="dropdown-menu">
                    <li className="header">激活信息</li>
                    <li>
                        <div className="slimScrollDiv" style={{ position: 'relative', overflow: 'hidden', width: 'auto'}}>
                            <ul className="menu" style={{ overflow: 'hidden', width: '100%'}}>
                                <li>
                                    <i className="fa fa-plug text-aqua" style={{padding: '10px'}} ></i> <span>节点数：{this.props.login.isActive.result.detail.nodeNum}</span>
                                </li>
                                <li>
                                    <i className="fa fa-users text-red" style={{padding: '10px'}} ></i> <span>用户数：{this.props.login.isActive.result.detail.userNum}</span>
                                </li>
                                <li>
                                    <i className="fa fa-hourglass-half text-yellow" style={{padding: '10px'}} ></i> <span>可用天数：{this.props.login.isActive.result.detail.availableDay}</span>
                                </li>
                                <li style={{textAlign: 'center', margin: '10px'}}>
                                    <button className="btn btn-primary activation" ref="activation" data-toggle="modal" data-target="#activation"onClick={this.activation}>{status}</button>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <Modal modalId="activation" ref='activation' button='noButton' title="用户激活" okHandler={ this.activationOKHandler } loadModalControlHandler = {this.loadModalControlHandler} />
            </li>;
        }

        return (
            <header className="main-header">
                <a href="javascript:void(0);" onClick={ this.homepageHandler } className="logo">
                    <span className="logo-mini"><b>AUS</b></span>
                    <span className="logo-lg"><b>XData-AUS</b>平台</span>
                </a>
                <nav className="navbar navbar-static-top" role="navigation">
                    <a href="javascript:void(0);" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>

                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu">
                                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-user-circle-o" />
                                    <span className="hidden-xs">{ sessionStorage.getItem('XDataUserName') }</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="user-header">
                                        <i className="fa fa-user-circle-o" style={{fontSize: '80px', color: 'white'}} />
                                        <p>
                                            { sessionStorage.getItem('XDataUserName') }
                                        </p>
                                    </li>
                                    <li className="user-body">
                                        <div className="row">
                                            <div className="col-xs-4 text-center">
                                                <a href="javascript:void(0);" className="btn btn-default btn-flat" onClick={this.userCenter}>个人中心</a>
                                            </div>
                                            <div className="col-xs-4 text-center">
                                                <a href="javascript:void(0);" className="btn btn-default btn-flat" onClick={this.changPasswd}>修改密码</a>
                                            </div>
                                            <div className="col-xs-4 text-center">
                                                <a href="javascript:void(0);" className="btn btn-default btn-flat" onClick={this.logoff}>注销</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown notifications-menu">
                                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    <i className="fa fa-gears"></i>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">设置</li>
                                    <li>
                                        <div className="slimScrollDiv" style={{ position: 'relative', overflow: 'hidden', width: 'auto'}}>
                                            <ul className="menu" style={{ overflow: 'hidden', width: '100%'}}>
                                                { menuItemTpl }
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            {licenseTpl}
                        </ul>
                    </div>
                </nav>
        </header>
        )
    }
}
export default Navbar;
