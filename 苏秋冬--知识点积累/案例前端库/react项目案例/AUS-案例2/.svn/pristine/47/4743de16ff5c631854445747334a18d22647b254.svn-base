/**
 * 数值图配置
 * User: jiaomx
 * Date: 2016/1/18
 * Time: 14:47
 */
import React, { Component } from 'react';
import createSelect2, { bindSelectEvent } from 'UTIL/baseSelect2';
import createiCheck from 'UTIL/baseiCheck';
import { warning } from 'UTIL/notification';
class NumericalChartConf extends Component {
    constructor(props) {
        super(props);
        this.filterResultFieldHandler = this.filterResultFieldHandler.bind(this);
        this.seriesOptionsHandler = this.seriesOptionsHandler.bind(this);
        this.createChartHandler = this.createChartHandler.bind(this);
        this.refreshChartHandler = this.refreshChartHandler.bind(this);
        this.loadDetailPageHandler = this.loadDetailPageHandler.bind(this);
        this.axisOptionsHandler = this.axisOptionsHandler.bind(this);
        this.loadInitPageHandler = this.loadInitPageHandler.bind(this);
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
            this.filterResultFieldHandler();
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
        createiCheck('input[ type = "radio"]', $(this.props.$parent));

        // 设置表单默认值
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        $('#chartTitle', $(this.props.$parent)).val(chartConfig.title);
        $('input[name = "isUp"][value = "' + chartConfig.isUp + '"]', $(this.props.$parent)).attr('checked', 'checked');
        $('#numericalFieldSelect', $(this.props.$parent)).html('<option>' + chartConfig.series[0].name + '</option>');
        $('#resultFieldSelect', $(this.props.$parent)).html('<option>' + chartConfig.series[0].resultFieldName + '</option>');
    }

    /**
     * 加载编辑页面默认值
     */
    loadUpdatePageHandler() {
        // 设置表单默认值
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        if (chartConfig.chartType === 'metric') {
            $('#chartTitle', $(this.props.$parent)).val(chartConfig.title);
            $('input[name = "isUp"][value = "' + chartConfig.isUp + '"]', $(this.props.$parent)).attr('checked', 'checked');
            $('#numericalFieldSelect', $(this.props.$parent)).select2().val(chartConfig.series[0].name).trigger('change');
            $('#resultFieldSelect', $(this.props.$parent)).select2().val(chartConfig.series[0].resultFieldName).trigger('change');
            createiCheck('input[ type = "radio"]', $(this.props.$parent));
        }
    }

    /**
     * 加载初始配置页面
     */
    loadInitPageHandler() {
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        // 恢复表单初始状态
        $('#chartTitle', $(this.props.$parent)).val(chartConfig.title);
        $('input[name = "islegendDis"][value = "true"]', $(this.props.$parent)).attr('checked', 'checked');
        $('input[name = "isNumDis"][value = "true"]', $(this.props.$parent)).attr('checked', 'checked');
        $('#numericalFieldSelect', $(this.props.$parent)).select2().val('请选择').trigger('change');
        $('#resultFieldSelect', $(this.props.$parent)).select2().val('请选择').trigger('change');
        createiCheck('input[ type = "radio"]', $(this.props.$parent));
    }

    /**
     * 渲染页面控件
     */
    loadControlHandler() {
        if (this.props.operation === `reSearch`) {
            $('#numericalFieldSelect').html('<option>请选择</option>');
            $('#resultFieldSelect').html('<option>请选择</option>');
        }
        // 结果字段下拉控件配置项
        let numericalFieldObj = {};
        let numericalFieldArray = [];
        numericalFieldObj.id = 'numericalFieldSelect';

        // 结果字段下拉控件数据项
        for (let key in this.props.mqlResult.meta) {
            for (let col in this.props.mqlResult.meta[key]) {
                if (this.props.mqlResult.meta[key][col] == 'NUMBER' || this.props.mqlResult.meta[key][col] == 'DATE') {
                    let dataObj = {};
                    dataObj.id = key + '.' + col;
                    dataObj.text = key + '.' + col;
                    numericalFieldArray.push(dataObj);
                }
            }
        }

        // 无可用字段提示
        if (this.props.mqlResult.meta && numericalFieldArray.length === 0) {
            warning('当前结果集格式不适配该图表');
        }

        numericalFieldObj.data = numericalFieldArray;

        // 结果字段下拉控件
        createSelect2(numericalFieldObj);
        bindSelectEvent(numericalFieldObj.id, 'select2:select', this.filterResultFieldHandler);
        createiCheck('input[ type = "radio"]', $(this.props.$parent));
    }

