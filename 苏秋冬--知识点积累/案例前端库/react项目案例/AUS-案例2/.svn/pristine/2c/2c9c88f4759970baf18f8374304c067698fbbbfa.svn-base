/**
 * 报表列表组件
 * User: gaogy
 * Date: 2016/12/9
 * Time: 17:10
 */
import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createList, { bindTableEvent } from 'UTIL/baseList';
import createTip from 'UTIL/baseTip';
import usermanageService from 'SERVICE/usermanageService';
import { cutStr } from 'UTIL/util';

class Report extends Component {
    constructor(props) {
        super(props);
        // 固定上下文关系
        this.createTable = this.createTable.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.detailHandler = this.detailHandler.bind(this);
        this.analysisHandler = this.analysisHandler.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.removeOKHandler = this.removeOKHandler.bind(this);
        this.clickOwnerHandler = this.clickOwnerHandler.bind(this);
        this.privilegeHandler = this.privilegeHandler.bind(this);
    }

    componentWillMount() {
        // 读取列表数据
        this.props.readReport();
    }

    componentDidUpdate() {
        this.createTable(this.props.report.reportsData.result.data);
        $('button[name = "createReport"]').on('click', this.addHandler);
    }

    // 列表渲染事件
    createTable(data = []) {
        // 构造列表配置项
        let tableConfig = {};

        tableConfig.id = 'reportList';
        tableConfig.columns = [
            { data: 'reportName', 'defaultContent': '-' },
            { data: 'desc', 'defaultContent': '-' },
            { data: 'owner', 'defaultContent': '-' },
            { data: 'createTime', 'defaultContent': '-' },
            { data: 'privilege', 'defaultContent': '-' }
        ];
        tableConfig.order = [[3, 'desc']];
        let userRolePermission = sessionStorage.getItem('userRolePermission');
        // 定义列表内操作列
        if (userRolePermission.indexOf('REPORT_') != -1) {
            tableConfig.columnDefs = [
                {
                    'targets': 0,
                    'render': function (data, type, row) {
                        let reportName = row.reportName || '';
                        let html = `<span style="cursor: pointer;" title="${reportName}" > ${ cutStr(reportName, 20) }</span> `;
                        return html;
                    }
                },
                {
                    'targets': 1,
                    'render': function (data, type, row) {
                        let desc = row.desc || '';
                        let html = `<span style="cursor: pointer;" title="${desc}" > ${ cutStr(desc, 40) }</span> `;
                        return html;
                    }
                },
                {
                    'targets': 2,
                    'render': function (data, type, row) {
                        let html = `<a href="javascript:void(0);" class="owner">${ row.owner }</a> `;
                        return html;
                    }
                },
                {
                'targets': 4,
                'render': function (data, type, row) {
                    let html = '';
                    if (row.privilege) {
                        if (row.privilege.REPORT.length !== 0) {
                            if (row.privilege.REPORT.indexOf('分析') != -1) {
                                html += `<a href='javascript:void(0);' class='reportAnalysis btn btn-default btn-xs'><i class='fa fa-search'></i> 分析</a> `;
                            }
                            if (row.privilege.REPORT.indexOf('查看') != -1) {
                                html += `<a href='javascript:void(0);'  class='reportDetail btn btn-default btn-xs'  ><i class='fa fa-file-text-o'></i> 详情</a> `;
                            }
                            if (row.privilege.REPORT.indexOf('修改') != -1) {
                                html += `<a href='javascript:void(0);' class='reportEdit btn btn-default btn-xs'><i class='fa fa-pencil-square-o'></i> 修改</a> `;
                            }
                            if (row.privilege.REPORT.indexOf('授权') != -1) {
                                html += `<a href='javascript:void(0);' class='privilege btn btn-default btn-xs'><i class='fa fa-wrench'></i> 授权</a> `;
                            }
                            if (row.privilege.REPORT.indexOf('删除') != -1) {
                                html += `<a href='javascript:void(0);' class='reportRemove btn btn-default btn-xs' data-toggle="modal" data-target="#removeReport"><i class='fa fa-trash-o'></i> 删除</a>`;
                            }
                        } else {
                            html += `<span>  无操作权限<span/>`
                        }
                    } else {
                        html += `<span>  无操作权限<span/>`
                    }
                    return html;
                }
            }];
        }

        // 获取列表内数据列
        tableConfig.data = data;

        // 生成列表
        createList(tableConfig);

        // 列表内查看事件绑定
        bindTableEvent('reportList', 'click', 'a.reportDetail', this.detailHandler);
        // 列表内查看事件绑定
        bindTableEvent('reportList', 'click', 'a.reportAnalysis', this.analysisHandler);
        // 列表内编辑事件绑定
        bindTableEvent('reportList', 'click', 'a.reportEdit', this.editHandler);
        // 列表内删除事件绑定
        bindTableEvent('reportList', 'click', 'a.reportRemove', this.removeHandler);
        // 列表内创建人tip绑定
        bindTableEvent('reportList', 'click', 'a.owner', this.clickOwnerHandler);
        // 列表内授权事件绑定
        bindTableEvent('reportList', 'click', 'a.privilege', this.privilegeHandler);

    }


