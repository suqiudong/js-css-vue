/**
 * 报表分析区域组件
 * User: gaogy
 * Date: 2016/12/26
 * Time: 10:57
 */
import React, { Component } from 'react';
import DataList from 'COMPONENT/Report/ReportDisplay/DataList';
import FunnelChart from 'COMPONENT/Common/FunnelChart/FunnelChart';
import TrendChart from 'COMPONENT/Common/TrendChart/TrendChart';
import GaugeChart from 'COMPONENT/Common/GaugeChart/GaugeChart';
import PieChart from 'COMPONENT/Common/PieChart/PieChart';
import NumericalChart from 'COMPONENT/Common/NumericalChart/NumericalChart';
import RankChart from 'COMPONENT/Common/RankChart/RankChart';
import { connect } from 'react-redux';

@connect(
    ({ report, router }) => ({report, router}),
    require('ACTION/report').default,
    null,
    { withRef: true }
)

class DisplayArea extends Component {
    constructor(props) {
        super(props);

        this.setChartOptionsHandler = this.setChartOptionsHandler.bind(this);
        this.removeSeriesHandler = this.removeSeriesHandler.bind(this);
        this.getChartOptionsHandler = this.getChartOptionsHandler.bind(this);
        this.destroyChartHandler = this.destroyChartHandler.bind(this);
    }

    componentDidMount() {
        if (this.props.operation === `reportDetail` || this.props.operation === `reportUpdate`) {
            let chartConfigStr = this.props.chartConfig || this.props.report.selectedRecord.chartConfig;
            let chartConfig = JSON.parse(chartConfigStr);
            this.setChartOptionsHandler(chartConfig, true);
        }
    }

    componentDidUpdate() {
        // 如果为重新渲染，清空之前图表区域
        if (this.props.operation === `reSearch`) {
            this.destroyChartHandler();
        }
    }

    /**
     * 清空报表图表事件
     */
    destroyChartHandler() {
        let chartType = this.props.chartType || this.props.report.selectedRecord.chartType;
        switch (chartType) {
            case 'line':
                this.refs.trendChart.destroyChartHandler();
                break;
            case 'area':
                this.refs.trendChart.destroyChartHandler();
                break;
            case 'column':
                this.refs.trendChart.destroyChartHandler();
                break;
            case 'pie':
                this.refs.pieChart.destroyChartHandler();
                break;
            case 'funnel':
                this.refs.funnelChart.destroyChartHandler();
                break;
            case 'gauge':
                this.refs.gaugeChart.destroyChartHandler();
                break;
            case 'bar':
                this.refs.rankChart.destroyChartHandler();
                break;
            case 'metric':
                this.refs.numericalChart.destroyChartHandler();
                break;
            default:
                break;
        }
    }

    /**
     * 设置图表配置项
     * @param options
     * @param forceReload
     */
    setChartOptionsHandler(options, forceReload) {
        let chartType = this.props.chartType || this.props.report.selectedRecord.chartType;
        switch (chartType) {
            case 'line':
                this.refs.trendChart.setChartOptionsHandler(options, forceReload);
                break;
            case 'area':
                this.refs.trendChart.setChartOptionsHandler(options, forceReload);
                break;
            case 'column':
                this.refs.trendChart.setChartOptionsHandler(options, forceReload);
                break;
            case 'pie':
                this.refs.pieChart.setChartOptionsHandler(options);
                break;
            case 'funnel':
                this.refs.funnelChart.setChartOptionsHandler(options);
                break;
            case 'gauge':
                this.refs.gaugeChart.setChartOptionsHandler(options);
                break;
            case 'bar':
                this.refs.rankChart.setChartOptionsHandler(options, forceReload);
                break;
            case 'metric':
                this.refs.numericalChart.setChartOptionsHandler(options);
                break;
            case 'dataList':
                let mqlStr = this.props.mqlStr || this.props.report.selectedRecord.mql;
                this.props.mqlSearch({
                    mql: mqlStr,
                    startTime: this.props.getStartTime(),
                    endTime: this.props.getEndTime()
                });
                break;
            default:
                break;
        }
    }

