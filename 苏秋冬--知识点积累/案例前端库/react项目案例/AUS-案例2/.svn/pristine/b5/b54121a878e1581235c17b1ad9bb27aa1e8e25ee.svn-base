/**
 *数据源详情组件
 * User: jiaomx
 * Date: 2017/03/01
 * Time: 19:58
 */
import React, { Component } from 'react';
import createList from 'UTIL/baseList';
import {decodeBySMS4} from 'UTIL/sm4';
const key = '2C023A86BD32812A4C180A7152EEBF0A';

class DateSourceConfDetail extends Component {
    constructor(props) {
        super(props);
        this.createTable = this.createTable.bind(this);
        this.cancel = this.cancel.bind(this);
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
        // 表单赋值
        let Detail = this.props.dataSourceConf.dataSourceDetail;
        let tableDate = Detail.schemaModule;
        $(' #dataSourceType').val(Detail.dataSourceType);
        $(' #description').val(Detail.description);
        $(' #dataSourceName').val(Detail.dataSourceName);
        $(' #dataSoucerTime').val(Detail.createTime);
        $(' #dataSourceURL').val(decodeBySMS4(Detail.connectionConfig.url.split(','), key));
        $(' #dataSourceUser').val(decodeBySMS4(Detail.connectionConfig.user.split(','), key));
        $(' #dataSourcePassword').val(decodeBySMS4(Detail.connectionConfig.pwd.split(','), key));
        $(' #kerberos').val(Detail.connectionConfig['hive.hdfs.authentication.type']);
        $(' #dataAuthentication').val(Detail.connectionConfig['hive.hdfs.ausmpp.principal']);
        // 构建同步信息表
        let arr = [];
        for (let key in tableDate) {
            // 添加表名
            for (let keys in tableDate[key]) {
                arr.push({tableName: key + '.' + tableDate[key][keys].tableName});
            }
        }
        this.createTable(arr);
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
    // 取消
    cancel() {
        this.props.history.replace('/dataSourceConf');
    }
    render() {
        let tpl;
        let data = this.props.dataSourceConf.dataSourceDetail;
        let tpls = <div>
            <div className="dataSourceNameDiv col-md-12 form-group">
                <label htmlFor="dataSourceName" >数据源名称 : </label>
                <span className="messages"></span>
                <input type="text" id="dataSourceName" name="dataSourceName" disabled className="form-control"/>
            </div>
            <div className="dataSourceNameDiv form-group col-md-12">
                <div className="input-name">
                    <label htmlFor="description" className="description">描述：</label>
                    <input type="text" id='description' name="description" disabled className="form-control"/>
                </div>
            </div>

            <div className="dataSourceNameDiv col-md-12 form-group">
                <label htmlFor="dataURL" >URL : </label><span className="messages"></span>
                <input type="text" id="dataSourceURL" name="dataURL" className="form-control" disabled />

            </div>
        </div>;
        let users = <div>
            <div className="dataSourceNameDiv col-md-12 form-group">
                <label htmlFor="userName" >用户名 : </label><span className="messages"></span>
                <input type="text" id="dataSourceUser" name="userName" className="form-control" disabled/>
            </div>
            <div className="dataSourceNameDiv col-md-12 form-group">
                <label htmlFor="password" >密码 : </label><span className="messages"></span>
                <input type="password" id="dataSourcePassword" name="password" className="form-control" disabled/>
            </div>
        </div>
        if (data.dataSourceType == 'hive-hadoop2' || data.dataSourceType == 'hbase') {
            tpl = <div>
                {tpls}
                {users}
                <div className="dataSourceNameDiv col-md-12 form-group">
                    <label htmlFor="kerberos" >是否启用kerberos认证 : </label><span className="messages"></span>
                    <select id='kerberos' name="connectionConfig.['hive.hdfs.authentication.type']" className="form-control" style={{ width: '100%' }} disabled>
                        <option value="NONE">NONE</option>
                        <option value="KERBEROS">KERBEROS</option>
                    </select>
                </div>
                <input type="hidden" id="metastore" name="connectionConfig.hive.metastore.uri"/>
                <div id='dataSourceKerberosDiv'>
                    <div className="dataSourceNameDiv col-md-12 form-group">
                        <label htmlFor="connectionConfig.['hive.hdfs.authentication.type']" >认证主体 : </label><span className="messages"></span>
                        <input type="text" id="dataAuthentication" maxLength={30} name="connectionConfig.['hive.hdfs.ausmpp.principal']" className="form-control" placeholder="ausmpp@EXAMPLE.COM" disabled/>
                    </div>
                    {/* 文件上传*/}
                    <div id="pluginAdd">
                        <div className="dataSourceNameDiv col-md-12 form-group">
                            <label htmlFor="keytab" >上传keytab文件</label>
                            <input type="file" name='keytab' id='keytab' disabled/>
                        </div>
                    </div>
                </div>
            </div>
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
                <div className="row">
                    <div className="col-md-7 dataSourceLeft">
                        <div className="box box-primary">
                            <div className="box-header with-border" >
                                <p className="box-title">配置信息</p>
                            </div>
                            <div className="box-body">
                                <div className="row">
                                    <div className="dataSourceNameDiv col-md-12 form-group">
                                        <label htmlFor="dataSourceType" >数据源 : </label><span className="messages"></span>
                                        <input type="text" className="form-control" name='dataSourceType' id='dataSourceType' disabled/>
                                    </div>
                                    {tpl}
                                    <div className="dataSourceNameDiv col-md-12 form-group">
                                        <button name="saveBtn" className="btn btn-primary" onClick={ this.cancel } > 返回</button>
                                    </div>
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
export default DateSourceConfDetail;
