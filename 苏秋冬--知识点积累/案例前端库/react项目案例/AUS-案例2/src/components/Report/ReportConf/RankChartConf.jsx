/**
 * 趋势图配置
 * User: gaogy
 * Date: 2016/12/26
 * Time: 16:47
 */
import React, { Component } from 'react';
import createSelect2 from 'UTIL/baseSelect2';
import createiCheck from 'UTIL/baseiCheck';
import { warning } from 'UTIL/notification';
class RankChartConf extends Component {
    constructor(props) {
        super(props);
        this.loadControlHandler = this.loadControlHandler.bind(this);
        this.loadDetailPageHandler = this.loadDetailPageHandler.bind(this);
        this.loadUpdatePageHandler = this.loadUpdatePageHandler.bind(this);
        this.createChartHandler = this.createChartHandler.bind(this);
        this.refreshChartHandler = this.refreshChartHandler.bind(this);
        this.loadInitPageHandler = this.loadInitPageHandler.bind(this);
        this.compare = this.compare.bind(this);
    }

    componentDidMount() {
        if (this.props.operation === `reportDetail` || this.props.operation === `reportAnalysis`) {
            this.loadDetailPageHandler();
        } else if (this.props.operation === `reportUpdate`) {
            this.loadControlHandler();
            this.loadUpdatePageHandler();
        } else if (this.props.operation === `reSearch`) {
            this.loadControlHandler();
            this.loadInitPageHandler();
        } else {
            this.loadControlHandler();
        }
    }

    componentDidUpdate() {
        if (this.props.operation === `reportDetail` || this.props.operation === `reportAnalysis`) {
            this.loadDetailPageHandler();
        } else if (this.props.operation === `reportUpdate`) {
            this.loadControlHandler();
            this.loadUpdatePageHandler();
        } else if (this.props.operation === `reSearch`) {
            this.loadControlHandler();
            this.loadInitPageHandler();
        } else {
            this.loadControlHandler();
        }
    }

