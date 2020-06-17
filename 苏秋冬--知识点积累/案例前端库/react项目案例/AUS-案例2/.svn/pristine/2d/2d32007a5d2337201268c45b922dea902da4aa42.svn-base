/**
 * 新建报表组件
 * User: gaogy
 * Date: 2016/12/19
 * Time: 14:10
 */
import React, { Component } from 'react';
import DateRangePicker from 'COMPONENT/Common/DateRangePicker/DateRangePicker';
import ReportConf from 'COMPONENT/Report/ReportConf/ReportConf';
import DisplayArea from 'COMPONENT/Report/ReportDisplay/DisplayArea';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createiCheck from 'UTIL/baseiCheck';
import { baseValidate } from 'UTIL/baseValidate';
import { warning } from 'UTIL/notification';
let operation;
let mqlStr;
class ReportAdd extends Component {
    constructor(props) {
        super(props);
        this.mqlSearchHandler = this.mqlSearchHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.reportSaveHandler = this.reportSaveHandler.bind(this);
        this.setChartOptionHandler = this.setChartOptionHandler.bind(this);
        this.getChartOptionHandler = this.getChartOptionHandler.bind(this);
        this.removeSeriesHandler = this.removeSeriesHandler.bind(this);
        this.changeDisplayAreaHandler = this.changeDisplayAreaHandler.bind(this);
        this.saveOKHandler = this.saveOKHandler.bind(this);
        this.loadModalControlHandler = this.loadModalControlHandler.bind(this);
        this.validateHandler = this.validateHandler.bind(this);
    }

    /**
     * MQL查询事件
     */
    mqlSearchHandler() {
        // MQL语句非空校验
        if (!$(this.refs.mqlTextarea).val()) {
            warning('请输入MQL语句');
            return;
        }

        // mql语句修改判断逻辑
        if (!mqlStr) {
            mqlStr = $(this.refs.mqlTextarea).val();
        }
        if ($(this.refs.mqlTextarea).val() != mqlStr) {
            operation = 'reSearch';
            mqlStr = $(this.refs.mqlTextarea).val();
        }

        // 构造查询参数对象
        let mqlSearchObj = {
            mql: $(this.refs.mqlTextarea).val(),
            filters: '',
            startTime: this.refs.daterangePicker.getStartTime(),
            endTime: this.refs.daterangePicker.getEndTime()
        };

        // 显示可视化配置和可视化分析区域
        $('#reportConf').removeClass('hide');
        $('#reportAnalyze').removeClass('hide');

        // 重复查询时，务必先清除数据列tag
        this.refs.reportConf.getWrappedInstance().clearTagsHandler();

        // 进行MQL查询，渲染结果列表
        this.props.mqlSearch(mqlSearchObj);
        $('button[ name = "saveBtn" ]').removeClass('hide');
    }

    componentDidMount() {
        mqlStr = '';
    }

    componentDidUpdate() {
        if (this.props.report.mqlResult.result && this.props.report.selectedRecord.chartType) {
            this.refs.reportConf.getWrappedInstance().createChartHandler(this.props.report.selectedRecord.chartType);
        }
    }

    /**
     * 校验事件
     */
    validateHandler() {
        let constraints = {
            '名称': {
                // 必填
                presence: {
                    message: '不可为空'
                },
                format: {
                    // 不可包含#
                    pattern: '^[a-zA-Z0-9_\u4e00-\u9fa5]+$',
                    message: '名称不合法'
                },
                // 长度限制
                length: {
                    minimum: 1,
                    maximum: 30,
                    message: '最大长度为30'
                }
            }
        };

        baseValidate($('#saveDashboard'), constraints);
    }

    /**
     * 报表保存事件
     */
    saveHandler() {
        let modalTpl = <div className="form-horizontal">
            <div className="form-group">
                <label htmlFor="reportName" className="col-sm-2 control-label"><span className="identify">* </span>报表名称</label>

                <div className="col-sm-7">
                    <input type="text" placeholder='名称只允许含有汉字、字母、数字、下划线' className="form-control" maxLength={30} name="名称" onBlur={this.validateHandler} id="reportName" />
                </div>

                <div className="col-sm-2">
                    <div className="messages"></div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="isVisible" className="col-sm-2 control-label">可见性</label>

                <div className="col-sm-9 radio">
                    <label className="pl0">
                        <input name="isVisible" type="radio" value="PUBLIC" defaultChecked />
                        &nbsp;共享
                    </label>
                    <label className="ml20">
                        <input name="isVisible" type="radio" value="PRIVATE" />
                        &nbsp;私有
                    </label>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="reportDesc" className="col-sm-2 control-label">报表描述</label>

                <div className="col-sm-9">
                    <textarea id="reportDesc" className="form-control" maxLength={120} style={{ resize: 'none' }} rows="5"></textarea>
                </div>
            </div>
        </div>;

        this.refs.saveReport.setContent(modalTpl);
    }

