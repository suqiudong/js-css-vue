/**
 * 报表更新组件
 * User: gaogy
 * Date: 2016/12/28
 * Time: 19:10
 */
import React, { Component } from 'react';
import DateRangePicker from 'COMPONENT/Common/DateRangePicker/DateRangePicker';
import ReportConf from 'COMPONENT/Report/ReportConf/ReportConf';
import DisplayArea from 'COMPONENT/Report/ReportDisplay/DisplayArea';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createiCheck from 'UTIL/baseiCheck';
import { warning } from 'UTIL/notification';

let operation;
class ReportUpdate extends Component {
    constructor(props) {
        super(props);
        this.mqlSearchHandler = this.mqlSearchHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.saveOKHandler = this.saveOKHandler.bind(this);
        this.loadModalControlHandler = this.loadModalControlHandler.bind(this);
        this.setChartOptionHandler = this.setChartOptionHandler.bind(this);
        this.getChartOptionHandler = this.getChartOptionHandler.bind(this);
        this.removeSeriesHandler = this.removeSeriesHandler.bind(this);
        this.changeDisplayAreaHandler = this.changeDisplayAreaHandler.bind(this);
        this.destroyChartHandler = this.destroyChartHandler.bind(this);
        this.getStartTimeHandler = this.getStartTimeHandler.bind(this);
        this.getEndTimeHandler = this.getEndTimeHandler.bind(this);
        operation = 'reportUpdate';
    }

