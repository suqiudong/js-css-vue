/**
 *作业添加组件
 * User: jiaomx
 * Date: 2017/02/124
 * Time: 15:44
 */
import React, { Component } from 'react';
import DateRangePicker from 'COMPONENT/Common/DateRangePicker/DateRangePicker';
import { baseValidate, showErrorMessage} from 'UTIL/baseValidate';
import createSelect2, { bindSelectEvent } from 'UTIL/baseSelect2';
import base from 'UTIL/base64';
import moment from 'moment';

let clear = false;
class JobUpdate extends Component {
	constructor(props) {
        super(props);
        this.radioChecked = this.radioChecked.bind(this);
        this.filterSelect = this.filterSelect.bind(this);
        this.loadControlHandler = this.loadControlHandler.bind(this);
        this.createConfigInfor = this.createConfigInfor.bind(this);
        this.saveAndOnlineHandler = this.saveAndOnlineHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.returnHandler = this.returnHandler.bind(this);
        this.validation = this.validation.bind(this);
    }

    componentWillMount() {

        // 读取作业信息
        // let jobName = this.props.jobManage.selectJobDate.jobName;
        let jobName = this.props.params.jobName;
        this.props.readJobinfor(jobName);
        // 读取插件列表数据
        this.props.readPluginList();
        let jobInfor = this.props.jobManage.jobInfor.result.detail;
        this.props.radio(jobInfor.scheduleStrategy);
        this.props.configs(jobInfor.specialProps);
        this.props.dataSetsName();

    }
    componentWillUpdate() {
    }

    componentDidUpdate() {
        // 创建数据集数据
        let jobInfor = this.props.jobManage.jobInfor.result.detail;
        for (let j = 0; j < jobInfor.specialProps.length; j++) {
            if (jobInfor.specialProps[j].propType == 'SELECT_AUS_DATASETS') {
                let dataSets = this.props.jobManage.dataSetsName.result.data;
                $('#datasets').html('');
                let dataSetsNames = [];
                let dataSetsObj = {};
                // dataSetsObj.id = 'datasets';
                dataSetsObj.id = 'datasets_' + base.encode(jobInfor.specialProps[j].key);
                for (let i = 0; i < dataSets.length; i++) {
                    dataSetsNames.push(dataSets[i].datasetName)
                }
                dataSetsObj.data = dataSetsNames;
                createSelect2(dataSetsObj);
                $('#' + dataSetsObj.id).select2().val(jobInfor.specialProps[j].value).trigger('change'); // 选中
                // $('#datasets').select2().val(jobInfor.specialProps[j].value).trigger('change'); // 选中
            }
        }

        let lastTiem = new Date(jobInfor.endTriggerTime != undefined ? jobInfor.endTriggerTime : jobInfor.startTriggerTime).getTime();

        if (this.props.jobManage.config.length == 0 || (lastTiem < new Date().getTime() && jobInfor.misfireStrategy == 'DO_NOTHING')) {
            this.refs.save.disabled = true;
            this.refs.online.disabled = true;
        } else {
            this.refs.save.disabled = false;
            this.refs.online.disabled = false;
        }

    }
    componentDidMount() {
        this.loadControlHandler();
    }

    componentWillUnmount() {
        clear = false;
    }

    // 设置周期radio选择
    radioChecked() {
        let radioType = $("input[name='radio']:checked").val();
        this.props.radio(radioType);
    }

