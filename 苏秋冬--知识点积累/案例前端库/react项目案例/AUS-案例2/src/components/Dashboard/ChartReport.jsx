/**
 * 报表详细组件
 * User: gaogy
 * Date: 2017/1/7
 * Time: 17:10
 */
import React, { Component } from 'react';
import ReportConf from 'COMPONENT/Report/ReportConf/ReportConf';
import DisplayArea from 'COMPONENT/Report/ReportDisplay/DisplayArea';
import reportService from 'SERVICE/reportService';
import xhr from 'SERVICE/xhr/'
import { error } from 'UTIL/notification';

class ChartReport extends Component {
    constructor(props) {
        super(props);
        this.searchHandler = this.searchHandler.bind(this);
        this.setChartOptionHandler = this.setChartOptionHandler.bind(this);
        this.getStartTimeHandler = this.getStartTimeHandler.bind(this);
        this.getEndTimeHandler = this.getEndTimeHandler.bind(this);
        this.mqlSearchRequestHandler = this.mqlSearchRequestHandler.bind(this);
        this.state = {
            report: {},
            mqlResult: {}
        }
    }

    componentWillMount() {
        let options = {
            startTime: this.getStartTimeHandler(),
            endTime: this.getEndTimeHandler()
        };

        this.searchHandler(options);
    }

    getStartTimeHandler() {
        return this.props.getStartTime();
    }

    getEndTimeHandler() {
        return this.props.getEndTime();
    }

    componentDidUpdate() {
        // 分析后，存在mql查询结果和报表类型时，执行重新创建逻辑报表
        if (this.state.mqlResult.result && this.state.report.chartType) {
            this.refs.displayArea.getWrappedInstance().destroyChartHandler();
            this.refs.reportConf.getWrappedInstance().createChartHandler(this.state.report.chartType);
        }
    }

    /**
     * 查询事件
     * @param options
     */
    searchHandler(options) {
        // 报表不存在
        if (this.props.reportName.indexOf('UNDEFINE&') > -1) {
            return;
        }

        let report = reportService.getReport(this.props.reportName);
        let mql = '';

        if (report) {
            mql = report.mql;
        }

        this.setState({
            report: report
        });

        // 如果mql为空，不发送查询请求
        if (!mql) {
            return;
        }

        // 构造查询参数对象
        let mqlSearchObj = {
            mql: mql,
            filters: options ? options.filters : '',
            startTime: options ? options.startTime : '',
            endTime: options ? options.endTime : ''
        };

        // 进行MQL查询，渲染结果列表
        this.mqlSearchRequestHandler(mqlSearchObj);
    }

    /**
     * 异步mql查询请求
     * @param mqlSearchObj
     */
    mqlSearchRequestHandler(mqlSearchObj) {
        let that = this;
        xhr({
            url: '/ReportManager/search',
            data: mqlSearchObj,
            async: true,
            success: function (data) {
                if (data.code == '0') {
                    that.setState({
                        mqlResult: data
                    });
                } else {
                    error(data.msg);
                }
            }
        });
    }

    /**
     * 设置图表配置项事件
     * @param options
     */
    setChartOptionHandler(options, forceReload) {
        this.refs.displayArea.getWrappedInstance().setChartOptionsHandler(options, forceReload);
    }

    render() {
        let confTpl = '';
        let currUser = sessionStorage.getItem('XDataUserName');
        let displayTpl = <div id="dataList" className="row noResultInfo">
            <div id="dataTableArea" style={{ width: '130px;' }}>
                <i className='fa fa-exclamation-triangle'></i><span>当前报表已被删除</span>
            </div>
        </div>;

        // 1. 私有报表 且 创建者为当前用户 配置非空 可见
        // 2. 私有报表 且 创建者非当前用户 不可见
        // 3. 公有报表 配置非空 可见
        if (this.state.report && this.state.report.visable === 'PRIVATE' && this.state.report.owner === currUser) {
            if (JSON.stringify(this.state.report) != '{}') {
                confTpl = <div id={ 'reportConf' + this.props.reportName } className='hide' ><ReportConf ref="reportConf" operation="reportAnalysis" selectedRecord={ this.state.report } chartType={this.state.report.chartType} mqlResult={ this.state.mqlResult } mqlSearchHandler={ this.searchHandler } chartId={ this.props.reportName } setChartOptionHandler={ this.setChartOptionHandler }/></div>;
                displayTpl = <DisplayArea ref="displayArea" operation="reportAnalysis" getStartTime={this.getStartTimeHandler} getEndTime={this.getEndTimeHandler} mqlStr={this.state.report.mql} className='chartReport' mqlResult={ this.state.mqlResult } chartType={this.state.report.chartType} chartConfig={this.state.report.chartConfig} selectedRecord={ this.state.report } chartId={ this.props.reportName } operation="reportAnalysis" />;
            }
        }else if (this.state.report && this.state.report.visable === 'PRIVATE' && this.state.report.owner != currUser) {
            displayTpl = <div id="dataList" className="row noResultInfo">
                <div id="dataTableArea" style={{ width: '130px;' }}>
                    <i className='fa fa-exclamation-triangle'></i><span>无权访问当前报表</span>
                </div>
            </div>;
        }else if (this.state.report && this.state.report.visable === 'PUBLIC') {
            if (JSON.stringify(this.state.report) != '{}') {
                confTpl = <div id={ 'reportConf' + this.props.reportName } className='hide' ><ReportConf ref="reportConf" operation="reportAnalysis" selectedRecord={ this.state.report } chartType={this.state.report.chartType} mqlResult={ this.state.mqlResult } mqlSearchHandler={ this.searchHandler } chartId={ this.props.reportName } setChartOptionHandler={ this.setChartOptionHandler }/></div>;
                displayTpl = <DisplayArea ref="displayArea" operation="reportAnalysis" getStartTime={this.getStartTimeHandler} getEndTime={this.getEndTimeHandler} mqlStr={this.state.report.mql} className='chartReport' mqlResult={ this.state.mqlResult } chartType={this.state.report.chartType} chartConfig={this.state.report.chartConfig} selectedRecord={ this.state.report } chartId={ this.props.reportName } operation="reportAnalysis" />;
            }
        }

        return (
            <div id={ 'chartReport_' + this.props.reportName } style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
                { confTpl }
                { displayTpl }
            </div>
        )
    }
}
export default ChartReport;