    /**
     * 创建人点击事件
     * @param e
     */
    clickOwnerHandler(e) {
        // 读取用户详细信息
        let userDetail = usermanageService.userDetail($(e.currentTarget).text());
        userDetail = userDetail.result.detail;
        let tooltips = createTip({
            parent: e.currentTarget,
            event: 'click',
            content: `<dl><dt>用户名：</dt><dd>${userDetail.userName}</dd></dl>
            <dl><dt>姓名：</dt><dd>${userDetail.name}</dd></dl>
            </dl><dl><dt>部门：</dt><dd>${userDetail.department}</dd></dl>
            </dl><dl><dt>职位：</dt><dd>${userDetail.position}</dd></dl>
            </dl><dl><dt>电话：</dt><dd>${userDetail.phoneNo}</dd></dl>
            <dl><dt>邮箱：</dt><dd>${userDetail.email}</dd></dl>`
        });

        let api = tooltips.qtip('api');
        api.show();
    }

    // 报表新建事件处理
    addHandler() {
        this.props.history.replace('/report/add');
    }

    // 报表记录详细事件
    detailHandler(e) {
        let selectedRecord = $('#reportList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.history.replace('/report/detail/' + selectedRecord.reportName);
    }

    /**
     * 报表分析事件
     * @param e
     */
    analysisHandler(e) {
        let selectedRecord = $('#reportList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.history.replace('/report/analysis/' + selectedRecord.reportName);
    }

    // 报表记录编辑事件
    editHandler(e) {
        let selectedRecord = $('#reportList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.history.replace('/report/update/' + selectedRecord.reportName);
    }

    // 报表记录删除处理
    removeHandler(e) {
        let selectedRecord = $('#reportList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.selectReport(selectedRecord);
        this.refs.delReport.setContent('您确定要删除报表：' + selectedRecord.reportName + '吗？');
    }

    // 删除确认处理
    removeOKHandler() {
        let idList = [];
        idList.push(this.props.report.selectedRecord.reportName);
        this.props.delReport(idList);
        $('#removeReport').modal('hide');
    }

    privilegeHandler(e) {
        let selectedRecord = $('#reportList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.selectReport(selectedRecord);
        this.props.history.replace('/report/accredit/' + selectedRecord.reportName);
    }

    render() {
        // 判断有无报表操作权限
        let thTpl = <tr><th>名称</th>
            <th>描述</th>
            <th>创建人</th>
            <th>创建时间</th></tr>;
        let userRolePermission = sessionStorage.getItem('userRolePermission');
        if (userRolePermission.indexOf('REPORT_') != -1) {
            thTpl = <tr><th>名称</th>
                <th>描述</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>操作</th></tr>;
        }

        // 判断是否存在报表新建权限
        let addBtnTpl = '';
        if (sessionStorage.getItem('userRolePermission').indexOf('REPORT_CREATE') != -1) {
            addBtnTpl = <button type="submit" name="createReport" className="btn btn-primary" >新建</button>;
        }
        return (
            <div id="reportManage" className="box box-primary" >
                <div className="row">
                    <div className="col-md-12">
                        <div className="box-header">
                            {addBtnTpl}
                        </div>
                        <div className="box-body">
                            <table id="reportList" className="table table-striped table-bordered">
                                <thead>
                                    {thTpl}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal modalId="removeReport" ref='delReport' title="删除报表" okHandler={ this.removeOKHandler } />
            </div>
        )
    }
}
export default Report;
