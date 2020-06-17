/**
 * 报表配置组件
 * User: gaogy
 * Date: 2016/12/22
 * Time: 14:47
 */
import React, { Component } from 'react';
import PieChartConf from 'COMPONENT/Report/ReportConf/PieChartConf';
import TrendChartConf from 'COMPONENT/Report/ReportConf/TrendChartConf';
import FunnelChartConf from 'COMPONENT/Report/ReportConf/FunnelChartConf';
import GaugeChartConf from 'COMPONENT/Report/ReportConf/GaugeChartConf';
import RankChartConf from 'COMPONENT/Report/ReportConf/RankChartConf';
import NumericalChartConf from 'COMPONENT/Report/ReportConf/NumericalChartConf';
import ChartTag from 'COMPONENT/Report/ReportDisplay/ChartTag';
import { connect } from 'react-redux';

let chartTitle = '';

@connect(
    ({ report, router }) => ({report, router}),
    require('ACTION/report').default,
    null,
    { withRef: true }
)
class ReportConf extends Component {
    constructor(props) {
        super(props);

        this.selectChartTypeHandler = this.selectChartTypeHandler.bind(this);
        this.createChartHandler = this.createChartHandler.bind(this);
        this.addTagDataHandler = this.addTagDataHandler.bind(this);
        this.setChartOptionHandler = this.setChartOptionHandler.bind(this);
        this.removeSeriesHandler = this.removeSeriesHandler.bind(this);
        this.clearTagsHandler = this.clearTagsHandler.bind(this);
    }

    componentDidMount() {
        chartTitle = $('#chartTitle', $('#reportConf')).val();
    }

    componentDidUpdate() {
        if ($('#chartTitle', $('#reportConf')).val()) {
            chartTitle = $('#chartTitle', $('#reportConf')).val();
        }
        $('#chartTitle', $('#reportConf')).val(chartTitle);
    }

    /**
     * 选择图表类型事件
     * @param e
     */
    selectChartTypeHandler(e) {
        chartTitle = $('#chartTitle', $('#reportConf')).val();
        // 按钮样式切换，获取当前展示类型
        $('button', $('#chartType')).removeClass('active');
        $(e.currentTarget).addClass('active');
        let btnName = $(e.currentTarget).attr('name');
        this.props.changeChartType(btnName);
        // 清除数据列标签
        this.refs.chartTag.clearTagHandler();
    }

    /**
     * 清除趋势图数据列标签
     * @returns {*}
     */
    clearTagsHandler() {
        return this.refs.chartTag.clearTagHandler();
    }

    /**
     * 设置图表配置事件
     * @param options
     * @param forceUpdate
     */
    setChartOptionHandler(options, forceUpdate) {
        this.props.setChartOptionHandler(options, forceUpdate);
    }

    /**
     * 添加数据列标签事件
     * @param tagObj
     */
    addTagDataHandler(tagObj) {
        this.refs.chartTag.addTagDataHandler(tagObj);
    }

    /**
     * 删除数据列事件
     * @param id
     */
    removeSeriesHandler(id) {
        this.props.removeSeriesHandler(id);
    }

    /**
     * 创建图表事件
     */
    createChartHandler(chartType) {
        let btnName = $('button.active', $('#reportConf')).attr('name');

        if (chartType) {
            btnName = chartType;
        }

        // 图表差异构造
        switch (btnName) {
            case 'line':
                if (this.props.operation === 'reportAnalysis') {
                    this.refs.trendChartConf.refreshChartHandler()
                } else {
                    this.refs.trendChartConf.createChartHandler();
                }
                break;
            case 'column':
                if (this.props.operation === 'reportAnalysis') {
                    this.refs.trendChartConf.refreshChartHandler()
                } else {
                    this.refs.trendChartConf.createChartHandler();
                }
                break;
            case 'area':
                if (this.props.operation === 'reportAnalysis') {
                    this.refs.trendChartConf.refreshChartHandler()
                } else {
                    this.refs.trendChartConf.createChartHandler();
                }
                break;
            case 'pie':
                if (this.props.operation === 'reportAnalysis') {
                    this.refs.pieChartConf.refreshChartHandler()
                } else {
                    this.refs.pieChartConf.createChartHandler();
                }
                break;
            case 'funnel':
                if (this.props.operation === 'reportAnalysis') {
                    this.refs.funnelChartConf.refreshChartHandler()
                } else {
                    this.refs.funnelChartConf.createChartHandler();
                }
                break;
            case 'gauge':
                if (this.props.operation === 'reportAnalysis') {
                    this.refs.gaugeChartConf.refreshChartHandler()
                } else {
                    this.refs.gaugeChartConf.createChartHandler();
                }
                break;
            case 'bar':
                if (this.props.operation === 'reportAnalysis') {
                    this.refs.rankChartConf.refreshChartHandler()
                } else {
                    this.refs.rankChartConf.createChartHandler();
                }
                break;
            case 'metric':
                if (this.props.operation === 'reportAnalysis') {
                    this.refs.numericalChartConf.refreshChartHandler()
                } else {
                    this.refs.numericalChartConf.createChartHandler();
                }
                break;
        }
    }

