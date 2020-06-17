/**
 * 仪表板详细组件
 * User: gaogy
 * Date: 2017/1/5
 * Time: 13:50
 */
import React, { Component } from 'react';
import createiCheck from 'UTIL/baseiCheck';
import { dateFormat } from 'UTIL/util';
import { cutStr } from 'UTIL/util';
import DateRangePicker from 'COMPONENT/Common/DateRangePicker/DateRangePicker';
import Tag from 'COMPONENT/Common/Tag/Tag';
import ChartReport from 'COMPONENT/Dashboard/ChartReport';
import { Responsive, WidthProvider } from 'react-grid-layout';
let ResponsiveReactGridLayout = WidthProvider(Responsive);
require('../../../node_modules/react-grid-layout/css/styles.css');
require('../../../node_modules/react-resizable/css/styles.css');

class DashboardDetail extends Component {
    constructor(props) {
        super(props);
        this.loadControlHandler = this.loadControlHandler.bind(this);
        this.updateDashboardHandler = this.updateDashboardHandler.bind(this);
        this.onBreakpointChangeHandler = this.onBreakpointChangeHandler.bind(this);
        this.onResizeStopHandler = this.onResizeStopHandler.bind(this);
        this.getStartTimeHandler = this.getStartTimeHandler.bind(this);
        this.getEndTimeHandler = this.getEndTimeHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    componentWillMount() {
        this.props.getDashboard(this.props.params.dashboardName);
    }

    componentDidUpdate() {
        this.loadControlHandler();
    }

    /**
     * 获取日期控件开始时间
     * @returns {*}
     */
    getStartTimeHandler() {
        return dateFormat(new Date(), 'yyyy-MM-dd 00:00:00');
    }

    /**
     * 获取日期控件截止时间
     * @returns {*}
     */
    getEndTimeHandler() {
        return dateFormat(new Date(), 'yyyy-MM-dd 23:59:59');
    }

    /**
     * 更新仪表板事件
     */
    searchHandler() {
        if ($('#filters').val()) {
            let tagObj = {
                id: new Date().getTime(),
                desc: $('#filters').val()
            };
            this.refs.filterTag.addTagDataHandler(tagObj);
            $('#filters').val('');
        }

        let tags = this.refs.filterTag.getTagsHandler();
        let filters = '';
        for (let i = 0; i < tags.length; i++) {
            if (i > 0) {
                filters = filters + ' AND ';
            }
            filters = filters + tags[i].desc;
        }

        // 构造查询参数对象
        let searchObj = {
            filters: filters,
            startTime: this.refs.daterangePicker.getStartTime(),
            endTime: this.refs.daterangePicker.getEndTime()
        };

        this.props.dashboard.selectedReports.map((item) => {
            this.refs['chartReport' + item.reportName].searchHandler(searchObj);
        });
    }

    /**
     * 更新仪表板事件
     */
    updateDashboardHandler() {
        this.props.history.replace('/dashboard/update/' + this.props.params.dashboardName);
    }

    /**
     * 加载页面内控件
     */
    loadControlHandler() {
        $('input[name = "isVisible"][value = "' + this.props.dashboard.selectedRecord.visable + '"]', $('#dashboardDetail')).attr('checked', 'checked');
        $('#dashboardName').prop('disabled', true);
        $('[name = "isVisible"]').prop('disabled', true);
        $('#dashboardDesc').prop('disabled', true);
        createiCheck('input[ type = "radio"]');
    }

    /**
     * Grid列响应修改事件
     * @param breakpoint
     * @param cols
     */
    onBreakpointChangeHandler(breakpoint, cols) {
        this.props.changeBreakpoint(cols);
    }

    /**
     * panel重置后图表reflow
     * @param layout
     * @param oldItem
     * @param newItem
     * @param placeholder
     * @param e
     * @param element
     */
    onResizeStopHandler(layout, oldItem, newItem, placeholder, e, element) {
        let trendChartReportId = $(element).closest('div.reportBlock').find('div.chartReport').attr('id');
        if (trendChartReportId && $('#' + trendChartReportId).highcharts()) {
            $('#' + trendChartReportId).highcharts().reflow();
        }
    }

    render() {
        let cols = this.props.dashboard.breakpointCols;
        let colWidth = 3;
        if (cols < 6) {
            colWidth = 2;
        }

        let selectedReports = this.props.dashboard.selectedRecord ? this.props.dashboard.selectedRecord.reportList : [];
        let reportTplArray = [];
        let layoutInfo = {};
        // 排序显示报表面板
        if (this.props.dashboard.selectedRecord.layoutInfo) {
            layoutInfo = JSON.parse(this.props.dashboard.selectedRecord.layoutInfo);
            reportTplArray = selectedReports.map((item, index) => {
                let reportTpl = '';
                let reportName = 'UNDEFINE&' + index;
                if (item) {
                    reportName = item.reportName;
                }

                reportTpl = <div name={ reportName } key={reportName} data-grid={{w: colWidth, h: colWidth, x: (index % (cols / colWidth)) * colWidth, y: Math.floor(index / cols) * colWidth}} className='reportBlock mb20 pr0'>
                    <div className="box box-primary mb0" style={{ height: '100%' }}>
                        <div className="box-body border-radius-none" style={{ height: '90%' }}>
                            <ChartReport getStartTime={this.getStartTimeHandler} getEndTime={this.getEndTimeHandler} ref={ 'chartReport' + reportName } reportName={ reportName } searchObj={ this.props.dashboard.searchObj } />
                        </div>
                    </div>
                </div>;
                return reportTpl;
            });
        }

        // 判断是否存在仪表板修改权限
        let modifyBtnTpl = '';
        let userName = sessionStorage.getItem('XDataUserName');
        if (sessionStorage.getItem('userRolePermission').indexOf('DASHBOARD_MODIFY') != -1 && this.props.dashboard.selectedRecord.owner === userName) {
            modifyBtnTpl = <button name="saveBtn" className="btn btn-primary ml10" data-toggle="modal" data-target="#saveDashboard" onClick={ this.updateDashboardHandler } ><i className="fa fa-edit" ></i> 修改</button>;
        }
        return (
            <div id="dashboardDetail">
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">查询</h3><i className="fa fa-info-circle qtipTarget"></i>
                    </div>

                    <div className="box-body form-horizontal">
                        <div className="form-group">
                            <label htmlFor="filters" className="col-md-1 control-label">关键字</label>

                            <div className="col-md-6">
                                <input type="text" className="form-control" id="filters"/>
                            </div>

                            <div className="col-md-4">
                                <DateRangePicker ref="daterangePicker" />
                            </div>

                            <div className="col-md-1">
                                <button name="searchBtn" className="btn btn-primary" onClick={ this.searchHandler } ><i className="fa fa-search" ></i> 查询</button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-1 control-label"></label>
                            <div className="col-md-11">
                                <Tag ref="filterTag" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">仪表板详情</h3>
                    </div>

                    <div className="box-body form-horizontal">
                        <div className="form-group">
                            <label htmlFor="dashboardName" className="col-md-1 control-label">名称</label>

                            <div className="col-md-2 pt7">
                                <span className="detailSpan">{this.props.dashboard.selectedRecord.dashboardName}</span>
                            </div>

                            <label htmlFor="isVisible" className="col-md-1 control-label">可见性</label>

                            <div className="col-md-2 radio">
                                <label className="pl0">
                                    <input name="isVisible" type="radio" value="PUBLIC"/>
                                    &nbsp;共享
                                </label>
                                <label className="ml20">
                                    <input name="isVisible" type="radio" value="PRIVATE"/>
                                    &nbsp;私有
                                </label>
                            </div>

                            <label htmlFor="dashboardDesc" className="col-md-1 control-label">描述</label>
                            <div className="col-md-4 pt7">
                                <span title={this.props.dashboard.selectedRecord.desc}>{ cutStr(this.props.dashboard.selectedRecord.desc, 30) }</span>
                            </div>

                            <div className="col-md-1">
                                {modifyBtnTpl}
                            </div>
                        </div>
                    </div>
                </div>
                <div id='reportList' className='row connectedSortable pr15' style={{ position: 'relative' }}>
                    <ResponsiveReactGridLayout verticalCompact={true} layouts={ layoutInfo } onResizeStop={ this.onResizeStopHandler } className="layout" rowHeight={130} cols={{lg: 12, md: 9, sm: 6, xs: 4, xxs: 2}} onBreakpointChange={ this.onBreakpointChangeHandler }>
                        { reportTplArray }
                    </ResponsiveReactGridLayout>
                </div>
            </div>
        )
    }
}
export default DashboardDetail;
