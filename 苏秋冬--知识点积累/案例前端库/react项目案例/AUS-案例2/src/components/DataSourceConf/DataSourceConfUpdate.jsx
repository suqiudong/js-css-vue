/**
 * 数据源更新
 * User: xongjie
 * Date: 2017/6/16
 * Time: 20:10
 */
import React, { Component } from 'react';
import { baseValidate } from 'UTIL/baseValidate';
import createList from 'UTIL/baseList';
import { error, success } from 'UTIL/notification';
import {decodeBySMS4, encodeSMS4} from 'UTIL/sm4';
import Refresh from 'COMPONENT/Common/Refresh/Refresh';

const key = '2C023A86BD32812A4C180A7152EEBF0A';
var isEsxit = false;

class DateSourceCreate extends Component {
    constructor(props) {
        super(props);
        this.dataSourcesWitching = this.dataSourcesWitching.bind(this);
        this.kerberos = this.kerberos.bind(this);
        this.createTable = this.createTable.bind(this);
        this.isExistPassword = this.isExistPassword.bind(this);
        this.isExistUserName = this.isExistUserName.bind(this);
        this.isExistURL = this.isExistURL.bind(this);
        this.isExistAuthentication = this.isExistAuthentication.bind(this);
        this.isExistInput = this.isExistInput.bind(this);
        this.FromData = this.FromData.bind(this);
        this.infoData = this.infoData.bind(this);
        this.infoTest = this.infoTest.bind(this);
        this.sync = this.sync.bind(this);
        this.cancel = this.cancel.bind(this);
        this.state = {
            kerberos: 'block'
        }
    }
    componentWillMount() {
        // 读取数据源详细信息
        let dataSource = {
            dataSourceName: this.props.params.dataSourceName,
            offset: 1,
            num: 10000,
            tableNameFilter: ''
        };
        this.props.getDataSource(dataSource);
    }
    componentDidUpdate() {
        $(' #FormData').attr('enctype', 'multipart/form-data');
        // 传入表单数据
        const dataSource = this.props.dataSourceConf.dataSourceDetail;
        let tableDate = dataSource.schemaModule;
        $(' #description').val(dataSource.description.trim());
        $(' #dataSourceType').val(dataSource.dataSourceType.trim());
        $(' #dataSourceName').val(dataSource.dataSourceName.trim());
        $(' #visable').val(dataSource);
        $(' #dataSourceUser').val(decodeBySMS4(dataSource.connectionConfig.user.split(','), key).trim());
        $(' #dataSourceURL').val(decodeBySMS4(dataSource.connectionConfig.url.split(','), key).trim());
        $(' #dataSourcePassword').val(decodeBySMS4(dataSource.connectionConfig.pwd.split(','), key).trim());
        $(' #dataSoucerTime').val(dataSource.createTime);
        $(' #kerberos option[value= "' + dataSource.connectionConfig['hive.hdfs.authentication.type'] + '" ] ').attr('selected', true);
        $(' #dataAuthentication').val(dataSource.connectionConfig['hive.hdfs.ausmpp.principal']);
        // 构建同步信息
        let arr = [];
        for (let key in tableDate) {
            // 添加表名
            for (let keys in tableDate[key]) {
                arr.push({tableName: key + '.' + tableDate[key][keys].tableName});
            }
        }
       this.createTable(arr);
    }
    /**
     * 切换数据源状态
     */
    dataSourcesWitching() {
        let ischecked = $('#dataSourceWitch').val();
        this.setState({
            witch: ischecked
        })
    }
    /**
     * 切换认证状态
     */
    kerberos() {
        if ($(' #kerberos').val() == 'NONE') {
            this.setState({kerberos: 'none'});
        } else {
            this.setState({kerberos: 'block'});
        }
    }

