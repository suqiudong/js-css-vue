/**
 * 数值图组件
 * User: jiaomx
 * Date: 2017/1/17
 * Time: 16:14
 */
import React, { Component } from 'react';
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

// 定义数值图对象
let numericalChart;
let lastValue;
let diffValue;
class NumericalChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartOptions: this.props.chartOptions
        };
        this.loadNumericalChartHandler = this.loadNumericalChartHandler.bind(this);
        this.getChartOptionsHandler = this.getChartOptionsHandler.bind(this);
        this.setChartOptionsHandler = this.setChartOptionsHandler.bind(this);
        this.destroyChartHandler = this.destroyChartHandler.bind(this);
    }

    componentDidMount() {
        if (this.state.chartOptions) {
            this.loadNumericalChartHandler(this.state.chartOptions);
        }
    }

    componentDidUpdate() {
        if (this.state.chartOptions) {
            this.loadNumericalChartHandler(this.state.chartOptions);
        }
    }

    /**
     * 清除图表
     */
    destroyChartHandler() {
        let chartId = this.props.chartId || 'NumericalChart';
        if (numericalChart && numericalChart.options.chart.id === chartId) {
            numericalChart.destroy();
            numericalChart = '';
            $('#' + chartId).html(`<div class="noResultInfo"><i class='fa fa-exclamation-triangle'></i><span>请先添加图表配置</span></div>`);
        }
    }

    /**
     * 设置图表配置
     * @param options
     */
    setChartOptionsHandler(options) {
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
        if (numericalChart) {
            options.title = numericalChart.options.title.text;
            options.series = numericalChart.options.series;
            options.chartType = 'metric';
            options.xAxis = numericalChart.options.xAxis[0].categories;
            options.yMax = (numericalChart.options.yAxis[0].max) / 4;
            options.isUp = numericalChart.options.chart.isUp;
        }
        return options;
    }

    onChartLoad() {
        let centerX = this.chartWidth / 5;
        let centerY = 110;
        let fontSize = 70;
        if (this.chartWidth < 530) {
            fontSize = 20
        }
        // Big 5
        let big5 = this.renderer.text(lastValue).attr({zIndex: 6}).css({color: '#000', fontSize: fontSize + 'px'}).add();
        big5.attr({x: centerX, y: centerY + 50});
        // Draw the label
        let label = this.renderer.text(diffValue).attr({zIndex: 6}).css({fontSize: fontSize * 0.5 + 'px'}).add();
        let left = centerX + big5.getBBox().width;
        label.attr({x: left, y: centerY + 50});
        // Draw the arrow
        let upORdowm, color;
        if (label.textStr > 0) {
            upORdowm = '↗';
            color = 'red';
            label.css({color: 'red'});
        } else {
            color = 'green';
            upORdowm = '↘';
            label.css({color: 'green'});
        }
        let arrow = this.renderer.text(upORdowm).attr({zIndex: 6}).css({
            color: color,
            fontSize: fontSize * 0.7 + 'px',
            fontWeight: 'bolder'
        }).add();
        let arrowX = centerX + big5.getBBox().width;
        let arrowY = centerY - label.getBBox().height / 2 + 50;
        arrow.attr({x: arrowX, y: arrowY});
    }

    // 对数据进行排序
    xAxisValue(options) {
        let arr = [];
        for (let i = 0; i < options.series[0].data.length; i++) {
            arr.push(options.series[0].data[i][0]);
        }
        if (!options.isUp) {
            arr.sort().reverse();
        } else {
            arr.sort();
        }
        return arr;
    }

    // 减法浮点型bug
    accSub(arg1, arg2) {
        let r1, r2, m, n;
        try {
            r1 = arg1.toString().split('.')[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }

    /**
     * 绘制图表
     * @returns {*}
     */
    loadNumericalChartHandler(options) {
        if (options.series[0].data.length > 0 && options.series[0].data[options.series[0].data.length - 1] && options.series[0].data[options.series[0].data.length - 2]) {
            lastValue = options.series[0].data[options.series[0].data.length - 1].toExponential(2);
            diffValue = this.accSub(options.series[0].data[options.series[0].data.length - 1], options.series[0].data[options.series[0].data.length - 2]);
        } else {
            lastValue = 0;
            diffValue = 0;
        }

        let chartId = this.props.chartId || 'NumericalChart';
        numericalChart = Highcharts.chart(chartId, {
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
                numericSymbols: ['千', '兆', 'G', 'T', 'P', 'E'],
                printChart: '打印图表',
                resetZoom: '恢复缩放',
                resetZoomTitle: '恢复图表',
                shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                thousandsSep: ',',
                weekdays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
            },
            credits: {
                enabled: false
            },
            chart: {
                id: chartId,
                type: 'areaspline',
                events: {
                    load: this.onChartLoad
                },
                isUp: options.isUp
            },
            xAxis: {
                categories: options.xAxis,
                labels: {
                    enabled: false
                },
                tickWidth: 0
            },
            title: {
                text: options.title || ''
            },
            yAxis: {
                title: {
                    text: ''
                },
                gridLineWidth: false,
                max: options.yMax * 4,
                labels: {
                    enabled: false
                }
            },
            series: [{
                name: options.series[0].name || '',
                resultFieldName: options.series[0].resultFieldName || '',
                id: 'revenue',
                data: options.series[0].data || [],
                marker: {
                    enabled: false
                }
            }]
        });
        return numericalChart;
    }

    render() {
        let chartId = this.props.chartId || 'NumericalChart';
        return (
            <div id={chartId} className={ this.props.className }
                 style={{ maxWidth: '50%', height: '100%', margin: 'auto'}}>
                <div className="noResultInfo"><i className='fa fa-exclamation-triangle'></i><span>请先添加图表配置</span></div>
            </div>
        )
    }
}
export default NumericalChart;