    /**
     * 加载弹窗内控件
     */
    loadModalControlHandler() {
        createiCheck('input[ type = "radio"]');
        let defaultReportName = $('#chartTitle', $('#reportConf')).val();
        $('#reportName', $('#saveReport')).val(defaultReportName);
    }

    /**
     * 报表保存确认事件
     */
    saveOKHandler() {
        let chartConfig = this.getChartOptionHandler();

        // MQL语句非空校验
        if (!$(this.refs.mqlTextarea).val()) {
            warning('请输入MQL语句并查询后保存');
            return;
        }

        // 校验图表配置是否为空
        if (JSON.stringify(chartConfig) === '{}') {
            warning('空图表无法保存');
            return;
        }

        // 是否校验失败
        this.validateHandler();
        if ($('div.messages').find('p').length > 0) {
            return;
        }

        let reportOpt = {};
        reportOpt.reportName = $('#reportName', $('#saveReport')).val();

        reportOpt.visable = $('input[name = "isVisible"]:checked', $('#saveReport')).val();
        reportOpt.desc = $('#reportDesc', $('#saveReport')).val();
        reportOpt.mql = this.refs.mqlTextarea.value;
        reportOpt.chartType = chartConfig.chartType;
        reportOpt.chartConfig = JSON.stringify(chartConfig);
        this.props.addReport(reportOpt);

        // 隐藏弹窗
        $('#saveReport').modal('hide');
    }

    /**
     * 报表保存事件
     */
    reportSaveHandler() {
        this.props.mqlSearch();
    }

    /**
     * 报表可视化区域切换
     * @param chartType
     */
    changeDisplayAreaHandler(chartType) {
        this.props.changeChartType(chartType);
    }

    /**
     * 设置图表配置项事件
     * @param options
     * @param forceUpdate
     */
    setChartOptionHandler(options, forceUpdate) {
        this.refs.displayArea.getWrappedInstance().setChartOptionsHandler(options, forceUpdate);
    }

    /**
     * 获取图表配置项事件
     * @returns {{}}
     */
    getChartOptionHandler() {
        let options = {};
        options = this.refs.displayArea.getWrappedInstance().getChartOptionsHandler();
        return options;
    }

    /**
     * 删除图表数据列事件
     */
    removeSeriesHandler(id) {
        this.refs.displayArea.getWrappedInstance().removeSeriesHandler(id);
    }

    render() {
        let chartType = this.props.report.selectedRecord.chartType || 'dataList';
        return (
            <div id="addReport">
                <div className="box box-primary mqlSearch">
                    <div className="box-header with-border">
                        <h3 className="box-title">MQL查询</h3>
                    </div>
                    <div className="box-body">
                        <div className="form-group">
                            <div className="row" >
                                <div className="col-md-6 col-xs-8">
                                    <textarea className="form-control" ref="mqlTextarea" style={{ resize: 'none' }} rows="4" placeholder="请输入MQL查询语句"></textarea>
                                </div>
                                <div className="col-md-4 col-xs-4">
                                    <div className='row'>
                                        <div className="col-md-6 col-xs-6 dateRangePicker">
                                            <DateRangePicker ref="daterangePicker" />
                                        </div>
                                        <div className="col-md-6 col-xs-6" style={{marginTop: '20px'}}>
                                            <button name="searchBtn" className="btn btn-primary" onClick={ this.mqlSearchHandler } ><i className="fa fa-search" ></i> 查询</button>
                                            <button name="saveBtn" className="btn btn-primary ml10 hide" data-toggle="modal" data-target="#saveReport" onClick={ this.saveHandler } ><i className="fa fa-save" ></i> 保存</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="reportConf" className="box box-primary hide">
                    <div className="box-header with-border">
                        <h3 className="box-title">报表配置</h3>
                    </div>

                    <div className="box-body">
                        <ReportConf ref="reportConf" operation={operation} mqlResult={ this.props.report.mqlResult } mqlSearchHandler={ this.mqlSearchHandler } changeDisplayAreaHandler={ this.changeDisplayAreaHandler } removeSeriesHandler={ this.removeSeriesHandler } setChartOptionHandler={ this.setChartOptionHandler }/>
                    </div>
                </div>

                <div id="reportAnalyze" className="box box-primary hide">
                    <div className="box-header with-border">
                        <h3 className="box-title">报表可视化</h3>
                    </div>

                    <div className="box-body">
                        <DisplayArea ref="displayArea" operation={operation} chartType={chartType} mqlResult={ this.props.report.mqlResult } />
                    </div>
                </div>
                <Modal modalId="saveReport" ref='saveReport' title="保存报表" okHandler={ this.saveOKHandler } loadModalControlHandler={ this.loadModalControlHandler } />
            </div>
        )
    }
}
export default ReportAdd;