    createTable(data) {
        // 构造列表配置项
        let tableConfig = {};
        tableConfig.id = 'dataSoucerList';
        tableConfig.scrollX = false;
        tableConfig.searching = false;
        tableConfig.columns = [
            {data: 'tableName', 'defaultContent': '-'}
        ];
        tableConfig.order = [[0, 'desc']];
        // 获取列表内数据列
        tableConfig.data = data;
        // 生成列表
        createList(tableConfig);
    }
    // 验证密码
    isExistPassword() {
        let constraints = {
            'password': {
                // 必填
                presence: {
                    message: '请输入密码'
                },
                length: {
                    maximum: 12,
                    message: '不能超过12个字符'
                }
            }
        };
        baseValidate($('#dataSourcePassword').parent(), constraints);
    }
    // 验证用户名
    isExistUserName() {
        let constraints = {
            'userName': {
                // 必填
                presence: {
                    message: '请输入用户名'
                },
                length: {
                    maximum: 12,
                    message: '不能超过12个字符'
                }
            }
        };
        baseValidate($('#dataSourceUser').parent(), constraints);
    }
    // 验证url
    isExistURL() {
        let constraints = {
            'dataURL': {
                // 必填
                presence: {
                    message: '请输入数据源名'
                },
                length: {
                    maximum: 30,
                    message: '不能超过30个字符'
                }
            }
        };
        baseValidate($('#dataSourceURL').parent(), constraints);
    }
    // 认证主体验证
    isExistAuthentication() {
        let constraints = {
            'Authentication': {
                // 必填
                format: {
                    pattern: '^([A-Z]|[a-z]|[0-9]){6,12}',
                    message: '请输入正确的URL'
                },
                length: {
                    maximum: 30,
                    message: '不能超过30个字符'
                }
            }
        };
        baseValidate($('#dataAuthentication').parent(), constraints);
    }
    // 验证所有表单不能为空
    isExistInput() {
        if ($('span.messages').find('p').length > 0) {
            error('输入有异常，请检查后重新提交！');
            isEsxit = false;
            return;
        } else {
            let constraints = {
                'Authentication': {
                    // 必填
                    presence: {
                        message: '请输入认证信息'
                    }
                },
                'password': {
                    // 必填
                    presence: {
                        message: '请输入密码'
                    }
                },
                'userName': {
                    // 必填
                    presence: {
                        message: '请输入名称'
                    }
                },
                'dataURL': {
                    // 必填
                    presence: {
                        message: '请输入URL'
                    }
                }
            };
            baseValidate($('#dataSourceConfAdd'), constraints);
            let ise = ()=> {
                for (let i = 0; i < $('span.messages').length; i++) {
                    if ($('span.messages').eq(i).html().length > 0) {
                        isEsxit = false;
                        return;
                    } else {
                        isEsxit = true;
                    }
                }
                return isEsxit;
            };
            ise();
        }
        return isEsxit;
    }

    // 表单传输
    FromData(url, str, that, names) {
        if (this.isExistInput()) {
            let URL = $(' #dataSourceURL').val();
            let USER = $(' #dataSourceUser').val();
            let PWD = $(' #dataSourcePassword').val();

            // 传输前进行加密
            $(' #dataSourcePassword').val(encodeSMS4(PWD, key));
            $(' #dataSourceURL').val(encodeSMS4(URL, key));
            $(' #dataSourceUser').val(encodeSMS4(USER, key));
            this.refs.Refresh.RefreshShow();
            let options = {
                url: url,
                dataType: 'html',
                type: 'POST',
                beforeSubmit: ()=>{
                    // 传输入替换
                    $(' #dataSourceURL').val(URL);
                    $(' #dataSourceUser').val(USER);
                    $(' #dataSourcePassword').val(PWD);
                },
                success: (data)=>{
                    this.refs.Refresh.RefreshHide();
                    data = JSON.parse(data);
                    if (data.code == '0') {
                        success(str);
                        names.attr('disabled', false);
                        names.on('click', that);
                        return;
                    } else {
                        error(data.msg);
                    }
                }
            };
            $(' #FormData').ajaxSubmit(options);
        } else {
            return;
        }
    }

    // 链接测试
    infoTest(e) {
        // 描述信息
        e.preventDefault();
        this.FromData('/DataSource/testConnect', '连接成功', this.infoData, $(' button[ name = "saveBtn" ]'));
    }

