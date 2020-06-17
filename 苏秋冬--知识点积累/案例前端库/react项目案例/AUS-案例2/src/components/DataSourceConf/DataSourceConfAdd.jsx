/**
 * 数据集新建组件
 * User: xongjie
 * Date: 2017/6/16
 * Time: 20:10
 */
import React, { Component } from 'react';
import { baseValidate } from 'UTIL/baseValidate';
import { error, success } from 'UTIL/notification';
import {encodeSMS4} from 'UTIL/sm4';
import createList from 'UTIL/baseList';
import Refresh from 'COMPONENT/Common/Refresh/Refresh';

const key = '2C023A86BD32812A4C180A7152EEBF0A';
var isEsxit = false;

class DateSourceCreate extends Component {
    constructor(props) {
        super(props);
        this.dataSourcesWitching = this.dataSourcesWitching.bind(this);
        this.isNameExistsHandler = this.isNameExistsHandler.bind(this);
        this.isExistNameChange = this.isExistNameChange.bind(this);
        this.FromData = this.FromData.bind(this);
        this.infoTest = this.infoTest.bind(this);
        this.isExistPassword = this.isExistPassword.bind(this);
        this.isExistUserName = this.isExistUserName.bind(this);
        this.isExistURL = this.isExistURL.bind(this);
        this.isExistAuthentication = this.isExistAuthentication.bind(this);
        this.isExistInput = this.isExistInput.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
        this.creatData = this.creatData.bind(this);
        this.cancel = this.cancel.bind(this);
        this.syncSchemaInfo = this.syncSchemaInfo.bind(this);
        this.kerberos = this.kerberos.bind(this);
        this.tableData = this.tableData.bind(this);
        this.state = {
            witch: 'Hive',
            kerberos: 'none'
        }
    }
    componentWillMount() {
        // this.props.getDataSource();
    }

