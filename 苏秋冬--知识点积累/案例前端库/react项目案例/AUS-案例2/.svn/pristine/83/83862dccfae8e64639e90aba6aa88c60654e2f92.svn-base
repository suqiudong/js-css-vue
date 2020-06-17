/**
 * Sortable工具类
 * User: gaogy
 * Date: 2017/1/4
 * Time: 14:12
 */
require('highcharts');

function createSortable(options) {
    // 绑定排序插件
    $(options.selector).sortable({
        connectWith: options.connectWith || '',
        handle: options.handle || '',
        forcePlaceholderSize: options.forcePlaceholderSize || true,
        zIndex: options.zIndex || 999999,
        revert: options.revert || true
    });
    $(options.handle).css('cursor', 'move');

    // 绑定缩放插件
    $(options.connectWith).resizable({
        ghost: true,
        stop: function(event, ui) {
            let trendChartReportId = $(ui.element[0]).find('div.chartReport').attr('id');
            $('#' + trendChartReportId).highcharts().reflow();
        }
    });
}
export default createSortable;