    /**
     * 加载详细页面
     */
    loadDetailPageHandler() {

        // 设置表单不可用
        $('input', $(this.props.$parent)).prop('disabled', true);
        $('select', $(this.props.$parent)).prop('disabled', true);
        $('div[name = "addBtn"]').addClass('hide');

        // 设置表单默认值
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        $('#chartTitle', $(this.props.$parent)).val(chartConfig.title);
        $('input[name = "islegendDis"][value = "' + chartConfig.islegendDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
        $('input[name = "isNumDis"][value = "' + chartConfig.isNumDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
        $('#xAxisSelect', $(this.props.$parent)).html('<option>' + chartConfig.xAxis[0].name + '</option>');
        $('#yAxisSelect', $(this.props.$parent)).html('<option>' + chartConfig.yAxis[0].name + '</option>');
        createiCheck('input[ type = "radio"]', $(this.props.$parent));
    }

    /**
     * 加载更新页面
     */
    loadUpdatePageHandler() {
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);

        // 设置表单不可用
        if (chartConfig.chartType === 'bar') {
            createiCheck('input[ type = "radio"]');

            // 设置表单默认值
            $('#chartTitle', $(this.props.$parent)).val(chartConfig.title);
            $('input[name = "islegendDis"][value = "' + chartConfig.islegendDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
            $('input[name = "isNumDis"][value = "' + chartConfig.isNumDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
            $('#xAxisSelect', $(this.props.$parent)).select2().val(chartConfig.xAxis[0].name).trigger('change');
            $('#yAxisSelect', $(this.props.$parent)).select2().val(chartConfig.yAxis[0].name).trigger('change');
        }
    }

    /**
     * 加载初始配置页面
     */
    loadInitPageHandler() {
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        // 设置表单可用
        createiCheck('input[ type = "radio"]');

        // 恢复表单初始状态
        $('#chartTitle', $(this.props.$parent)).val(chartConfig.title);
        $('#trendTypeSelect', $(this.props.$parent)).select2().val(chartConfig.chartType).trigger('change');
        $('input[name = "islegendDis"][value = "true"]', $(this.props.$parent)).attr('checked', 'checked');
        $('input[name = "isNumDis"][value = "true"]', $(this.props.$parent)).attr('checked', 'checked');
        $('#xAxisSelect', $(this.props.$parent)).select2().val('请选择').trigger('change');
        $('#yAxisSelect', $(this.props.$parent)).select2().val('请选择').trigger('change');
    }

    /**
     * 渲染页面控件
     */
    loadControlHandler() {
        if (this.props.operation === `reSearch`) {
            $('#xAxisSelect').html('<option>请选择</option>');
            $('#yAxisSelect').html('<option>请选择</option>');
        }
        // 构造X、Y轴下拉控件配置项
        let xAxisObj = {};
        let yAxisObj = {};
        let xAxisArray = [];
        let yAxisArray = [];
        xAxisObj.id = 'xAxisSelect';
        yAxisObj.id = 'yAxisSelect';

        // 构造X、Y轴下拉控件数据项
        for (let key in this.props.mqlResult.meta) {
            for (let col in this.props.mqlResult.meta[key]) {
                let dataObj = {};
                dataObj.id = key + '.' + col;
                dataObj.text = key + '.' + col;
                if (typeof (this.props.mqlResult.meta[key][col]) != 'object') {
                    xAxisArray.push(dataObj);
                }

                // 结果字段为数值类型
                if (this.props.mqlResult.meta[key][col] === 'NUMBER') {
                    yAxisArray.push(dataObj);
                }
            }
        }

        // 无可用字段提示
        if (this.props.mqlResult.meta && xAxisArray.length === 0) {
            warning('当前结果集格式不适配该图表');
        }

        xAxisObj.data = xAxisArray;
        yAxisObj.data = yAxisArray;

        // 渲染X、Y轴、结果字段下拉控件
        createSelect2(xAxisObj);
        createSelect2(yAxisObj);
        // 渲染checkBox
        createiCheck('input[ type = "radio"]');
    }

    /**
     * 创建图表事件
     */
    createChartHandler(chartOpt) {
        let localChartOpt = {};
        if (chartOpt) {
            localChartOpt = chartOpt;
        }

        // 表单校验
        if (!$('#chartTitle', $(this.props.$parent)).val()) {
            warning('请输入图表标题');
            return;
        }
        if ($('#xAxisSelect', $(this.props.$parent)).val() === '请选择') {
            warning('请选择X轴字段');
            return;
        }
        if ($('#yAxisSelect', $(this.props.$parent)).val() === '请选择') {
            warning('请选择Y轴字段');
            return;
        }

        // 加载iCheck
        createiCheck('input[ type = "radio"]');

        // 生成记录标签
        let tagOpt = {};
        tagOpt.id = new Date().getTime();
        tagOpt.desc = `展现方式：排行图  Y轴字段：${ $('#yAxisSelect', $(this.props.$parent)).val() }`;
        // this.props.addTagDataHandler(tagOpt);

        // 构造图表配置项
        localChartOpt.title = $('#chartTitle', $(this.props.$parent)).val();
        localChartOpt.chartType = 'bar';

        // 获取是否显示图例radio值
        if ($('input[name = "islegendDis"]:checked', $(this.props.$parent)).val() === 'true') {
            localChartOpt.islegendDis = true;
        } else if ($('input[name = "islegendDis"]:checked', $(this.props.$parent)).val() === 'false') {
            localChartOpt.islegendDis = false;
        }

        // 获取是否显示数值radio值
        if ($('input[name = "isNumDis"]:checked', $(this.props.$parent)).val() === 'true') {
            localChartOpt.isNumDis = true;
        } else if ($('input[name = "isNumDis"]:checked', $(this.props.$parent)).val() === 'false') {
            localChartOpt.isNumDis = false;
        }

        localChartOpt.xAxis = this.axisOptionsHandler($('#xAxisSelect', $(this.props.$parent)).val());
        localChartOpt.yAxis = this.axisOptionsHandler($('#yAxisSelect', $(this.props.$parent)).val());
        localChartOpt.series = [];
        localChartOpt.series.push(this.seriesOptionsHandler(tagOpt.id, $('#yAxisSelect', $(this.props.$parent)).val()));

        this.props.setChartOptionHandler(localChartOpt, true);
    }

    /**
     * 重新刷新图表
     * @param chartOpt
     */
    refreshChartHandler() {
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        chartConfig.xAxis = this.axisOptionsHandler($('#xAxisSelect', $(this.props.$parent)).val());
        chartConfig.yAxis = this.axisOptionsHandler($('#yAxisSelect', $(this.props.$parent)).val());
        for (let i = 0; i < chartConfig.series.length; i++) {
            let resultName = chartConfig.series[i].name.split('.')[0];
            let colName = chartConfig.series[i].name.split('.')[1];
            chartConfig.series[i].data = this.props.mqlResult.result.mql[resultName].map((item) => item[colName]);
        }

        this.props.setChartOptionHandler(chartConfig, true);
    }

    /**
     * 构造坐标配置
     * @param axis
     * @returns {{}}
     */

    compare(property) {
        return function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;
        }
    }
    axisOptionsHandler(axis) {
        let axisObj = {};
        let resultName = axis.split('.')[0];
        let colName = axis.split('.')[1];
        axisObj.name = axis;
        let colType = this.props.mqlResult.meta[resultName][colName];
        let a = $('#yAxisSelect').val().split('.')[1];
        if (colType == 'STRING') {
            var sortData = this.props.mqlResult.result.mql[resultName].sort(this.compare(a));
            axisObj.type = 'category';
            axisObj.categories = sortData.map((item) => item[colName]);
        } else if (colType == 'NUMBER') {
            axisObj.type = 'liner';
        } else if (colType == 'DATE') {
            axisObj.type = 'datetime';
        }

        return axisObj;
    }

    /**
     * 构造数据列配置
     * @param id
     * @param yAxis
     * @returns {{}}
     */
    seriesOptionsHandler(id, yAxis) {
        let seriesObj = {};
        let resultName = yAxis.split('.')[0];
        let colName = yAxis.split('.')[1];
        seriesObj.id = 'series_' + id;
        seriesObj.name = yAxis;
        seriesObj.type = 'bar';
        seriesObj.data = this.props.mqlResult.result.mql[resultName].map((item) => item[colName]);
        function sequence(a, b) {return b - a;}
        seriesObj.data = seriesObj.data.sort(sequence);
        return seriesObj;
    }

    render() {
        return (
            <div id="trendChartConf">
                <div className="row">
                    <div name='chartTitle' className="form-group col-md-6">
                        <label htmlFor="chartTitle">图表标题</label>
                        <input type="text" maxLength={30} className="form-control" id="chartTitle" />
                    </div>
                    <div name='islegendDis' className="form-group col-md-3">
                        <label htmlFor="islegendDis">图例显示</label>
                        <div className="radio">
                            <label>
                                <input name="islegendDis" type="radio" value="true" defaultChecked />
                                &nbsp;是
                            </label>
                            <label className="ml20">
                                <input name="islegendDis" type="radio" value="false" />
                                &nbsp;否
                            </label>
                        </div>
                    </div>
                    <div name='isNumDis' className="form-group col-md-3">
                        <label htmlFor="isNumDis">数值显示</label>
                        <div className="radio">
                            <label>
                                <input name="isNumDis" className="mr5" type="radio" value="true" defaultChecked />
                                &nbsp;是
                            </label>
                            <label className="ml20">
                                <input name="isNumDis" type="radio" value="false" />
                                &nbsp;否
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div name='xAxis' className="form-group col-md-6">
                        <label htmlFor="xAxisSelect">X轴字段</label>
                        <select id="xAxisSelect" className="form-control" style={{ width: '100%' }}>
                            <option>请选择</option>
                        </select>
                    </div>
                    <div name='yAxis' className="form-group col-md-5">
                        <label htmlFor="yAxisSelect">Y轴字段</label>
                        <select id="yAxisSelect" className="form-control" style={{ width: '100%' }}>
                            <option>请选择</option>
                        </select>
                    </div>
                    <div name='addBtn' className="form-group col-md-1 addBtn">
                        <i className="fa fa-plus-circle" onClick={ this.createChartHandler } ></i>
                    </div>
                </div>
            </div>
        )
    }
}
export default RankChartConf;
