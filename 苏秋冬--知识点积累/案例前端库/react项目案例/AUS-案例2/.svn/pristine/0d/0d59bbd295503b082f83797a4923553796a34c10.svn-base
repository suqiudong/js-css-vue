/**
 * baseChart组件
 * User: kerong
 * Date: 2017/5/27
 * Time: 16:00
 */
require('highcharts');

function createChart(opts) {
    $('#' + opts.id).highcharts({

        chart: {
            // 默认柱状图
            type: opts.type || 'column'
        },
        title: {
            // 表头
            text: opts.title || ''
        },
        subtitle: {
            // 二级表头
            text: opts.subtitle || ''
        },
        credits: {
            // 是否显示版权信息
            enabled: opts.credits || false
        },
        xAxis: {
            categories: opts.categories || [],
            crosshair: opts.crosshair || true
        },
        yAxis: {
            min: opts.yAxisMin || 0,
            title: {
                text: opts.yAxisTitle || ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:20px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: opts.shared || true,
            useHTML: opts.useHTML || true
        },
        plotOptions: {
            column: {
                pointPadding: opts.pointPadding || 0.2,
                borderWidth: opts.borderWidth || 0
            }
        },
        series: opts.series || []
    });
}

export default createChart;
