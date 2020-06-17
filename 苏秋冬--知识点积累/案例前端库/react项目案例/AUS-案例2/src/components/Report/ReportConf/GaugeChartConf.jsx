/**
 * 仪表图配置
 * User: gaogy
 * Date: 2016/12/26
 * Time: 16:47
 */
import React, { Component } from 'react';
import createSelect2 from 'UTIL/baseSelect2';
import createiCheck from 'UTIL/baseiCheck';
import { warning, error } from 'UTIL/notification';
import { baseValidate } from 'UTIL/baseValidate';
class GaugeChartConf extends Component {
    constructor(props) {
        super(props);
        this.loadControlHandler = this.loadControlHandler.bind(this);
        this.createChartHandler = this.createChartHandler.bind(this);
        this.refreshChartHandler = this.refreshChartHandler.bind(this);
        this.loadDetailPageHandler = this.loadDetailPageHandler.bind(this);
        this.loadUpdatePageHandler = this.loadUpdatePageHandler.bind(this);
        this.loadInitPageHandler = this.loadInitPageHandler.bind(this);
        this.minNumJudge = this.minNumJudge.bind(this);
        this.maxNumJudge = this.maxNumJudge.bind(this);
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
        createiCheck('input[ type = "radio"]', $(this.props.$parent));

        // 设置表单默认值
        // 设置表单默认值
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        $('#chartTitle', $(this.props.$parent)).val(chartConfig.title);
        $('input[name = "islegendDis"][value = "' + chartConfig.islegendDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
        $('input[name = "isNumDis"][value = "' + chartConfig.isNumDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
        $('.minNumInput', $(this.props.$parent)).val(chartConfig.min);
        $('.maxNumInput', $(this.props.$parent)).val(chartConfig.max);
        $('#gaugeFieldSelect', $(this.props.$parent)).html('<option>' + chartConfig.series[0].name + '</option>');
    }

    /**
     * 加载更新页面
     */
    loadUpdatePageHandler() {
        // 设置表单默认值
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        if (chartConfig.chartType === 'gauge') {
            $('#chartTitle', $(this.props.$parent)).val(chartConfig.title);
            $('input[name = "islegendDis"][value = "' + chartConfig.islegendDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
            $('input[name = "isNumDis"][value = "' + chartConfig.isNumDis + '"]', $(this.props.$parent)).attr('checked', 'checked');
            $('.minNumInput', $(this.props.$parent)).val(chartConfig.min);
            $('.maxNumInput', $(this.props.$parent)).val(chartConfig.max);
            $('#gaugeFieldSelect', $(this.props.$parent)).select2().val(chartConfig.series[0].name).trigger('change');
            createiCheck('input[ type = "radio"]', $(this.props.$parent));
        }
    }

    /**
     * 加载初始配置页面
     */
    loadInitPageHandler() {
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);
        if (chartConfig.chartType === 'gauge') {
            // 恢复表单初始状态
            $('#chartTitle', $(this.props.$parent)).val(chartConfig.title);
            $('input[name = "islegendDis"][value = "true"]', $(this.props.$parent)).attr('checked', 'checked');
            $('input[name = "isNumDis"][value = "true"]', $(this.props.$parent)).attr('checked', 'checked');
            $('.minNumInput', $(this.props.$parent)).val(0);
            $('.maxNumInput', $(this.props.$parent)).val(0);
            $('#gaugeFieldSelect', $(this.props.$parent)).select2().val('请选择').trigger('change');
            createiCheck('input[ type = "radio"]', $(this.props.$parent));
        }
    }

    /**
     * 渲染页面控件
     */
    loadControlHandler() {
        if (this.props.operation === `reSearch`) {
            $('#gaugeFieldSelect').html('<option>请选择</option>');
        }
        // 结果字段下拉控件配置项
        let gaugeFieldObj = {};
        let gaugeFieldArray = [];
        gaugeFieldObj.id = 'gaugeFieldSelect';

        // 结果字段下拉控件数据项
        for (let key in this.props.mqlResult.meta) {
            for (let col in this.props.mqlResult.meta[key]) {
                if (this.props.mqlResult.meta[key][col] == 'NUMBER') {
                    let dataObj = {};
                    dataObj.id = key + '.' + col;
                    dataObj.text = key + '.' + col;
                    gaugeFieldArray.push(dataObj);
                }
            }
        }

        // 无可用字段提示
        if (this.props.mqlResult.meta && gaugeFieldArray.length === 0) {
            warning('当前结果集格式不适配该图表');
        }

        gaugeFieldObj.data = gaugeFieldArray;

        // 结果字段下拉控件
        createSelect2(gaugeFieldObj);
        // bindSelectEvent(gaugeFieldObj.id, 'select2:select', this.filterResultFieldHandler);
        createiCheck('input[ type = "radio"]', $(this.props.$parent));
    }


    minNumJudge(e) {
        let selectKey = $('#gaugeFieldSelect').val().split('.')[0];
        let selectValue = $('#gaugeFieldSelect').val().split('.')[1];
        if (selectValue) {
            if ($(e.currentTarget).val().trim() == '') {
                let constraints = {
                    'minNum': {
                        presence: {
                            message: '请输入最小值 !'
                        }
                    }
                }
                baseValidate($('#minNumRange'), constraints);
            } else {
                let value = this.props.mqlResult.result.mql[selectKey][0][selectValue];
                let constraints = {
                    'minNum': {
                        presence: {
                            message: '请输入最小值 !'
                        },
                        numericality: {
                            notValid: '最小值请输入数字 !',
                            lessThanOrEqualTo: value,
                            notLessThanOrEqualTo: '最小值请重新输入 !'
                        }
                    }
                }
                baseValidate($('#minNumRange'), constraints);
            }
        }
        if ($('span.messages').find('p').length > 0) {
            let chartConf = {}
            this.props.setChartOptionHandler(chartConf);
        }
    }
    maxNumJudge(e) {
        let selectKey = $('#gaugeFieldSelect').val().split('.')[0];
        let selectValue = $('#gaugeFieldSelect').val().split('.')[1];
        if (selectValue) {
            if ($(e.currentTarget).val().trim() == '') {
                let constraints = {
                    'maxNum': {
                        presence: {
                            message: '请输入最大值 !'
                        }
                    }
                }
                baseValidate($('#maxNumRange'), constraints);
            } else {
                let value = this.props.mqlResult.result.mql[selectKey][0][selectValue];
                let constraints = {
                    'maxNum': {
                        presence: {
                            message: '请输入最大值 !'
                        },
                        numericality: {
                            notValid: '最大值请输入数字 !',
                            greaterThanOrEqualTo: value,
                            notGreaterThanOrEqualTo: '最大值请重新输入 !'
                        }
                    }
                }
                baseValidate($('#maxNumRange'), constraints);
            }
        }
        if ($('span.messages').find('p').length > 0) {
            let chartConf = {}
            this.props.setChartOptionHandler(chartConf);
        }
    }

    createChartHandler(chartOpt) {
        // 表单校验
        if (!$('#chartTitle', $(this.props.$parent)).val()) {
            warning('请输入图表标题');
            return;
        }
        if ($('#gaugeFieldSelect', $(this.props.$parent)).val() === '请选择') {
            warning('请选择标识字段');
            return;
        }

        let selectKey = $('#gaugeFieldSelect').val().split('.')[0];
        let selectValue = $('#gaugeFieldSelect').val().split('.')[1];
        if (selectValue) {
            if (this.props.mqlResult.result.mql[selectKey][0]) {
                let value = this.props.mqlResult.result.mql[selectKey][0][selectValue];
                if ($('#minNum').val().trim() == '') {
                    error('请输入最小值 !')
                    return;
                } else if (!/^-?\d+\.?\d*$/.test($('#minNum').val())) {
                    $('#minNum').css('border', '1px #dd4b39 solid');
                    error('最小值请输入数字 !');
                    return;
                } else if ($('#minNum').val() > value) {
                    $('#minNum').css('border', '1px #dd4b39 solid');
                    error('最小值输入错误，请输入根据所选标识字段取得值( ' + value + ' )以下的值。');
                    return;
                } else {
                    $('#minNum').css('border', '1px #d2d6de solid');
                }

                if ($('#maxNum').val().trim() == '') {
                    error('请输入最大值 !');
                    return;
                } else if (!/^-?\d+\.?\d*$/.test($('#maxNum').val())) {
                    $('#maxNum').css('border', '1px #dd4b39 solid');
                    error('最大值请输入数字 !');
                    return;
                } else if ($('#maxNum').val() <= value) {
                    $('#maxNum').css('border', '1px #dd4b39 solid');
                    error('最大值输入错误，请输入根据所选标识字段取得值( ' + value + ' )以上的值。');
                    return;
                } else {
                    $('#maxNum').css('border', '1px #d2d6de solid');
                }

                let localChartOpt = {};
                if (chartOpt) {
                    localChartOpt = chartOpt;
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
                localChartOpt.chartType = 'gauge';
                localChartOpt.title = $('#chartTitle', $(this.props.$parent)).val();
                localChartOpt.series = [];
                localChartOpt.series.push(this.seriesOptionsHandler($('#gaugeFieldSelect').val()));
                localChartOpt.min = parseInt($('.minNumInput').val(), 10);
                localChartOpt.max = parseInt($('.maxNumInput').val(), 10);
                localChartOpt.value = value;
                this.props.setChartOptionHandler(localChartOpt);
            } else {
                let chartConf = {}
                this.props.setChartOptionHandler(chartConf);
            }
        } else {
            warning('请选择标识字段！');
        }
    };

    /**
     * 重新刷新图表
     * @param chartOpt
     */
    refreshChartHandler() {
        let chartConfig = JSON.parse(this.props.selectedRecord.chartConfig);

        for (let i = 0; i < chartConfig.series.length; i++) {
            chartConfig.series[i] = this.seriesOptionsHandler(chartConfig.series[i].name);
        }

        this.props.setChartOptionHandler(chartConfig, true);
    }

    /**
     * 数据列配置
     * @param gaugeField
     * @param resultField
     * @returns {{}}
     */
    seriesOptionsHandler(gaugeField) {
        let seriesObj = {};
        let gaugeCol = gaugeField.split('.')[1];
        // let resultCol = resultField.split('.')[1];
        seriesObj.name = gaugeField;
        seriesObj.data = [];
        // seriesObj.resultField = resultField;
        let mqlResult = this.props.mqlResult.result.mql[gaugeField.split('.')[0]];
        for (let i = 0;i < mqlResult.length;i++) {
            let objArray = [];
            objArray.push(mqlResult[i][gaugeCol]);
            seriesObj.data.push(objArray);
        }
        return seriesObj;
    }

    render() {
        return (
            <div id="gaugeChartConf">
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
                    <div name='gaugeFieldSelect' className="form-group col-md-6">
                        <label htmlFor="gaugeFieldSelect">标识字段</label>
                        <select id="gaugeFieldSelect" className="form-control" style={{ width: '100%' }}>
                            <option>请选择</option>
                        </select>
                    </div>

                    <div name='gaugeRange' className="form-group col-md-6 row">
                        <div id='minNumRange' className="form-group range col-md-6"><span className="messages"></span>
                            <label htmlFor="minNum">最小值</label>
                            <input onBlur={this.minNumJudge} name="minNum" id="minNum" type="text" className="minNumInput form-control" />
                        </div>
                        <div id='maxNumRange' className="form-group range col-md-5">
                            <label htmlFor="maxNum">最大值</label><span className="messages"></span>
                            <input onBlur={this.maxNumJudge} name="maxNum" id="maxNum" type="text" className="maxNumInput form-control" />
                        </div>
                        <div name='addBtn' className="form-group col-md-1 addBtn">
                            <i className="fa fa-plus-circle" onClick={ this.createChartHandler } ></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default GaugeChartConf;