    // 加载页面select
    loadControlHandler() {
        let misfireStrategyObj = {};
        misfireStrategyObj.id = 'misfireStrategy';
        misfireStrategyObj.data = [{id: 'DO_NOTHING', text: '错过不执行'}, {id: 'FIRE_ONCE_NOW', text: '错过执行一次'}, {id: 'FIRE_ALL_MISSED', text: '错过执行所有'}];
        createSelect2(misfireStrategyObj);
        bindSelectEvent(misfireStrategyObj.id, 'select2:select', this.misfireStrategy.bind(this));

        let pluginNameObj = {};
        let pluginNameArr = [];
        let pluginList = this.props.jobManage.pluginList.result.data;
        // if (pluginList.length == 0) {
        //     // pluginList.push()
        // }
        pluginNameObj.id = 'pluginName';
        for (let i = 0; i < pluginList.length; i++) {
            let obj = {}
            obj.id = pluginList[i].pluginName;
            obj.text = pluginList[i].pluginName;
            pluginNameArr.push(obj);
        }
        pluginNameObj.data = pluginNameArr;
        createSelect2(pluginNameObj)
        bindSelectEvent(pluginNameObj.id, 'select2:select', this.filterSelect);

        let jobInfor = this.props.jobManage.jobInfor.result.detail;

        $('#scheduleStrategy input[value=' + jobInfor.scheduleStrategy + ']').attr('checked', true);
        $('#misfireStrategy').select2().val(jobInfor.misfireStrategy).trigger('change'); // 选中
        $('#pluginName').select2().val(jobInfor.pluginName).trigger('change'); // 选中
        let pluginName = jobInfor.pluginName;
        let collectorObj = {};
        let collectorArr = [];
        let collectors;
        collectorObj.id = 'collectorName';
        // let pluginList = this.props.jobManage.pluginList.result.data;
        for (let i = 0; i < pluginList.length; i++) {
            if (pluginList[i].pluginName == pluginName && pluginList[i].collectors) {
                collectors = pluginList[i].collectors;
                for (let j = 0; j < collectors.length; j++) {
                    let obj = {};
                    obj.id = collectors[j].collectorName;
                    obj.text = collectors[j].collectorName;
                    collectorArr.push(obj);
                }
            }
        }
        collectorObj.data = collectorArr;
        createSelect2(collectorObj);
        bindSelectEvent(collectorObj.id, 'select2:select', this.createConfigInfor);
        $('#collectorName').select2().val(jobInfor.collectorName).trigger('change'); // 选中
        this.refs.doneOffset.value = jobInfor.doneOffset;
    }

    // 保存上线按钮状态设置
    misfireStrategy() {
        var _this = this;
        let selectVail = $('#misfireStrategy').val();
        let time = $('#dateRange').val().indexOf(' - ') > -1 ? $('#dateRange').val().split(' - ')[1] : $('#dateRange').val();
        if (selectVail == 'DO_NOTHING' && new Date().getTime() > new Date(time).getTime()) {
            _this.refs.save.disabled = true;
            _this.refs.online.disabled = true;
        } else {
            _this.refs.save.disabled = false;
            _this.refs.online.disabled = false;
        }
    }

    // 过滤插件对应的选择器
    filterSelect() {
        clear = true;
        // 去掉验证框
        let selectVail = $('.selectVail');
        for (let i = 0; i < selectVail.length; i++) {
            $(selectVail[i]).siblings().find('.select2-selection').css({'borderColor': '#d2d6de'});
            if (i == 0) {
                $(selectVail[i]).siblings('.input-name').find('span').text('');
            } else {
                $(selectVail[i]).siblings('.input-name').find('span').text('');
            }
        }
        
        $('#datasets').html('');
        let config = [];
        this.props.configs(config);
        $('#collectorName').html('<option value="请选择">请选择</option>');
        let pluginName = $('#pluginName option:selected').text();
        let collectorObj = {};
        let collectorArr = [];
        let collectors;
        collectorObj.id = 'collectorName';
        let pluginList = this.props.jobManage.pluginList.result.data;
        for (let i = 0; i < pluginList.length; i++) {
            if (pluginList[i].pluginName == pluginName && pluginList[i].collectors) {
                collectors = pluginList[i].collectors;
                for (let j = 0; j < collectors.length; j++) {
                    let obj = {}
                    obj.id = collectors[j].collectorName;
                    obj.text = collectors[j].collectorName;
                    collectorArr.push(obj);
                }
            }
        }
        collectorObj.data = collectorArr;
        createSelect2(collectorObj);
        bindSelectEvent(collectorObj.id, 'select2:select', this.createConfigInfor);
    }