    render() {
        let $parent = '#reportConf';
        let confTpl = '';
        let chartType = this.props.chartType || this.props.report.selectedRecord.chartType;
        let selectedRecord = '';
        if (this.props.selectedRecord && JSON.stringify(this.props.selectedRecord) != '{}') {
            selectedRecord = this.props.selectedRecord;
        } else if (this.props.report.selectedRecord && JSON.stringify(this.props.report.selectedRecord) != '{}') {
            selectedRecord = this.props.report.selectedRecord;
        }

        let mqlResult = '';
        if (this.props.mqlResult && JSON.stringify(this.props.mqlResult) != '{}') {
            mqlResult = this.props.mqlResult;
        } else if (this.props.report.mqlResult && JSON.stringify(this.props.report.mqlResult) != '{}') {
            mqlResult = this.props.report.mqlResult;
        }
        
        if (this.props.chartId) {
            $parent = '#reportConf' + this.props.chartId;
        }

        switch (chartType) {
            case 'line':
                confTpl = <TrendChartConf $parent = { $parent } operation={ this.props.operation } selectedRecord={ selectedRecord } clearTagsHandler={ this.clearTagsHandler } setChartOptionHandler={ this.setChartOptionHandler } addTagDataHandler={ this.addTagDataHandler } mqlResult={ mqlResult } ref="trendChartConf" />;
                break;
            case 'column':
                confTpl = <TrendChartConf $parent = { $parent } operation={ this.props.operation } selectedRecord={ selectedRecord } clearTagsHandler={ this.clearTagsHandler } setChartOptionHandler={ this.setChartOptionHandler } addTagDataHandler={ this.addTagDataHandler } mqlResult={ mqlResult } ref="trendChartConf" />;
                break;
            case 'area':
                confTpl = <TrendChartConf $parent = { $parent } operation={ this.props.operation } selectedRecord={ selectedRecord } clearTagsHandler={ this.clearTagsHandler } setChartOptionHandler={ this.setChartOptionHandler } addTagDataHandler={ this.addTagDataHandler } mqlResult={ mqlResult } ref="trendChartConf" />;
                break;
            case 'pie':
                confTpl = <PieChartConf $parent = { $parent } operation={ this.props.operation } selectedRecord={ selectedRecord } setChartOptionHandler={ this.setChartOptionHandler } mqlResult={ mqlResult } ref="pieChartConf" />;
                break;
            case 'funnel':
                confTpl = <FunnelChartConf $parent = { $parent } operation={ this.props.operation } selectedRecord={ selectedRecord } mqlResult={ mqlResult } setChartOptionHandler={ this.setChartOptionHandler } ref="funnelChartConf" />;
                break;
            case 'gauge':
                confTpl = <GaugeChartConf $parent = { $parent } operation={ this.props.operation } selectedRecord={ selectedRecord } mqlResult={ mqlResult } setChartOptionHandler={ this.setChartOptionHandler } ref="gaugeChartConf" />;
                break;
            case 'bar':
                confTpl = <RankChartConf $parent = { $parent } operation={ this.props.operation } selectedRecord={ selectedRecord } mqlResult={ mqlResult } setChartOptionHandler={ this.setChartOptionHandler } ref="rankChartConf" />;
                break;
            case 'metric':
                confTpl = <NumericalChartConf $parent = { $parent } operation={ this.props.operation } selectedRecord={ selectedRecord } mqlResult={ mqlResult } setChartOptionHandler={ this.setChartOptionHandler } ref="numericalChartConf" />;
                break;
            default:
                break;
        }

        return (
            <div>
                <div className="row">
                    <div className="form-group col-md-12">
                        <label htmlFor="chartType">图表类型</label>
                        <div id="chartType">
                            <button type="button" title="列表" name="dataList" onClick={ this.selectChartTypeHandler } className="btn btn-default btn-sm active"><i className="fa fa-list-alt"></i></button>
                            <button type="button" title="趋势图" name="line" onClick={ this.selectChartTypeHandler } className="btn btn-default btn-sm ml5"><i className="fa fa-line-chart"></i></button>
                            <button type="button" title="饼图" name="pie" onClick={ this.selectChartTypeHandler } className="btn btn-default btn-sm ml5"><i className="fa fa-pie-chart"></i></button>
                            <button type="button" title="排行图" name="bar" onClick={ this.selectChartTypeHandler } className="btn btn-default btn-sm ml5"><i className="fa fa-sort-amount-desc"></i></button>
                            <button type="button" title="漏斗图" name="funnel" onClick={ this.selectChartTypeHandler } className="btn btn-default btn-sm ml5"><i className="fa fa-filter"></i></button>
                            <button type="button" title="仪表图" name="gauge" onClick={ this.selectChartTypeHandler } className="btn btn-default btn-sm ml5"><i className="fa fa-dashboard"></i></button>
                            <button type="button" title="数值图" name="metric" onClick={ this.selectChartTypeHandler } className="btn btn-default btn-sm ml5"><i className="fa fa-calculator"></i></button>
                        </div>
                    </div>
                    <div className="chartTypeDisabled hide">
                    </div>
                </div>
                { confTpl }
                <div className="row">
                    <ChartTag ref="chartTag" removeSeriesHandler={ this.removeSeriesHandler } />
                </div>
            </div>
        )
    }
}
export default ReportConf;