    componentWillMount() {
        this.props.getReport(this.props.params.reportName);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.report.selectedRecord.mql && nextProps.report.selectedRecord.mql) {
            this.props.mqlSearch({
                mql: nextProps.report.selectedRecord.mql,
                startTime: this.refs.daterangePicker.getStartTime(),
                endTime: this.refs.daterangePicker.getEndTime()
            });
        }
    }

    componentDidMount() {
        // 按钮样式切换，获取当前展示类型
        $('button', $('#chartType')).removeClass('active');
    }

    componentDidUpdate() {
        $('button[ name = "' + this.props.report.selectedRecord.chartType + '" ]', $('#chartType')).addClass('active');

        // 如果为重新查询，则无需执行下方渲染标签逻辑
        if (operation === 'reSearch') {
            return;
        }

        // 渲染标签逻辑
        let chartConfig = JSON.parse(this.props.report.selectedRecord.chartConfig);
        if (chartConfig.chartType == 'line' || chartConfig.chartType == 'column' || chartConfig.chartType == 'area') {
            $('button[ name = "line" ]', $('#chartType')).addClass('active');

            for (let i = 0; i < chartConfig.series.length; i++) {
                if ($('span[id = "' + chartConfig.series[i].id.split('series_')[1] + '"]').length === 0) {
                    // 生成记录标签
                    let tagOpt = {};
                    tagOpt.id = chartConfig.series[i].id.split('series_')[1];
                    let chartType = {
                        line: '折线图',
                        column: '条形图',
                        area: '面积图'
                    };
                    tagOpt.desc = `展现方式：${ chartType[chartConfig.series[i].type] }  Y轴字段：${ chartConfig.series[i].name }`;
                    this.refs.reportConf.getWrappedInstance().addTagDataHandler(tagOpt);
                }
            }
        }

        // 无chartConfig查询时，重新渲染标签
        let btnName = $('button.active', $('#reportConf')).attr('name');
        if (!chartConfig.chartType && btnName === 'line' && $('#xAxisSelect', $('#reportConf')).val() != '请选择' && $('.noResultInfo').length === 0) {
            let tagOpt = {};
            tagOpt.id = $('#trendTypeSelect').val() + $('#yAxisSelect', $('#reportConf')).val();
            tagOpt.createTime = new Date().getTime();
            tagOpt.desc = `展现方式：${ $('#select2-trendTypeSelect-container').text() } Y轴字段：${ $('#yAxisSelect', $('#reportConf')).val() }`;
            if ($('[ id = "' + tagOpt.id + '"]').length === 0) {
                this.refs.reportConf.getWrappedInstance().addTagDataHandler(tagOpt);
            }
        }

        // 初次赋值mql
        if (!$(this.refs.mqlTextarea).val()) {
            $(this.refs.mqlTextarea).val(this.props.report.selectedRecord.mql);
        }
    }

    /**
     * MQL查询事件
     */
    mqlSearchHandler() {
        let mqlStr = $(this.refs.mqlTextarea).val();

        // MQL语句非空校验
        if (!mqlStr) {
            warning('请输入MQL语句');
            return;
        }

        // 构造查询参数对象
        let mqlSearchObj = {
            mql: mqlStr,
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

        // 更新时，mql语句修改判断逻辑
        if (mqlStr != this.props.report.selectedRecord.mql) {
            operation = 'reSearch';
        }
    }

    /**
     * 报表保存事件
     */
    saveHandler() {
        let modalTpl = <div className="form-horizontal">
            <div className="form-group">
                <label htmlFor="reportName" className="col-sm-2 control-label">报表名称</label>

                <div className="col-sm-9 pt7">
                    <span className="detailSpan">{this.props.report.selectedRecord.reportName}</span>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="isVisible" className="col-sm-2 control-label">可见性</label>

                <div className="col-sm-9 radio">
                    <label className="pl0">
                        <input name="isVisible" type="radio" value="PUBLIC" />
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
                    <textarea id="reportDesc" maxLength={120} defaultValue={ this.props.report.selectedRecord.desc } className="form-control" style={{ resize: 'none' }} rows="5"></textarea>
                </div>
            </div>
        </div>;
        this.refs.saveReport.setContent(modalTpl);
    }

    /**
     * 加载弹窗内控件
     */
    loadModalControlHandler() {
        $('input[name = "isVisible"][value = "' + this.props.report.selectedRecord.visable + '"]', $('#saveReport')).attr('checked', 'checked');
        createiCheck('input[ type = "radio"]');
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

    destroyChartHandler() {
        this.refs.displayArea.getWrappedInstance().destroyChartHandler();
    }

    /**
     * 获取开始时间
     * @returns {*|string|*}
     */
    getStartTimeHandler() {
        return this.refs.daterangePicker.getStartTime();
    }

    /**
     * 获取截止时间
     * @returns {*|string|*}
     */
    getEndTimeHandler() {
        return this.refs.daterangePicker.getEndTime();
    }

    /**
     * 保存更新事件
     */
    saveOKHandler() {
        let chartConfig = this.getChartOptionHandler();

        // MQL语句非空校验
        if (!$(this.refs.mqlTextarea).val()) {
            warning('请输入MQL语句并查询后保存');
            return;
        }

        // 确保MQL与图表结果一致
        if ($(this.refs.mqlTextarea).val() != this.props.report.selectedRecord.mql && operation != 'reSearch') {
            warning('请重新查询MQL后保存');
            return;
        }

        // 校验图表配置是否为空
        if (JSON.stringify(chartConfig) === '{}') {
            warning('空图表无法保存');
            return;
        }

        let reportOpt = {};
        reportOpt.reportName = this.props.report.selectedRecord.reportName;
        reportOpt.visable = $('input[name = "isVisible"]:checked', $('#saveReport')).val();
        reportOpt.desc = $('#reportDesc', $('#saveReport')).val();
        reportOpt.mql = this.refs.mqlTextarea.value;
        reportOpt.chartType = $('button.active', $('#reportConf')).attr('name');
        reportOpt.chartConfig = JSON.stringify(chartConfig);
        this.props.updateReport(reportOpt);

        // 隐藏弹窗
        $('#saveReport').modal('hide');
    }

    render() {

        // mql为空时重置操作状态
        if (!this.props.report.selectedRecord.mql) {
            operation = 'reportUpdate';
        }

        return (
            <div id="addReport">
                <div className="box box-primary mqlSearch">
                    <div className="box-header with-border">
                        <h3 className="box-title">MQL查询</h3>
                    </div>

                    <div className="box-body">
                        <div className="form-group">
                            <div className="row" >
                                <div className="col-md-6 col-xs-4">
                                    <textarea className="form-control" ref="mqlTextarea" style={{ resize: 'none' }} rows="5"></textarea>
                                </div>
                                <div className="col-md-3 col-xs-4 dateRangePicker">
                                    <DateRangePicker ref="daterangePicker" />
                                </div>
                                <div className="col-md-2 col-xs-4">
                                    <button name="searchBtn" className="btn btn-primary" onClick={ this.mqlSearchHandler } ><i className="fa fa-search" ></i> 查询</button>
                                    <button name="saveBtn" className="btn btn-primary ml10" data-toggle="modal" data-target="#saveReport" onClick={ this.saveHandler } ><i className="fa fa-save" ></i> 保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="reportConf" className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">报表配置</h3>
                    </div>
                    <div className="box-body">
                        <ReportConf ref="reportConf" selectedRecord={ this.props.report.selectedRecord } mqlResult={ this.props.report.mqlResult } operation={operation} mqlSearchHandler={ this.mqlSearchHandler } destroyChartHandler={ this.destroyChartHandler } changeDisplayAreaHandler={ this.changeDisplayAreaHandler } removeSeriesHandler={ this.removeSeriesHandler } setChartOptionHandler={ this.setChartOptionHandler }/>
                    </div>
                </div>

                <div id="reportAnalyze" className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">报表可视化</h3>
                    </div>

                    <div className="box-body">
                        <DisplayArea ref="displayArea" operation={operation} getStartTime={this.getStartTimeHandler} getEndTime={this.getEndTimeHandler} />
                    </div>
                </div>
                <Modal modalId="saveReport" ref='saveReport' title="保存报表" okHandler={ this.saveOKHandler } loadModalControlHandler={ this.loadModalControlHandler } />
            </div>
        )
    }
}
export default ReportUpdate;
