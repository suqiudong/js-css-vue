/**
 * 饼图组件
 * User: gaogy
 * Date: 2016/12/21
 * Time: 19:27
 */
import React, { Component } from 'react';
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

// 定义饼图对象
let pieChart;
class PieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartOptions: this.props.chartOptions
        };

        this.loadPieChartHandler = this.loadPieChartHandler.bind(this);
        this.setChartOptionsHandler = this.setChartOptionsHandler.bind(this);
        this.getChartOptionsHandler = this.getChartOptionsHandler.bind(this);
        this.destroyChartHandler = this.destroyChartHandler.bind(this);
    }

    /**
     * 设置图表配置
     * @param options
     */
    setChartOptionsHandler(options) {
        this.destroyChartHandler();
        this.setState({
            chartOptions: options
        });
    }

    /**
     * 获取图表配置操作
     * @returns {{}}
     */
    getChartOptionsHandler() {
        let options = {};
        if (pieChart) {
            options.title = pieChart.options.title.text;
            options.series = pieChart.options.series;
            options.chartType = 'pie';
            options.isNumDis = pieChart.options.plotOptions.pie.dataLabels.enabled;
            options.islegendDis = pieChart.options.plotOptions.pie.showInLegend;
        }
        return options;
    }

    /**
     * 清除图表
     */
    destroyChartHandler() {
        let chartId = this.props.chartId || 'pieChart';
        if (pieChart && pieChart.options.chart.id === chartId) {
            pieChart.destroy();
            pieChart = '';
            $('#' + chartId).html(`<div class="noResultInfo"><i class='fa fa-exclamation-triangle'></i><span>请先添加图表配置</span></div>`);
        }
    }

    componentDidMount() {
        if (this.state.chartOptions) {
            this.loadPieChartHandler(this.state.chartOptions);
        }
    }

    componentDidUpdate() {
        if (this.state.chartOptions) {
            this.loadPieChartHandler(this.state.chartOptions);
        }
    }

    /**
     * 绘制图表
     * @returns {*}
     */
    loadPieChartHandler(options) {
        let chartId = this.props.chartId || 'pieChart';
        pieChart = Highcharts.chart(chartId, {
            lang: {
                contextButtonTitle: '图表导出菜单',
                decimalPoint: '.',
                downloadJPEG: '下载JPEG图片',
                downloadPDF: '下载PDF文件',
                downloadPNG: '下载PNG文件',
                downloadSVG: '下载SVG文件',
                drillUpText: '返回 {series.name}',
                loading: '加载中',
                months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                noData: '没有数据',
                numericSymbols: [ '千', '兆', 'G', 'T', 'P', 'E'],
                printChart: '打印图表',
                resetZoom: '恢复缩放',
                resetZoomTitle: '恢复图表',
                shortMonths: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                thousandsSep: ',',
                weekdays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
            },
            chart: {
                id: chartId,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: options.title || '',
                x: -20
            },
            colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
            tooltip: {
                headerFormat: '<b>{point.percentage:.1f}%</b><br/>',
                pointFormat: '{series.name}: {point.name}'
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: options.isNumDis || false,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} ',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: options.islegendDis || false
                }
            },
            series: [{
                type: 'pie',
                resultField: options.series[0].resultField || '',
                name: options.series[0].name || '',
                data: options.series[0].data || []
            }]
        });

        return pieChart;
    }

    render() {
        let chartId = this.props.chartId || 'pieChart';
        return (
            <div id={chartId} className={ this.props.className } style={{ maxWidth: '99%', height: '100%' }}>
                <div className="noResultInfo"><i className='fa fa-exclamation-triangle'></i><span>请先添加图表配置</span></div>
            </div>
        )
    }
}
export default PieChart;