    // 保存
    infoData(e) {
        e.preventDefault();
        this.FromData('/DataSource/modify', '保存成功', this.sync, $(' button[ name = "sync" ]'));
    }
    // 数据源同步
    sync() {
        let dataSouceName = {
            dataSourceName: this.props.params.dataSourceName
        };
        this.refs.Refresh.RefreshShow();
        (async ()=>{
            await this.props.syncSchemaInfo(dataSouceName);
            if (this.props.dataSourceConf.syncSchemaInfo == '0') {
                this.refs.Refresh.RefreshHide();
                this.tableData(this.props.dataSourceConf.syncSchemaInfo);
            } else {
                this.refs.Refresh.RefreshHide();
            }
        })();
    }
    // 取消
    cancel() {
        this.props.history.replace('/dataSourceConf');
    }
    render() {
        let tpl;
        let tpls = <div>
            <div className="dataSourceNameDiv col-md-12 form-group">
                <label htmlFor="dataSourceName" >数据源名称 : </label>
                <span className="messages"></span>
                <input type="text" id="dataSourceName" name="dataSourceName" className="form-control" readOnly='readonly'/>
            </div>
            <div className="dataSourceNameDiv form-group col-md-12">
                <div className="input-name">
                    <label htmlFor="description" className="description">描述：</label>
                    <input type="text" name="description" id="description" className="form-control" />
                </div>
            </div>

            <div className="dataSourceNameDiv col-md-12 form-group">
                <label htmlFor="connectionConfig.url" >URL : </label><span className="messages"></span>
                <input type="text" id="dataSourceURL" name="connectionConfig.url" className="form-control" onBlur={ this.isExistURL}/>
            </div>
        </div>;
        let users = <div>
            <div className="dataSourceNameDiv col-md-12 form-group">
                <label htmlFor="connectionConfig.user" >用户名 : </label><span className="messages"></span>
                <input type="text" id="dataSourceUser" name="connectionConfig.user" maxLength={16} className="form-control" onBlur={ this.isExistUserName}/>
            </div>
            <div className="dataSourceNameDiv col-md-12 form-group">
                <label htmlFor="connectionConfig.pwd" >密码 : </label><span className="messages"></span>
                <input type="password" id="dataSourcePassword" maxLength={16} name="connectionConfig.pwd" className="form-control" onBlur={ this.isExistPassword}/>
            </div>
        </div>;
        let type = this.props.dataSourceConf.selectedRecord.dataSourceType;
        if (type == 'hive-hadoop2' || type == 'hbase') {
            tpl = <div>
                {tpls}
                {users}
                <div className="dataSourceNameDiv col-md-12 form-group">
                    <label htmlFor="connectionConfig.hive.metastore.uri" >是否启用kerberos认证 : </label><span className="messages"></span>
                    <select onChange = {this.kerberos} id='kerberos' name="connectionConfig.['hive.hdfs.authentication.type']" className="form-control" style={{ width: '100%' }}>
                        <option value="NONE">NONE</option>
                        <option value="KERBEROS">KERBEROS</option>
                    </select>
                </div>
                <input type="hidden" id="metastore" name="connectionConfig.hive.metastore.uri"/>
                <div id='dataSourceKerberosDiv' style={{display: this.state.kerberos}}>
                    <div className="dataSourceNameDiv col-md-12 form-group">
                        <label htmlFor="connectionConfig.['hive.hdfs.authentication.type']" >认证主体 : </label><span className="messages"></span>
                        <input type="text" id="dataAuthentication" maxLength={30} name="connectionConfig.['hive.hdfs.ausmpp.principal']" className="form-control" placeholder="ausmpp@EXAMPLE.COM" onBlur={this.isExistAuthentication}/>
                    </div>
                    {/* 文件上传*/}
                    <div id="pluginAdd">
                        <div className="dataSourceNameDiv col-md-12 form-group">
                            <label htmlFor="keytab" >上传keytab文件</label>
                            <input type="file" name='keytab' id='keytab'/>
                        </div>
                    </div>
                </div>
            </div>;
        } else {
            tpl = <div>
                {/* <div className="dataSourceNameDiv col-md-12 form-group">
                    <label htmlFor="visable" >可见性 : </label><span className="messages"></span>
                    <input type="text" id="visable" name="datasetName" className="form-control" disabled/>
                </div>*/}
                {tpls}
                {users}
            </div>;
        }
        return (
            <div id = "dataSourceConfAdd">
                <Refresh ref='Refresh'/>
                <div className="row">
                    <div className="col-md-7 dataSourceLeft">
                        <div className="box box-primary">
                            <div className="box-header with-border" >
                                <p className="box-title">配置信息</p>
                            </div>
                            <div className="box-body">
                                <div className="row">
                                    <form id='FormData' name='FormData' enctype='multipart/form-data'>
                                        <div className="dataSourceNameDiv col-md-12 form-group">
                                            <label htmlFor="dataSourceType" >数据源 : </label><span className="messages"></span>
                                            <input type="text" id="dataSourceType" name='dataSourceType' className="form-control" readOnly='readonly'/>
                                        </div>
                                        {tpl}
                                        <div className="dataSourceNameDiv col-md-12 form-group">
                                            <button name="infoTest" className="btn btn-primary" onClick={ this.infoTest } >连接测试</button>
                                            <button name="saveBtn" className="btn btn-primary" style={{ margin: '0px 25px' }} disabled>保存</button>
                                            <button name="leave" className="btn btn-primary" onClick={ this.cancel } > 返回</button>
                                        </div>
                                     </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 dataSourceRight">
                        <div className="box box-primary ">
                            <div className="box-header with-border" >
                                <p className="box-title">表信息</p>
                            </div>
                            <div className="box-body">
                                <div className="row">
                                    <div className="dataSourceNameDiv col-md-12 form-group">
                                        <label htmlFor="datasetName" ></label><span className="messages"></span>
                                        <div className="dataSourceNameDiv col-md-12 form-group">
                                            <label htmlFor="dataSoucerTime" >上传同步时间 : </label><span className="messages"></span>
                                            <input type="text" id="dataSoucerTime" name="dataSoucerTime" className="form-control" disabled/>
                                        </div>
                                        <table id="dataSoucerList" className="table table-striped table-bordered" style={{'text-align': 'center'}}>
                                            <thead>
                                                <tr role="row" >
                                                    <th style={{textAlign: 'center'}}>表信息</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        <button name="sync" className="btn btn-primary" disabled ='true'>同步信息列表</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DateSourceCreate;
