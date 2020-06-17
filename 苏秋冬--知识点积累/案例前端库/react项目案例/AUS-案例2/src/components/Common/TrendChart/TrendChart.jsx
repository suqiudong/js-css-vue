/**
 * 趋势图组件
 * User: gaogy
 * Date: 2016/12/21
 * Time: 19:27
 */
import React, { Component } from 'react';
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

// 定义趋势图对象
let trendChart;
class TrendChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartOptions: this.props.chartOptions
        };

        this.setChartOptionsHandler = this.setChartOptionsHandler.bind(this);
        this.addSeriesHandler = this.addSeriesHandler.bind(this);
        this.removeSeriesHandler = this.removeSeriesHandler.bind(this);
        this.loadTrendChartHandler = this.loadTrendChartHandler.bind(this);
        this.getChartOptionsHandler = this.getChartOptionsHandler.bind(this);
        this.destroyChartHandler = this.destroyChartHandler.bind(this);
    }

    /**
     * 设置图表配置
     * @param options
     */
    setChartOptionsHandler(options, forceReload) {
        if (!trendChart || forceReload) {
            this.setState({
                chartOptions: options
            });
        } else {
            this.addSeriesHandler(options);
        }
    }

    /**
     * 获取图表配置操作
     * @returns {{}}
     */
    getChartOptionsHandler() {
        let options = {};
        if (trendChart) {
            options.title = trendChart.options.title.text;
            options.chartType = trendChart.options.chart.type;
            options.xAxis = trendChart.options.xAxis;
            options.yAxis = trendChart.options.yAxis;
            options.isNumDis = trendChart.options.chart.isNumDis;
            options.islegendDis = trendChart.options.chart.islegendDis;
            options.series = trendChart.options.series;
        }
        return options;
    }

    /**
     * 添加数据列操作
     * @param seriesData
     */
    addSeriesHandler(options) {
        trendChart.addSeries(options.series[0]);
        trendChart.options.series.push(options.series[0]);
        if (trendChart.options.legend.enabled == options.islegendDis && trendChart.options.plotOptions.line.dataLabels.enabled == options.isNumDis) {
            trendChart.setTitle({ text: options.title });
            trendChart.redraw();
        } else {
            let seriesArray = [];
            seriesArray = trendChart.series.map((item) => {
                let obj = {};
                obj.id = item.options.id;
                obj.name = item.options.name;
                obj.type = item.options.type;
                obj.data = item.options.data;
                return obj;
            });

            options.series = seriesArray;
            this.setState({
                chartOptions: options
            });
        }
    }

    /**
     * 清除图表
     */
    destroyChartHandler() {
        let chartId = this.props.chartId || 'trendChart';
        if (trendChart && trendChart.options.chart.id === chartId) {
            trendChart.destroy();
            trendChart = '';
            $('#' + chartId).html(`<div class="noResultInfo"><i class='fa fa-exclamation-triangle'></i><span>请先添加图表配置</span></div>`);
        }
    }

    /**
     * 删除数据列操作
     * @param id
     */
    removeSeriesHandler(id) {
        let series = trendChart.series;

        if (series.length === 1) {
            trendChart.destroy();
            trendChart = '';

            // 修改控件为可用
            $('#xAxisSelect', $('#reportConf')).prop('disabled', false);
            $('input[name = "islegendDis"]', $('#reportConf')).prop('disabled', false);
            $('input[name = "isNumDis"]', $('#reportConf')).prop('disabled', false);
        } else {
            trendChart.get(id).remove();
            trendChart.options.series = trendChart.options.series.filter((item) => {
                return item.id != id;
            });
        }
    }

    componentDidMount() {
        if (this.state.chartOptions) {
            this.loadTrendChartHandler(this.state.chartOptions);
        }
    }

    componentDidUpdate() {
        if (this.state.chartOptions) {
            this.loadTrendChartHandler(this.state.chartOptions);
        }
    }

    /**
     * 绘制图表
     * @returns {*}
     */
    loadTrendChartHandler(options) {
        let chartId = this.props.chartId || 'trendChart';
        trendChart = Highcharts.chart(chartId, {
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
            credits: {
                enabled: false
            },
            colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
            title: {
                text: options.title || '',
                x: -20
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: options.isNumDis || false
                    }
                },
                bar: {
                    dataLabels: {
                        enabled: options.isNumDis || false
                    }
                },
                area: {
                    dataLabels: {
                        enabled: options.isNumDis || false
                    }
                }
            },
            chart: {
                id: chartId,
                isNumDis: options.isNumDis,
                islegendDis: options.islegendDis,
                type: options.chartType || ''
            },
            tooltip: {
                enabled: true
            },
            xAxis: options.xAxis || '',
            yAxis: options.yAxis || '',
            legend: {
                enabled: options.islegendDis || false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: options.series || []
        });

        return trendChart;
    }

    render() {
        let chartId = this.props.chartId || 'trendChart';
        return (
            <div id={chartId} className={ this.props.className } style={{ maxWidth: '99%', height: '100%' }}>
                <div className="noResultInfo"><i className='fa fa-exclamation-triangle'></i><span>请先添加图表配置</span></div>
            </div>
        )
    }
}
export default TrendChart;
