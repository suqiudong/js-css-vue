/**
 * 登录组件
 * User: jiaomx
 * Date: 2016/12/27
 * Time: 11:23
 */
import React, { Component } from 'react';
import DateRangePicker from 'COMPONENT/Common/DateRangePicker/DateRangePicker';
import createList from 'UTIL/baseList';
import { cutStr } from 'UTIL/util';
import createSelect from 'UTIL/baseSelect2';
import {decodeBySMS4} from 'UTIL/sm4';

const key = '2C023A86BD32812A4C180A7152EEBF0A';
// import { error } from 'UTIL/notification';

class LogQuery extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.createLogTable = this.createLogTable.bind(this);
        this.createSelect = this.createSelect.bind(this);
        this.createAppNameSelect = this.createAppNameSelect.bind(this);
        this.createResTypeSelect = this.createResTypeSelect.bind(this);
        this.createLevelSelect = this.createLevelSelect.bind(this);
    };
    componentWillMount() {
        this.props.allUserList();
    }

    componentDidMount() {
        // let obj = [];
        // let roleName = this.props.logQuery.allUserList.member;
        // for (var i = 0; i < roleName.length; i++) {
        // 	let param = {};
        // 	param.id = roleName[i].userName;
        // 	param.text = roleName[i].userName;
        // 	obj.push(param);
        // }
        // this.createSelect(obj, 'operator');
        // this.createAppNameSelect();
        // this.createResTypeSelect();
        // this.createLevelSelect();
    }

    componentDidUpdate() {
		/*
		 * 获取列表数据并渲染
		 */
        let obj = [];
        let roleName = this.props.logQuery.allUserList.member;
        for (var i = 0; i < roleName.length; i++) {
            let param = {};
            param.id = roleName[i].userName;
            param.text = roleName[i].userName;
            obj.push(param);
        }
        this.createSelect(obj, 'operator');
        this.createAppNameSelect();
        this.createResTypeSelect();
        this.createLevelSelect();
		/*
		 * 生成表格
		 */
        let logQueryData = this.props.logQuery.logQueryData;
        $('.resultList').removeClass('hide');
        this.createLogTable(logQueryData);
    }

    componentWillUnmount() {
        this.props.clearLogQueryData();
    }

    createSelect(data, id) {
        data.unshift({id: ' ', text: '请选择操作人'});
        let selectConfig = {
            id: id,
            data: data,
            tags: false,
            placeholder: '请选择操作人',
            minimumResultsForSearch: 2
        };
        createSelect(selectConfig);
    }

    createAppNameSelect() {
        let data = [
            {id: ' ', text: '请选择服务模块'},
            {id: 'search', text: '查询'},
            {id: 'datain', text: '接入服务'},
            {id: 'meta', text: '元数据'},
            {id: 'view', text: '界面'}
        ];
        let selectConfig = {
            id: 'appName',
            data: data,
            tags: true,
            placeholder: '请选择业务模块',
            minimumResultsForSearch: -1
        };
        createSelect(selectConfig);
    }

    createResTypeSelect() {
        let data = [
            {id: ' ', text: '请选择操作对象'},
            {id: 'dataset', text: '数据集'},
            {id: 'report', text: '报表'},
            {id: 'datasource', text: '数据源'},
            {id: 'dashboard', text: '仪表板'},
            {id: 'userinfo', text: '用户'},
            {id: 'role', text: '角色'},
            {id: 'job', text: '作业'},
            {id: 'plugin', text: '插件'},
            {id: 'datamodel', text: '数据模型视图'}
        ]
        let selectConfig = {
            id: 'resType',
            data: data,
            tags: true,
            placeholder: '请选择资源类型',
            minimumResultsForSearch: -1
        };
        createSelect(selectConfig);
    }

    createLevelSelect() {
        let data = [
            {id: ' ', text: '请选择日志级别'},
            {id: 'ERROR', text: 'ERROR'},
            {id: 'WARN', text: 'WARN'},
            {id: 'INFO', text: 'INFO'},
            {id: 'DEBUG', text: 'DEBUG'},
            {id: 'FATAL', text: 'FATAL'}
        ]
        let selectConfig = {
            id: 'level',
            data: data,
            tags: true,
            placeholder: '请选择日志级别',
            minimumResultsForSearch: -1
        };
        createSelect(selectConfig);
    }

	/*
	 * 查询
	 */
    search() {
        let data = {
            operator: $('#operator').val().trim(),
            appName: $('#appName').val().trim(),
            resType: $('#resType').val().trim(),
            logLevel: $('#level').val().trim(),
            queryParams: $('.queryParams').val().trim(),
            startTime: this.refs.daterangePicker.getStartTime(),
            endTime: this.refs.daterangePicker.getEndTime()
        };
        this.props.logQueryData(data);
        // $('.resultList').removeClass('hide');
        // this.createLogTable(this.props.logQuery.logQueryData.result.data);
    }

    createLogTable(logData) {
        let tableConfig = {};
        tableConfig.id = 'logResult';
        tableConfig.columns = [
            {
                'data': 'operator',
                'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.operator || '';
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 20) }</span> `;
                    return html;
                }
            },
            {
                'data': 'time',
                'orderable': true,
                'defaultContent': '-',
                'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.time || '';
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 70) }</span> `;
                    return html;
                }
            },
            {
                'data': 'logLevel',
                'orderable': false,
                'defaultContent': '-',
                'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.logLevel || '';
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 70) }</span> `;
                    return html;
                }
            },
            {
                'data': 'appName',
                'orderable': false,
                'defaultContent': '-',
                'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.appName || '';
                    dashboardName = dashboardName == 'search' ? '查询' :
                        dashboardName == 'datain' ? '接入服务' :
                            dashboardName == 'meta' ? '元数据' :
                                dashboardName == 'theme' ? '主题' :
                                    dashboardName == 'view' ? '界面' : dashboardName;
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 70) }</span> `;
                    return html;
                }
            },
            {
                'data': 'operateName',
                'orderable': false,
                'defaultContent': '-',
                'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.operateName || '';
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 70) }</span> `;
                    return html;
                }
            },
            {
                'data': 'resType',
                'orderable': false,
                'defaultContent': '-',
                'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.resType || '';
                    dashboardName = dashboardName == 'datasource' ? '数据源' :
                        dashboardName == 'datamodel' ? '数据模型视图' :
                            dashboardName == 'logs' ? '日志' :
                                dashboardName == 'service' ? '监控' :
                                    dashboardName == 'search' ? '查询' :
                                        dashboardName == 'theme' ? '主题' :
                                            dashboardName === '"null"' ? '-' : dashboardName;
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 70) }</span> `;
                    return html;
                }
            },
            {
                'data': 'resName',
                'orderable': false,
                'defaultContent': '-',
                'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.resName || '';
                    if (dashboardName instanceof Array) {
                        dashboardName = dashboardName.toString();
                    } else if (dashboardName.split(',').length >= 10) {
                        dashboardName = decodeBySMS4(dashboardName.split(','), key);
                    } else {
                        dashboardName = dashboardName === '"null"' ? '-' : dashboardName;
                    }
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 70) }</span> `;
                    return html;
                }
            },
            {
                'data': 'status',
                'orderable': false,
                'defaultContent': '-',
                'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.status || '';
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 70) }</span> `;
                    return html;
                }
            },
            {
                'data': 'duration',
                'orderable': false,
                'defaultContent': '-',
                'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.duration || '';
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 70) }</span> `;
                    return html;
                }
            },
            {
                class: 'details-control',
                orderable: false,
                data: null,
                defaultContent: '<span class="row-details row-details-close"></span>',
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    $('#logResult').dataTable().fnClose(iRow);
                }
            }
        ];
        tableConfig.data = logData;
        tableConfig.scrollX = true;
        let oTable = createList(tableConfig, true);
        var fnFormatDetails = function (oTable, nTr) {
            var oData = oTable.fnGetData(nTr);
            var FContent = oData.message;
            oTable.fnOpen(nTr, FContent, 'details');
        }
        $('#' + tableConfig.id).off('click').on('click', 'td.details-control', function() {
            let nTr = $(this).closest('tr')[0];
            if (oTable.fnIsOpen(nTr)) {
                $(this).children('span').addClass('row-details-close').removeClass('row-details-open');
                oTable.fnClose(nTr);
            } else {
                $(this).children('span').addClass('row-details-open').removeClass('row-details-close');
                fnFormatDetails(oTable, nTr);
            }
        });
    }

    render() {
        return (
			<div id="log">
				<div className="box box-primary">
					<div className="box-header with-border">
						<p className="box-title">日志查看</p>
					</div>
					<div className="box-body row">
						<div className="form-group mt5">
							<div className="col-md-3">
								<select name="operator" className="form-control" id="operator">
									<option value="">请选择操作人</option>
								</select>
							</div>
							<div className="col-md-3">
								<select name="appName" className="form-control" id="appName">
									<option value="">请选择业务模块</option>
								</select>
							</div>
							<div className="col-md-3">
								<select name="resType" className="form-control" id="resType">
									<option value="">请选择资源类型</option>
								</select>
							</div>
							<div className="col-md-3">
								<select name="level" className="form-control" id="level">
									<option value="">请选择日志级别</option>
								</select>
							</div>
						</div>
						<div className="form-group form-horizontal" style={{marginTop: '55px'}}>
							<div className="col-md-6">
								<textarea className="form-control queryParams" rows="1" placeholder= '请输入查询关键字' style={{resize: 'none'}}></textarea>
							</div>
							<div className="col-md-5">
								<DateRangePicker ref="daterangePicker" />
							</div>
							<div className="col-md-1">
								<button name="searchBtn" className="btn btn-primary pull-right" onClick={this.search}><i className= "fa fa-search"></i> 查询</button>
							</div>
						</div>
					</div>
				</div>
				<div className="box box-primary hide resultList">
					<div className="box-header with-border">
						<p className="box-title">查询结果</p>
					</div>
					<div className="box-body">
						<table id="logResult" className="table table-striped table-bordered" style={{ width: '100%' }}>
							<thead>
							<tr>
								<th>操作者</th>
								<th>时间</th>
								<th>日志级别</th>
								<th>服务模块</th>
								<th>操作接口</th>
								<th>操作对象</th>
								<th>请求详情</th>
								<th>状态</th>
								<th>耗时</th>
								<th></th>
							</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
        )
    }
}
export default LogQuery;
