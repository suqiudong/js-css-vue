/**
 * 趋势图配置
 * User: gaogy
 * Date: 2016/12/26
 * Time: 16:47
 */
import React, { Component } from 'react';
import createSelect2, { bindSelectEvent } from 'UTIL/baseSelect2';
import createiCheck from 'UTIL/baseiCheck';
import { warning } from 'UTIL/notification';
class PieChartConf extends Component {
    constructor(props) {
        super(props);
        this.loadControlHandler = this.loadControlHandler.bind(this);
        this.createChartHandler = this.createChartHandler.bind(this);
        this.refreshChartHandler = this.refreshChartHandler.bind(this);
        this.filterResultFieldHandler = this.filterResultFieldHandler.bind(this);
        this.loadDetailPageHandler = this.loadDetailPageHandler.bind(this);
        this.loadUpdatePageHandler = this.loadUpdatePageHandler.bind(this);
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
        $('input[name = "islegendDis"][value = "' + chartConfig.islegendDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
        $('input[name = "isNumDis"][value = "' + chartConfig.isNumDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
        $('#pieFieldSelect', $(this.props.$parent)).html('<option>' + chartConfig.series[0].name + '</option>');
        $('#resultFieldSelect', $(this.props.$parent)).html('<option>' + chartConfig.series[0].resultField + '</option>');
    }

    /**
     * 加载编辑页面默认值
     */
    loadUpdatePageHandler() {
        // 设置表单默认值
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        if (chartConfig.chartType === 'pie') {
            $('#chartTitle', $(this.props.$parent)).val(chartConfig.title);
            $('input[name = "islegendDis"][value = "' + chartConfig.islegendDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
            $('input[name = "isNumDis"][value = "' + chartConfig.isNumDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
            $('#pieFieldSelect', $(this.props.$parent)).select2().val(chartConfig.series[0].name).trigger('change');
            $('#resultFieldSelect', $(this.props.$parent)).select2().val(chartConfig.series[0].resultField).trigger('change');
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
        $('#pieFieldSelect', $(this.props.$parent)).select2().val('请选择').trigger('change');
        $('#resultFieldSelect', $(this.props.$parent)).select2().val('请选择').trigger('change');
        createiCheck('input[ type = "radio"]', $(this.props.$parent));
    }

    /**
     * 渲染页面控件
     */
    loadControlHandler() {
        if (this.props.operation === `reSearch`) {
            $('#pieFieldSelect').html('<option>请选择</option>');
            $('#resultFieldSelect').html('<option>请选择</option>');
        }
        // 结果字段下拉控件配置项
        let pieFieldObj = {};
        let pieFieldArray = [];
        pieFieldObj.id = 'pieFieldSelect';

        // 结果字段下拉控件数据项
        for (let key in this.props.mqlResult.meta) {
            for (let col in this.props.mqlResult.meta[key]) {
                let dataObj = {};
                dataObj.id = key + '.' + col;
                dataObj.text = key + '.' + col;
                if (typeof (this.props.mqlResult.meta[key][col]) != 'object') {
                    pieFieldArray.push(dataObj);
                }
            }
        }

        // 无可用字段提示
        if (this.props.mqlResult.meta && pieFieldArray.length === 0) {
            warning('当前结果集格式不适配该图表');
        }

        pieFieldObj.data = pieFieldArray;

        // 结果字段下拉控件
        createSelect2(pieFieldObj);
        bindSelectEvent(pieFieldObj.id, 'select2:select', this.filterResultFieldHandler);
        createiCheck('input[ type = "radio"]', $(this.props.$parent));
    }

    /**
     * 结果字段过滤事件
     * @param e
     */
    filterResultFieldHandler(e) {
        $('#resultFieldSelect').html('');
        let pieField = $('#pieFieldSelect').val().split('.')[0];

        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        if (this.props.operation != `reSearch` && chartConfig.series) {
            pieField = chartConfig.series[0].name.split('.')[0];
        }

        // 结果字段下拉控件配置项
        let resultFieldObj = {};
        let resultFieldArray = [];
        resultFieldObj.id = 'resultFieldSelect';

        // 结果字段下拉控件数据项
        for (let col in this.props.mqlResult.meta[pieField]) {
            let dataObj = {};
            dataObj.id = pieField + '.' + col;
            dataObj.text = pieField + '.' + col;

            // 结果字段为数值类型
            if (this.props.mqlResult.meta[pieField][col] === 'NUMBER') {
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
        if ($('#pieFieldSelect', $(this.props.$parent)).val() === '请选择') {
            warning('请选择标识字段');
            return;
        }
        if ($('#resultFieldSelect', $(this.props.$parent)).val() === '请选择') {
            warning('请选择结果字段');
            return;
        }

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
        localChartOpt.chartType = 'pie';
        localChartOpt.title = $('#chartTitle', $(this.props.$parent)).val();
        localChartOpt.series = [];
        localChartOpt.series.push(this.seriesOptionsHandler($('#pieFieldSelect').val(), $('#resultFieldSelect').val()));
        this.props.setChartOptionHandler(localChartOpt);
    }

    /**
     * 重新刷新图表
     * @param chartOpt
     */
    refreshChartHandler() {
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        for (let i = 0; i < chartConfig.series.length; i++) {
            chartConfig.series[i] = this.seriesOptionsHandler(chartConfig.series[i].name, chartConfig.series[i].resultField);
        }

        this.props.setChartOptionHandler(chartConfig, true);
    }

    /**
     * 数据列配置
     * @param pieField
     * @param resultField
     * @returns {{}}
     */
    seriesOptionsHandler(pieField, resultField) {
        let seriesObj = {};
        let pieCol = pieField.split('.')[1];
        let resultCol = resultField.split('.')[1];
        seriesObj.name = pieField;
        seriesObj.data = [];
        seriesObj.resultField = resultField;
        let mqlResult = this.props.mqlResult.result.mql[pieField.split('.')[0]];
        for (let i = 0;i < mqlResult.length;i++) {
            let objArray = [];
            objArray.push(mqlResult[i][pieCol]);
            objArray.push(mqlResult[i][resultCol]);
            seriesObj.data.push(objArray);
        }
        return seriesObj;
    }

    render() {
        return (
            <div id="pieChartConf">
                <div className="row">
                    <div name='chartTitle' className="form-group col-md-6">
                        <label htmlFor="chartTitle">图表标题</label>
                        <input type="text" maxLength={30} className="form-control" id="chartTitle" />
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

                    <div name='islegendDis' className="form-group col-md-3">
                        <label htmlFor="islegendDis">图例显示</label>
                        <div className="radio">
                            <label>
                                <input name="islegendDis" type="radio" value="true" />
                                &nbsp;是
                            </label>
                            <label className="ml20">
                                <input name="islegendDis" type="radio" value="false" defaultChecked />
                                &nbsp;否
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div name='pieFieldSelect' className="form-group col-md-6">
                        <label htmlFor="pieFieldSelect">标识字段</label>
                        <select id="pieFieldSelect" className="form-control" style={{ width: '100%' }}>
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
export default PieChartConf;