    // 显示采集器信息
    createConfigInfor() {
        clear = true;
        $('#datasets').html('');
        let config = [];
        this.props.configs(config);
        let pluginName = $('#pluginName option:selected').text();
        let collectorName = $('#collectorName option:selected').text();
        let pluginList = this.props.jobManage.pluginList.result.data;
        for (let i = 0; i < pluginList.length; i++) {
            if (pluginList[i].pluginName == pluginName && pluginList[i].collectors) {
                let collectors = pluginList[i].collectors;
                for (let j = 0; j < collectors.length; j++) {
                    if (collectors[j].collectorName == collectorName && collectors[j].collectorName) {
                        this.props.configs(collectors[j].props);
                    } else if (collectorName == '请选择') {
                        $('#datasets').html('');
                        let config = [];
                        this.props.configs(config);
                    }
                }
            }
            
        }
        // 创建数据集数据
        for (let j = 0; j < this.props.jobManage.config.length; j++) {
            if (this.props.jobManage.config[j].propType == 'SELECT_AUS_DATASETS') {
                $('#datasets').html('');
                this.props.dataSetsName();
                let dataSets = this.props.jobManage.dataSetsName.result.data;
                let dataSetsNames = [];
                let dataSetsObj = {};
                dataSetsObj.id = 'datasets_' + base.encode(this.props.jobManage.config[j].key);
                for (let i = 0; i < dataSets.length; i++) {
                    dataSetsNames.push(dataSets[i].datasetName)
                }
                dataSetsObj.data = dataSetsNames;
                createSelect2(dataSetsObj);
            }
        }

        let jobInfor = this.props.jobManage.jobInfor.result.detail;
        for (let i = 0; i < jobInfor.specialProps.length; i++) {
            if (jobInfor.specialProps[i].propType == 'TEXT' && $('#collectorName option:selected').text() != '请选择') {
                this.refs['sel_' + [i]].value == '';
            }
        }
    }