    /**
     * 获取图表配置信息
     * @returns {{}}
     */
    getChartOptionsHandler() {
        let options = {};
        let chartType = this.props.report.selectedRecord.chartType || this.props.chartType;
        switch (chartType) {
            case 'line':
                options = this.refs.trendChart.getChartOptionsHandler();
                break;
            case 'column':
                options = this.refs.trendChart.getChartOptionsHandler();
                break;
            case 'area':
                options = this.refs.trendChart.getChartOptionsHandler();
                break;
            case 'pie':
                options = this.refs.pieChart.getChartOptionsHandler();
                break;
            case 'funnel':
                options = this.refs.funnelChart.getChartOptionsHandler();
                break;
            case 'gauge':
                options = this.refs.gaugeChart.getChartOptionsHandler();
                break;
            case 'bar':
                options = this.refs.rankChart.getChartOptionsHandler();
                break;
            case 'metric':
                options = this.refs.numericalChart.getChartOptionsHandler();
                break;
            default:
                options.chartType = 'dataList';
                break;
        }

        return options;
    }

    /**
     * 移除数据列事件
     * @param id
     */
    removeSeriesHandler(id) {
        let chartType = this.props.report.selectedRecord.chartType || this.props.chartType;
        switch (chartType) {
            case 'line':
                this.refs.trendChart.removeSeriesHandler(id);
                break;
            case 'area':
                this.refs.trendChart.removeSeriesHandler(id);
                break;
            case 'column':
                this.refs.trendChart.removeSeriesHandler(id);
                break;
            case 'pie':
                this.refs.pieChart.removeSeriesHandler(id);
                break;
            case 'funnel':
                this.refs.funnelChart.removeSeriesHandler(id);
                break;
            case 'gauge':
                this.refs.gaugeChart.removeSeriesHandler(id);
                break;
            case 'bar':
                this.refs.rankChart.removeSeriesHandler(id);
                break;
            case 'metric':
                this.refs.numericalChart.removeSeriesHandler(id);
                break;
            default:
                break;
        }
    }

    render() {
        let displayTpl = '';
        let chartType = this.props.chartType || this.props.report.selectedRecord.chartType;
        let mqlResult = this.props.mqlResult || this.props.report.mqlResult;
        switch (chartType) {
            case 'dataList':
                displayTpl = <DataList ref="dataList" className={ this.props.className } chartId={ this.props.chartId } mqlResult={ mqlResult } />;
                break;
            case 'line':
                displayTpl = <TrendChart className={ this.props.className } chartId={ this.props.chartId } ref="trendChart" />;
                break;
            case 'column':
                displayTpl = <TrendChart className={ this.props.className } chartId={ this.props.chartId } ref="trendChart" />;
                break;
            case 'area':
                displayTpl = <TrendChart className={ this.props.className } chartId={ this.props.chartId } ref="trendChart" />;
                break;
            case 'pie':
                displayTpl = <PieChart className={ this.props.className } chartId={ this.props.chartId } ref="pieChart" />;
                break;
            case 'funnel':
                displayTpl = <FunnelChart className={ this.props.className } chartId={ this.props.chartId } ref="funnelChart" />;
                break;
            case 'gauge':
                displayTpl = <GaugeChart className={ this.props.className } chartId={ this.props.chartId } ref="gaugeChart" />;
                break;
            case 'metric':
                displayTpl = <NumericalChart className={ this.props.className } chartId={ this.props.chartId } ref="numericalChart" />;
                break;
            case 'bar':
                displayTpl = <RankChart className={ this.props.className } chartId={ this.props.chartId } ref="rankChart" />;
                break;
            default:
                displayTpl = <DataList className={ this.props.className } chartId={ this.props.chartId } mqlResult={ mqlResult } />;
                break;
        }

        return (
            <div id="displayArea" style={{ height: '100%' }}>
                { displayTpl }
            </div>
        )
    }
}
export default DisplayArea;
