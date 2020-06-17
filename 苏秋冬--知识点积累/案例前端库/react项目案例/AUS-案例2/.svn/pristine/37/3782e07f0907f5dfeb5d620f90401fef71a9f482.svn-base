/**
 *插件添加组件
 * User: jiaomx
 * Date: 2017/02/16
 * Time: 14:20
 */

import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import { error, success } from 'UTIL/notification';

let uploadObj;
let isUpload = false;
class PluginAdd extends Component {
	constructor(props) {
        super(props);
        this.returnHander = this.returnHander.bind(this);
        this.returnOKHander = this.returnOKHander.bind(this);
        this.installHander = this.installHander.bind(this);
    }
    componentDidMount() {
        let that = this;
        uploadObj = $('#upload').uploadFile({
            url: '/PluginManager/upload',
            maxFileCount: 1,
            showDone: false,
            showPreview: false,
            dragDrop: false,
            showProgress: true,
            showFileCounter: false,
            fileName: 'pluginFile',
            uploadStr: '插件上传',
            abortStr: '移除',
            showAbort: true,
            cancelStr: '取消',
            returnType: 'json',
            showQueueDiv: 'output',
            onSuccess(files, xhr) {
                isUpload = false;
                $('.ajax-file-upload-container').hide();
                if (xhr.code == 0) {
                    success('上传成功！');
                    $('#output').empty();
                    $('.uploadbtn').hide();
                    $('.uploadfilename').append(files[0]);
                     that.props.pluginFileInfo(xhr);
                } else if (xhr.code == '302') {
                    error(xhr.msg);
                    setTimeout(function() {
                        sessionStorage.removeItem('XDataUserName');
                        sessionStorage.removeItem('userRolePermission');
                        window.location.replace('/');
                    }, 1000);
                } else {
                    error(xhr.msg);
                    $('.uploadbtn').show();
                    // setTimeout(() => {window.location.reload()}, 1000);
                }
            },
            onError() {
                isUpload = false;
                error('上传失败！');
                $('.ajax-file-upload-container').hide();
                $('#output').empty();
            }
        });
    }

    componentWillUnmount() {
        isUpload = false;
    }

    uploadHandler(e) {
        isUpload = true;
        e.stopPropagation();
        $('#upload input').click();
    }

    returnHander() {
        if (isUpload) {
            $('#back').modal('show');
            this.refs.back.setContent('正在上传插件，确定终止上传并返回？');
            return;
        }
        this.props.history.replace('/plugin');
    }

    returnOKHander() {
        uploadObj.stopUpload();
        $('#back').modal('hide');
        this.props.history.replace('/plugin');
    }

    installHander() {
        let that = this;
        let install = this.props.pluginManage.fileInfo.result;
        this.props.pluginInstall(install);
        if (this.props.pluginManage.isInstall.code == 0) {
            setTimeout(() => {that.props.history.replace('/plugin')}, 1000);
        }
    }
	render() {
        let tpl;
        let returnButton;
        if (this.props.pluginManage.fileInfo.code == 0) {
            returnButton = '';
            tpl = <div className="box box-primary">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box-header">
                                <h4>插件详细信息</h4>
                            </div>
                            <div className="box-body">
                                <div><span>插件名：</span><p>{this.props.pluginManage.fileInfo.result.pluginName}</p></div>
                                <div><span>jar包名：</span><p>{this.props.pluginManage.fileInfo.result.jarName}</p></div>
                                <div><span>所有者：</span><p>{this.props.pluginManage.fileInfo.result.owner}</p></div>
                                <div><span>开发者：</span><p>{this.props.pluginManage.fileInfo.result.developer}</p></div>
                                <div><span>描述信息：</span><p style={{marginLeft: '70px'}}>{this.props.pluginManage.fileInfo.result.description}</p></div>
                                <div><span>版本号：</span><p>{this.props.pluginManage.fileInfo.result.version}</p></div>
                                <div style={{marginTop: '20px'}}>
                                    <button type="submit" className="btn btn-primary" style={{marginRight: '20px'}} onClick={ this.returnHander}>返回</button>
                                    <button type="submit" className="btn btn-primary" onClick={ this.installHander}>安装</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        } else {
            returnButton = <button type="submit" className="btn btn-primary" onClick={ this.returnHander}>返回</button>
        }
		return (
			<div id="pluginAdd">
                <div className="box box-primary">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box-header">
                                <h4>上传插件</h4>
                            </div>
                            <div className="box-body">
                                <div className="uploadStr" onClick={this.uploadHandler}>
                                    <span className="uploadfilename"></span>
                                    <div className="uploadbtn">
                                        <i className="fa fa-upload"></i> 点击上传插件
                                    </div>
                                    <div id="upload"></div>
                                </div>
                                <div id="output"></div>
                            </div>
                            <div className="box-footer">
                                {returnButton}
                            </div>
                        </div>
                    </div>
                    <Modal modalId="back" ref='back' title="确认返回" okHandler={ this.returnOKHander }/>
                </div>
                {tpl}
            </div>
		)
	}
}
export default PluginAdd;