    jobInfor() {
        let owner = sessionStorage.getItem('XDataUserName');
        let jobInfor = {};
        jobInfor.jobName = this.refs.jobName.value;
        jobInfor.owner = owner;
        // jobInfor.description = $('#description').text();
        jobInfor.description = document.getElementById('description').innerText;
        jobInfor.pluginName = $('#pluginName option:selected').text();
        jobInfor.collectorName = $('#collectorName option:selected').text();

        let data = this.props.jobManage.pluginList.result.data;
        jobInfor.specialProps = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].pluginName == jobInfor.pluginName) {
                jobInfor.jarName = data[i].jarName;
                let collectors = data[i].collectors;
                for (let j = 0; j < collectors.length; j++) {
                    if (collectors[j].collectorName == jobInfor.collectorName) {
                        jobInfor.clazzName = collectors[j].clazzName;
                        jobInfor.specialProps = collectors[j].props;
                    }
                }
            }
        }
        jobInfor.scheduleStrategy = $("input[name='radio']:checked").val();
        jobInfor.misfireStrategy = $('#misfireStrategy').val();
        for (let i = 0; i < jobInfor.specialProps.length; i++) {
            if (jobInfor.specialProps[i].propType == 'TEXTAREA') {
                jobInfor.specialProps[i].value = document.getElementById('textarea_' + base.encode(jobInfor.specialProps[i].key)).innerText;
                // jobInfor.specialProps[i].value = $('#textarea_' + base.encode(jobInfor.specialProps[i].key)).text();
            } else if (jobInfor.specialProps[i].propType == 'SELECT_AUS_DATASETS') {
                jobInfor.specialProps[i].value = $('#datasets_' + base.encode(jobInfor.specialProps[i].key)).val();
            } else if (jobInfor.specialProps[i].propType == 'DATETIME') {
                jobInfor.specialProps[i].value = $('#datatime_' + base.encode(jobInfor.specialProps[i].key)).val();
            } else {
                jobInfor.specialProps[i].value = this.refs['sel_' + [i]].value;
            }
        }
        jobInfor.doneOffset = this.refs.doneOffset.value;
        if (jobInfor.scheduleStrategy == 'CYCLE') {
            jobInfor.cronExpression = this.refs.cronExpression.value;
            jobInfor.startTriggerTime = this.refs.daterangePicker.getStartTime();
            jobInfor.endTriggerTime = this.refs.daterangePicker.getEndTime();
        } else {
            jobInfor.startTriggerTime = this.refs.daterangePicker.getOnceTime();
        }
        return jobInfor;
    }

     // 验证
    validation() {
        let constraints = {
            doneOffset: {
                presence: {
                    message: '下次作业接入开始位置不能为空！'
                }
            }

        };

        // 周期的时候添加表达式非空验证
        if (this.props.jobManage.radioType == 'CYCLE') {
            constraints.cronExpression = {
                presence: {
                    message: '调度表达式不能为空！'
                }
            }
        };

        // 验证插件和采集器是否为空
        // console.log($('.selectVail'));
        let selectVail = $('.selectVail');
        let selectFlag;
        for (let i = 0; i < selectVail.length; i++) {
            if (!$(selectVail[i]).val() && $(selectVail[i]).val() != '请选择') {
                selectFlag = false;
                $(selectVail[i]).siblings().find('.select2-selection').css({'borderColor': '#dd4b39'});
                if (i == 0) {
                    $(selectVail[i]).siblings('.input-name').find('span').text('请选择插件！');
                } else {
                    $(selectVail[i]).siblings('.input-name').find('span').text('请选择采集器！');
                }
            } else {
                selectFlag = true;
                $(selectVail[i]).siblings().find('.select2-selection').css({'borderColor': '#d2d6de'});
                if (i == 0) {
                    $(selectVail[i]).siblings('.input-name').find('span').text('');
                } else {
                    $(selectVail[i]).siblings('.input-name').find('span').text('');
                }
            }
        }
        // 验证特有配置信息
        let specialProps = this.props.jobManage.config;
        let textareaflag;
        for (let i = 0; i < specialProps.length; i++) {
            if (specialProps[i].propType == 'TEXTAREA' && specialProps[i].needed) { // 对特有配置文本域验证非空
                let textareaEle = $('#textarea_' + base.encode(specialProps[i].key));
                let textarea = textareaEle.text();
                if (textarea == '') {
                    textareaEle.css({'borderColor': '#dd4b39'});
                    $('.textareaLabel').css({'color': '#dd4b39'});
                    $('.textareaLabel').siblings().text('描述信息不能为空！');
                    $('.textareaLabel').siblings().css({'color': '#dd4b39'});
                    textareaflag = false;
                } else {
                    textareaEle.css({'borderColor': '#d2d6de'});
                    $('.textareaLabel').css({'color': '#000'});
                    $('.textareaLabel').siblings().text('');
                    textareaflag = true;
                }
            } else if ((specialProps[i].propType == 'TEXT' && specialProps[i].needed) || (specialProps[i].propType == 'PASSWORD' && specialProps[i].needed)) { // 对特有配置用户名和密码验证非空
                let conName = 'ele_' + i;
                constraints[conName] = {
                    presence: {
                        message: specialProps[i].key + '不能为空！'
                    }
                }
            }
        }
        let flag = baseValidate($('#jobUpdate'), constraints);
        let cronExpressionValue = $('#cronExpression').val();
        if (cronExpressionValue != '' && this.props.jobManage.radioType == 'CYCLE') {
            this.props.cronExpression(cronExpressionValue);
            let data = this.props.jobManage.iscronExpression;
            if (data.code == 0 && !data.result) {
                showErrorMessage('cronExpression', {cronExpression: ['调度表达式格式不正确！']});
            }
        }
        let description = $('#description').text();
        let desflag;
        if (description == '') {
            $('#description').css({'borderColor': '#dd4b39'});
            $('.description').css({'color': '#dd4b39'});
            $('.description').siblings().text('描述信息不能为空！');
            $('.description').siblings().css({'color': '#dd4b39'});
            desflag = false;
        } else {
            $('#description').css({'borderColor': '#d2d6de'});
            $('.description').css({'color': '#000'});
            $('.description').siblings().text('');
            desflag = true;
        }

        let isValidate;
        for (let i = 0; i < specialProps.length; i++) {
            if (specialProps[i].propType == 'TEXTAREA' && specialProps[i].needed) {
                // 正常验证  + 插件和采集器 + 描述DIV验证 + 特殊配置textarea验证 同为true时通过
                isValidate = !flag && selectFlag && desflag && textareaflag;
                
            } else {
                // 正常验证  + 插件和采集器 + 描述DIV验证 同为true时通过
                isValidate = !flag && selectFlag && desflag;
                
            }
        }
        if (this.props.jobManage.radioType == 'CYCLE') {
            // 表达式后台验证
            isValidate = isValidate && this.props.jobManage.iscronExpression.result
        }


        return isValidate;
    }

    saveHandler() {
        let isValidate = this.validation();

        if (isValidate) {
            let jobInfor = this.jobInfor();
            this.props.jobUpdate(jobInfor);
        }else {
            return;
        }
        if (this.props.jobManage.isjobUpdateSuccess.code == 0) {
            setTimeout(() => {this.props.history.replace('/job');}, 1000);
        }
    }

    saveAndOnlineHandler() {
        let isValidate = this.validation();
        if (isValidate) {
            let jobInfor = this.jobInfor();
            jobInfor.schStatus = 'ON';
            this.props.jobUpdate(jobInfor);
        }else {
            return;
        }
        if (this.props.jobManage.isjobUpdateSuccess.code == 0) {
            setTimeout(() => {this.props.history.replace('/job');}, 1000);
        }
    }
    
    returnHandler() {
        this.props.history.replace('/job');
    }

	render() {
        
        let jobInfor = this.props.jobManage.jobInfor.result.detail;
        let start = moment(jobInfor.startTriggerTime);
        let end = moment(jobInfor.endTriggerTime);
        let tpl;
        if (this.props.jobManage.radioType == 'CYCLE') {
            let ranges = {
                '今日': [moment(), moment().endOf('day')],
                '未来7日': [moment(), moment().add(6, 'days')],
                '未来30日': [moment(), moment().add(29, 'days')],
                '未来一年': [moment(), moment().add(1, 'years')],
                '永久': [moment(), moment('99991231')]
            }
            // let start = moment(jobInfor.startTriggerTime);
            // let end = moment(jobInfor.endTriggerTime);
            // let minDate = moment();
            tpl = <div>
                    <div className="form-group col-md-12">
                        <div className="input-name" style={{float: 'left'}}>
                            <label htmlFor="exampleInputOperator">触发时间：</label>
                        </div>
                        <div className="col-md-12 dateRangePicker">
                            <DateRangePicker opens="right" start = {start} end = {end} ranges={ranges} callback={this.misfireStrategy.bind(this)} ref="daterangePicker" />
                        </div>
                    </div>
                    <div className="form-group col-md-12">
                        <div className="input-name">
                            <label htmlFor="cronExpression">调度表达式：</label>
                            <span className="messages"></span>
                        </div>
                        <div className="input">
                            <input type="text" ref="cronExpression" name="cronExpression" className="form-control" id="cronExpression" maxLength={256} placeholder="请输入调度表达式" defaultValue={jobInfor.cronExpression}/>
                        </div>
                    </div>
                </div>

        } else {
            // let start = moment();
            // let minDate = moment();
            let singleDatePicker = true;
            tpl = <div className="form-group col-md-12">
                        <div className="input-name" style={{float: 'left'}}>
                            <label htmlFor="exampleInputOperator">触发时间：</label>
                        </div>
                        <div className="col-md-12 dateRangePicker">
                            {/* <DateRangePicker start = {start} singleDatePicker={singleDatePicker} callback={this.misfireStrategy.bind(this)} applyClass='hide' cancelClass='hide' ref="daterangePicker" />*/}
                            <DateRangePicker start = {start} singleDatePicker={singleDatePicker} callback={this.misfireStrategy.bind(this)} ref="daterangePicker" />
                        </div>
                    </div>
        }
        let props;
        if (this.props.jobManage.config) {
            props = this.props.jobManage.config.map((element, index) => {
                let placeholder = (element.desc == undefined && element.value == undefined) ? '' : (element.desc != undefined && element.value == undefined) ?
                    element.desc : (element.desc == undefined && element.value != undefined) ? '例如：' + element.value : element.desc + '，例如：' + element.value;
                // let value = element.value == undefined ? '' : '，例如：' + element.value;
                // let placeholder = element.desc + value;
                if (element.propType == 'TEXTAREA') {
                    return (
                        <div className="form-group col-md-12">
                            <div className="input-name">
                                <label htmlFor={index} className="textareaLabel">{element.key}：</label>
                                <span className="messages"></span>
                            </div>
                            <div className="input">
                                <div className="textarea" name={'ele_' + index} ref={'sel_' + index} id={'textarea_' + base.encode(element.key)} contentEditable="true" placeholder={placeholder} dangerouslySetInnerHTML={{__html: (clear ? '' : element.value.replace(/\n/g, '<br />'))}}></div>
                            </div>
                        </div>
                    )
                } else if (element.propType == 'SELECT_AUS_DATASETS') {
                    return (
                            <div className="form-group col-md-12">
                                <div className="input-name">
                                    <label htmlFor="datasets">{element.key}：</label>
                                </div>
                                <select className="select" id={'datasets_' + base.encode(element.key)} ref={'sel_' + index} name={'ele_' + index}>
                                </select>
                            </div>
                        )

                } else if (element.propType == 'DATETIME') {
                    let start = moment(element.value);
                    let end = moment(element.value);
                    let minDate = moment(element.value);
                    let singleDatePicker = true;
                    return (
                            <div className="form-group col-md-12">
                                <div className="input-name">
                                    <label htmlFor="datatime">{element.key}：</label>
                                    <span className="messages"></span>
                                </div>
                                <div className="col-md-12 dateRangePicker" style={{padding: 0}}>
                                    <DateRangePicker id={'datatime_' + base.encode(element.key)} start = {start} end = {end} minDate={minDate} singleDatePicker={singleDatePicker} ref="datatime" />
                                </div>
                            </div>
                        )

                } else {
                    return (
                        <div className="form-group col-md-12">
                            <div className="input-name">
                                <label htmlFor={'sel_' + index}>{element.key}：</label>
                                <span className="messages"></span>
                            </div>
                            <div className="input">
                                <input type={element.propType} ref={'sel_' + index} id={'sel_' + index} defaultValue={clear ? '' : element.value} maxLength={128} name={'ele_' + index} className="form-control" placeholder={placeholder} />
                            </div>
                        </div>
                    )
                }
            })
        }

        return (
            <div id="jobUpdate" className="row">
                <div className="col-md-8 col-sm-12">
                    <div className="box box-body box-primary">
                        <div className="form-group col-md-12">
                            <div className="input-name">
                                <label htmlFor="jobName">作业名称：</label>
                            </div>
                            <div className="input">
                                <input type="text" ref="jobName" name="jobName" className="form-control" id="jobName" maxLength={128} placeholder="请输入作业名称" value={jobInfor.jobName} disabled/>
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <div className="input-name">
                                <label htmlFor="scheduleStrategy" style={{float: 'left'}}>调度方式：</label>
                            </div>
                            <div className="radio" ref="scheduleStrategy" id='scheduleStrategy' onChange={this.radioChecked}>
                                <label>
                                    <input name="radio" type="radio" value="CYCLE" />
                                    &nbsp;周期调度
                                </label>
                                <label className="ml20">
                                    <input name="radio" type="radio" value="ONCE" />
                                    &nbsp;一次调度
                                </label>
                            </div>
                        </div>
                        
                        {tpl}
                        <div className="form-group col-md-12">
                            <div className="input-name">
                                <label htmlFor="description" className="description">描述信息：</label>
                                <span className="messages"></span>
                            </div>

                            <div className="input">
                                <div className="textarea" contentEditable="true" id="description" placeholder="请输入描述信息..." dangerouslySetInnerHTML={{__html: (clear ? '' : jobInfor.description.replace(/\n/g, '<br />'))}}></div>
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <div className="input-name">
                                <label>错过执行策略：</label>
                            </div>
                            <select className="select" id="misfireStrategy">
                               
                            </select>
                        </div>

                        <div className="form-group col-md-12">
                            <div className="input-name">
                                <label>选择插件：</label>
                                <span className="messages" style={{lineHeight: '34px', color: '#dd4b39'}} ></span>
                            </div>
                            <select className="select selectVail" id="pluginName">
                            </select>
                        </div>

                        <div className="form-group col-md-12">
                            <div className="input-name">
                                <label>采集器：</label>
                                <span className="messages" style={{lineHeight: '34px', color: '#dd4b39'}} ></span>
                            </div>
                            <select className="select selectVail" id="collectorName">
                            </select>
                        </div>
                        {props}
                        <div className="form-group col-md-12">
                            <div className="input-name">
                                <label htmlFor="doneOffset">下次作业接入开始位置：</label>
                                <span className="messages"></span>
                            </div>
                            <div className="input">
                                <input type="text" ref="doneOffset" name="doneOffset" className="form-control" maxLength={128} id="doneOffset" placeholder="请输入下次作业接入开始位置：" />
                            </div>
                        </div>
                        <div className="box-button col-md-12" style={{padding: '15px'}} >
                            <button className="btn btn-primary" onClick={this.returnHandler}>返回</button>
                            <button className="btn btn-primary" ref="save" style={{marginLeft: '20px'}} onClick={this.saveHandler}>保存</button>
                            <button className="btn btn-primary" ref="online" style={{marginLeft: '20px'}} onClick={this.saveAndOnlineHandler}>上线</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="box box-body box-primary" style={{padding: '10px 0'}}>
                        <div className="form-group col-md-12">
                            <h4>作业更新提示：</h4>
                            <ol style={{paddingLeft: '20px'}} id="disc">
                                <li>作业名称是作业的唯一标识</li>
                                <li>调度方式共两种：一次调度与周期调度<br/>一次调度：作业只执行一次或者用户手动执行若干次<br/>周期调度：作业按照某个定时策略进行周期执行。</li>
                                <li>调度表达式：<br/>
                                 每隔5秒执行一次：*/5 * * * * ?<br/>
                                 每隔1分钟执行一次：0 */1 * * * ?<br/>
                                 每天23点执行一次：0 0 23 * * ?<br/>
                                 每天凌晨1点执行一次：0 0 1 * * ?<br/>
                                 每月1号凌晨1点执行一次：0 0 1 1 * ?<br/>
                                 每月最后一天23点执行一次：0 0 23 L * ?<br/>
                                 每周星期天凌晨1点实行一次：0 0 1 ? * L<br/>
                                 在26分、29分、33分执行一次：0 26,29,33 * * * ?<br/>
                                 每天的7点到21点都执行一次：0 0 7-21 * * ?<br/></li>
                                <li>描述信息对作业的基本信息描述</li>
                                <li>错过执行策略：<br/>
                                    错过不执行：错过若干次调度后，不进行补充调度<br/>
                                    错过执行一次：错误若干次调度后，只补充一次调度<br/>
                                    错误执行全部：错过若干次调度后，补充全部调度</li>
                                <li>选择插件：进行作业使用插件的选择</li>
                                <li>采集器：进行作业使用采集器的选择</li>
                                <li>下次作业接入开始位置：作业调度的OFFSET</li>
                            </ol>
                            详细说明请参见用户手册！
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}
export default JobUpdate;