    componentDidMount() {
        $(' #FormData').attr('enctype', 'multipart/form-data');
    }
    /**
     * 切换数据源状态
     */
    dataSourcesWitching() {
        let ischecked = $('#dataSourceType').val();
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
    /**
     * 判断数据源名称是否存在且输入格式正确
     */
    isNameExistsHandler() {
        let constraints = {
            'dataSourceName': {
                // 必填
                presence: {
                    message: '请输入数据源名'
                },
                format: {
                    pattern: '^(?!_)(?!.*?_$)[a-z0-9_]+$',
                    message: '请输入正确的数据源名'
                },
                length: {
                    maximum: 30,
                    message: '不能超过30个字符'
                }
            }
        };
        baseValidate($('#dataSourceName').parent(), constraints);
        if ($('#dataSourceName').val().trim() != '') {
            let exist = this.props.dataSourceConf.isExists;
            if (exist) {
                let constraints = {
                    'dataSourceName': {
                        format: {
                            pattern: '!^(?!_)(?!.*?_$)[a-z0-9_]+$',
                            message: '数据源名已存在, 请重新输入 !'
                        }
                    }
                };
                baseValidate($('#dataSourceName').parent(), constraints);
                return;
            };
        }
    }
    // changge事件传入数据源名称验证
    isExistNameChange() {
    }
    // 验证密码
    isExistPassword() {
        let constraints = {
            'password': {
                // 必填
                presence: {
                    message: '请输入密码'
                },
                format: {
                    pattern: '^([A-Z]|[a-z]|[0-9]){6,12}$',
                    message: '请输入6至12位的字母、数字'
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
                format: {
                    pattern: '^(?!_)(?!.*?_$)[a-z0-9_]+$',
                    message: '请输入正确的用户名格式'
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
                    message: '请输入URL'
                },
                format: {
                    pattern: '^(?!_)(?!.*?_$)[a-z0-9_]+$',
                    message: '请输入正确的用户名格式'
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
                presence: {
                    message: '请输入认证主体'
                },
                format: {
                    pattern: '^(?!_)(?!.*?_$)[a-z0-9_]+$',
                    message: '请输入正确的格式'
                }
            }
        };
        baseValidate($('#dataAuthentication').parent(), constraints);
    }
    // 验证所有表单不能为空
    isExistInput() {
        if ($('#dataSourceName').val().trim() != '') {
            // this.props.isExists($('#dataSourceName').val());
        }
        if ($('span.messages').find('p').length > 0) {
            error('输入有异常，请检查后重新提交！');
            isEsxit = false;
            return;
        } else {
            let constraints = {
                'dataSourceName': {
                    // 必填
                    presence: {
                        message: '请输入数据源名'
                    },
                    format: {
                        pattern: '^(?!_)(?!.*?_$)[a-z0-9_]+$',
                        message: '请输入正确的数据源名'
                    }
                },
                'password': {
                    // 必填
                    presence: {
                        message: '请输入密码'
                    },
                    format: {
                        pattern: '^(?!_)(?!.*?_$)[a-z0-9_]+$',
                        message: '请输入'
                    }
                },
                'userName': {
                    // 必填
                    presence: {
                        message: '请输入用户名'
                    },
                    format: {
                        pattern: '^(?!_)(?!.*?_$)[a-z0-9_]+$',
                        message: '请输入正确格式'
                    }
                },
                'dataURL': {
                    // 必填
                    presence: {
                        message: '请输入RUL'
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
            }
            ise();
        }
        return isEsxit;
    }
    uploadHandler(e) {
        e.stopPropagation();
        $('#upload input').click();
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

            // hive
            $(' #metastore').val(encodeSMS4(URL, key));
            this.refs.Refresh.RefreshShow();
            let options = {
                url: url,
                dataType: 'html',
                type: 'POST',
                beforeSubmit: ()=> {
                    // 传输入替换
                    $(' #dataSourceURL').val(URL);
                    $(' #dataSourceUser').val(USER);
                    $(' #dataSourcePassword').val(PWD);
                },
                success: (data) => {
                    // 请求成功data不返回数据
                    this.refs.Refresh.RefreshHide();
                    success(str);
                    names.attr('disabled', false);
                    names.on('click', that);
                    // data有数据时
                    /*
                    if (data == '') {
                        this.refs.Refresh.RefreshHide();
                        return;
                    }
                    data = JSON.parse(data);
                    if (data.code == '0') {
                        this.refs.Refresh.RefreshHide();
                        success(str);
                        names.attr('disabled', false);
                        names.on('click', that);
                    } else {
                        this.refs.Refresh.RefreshHide();
                        error(data.msg);
                    }*/
                }
            };
            $(' #FormData').ajaxSubmit(options);
        } else {
            return;
        }
    }
    // 链接测试
    infoTest(e) {
        e.preventDefault();
        this.FromData('/DataSource/testConnect', '连接成功', this.creatData, $(' button[ name = "saveBtn" ]'));
    }
    // 保存数据
    creatData(e) {
        e.preventDefault();
        this.FromData('/DataSource/add', '保存成功', this.syncSchemaInfo, $(' button[ name = "sync" ]'));
    }
    // 取消
    cancel() {
        this.props.history.replace('/dataSourceConf');
    }
    // 同步表信息
    syncSchemaInfo () {
        let sync = {
            dataSourceName: $('#dataSourceName').val()
        };
        this.refs.Refresh.RefreshShow();
        (async ()=>{
            await this.props.syncSchemaInfo(sync);
            if (this.props.dataSourceConf.syncSchemaInfo == '0') {
                this.refs.Refresh.RefreshHide();
                let dataSource = {
                    dataSourceName: $('#dataSourceName').val(),
                    offset: 1,
                    num: 10000,
                    tableNameFilter: ''
                };

                this.props.getDataSource(dataSource);
                if (this.props.dataSourceConf.dataSourceDetail) {
                    let Detail = this.props.dataSourceConf.dataSourceDetail;
                    let tableDate = Detail.schemaModule;
                    $(' #syncTime').val(Detail.createTime);
                    // 构建同步信息表
                    let arr = [];
                    for (let key in tableDate) {
                        // 添加表名
                        for (let keys in tableDate[key]) {
                            arr.push({tableName: key + '.' + tableDate[key][keys].tableName});
                        }
                    }
                    this.tableData(arr);
                }
            } else {
                this.refs.Refresh.RefreshHide();
            }
        })()
    }
    tableData(data = []) {
        data = data || [{table: ''}];
        // 构造列表配置项
        let tableConfig = {};
        tableConfig.id = 'dataSoucerList';
        tableConfig.scrollX = false;
        tableConfig.columns = [
            {data: 'tableName', 'defaultContent': '-'}
        ];
        tableConfig.order = [[0, 'desc']];
        // 获取列表内数据列
        tableConfig.data = data;
        tableConfig.searching = false;
        // 生成列表
        createList(tableConfig);
        // 绑定拖拽事件
        $('#tableData').on('mouseenter', (e)=>{
            e.preventDefault();
            this.props.draggable();
        });
    }
    render() {
        let tpl;
        let tpls = <div className='dataSourceNameDiv'>
                        <div className="dataSourceNameDiv col-md-12 form-group">
                            <label htmlFor="dataSourceName" >数据源名称 : </label>
                            <span className="messages"></span> <input type="text" id="dataSourceName" maxLength={30} name="dataSourceName" className="form-control" placeholder="请输入数据源名称" onChange = {this.isExistNameChange} onBlur={ this.isNameExistsHandler }/>
                        </div>
                        <div className="dataSourceNameDiv col-md-12 form-group">
                            <div className="input-name">
                                <label htmlFor="description" className="description">描述：</label>
                                <input type="text" id='description' name="description" className="form-control"/>
                            </div>
                        </div>
                        <div className="dataSourceNameDiv col-md-12 form-group">
                            <label htmlFor="connectionConfig.url" >URL : </label><span className="messages"></span>
                            <input type="text" id="dataSourceURL" name="connectionConfig.url" className="form-control" placeholder="链接URL" onBlur={ this.isExistURL}/>
                        </div>
                     </div>;
        let users = <div className='dataSourceNameDiv'>
                        <div className="dataSourceNameDiv col-md-12 form-group">
                            <label htmlFor="connectionConfig.user" >用户名 : </label><span className="messages"></span>
                            <input type="text" id="dataSourceUser" name="connectionConfig.user" maxLength={16} className="form-control" placeholder="请输入用户名" onBlur={ this.isExistUserName}/>
                        </div>
                        <div className="dataSourceNameDiv col-md-12 form-group">
                            <label htmlFor="connectionConfig.pwd" >密码 : </label><span className="messages"></span>
                            <input type="password" id="dataSourcePassword" maxLength={16} name="connectionConfig.pwd" className="form-control" placeholder="请输入用密码" onBlur={ this.isExistPassword}/>
                        </div>
                    </div>;
        if (this.state.witch == 'hive-hadoop2' || this.state.witch == 'hbase') {
            tpl = <div className='dataSourceNameDiv'>
                    {tpls}
                    {users}
                    <div className="dataSourceNameDiv col-md-12 form-group">
                        <label htmlFor="kerberos" >是否启用kerberos认证 : </label><span className="messages"></span>
                        <select onChange = {this.kerberos.bind(this)} id='kerberos' name="connectionConfig.['hive.hdfs.authentication.type']" className="form-control" style={{ width: '100%' }}>
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
            tpl = <div className='dataSourceNameDiv'>
                {/* <div className="dataSourceNameDiv col-md-12 form-group">
                        <label htmlFor="visable" >可见性 : </label><span className="messages"></span>
                        <select onMouseEnter = {this.partitionRuleHandler} id="visable" className="form-control" style={{ width: '100%' }} >
                            <option value="PROVATE">PROVATE</option>
                            <option value="PUBLIC">PUBLIC</option>
                        </select>
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
                                            <select onChange = {this.dataSourcesWitching.bind(this)} name='dataSourceType' id="dataSourceType" ref='witch' className="form-control dataSourceWitch" style={{ width: '100%' }}>
                                                <option value="mysql">mysql</option>
                                                <option value="hive-hadoop2">hive-hadoop2</option>
                                                <option value="oracle">oracle</option>
                                                <option value="hbase">hbase</option>
                                                <option value="mpp">mpp</option>
                                                <option value="postgresql">postgresql</option>
                                            </select>
                                        </div>
                                        {tpl}
                                        <div className="dataSourceNameDiv col-md-12 form-group">
                                            <button name="testContent" className="btn btn-primary" onClick={ this.infoTest }>连接测试</button>
                                            <button name="saveBtn" className="btn btn-primary" style={{ margin: '0px 25px' }} disabled>保存</button>
                                            <button name="leave" className="btn btn-primary" onClick={ this.cancel }> 返回</button>
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
                                        <label htmlFor="syncTime" >上传同步时间 : </label><span className="messages"></span>
                                        <input type="text" id="syncTime" name="syncTime" className="form-control" placeholder="上传同步时间" disabled/>
                                    </div>
                                    <div className="dataSourceNameDiv col-md-12 form-group">
                                        <table id="dataSoucerList" className="table table-striped table-bordered" style={{'text-align': 'center'}}>
                                            <thead>
                                            <tr role="row" >
                                                <th style={{textAlign: 'center'}}>表信息</th>
                                            </tr>
                                            </thead>
                                        </table>
                                        <button name="sync" className="btn btn-primary" disabled>同步信息列表</button>
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