    /**
     * 结果字段过滤事件
     * @param e
     */
    filterResultFieldHandler(e) {
        $('#resultFieldSelect').html('');
        let numericalField = $('#numericalFieldSelect').val().split('.')[0];
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        if (this.props.operation != `reSearch` && chartConfig.series) {
            numericalField = chartConfig.series[0].name.split('.')[0];
        }
        // 结果字段下拉控件配置项
        let resultFieldObj = {};
        let resultFieldArray = [];
        resultFieldObj.id = 'resultFieldSelect';

        // 结果字段下拉控件数据项
        for (let col in this.props.mqlResult.meta[numericalField]) {
            let dataObj = {};
            dataObj.id = numericalField + '.' + col;
            dataObj.text = numericalField + '.' + col;

            // 结果字段为数值类型
            if (this.props.mqlResult.meta[numericalField][col] === 'NUMBER') {
                resultFieldArray.push(dataObj);
            }
        }

        resultFieldArray.push({id: '请选择', text: '请选择', selected: 'selected'});
        resultFieldObj.data = resultFieldArray;
        // 结果字段下拉控件
        createSelect2(resultFieldObj);
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
        if ($('#numericalFieldSelect', $(this.props.$parent)).val() === '请选择') {
            warning('请选择标识字段');
            return;
        }
        if ($('#resultFieldSelect', $(this.props.$parent)).val() === '请选择') {
            warning('请选择结果字段');
            return;
        }

        // 获取是否显示数值radio值
        if ($('input[name = "isUp"]:checked', $(this.props.$parent)).val() === 'true') {
            localChartOpt.isUp = true;
        } else if ($('input[name = "isUp"]:checked', $(this.props.$parent)).val() === 'false') {
            localChartOpt.isUp = false;
        }
        localChartOpt.chartType = 'numerical';
        localChartOpt.title = $('#chartTitle', $(this.props.$parent)).val();
        localChartOpt.xAxis = this.axisOptionsHandler($('#numericalFieldSelect').val(), localChartOpt.isUp);
        localChartOpt.series = [];
        localChartOpt.series.push(this.seriesOptionsHandler(localChartOpt.xAxis, $('#numericalFieldSelect').val(), $('#resultFieldSelect').val()));
        localChartOpt.yMax = localChartOpt.isUp ? localChartOpt.series[0].data[localChartOpt.series[0].data.length - 1] : localChartOpt.series[0].data[0];
        this.props.setChartOptionHandler(localChartOpt);
    }

    axisOptionsHandler(axis, isUp) {
        let axisObj = [];
        let resultName = axis.split('.')[0];
        let colName = axis.split('.')[1];
        axisObj = this.props.mqlResult.result.mql[resultName].map((item) => item[colName]);
        function sequence1(a, b) {
            return b - a;
        }
        function sequence2(a, b) {
            return a - b;
        }
        if (!isUp) {
            axisObj = axisObj.sort(sequence1);
        } else {
            axisObj = axisObj.sort(sequence2);
        }
        return axisObj;
    }

    /**
     * 重新刷新图表
     * @param chartOpt
     */
    refreshChartHandler() {
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        for (let i = 0; i < chartConfig.series.length; i++) {
            chartConfig.series[i] = this.seriesOptionsHandler(chartConfig.xAxis, $('#numericalFieldSelect', $(this.props.$parent)).val(), chartConfig.series[i].resultFieldName);
        }

        this.props.setChartOptionHandler(chartConfig, true);
    }

    /**
     * 数据列配置
     * @param resultField
     * @returns {{}}
     */
    seriesOptionsHandler(newXAxis, xAxis, yAxis) {
        let seriesObj = {};
        let x = xAxis.split('.')[1];
        let y = yAxis.split('.')[1];
        seriesObj.name = yAxis;
        let data = [];
        seriesObj.resultFieldName = yAxis;
        let mqlResult = this.props.mqlResult.result.mql[xAxis.split('.')[0]];
        for (let i = 0;i < mqlResult.length;i++) {
            let objArray = [];
            objArray.push(mqlResult[i][x]);
            objArray.push(mqlResult[i][y]);
            data.push(objArray);
        }
        let reArr = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (newXAxis[i] == data[j][0]) {
                    reArr.push(data[j][1])
                }
            }
        }
        seriesObj.data = reArr;
        return seriesObj;
    }

    render() {
        return (
            <div id="numericalChartConf">
                <div className="row">
                    <div name='chartTitle' className="form-group col-md-6">
                        <label htmlFor="chartTitle">图表标题</label>
                        <input type="text" maxLength={30} className="form-control" id="chartTitle"/>
                    </div>

                    <div name='isUp' className="form-group col-md-3">
                        <label htmlFor="isUp">排序</label>

                        <div className="radio">
                            <label>
                                <input name="isUp" className="mr5" type="radio" value="true" defaultChecked/>
                                &nbsp;升序
                            </label>
                            <label className="ml20">
                                <input name="isUp" type="radio" value="false"/>
                                &nbsp;降序
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div name='numericalFieldSelect' className="form-group col-md-6">
                        <label htmlFor="numericalFieldSelect">标识字段</label>
                        <select id="numericalFieldSelect" className="form-control" style={{ width: '100%' }}>
                            <option>请选择</option>
                        </select>
                    </div>

                    <div name='resultFieldSelect' className="form-group col-md-5">
                        <label htmlFor="resultFieldSelect">结果字段</label>
                        <select id="resultFieldSelect" className="form-control" style={{ width: '100%' }}>
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
export default NumericalChartConf;
