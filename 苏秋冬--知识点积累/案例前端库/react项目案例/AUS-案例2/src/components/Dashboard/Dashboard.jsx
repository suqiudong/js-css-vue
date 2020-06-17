/**
 * 仪表板列表
 * User: gaogy
 * Date: 2017/1/4
 * Time: 10:30
 */
import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createTip from 'UTIL/baseTip';
import { cutStr } from 'UTIL/util';
import createList, { bindTableEvent } from 'UTIL/baseList';
import usermanageService from 'SERVICE/usermanageService';
import quickLinkService from 'SERVICE/quickLinkService';
let userInfo = '';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        // 固定上下文关系
        this.createTable = this.createTable.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.detailHandler = this.detailHandler.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.analysisHandler = this.analysisHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.removeOKHandler = this.removeOKHandler.bind(this);
        this.clickOwnerHandler = this.clickOwnerHandler.bind(this);
        this.saveToQuickLinkHandler = this.saveToQuickLinkHandler.bind(this);
        this.saveToQuickLinkOKHandler = this.saveToQuickLinkOKHandler.bind(this);
        this.privilegeHandler = this.privilegeHandler.bind(this);
    }

    componentWillMount() {
        // 读取列表数据
        this.props.readDashboard();
        userInfo = quickLinkService.getQuickLinkInfo();
    }

    componentDidUpdate() {
        this.createTable(this.props.dashboard.dashboardData.result.data);
        $('button[name = "createDashboard"]').on('click', this.addHandler);
    }

    // 列表渲染事件
    createTable(data) {
        // 构造列表配置项
        let tableConfig = {};

        tableConfig.id = 'dashboardList';
        tableConfig.columns = [
            { data: 'dashboardName', 'defaultContent': '-' },
            { data: 'desc', 'defaultContent': '-' },
            { data: 'owner', 'defaultContent': '-' },
            { data: 'createTime', 'defaultContent': '-' },
            { data: 'privilege', 'defaultContent': '无任何权限' }
        ];
        tableConfig.order = [[3, 'desc']];
        let userRolePermission = sessionStorage.getItem('userRolePermission');
        // 定义列表内操作列
        if (userRolePermission.indexOf('DASHBOARD_') != -1) {
            tableConfig.columnDefs = [
                {
                    'targets': 0,
                    'render': function (data, type, row) {
                        let dashboardName = row.dashboardName || '';
                        let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 20) }</span> `;
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
                        let userName = sessionStorage.getItem('XDataUserName');
                        if (row.privilege.DASHBOARD.length !== 0) {
                            if (row.privilege.DASHBOARD.indexOf('分析') != -1) {
                                html += `<a href='javascript:void(0);'  class='dashboardAnalysis btn btn-default btn-xs'  ><i class='fa fa-search'></i> 分析</a> `;
                            }
                            if (row.privilege.DASHBOARD.indexOf('查看') != -1) {
                                html += `<a href='javascript:void(0);' class='dashboardDetail btn btn-default btn-xs'><i class='fa fa-file-text-o'></i> 详情</a> `;
                            }
                            if (row.privilege.DASHBOARD.indexOf('修改') != -1) {
                                html += `<a href='javascript:void(0);' class='dashboardEdit btn btn-default btn-xs'><i class='fa fa-pencil-square-o'></i> 修改</a> `;
                            }
                            if (row.privilege.DASHBOARD.indexOf('删除') != -1) {
                                html += `<a href='javascript:void(0);' class='dashboardRemove btn btn-default btn-xs' data-toggle="modal" data-target="#removeDashboard"><i class='fa fa-trash-o'></i> 删除</a> `;
                            }
                            if (row.privilege.DASHBOARD.indexOf('授权') != -1) {
                                html += `<a href='javascript:void(0);' class='privilege btn btn-default btn-xs'><i class='fa fa-wrench'></i> 授权</a> `;
                            }
                        } else {
                            html += `<span>  无操作权限<span/>`
                        }
                        let quickLinkArray = userInfo.quickLink.split(';');
                        let tag = 0;
                        for (let i = 0;i < quickLinkArray.length;i++) {
                            if (row.dashboardName != quickLinkArray[i]) {
                                tag++;
                            }
                        }
                        if (tag === quickLinkArray.length && row.owner === userName) {
                            html += `<a href='javascript:void(0);' class='addToQuickLink btn btn-default btn-xs' data-toggle="modal" data-target="#saveToQuickLink"><i class='fa fa-star-o'></i> 添加导航</a> `;
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
        bindTableEvent('dashboardList', 'click', 'a.dashboardAnalysis', this.analysisHandler);
        // 列表内查看事件绑定
        bindTableEvent('dashboardList', 'click', 'a.dashboardDetail', this.detailHandler);
        // 列表内编辑事件绑定
        bindTableEvent('dashboardList', 'click', 'a.dashboardEdit', this.editHandler);
        // 列表内删除事件绑定
        bindTableEvent('dashboardList', 'click', 'a.dashboardRemove', this.removeHandler);
        // 列表内添加导航事件绑定
        bindTableEvent('dashboardList', 'click', 'a.addToQuickLink', this.saveToQuickLinkHandler);
        // 列表内创建人tip绑定
        bindTableEvent('dashboardList', 'click', 'a.owner', this.clickOwnerHandler);
        // 列表内授权事件绑定
        bindTableEvent('dashboardList', 'click', 'a.privilege', this.privilegeHandler);
    }

    /**
     * 是否保存到快速导航
     * @param e
     */
    saveToQuickLinkHandler(e) {
        let selectedRecord = $('#dashboardList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.selectDashboard(selectedRecord);
        this.refs.saveToQuickLink.setContent('您确定要添加仪表板：' + selectedRecord.dashboardName + '到快速导航吗？');
    }

    /**
     * 确认添加到快速导航事件
     */
    saveToQuickLinkOKHandler() {
        let dashboardName = this.props.dashboard.selectedRecord.dashboardName;
        userInfo.quickLink = userInfo.quickLink + dashboardName + ';';
        this.props.setQuickLinkInfo(userInfo);
        $('#saveToQuickLink').modal('hide');
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

    // 仪表板新建事件处理
    analysisHandler(e) {
        let selectedRecord = $('#dashboardList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.history.replace('/dashboard/analysis/' + selectedRecord.dashboardName);
    }

    // 仪表板新建事件处理
    addHandler() {
        this.props.history.replace('/dashboard/add');
    }

    privilegeHandler(e) {
        let selectedRecord = $('#dashboardList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.selectDashboard(selectedRecord);
        this.props.history.replace('/dashboard/accredit/' + selectedRecord.dashboardName);
    }

    // 仪表板记录详细事件
    detailHandler(e) {
        let selectedRecord = $('#dashboardList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.history.replace('/dashboard/detail/' + selectedRecord.dashboardName);
    }

    // 仪表板记录编辑事件
    editHandler(e) {
        let selectedRecord = $('#dashboardList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.history.replace('/dashboard/update/' + selectedRecord.dashboardName);
    }

    // 仪表板记录删除处理
    removeHandler(e) {
        let selectedRecord = $('#dashboardList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.selectDashboard(selectedRecord);
        this.refs.delDashboard.setContent('您确定要删除仪表板：' + selectedRecord.dashboardName + '吗？');
    }

    // 删除确认处理
    removeOKHandler() {
        let idList = [];
        let dashboardName = this.props.dashboard.selectedRecord.dashboardName;
        idList.push(dashboardName);

        // 删除请求
        this.props.delDashboard(idList);

        // 同步更新快速导航，移除仪表板
        let userInfo = quickLinkService.getQuickLinkInfo();
        if (userInfo.quickLink.indexOf(dashboardName + ';') != -1) {
            let quickLinkArray = userInfo.quickLink.split(';');
            let newQuickLink = '';
            for (let i = 0;i < quickLinkArray.length;i++) {
                if (quickLinkArray[i] != '' && quickLinkArray[i] != dashboardName) {
                    newQuickLink = newQuickLink + quickLinkArray[i] + ';'
                }
            }
            userInfo.quickLink = newQuickLink;
            this.props.setQuickLinkInfo(userInfo);
        }

        $('#removeDashboard').modal('hide');
    }

    render() {
        // 判断有无仪表板操作权限
        let thTpl = <tr><th>名称</th>
            <th>描述</th>
            <th>创建人</th>
            <th>创建时间</th></tr>;
        let userRolePermission = sessionStorage.getItem('userRolePermission');
        if (userRolePermission.indexOf('DASHBOARD_') != -1) {
            thTpl = <tr><th>名称</th>
                <th>描述</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>操作</th></tr>;
        }

        // 判断是否存在仪表板新建权限
        let addBtnTpl = '';
        if (sessionStorage.getItem('userRolePermission').indexOf('DASHBOARD_CREATE') != -1) {
            addBtnTpl = <button type="submit" name="createDashboard" className="btn btn-primary" >新建</button>;
        }
        return (
            <div id="dashboardManage" className="box box-primary" >
                <div className="row">
                    <div className="col-md-12">
                        <div className="box-header">
                            {addBtnTpl}
                        </div>
                        <div className="box-body">
                            <table id="dashboardList" className="table table-striped table-bordered">
                                <thead>
                                {thTpl}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal modalId="removeDashboard" ref='delDashboard' title="删除仪表板" okHandler={ this.removeOKHandler } />
                <Modal modalId="saveToQuickLink" ref='saveToQuickLink' title="添加快速导航" okHandler={ this.saveToQuickLinkOKHandler } />
            </div>
        )
    }
}
export default Dashboard;
