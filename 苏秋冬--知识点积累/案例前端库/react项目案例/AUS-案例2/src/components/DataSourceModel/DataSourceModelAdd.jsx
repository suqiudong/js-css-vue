/**
 * 数据源模型新建
 * User: xiongjie
 * Date: 2017/8/5
 * Time: 15:45
 * */
import React, { Component } from 'react';
import DateRangePicker from 'COMPONENT/Common/DateRangePicker/DateRangePicker';
import moment from 'moment';
import { error} from 'UTIL/notification';
import {encodeSMS4} from 'UTIL/sm4';
import createSelect from 'UTIL/baseSelect2';
import dataSourceModelService from 'SERVICE/dataSourceModelService';
import { baseValidate } from 'UTIL/baseValidate';
import ResultSet from './Common/ResultSet';
import CloumnList from './Common/ColumnList';
import Tree from './Common/Tree';
import JsPlumbs from './Common/JsPlumb';

const key = '2C023A86BD32812A4C180A7152EEBF0A';
let defaultData;
let tableModel;
export default class DataSourceModelAdd extends Component {
    constructor(props) {
        super(props);
        this.ReceiveDate = this.ReceiveDate.bind(this);
         this.draggable = this.draggable.bind(this);
        this.OffsetField = this.OffsetField.bind(this);
        this.strategyChange = this.strategyChange.bind(this);
        this.ResultSet = this.ResultSet.bind(this);
        this.columnSelect = this.columnSelect.bind(this);
        this.saveModel = this.saveModel.bind(this);
        this.isExistPassword = this.isExistPassword.bind(this);
        this.sqlSave = this.sqlSave.bind(this);
    }
    componentWillMount() {
        // 获取数据源列表
        this.props.readDataSource();
        // 禁止右键点击
        document.oncontextmenu = ()=> false;
    }
    componentDidUpdate() {
        defaultData = {
            animate: true,
            data: [{
                text: '数据源',
                children: []
            }]
        }
        tableModel = {
            tableContent: '',
            links: [],
            tables: [],
            columns: [],
            moveTable: [],
            model: [],
            colName: [],
            sql: '',
            appen: []
        }
        // 清空canvas
        $('#canvas').html('');
        // tree数据节点
        let deNodes = defaultData.data[0].children;
        let dataNodes = this.props.dataSourceModel.dataSourceModelList;
        if (!dataNodes) {
            this.refs.tree.towTable(defaultData, tableModel);
            return;
        }
        // 插入获取的数据源
        dataNodes.map((dataName, i)=> {
            // 防止页面重新渲染再次添加
            if (deNodes.length <= i) {
                deNodes.push({
                    text: dataName.dataSourceName,
                    // state: 'closed',
                    children: [],
                    id: i
                });

            }
        });
        // 生成tree数据结构
        this.refs.tree.towTable(defaultData, tableModel);
        // jsplumb初始化
        // this.refs.instance.jsPlumbMove();
    }
    // 获取tree组件返回值
    ReceiveDate(date) {
        tableModel = date;
    }

    // 拖拽事件
    draggable() {
         let that = this;
        // 拖拽
        $(' .sorting_1').draggable({
            proxy: function(source) {
                // 创建移动块，从这个class可以获得移动块的坐标
                var moveBlock = $('<div class="proxy"></div>');
                moveBlock.html($(source).html()).appendTo('body');
                return moveBlock;
            },
            revert: true,
            cursor: 'auto',
            onStopDrag: function(e) {
                 $('body').children('.proxy').remove();
            }
        });

        // 放入框内
        $('.flowchart-demo').droppable({
            onDrop: function(e, source) {
                // 获取拖动div坐标
                let moveX = $(' .proxy').offset().left - $(this).offset().left;
                let moveY = $(' .proxy').offset().top - $(this).offset().top;
                let tableId = source.childNodes[0].getAttribute('tableId');
                let ID = tableId.split('.');
                // 创建div
                let p = $('<div data_source="' + ID[0] + '" tableName= "' + tableId + '" style="width: inherit;min-width:180px;left:' + moveX + 'px;top:' + moveY + 'px"' + 'class="window jtk-node" tableId=' + tableId + ' id=' + ID[ID.length - 1] + '></div>');
                p.append($('<div class="eq"></div>'));
                p.append($('<p>' + source.childNodes[0].innerHTML + '</p>'));
                // 防止新添加重复
                let flag = false;
                $('.flowchart-demo .window').each(function() {
                    if ($(this).attr('tableId') == tableId) {
                        flag = true;
                    }
                });
                if (flag) return;

                // 新加一个拖动对象
                $(this).append(p);

                for (let k in tableModel.tables) {
                    if (tableModel.tables[k].tableName == ID[ID.length - 1]) {
                        tableModel.tables[k].Id = tableId;
                        tableModel.moveTable.push(tableModel.tables[k]);
                        for (let key in tableModel.tables[k].columns) {
                            tableModel.columns.push({
                                columns: key,
                                table: tableId,
                                tableCloumn: key
                            });
                        }
                    }
                }
                // 删除事件
                that.refs.instance.deleteModel('#' + ID[ID.length - 1]);
               // 连接线
                that.refs.instance.initJsPlumbTable(ID[ID.length - 1], tableModel);
                // 偏移字符
                that.OffsetField();
            }
        });
    }
    // 偏移字符
    OffsetField() {
        let OffsetField;
        $(' #offsetColumn').empty();
        for (let i = 0; i < tableModel.moveTable.length; i++) {
            let optgroup = $('<optgroup label="' + tableModel.moveTable[i].Id + '"></optgroup>');
            OffsetField = Object.getOwnPropertyNames(tableModel.moveTable[i].columns);
            OffsetField.map(function(data) {
                optgroup.append($('<option value="' + data + '"> ' + data + '</option>'));
            });
            $(' #offsetColumn').append(optgroup);
        }
        createSelect({
            id: 'offsetColumn',
            minimumResultsForSearch: 2
        });
    }
    // 调度策略
    strategyChange() {
        if ($(' #scheduleStrategy').val() == 'CYCLE') {
            $(' #endTime').css('display', 'block');
            $(' #cronDiv').css('display', 'block');
        } else {
            $(' #endTime').css('display', 'none');
            $(' #cronDiv').css('display', 'none');
        }
    }
    // 显示结果集
    ResultSet() {
        this.refs.showResult.ResultSet(tableModel.sql);
    }
    // 列选择
    columnSelect() {
        debugger;
        this.refs.ColumnList.columnSelect(tableModel);
    }
    // 保存建模
    saveModel(e) {
        e.preventDefault();
        // this.isExistPassword();
        let admin = sessionStorage.getItem('XDataUserName');
        let time = $('#cronExpression').val(); // 时间数
        // 调度频率表达式
        let TimeUnit = $(' #TimeUnit').val(); // 时间单位
        let cronExpression;
        switch (TimeUnit) {
            case '0' : // 秒
                cronExpression = time + ' * * * * ? *';
                break;
            case '1' : // 分
                cronExpression = '0 ' + time + ' * * * ? *';
                break;
            case '2' : // 时
                cronExpression = '0 0 ' + time + ' * * ? *';
                break;
            case '3' : // 日
                cronExpression = '0 0 1 ' + time + ' * ? *';
                break;
            case '4' : // 月
                cronExpression = '0 0 1 1 ' + time + ' ? *';
                break;
            case '6' : // 年
                cronExpression = '0 0 1 1 1 ? ' + time;
                break;
        }
        let startTime = this.refs.startTriggerTime.getOnceTime();
        let endTime = this.refs.endTriggerTime.getOnceTime();

        // 验证
        if ($('#modelName').val() == '') {
            error('请输入模型名称');
            return;
        }
        let newTime = new Date(); // 系统当前时间
        let startTimes = new Date(startTime); // 开始时间
        let endTimes = new Date(endTime); // 结束时间

        if (startTimes.getTime() <= newTime.getTime()) {
            error('开始时间不能小于当前时间');
            return;
        }
        if (startTimes.getTime() >= endTimes.getTime() && $(' #endTime').css('display') == 'block') {
            error('开始时间不能等于或大于结束时间');
            return;
        }

        if ($('#doneOffset').val() == '') {
            error('请输入偏移值');
            return;
        }
        if (tableModel.sql == '') {
            error('请关联数据表结构');
            return;
        }

        if ($('#cronExpression').val() == '' && $(' #cronDiv').css('display') == 'block') {
            error('调度频率不能为空');
            return;
        }
        let creatData = {
            modelName: $('#modelName').val(),
            owner: admin,
            description: $('#description').val(),
            scheduleStrategy: $('#scheduleStrategy').val(), // 调度策略
            startTriggerTime: startTime, // 开始调度时间
            misfireStrategy: $('#misfireStrategy').val(), // 错过的调度执行策略
            doneOffset: $('#doneOffset').val(),  // 偏移值
            offsetColumn: $('#offsetColumn').val(), // 偏移字段
            schStatus: $('#schStatus').val(), // 调度状态
            endTriggerTime: endTime, // 最后触发时间
            dataModelSQL: encodeSMS4(tableModel.sql, key).join(','), // sql语句
            sources: [],
            sourceTableRelation: {} // 源关系
        };
        if ($('#scheduleStrategy').val() == 'CYCLE') {
            creatData.cronExpression = cronExpression; // 调度频率
        }

        // 源表名
        let TableCol = [];
        tableModel.moveTable.map(function(move, i) {
            let off = true;
            tableModel.links.map(function(link) {
                if ((move.tableName == link.sourceId) || (move.tableName == link.targetId)) {
                   if (off) {
                       for (let key in move.columns) {
                           TableCol.push({
                               colName: key,
                               colType: move.columns[key]
                           });
                       }
                       // 源表名
                       creatData.sources.push({
                           sourceName: move.dataSourceName,  // 数据源名
                           sourceType: move.dataSourceType,  // 数据源类型，oracle/mysql/pg/gbase 8a/hive/hbase/AUS/…..
                           sourceUrl: move.connectionConfig.url,  // 数据源Url（加密传输）
                           sourceUsername: move.connectionConfig.user,  // 数据源Username（加密传输）
                           sourcePwd: move.connectionConfig.pwd,  // 数据源Pwd（加密传输）
                           sourceDB: move.dataBaseName, // 数据源数据库
                           sourceTable: [{
                               TableName: move.tableName,
                               TableCol: TableCol
                           }]
                       });
                       off = false;
                   }
                }
                creatData.sourceTableRelation.relationCount = i + 1;
            })
        });
        // 源关系
        let relation = [];
        tableModel.links.map(function(link) {
            // 关系类型
            let Join = '';
            switch (link.type) {
                case 'innerJoin':
                    Join = 'JOIN';
                    break;
                case 'LEFTJOIN':
                    Join = 'JOIN';
                    break;
                case 'rightJoin':
                    Join = 'RIGHTJOIN';
                    break;
                case 'outSideJoin':
                    Join = 'FULLJOIN';
                    break;
            }
            // 关联字段
            let sourceA = link.sourceTableName.split('.');
            let sourceB = link.targetTableName.split('.');
            link.columns.map((date)=>{
                relation.push({
                    relationType: Join,
                    sourceA: sourceA[0],
                    tableA: sourceA[sourceA.length - 1],
                    sourceB: sourceB[0],
                    tableB: sourceB[sourceB.length - 1],
                    colA: date.sourceId,
                    colB: date.targetId
                });
            });

        });
        creatData.sourceTableRelation.relation = relation;
        dataSourceModelService.datamodelSave(creatData);
        setTimeout(()=> {
            this.props.history.replace('/dataSourceModel');
        }, 3000);

    }
    // 调度频率
    isExistPassword() {
        let TimeUnit = $(' #TimeUnit').val();
        let regExp = '';
        switch (TimeUnit) {
            case '1': // 秒
                regExp = /^(([1-9])|(1\d)|(5\d))$/;
                break;
            case '2':// 分
                regExp = /^(([1-9])|(1\d)|(5\d))$/;
                break;
            case '3':// 时
                regExp = /^(([1-9])|(1\d)|(2[0-4]))$/;
                break;
            case '4':// 日
                regExp = /^(([1-9])|(1\d)|(3[0-1]))$/;
                break;
            case '5':// 月
                regExp = /^(([1-9])|(1[0-2]))$/;
                break;
            case '6':// 年
                regExp = /^(([1-9])|(1[0-2]))$/;
                break;
        }
        let constraints = {
            'cronExpression': {
                // 必填
                presence: {
                    message: '请输入名称'
                },
                format: {
                    pattern: regExp,
                    message: '时间格式不正确'
                },
                length: {
                    maximum: 6,
                    message: '不能超过6个字符'
                }
            }
        };
        baseValidate($(' #cronExpression').parent(), constraints);
    }
    sqlSave(colName, colNameFale) {
        this.refs.instance.creatSql(colName, colNameFale);
    }
    render() {
        console.log('a');
        let start = moment();
        let minDate = moment();
        let singleDatePicker = true;
        return <div className="box box-primary" id='dataSourceModelAdd' onselectstart='return false'>
            <div className='row'>
                {/* 数据tree结构*/}
                <Tree ref='tree' draggable={this.draggable} ReceiveDate={this.ReceiveDate}/>
                <div className='col-md-8'>
                    {/* Jsplumb关联块*/}
                    <JsPlumbs ref='instance' ReceiveDate={this.ReceiveDate} OffsetField={this.OffsetField}/>
                    <div className='formSubimt'>
                        <form action="">
                            <div className='row'>
                                <div className='col-md-4 form-group'>
                                    <label htmlFor="modelName" >模型名称: </label><span className="messages"></span>
                                    <input type="text" id="modelName" maxLength={16} name="modelName" className="form-control" placeholder="请输入模型名称"/>
                                </div>
                                <div className='col-md-4 form-group'>
                                    <label htmlFor="scheduleStrategy" >调度策略: </label><span className="messages"></span>
                                    <select name='scheduleStrategy' id="scheduleStrategy" className="form-control dataSourceWitch" onChange={this.strategyChange}>
                                        <option value="ONCE">ONCE(单次)</option>
                                        <option value="CYCLE">CYCLE(循环)</option>
                                    </select>
                                </div>
                                <div className='col-md-4 form-group'>
                                    <label htmlFor="schStatus" >调度状态: </label><span className="messages"></span>
                                    <select name='schStatus' id="schStatus" className="form-control dataSourceWitch">
                                        <option value="ON">ON(是)</option>
                                        <option value="OFF">OFF(否)</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4 form-group'>
                                    <label htmlFor="startTriggerTime" >开始时间: </label><span className="messages"></span>
                                    <DateRangePicker id="startTriggerTime" name="startTriggerTime" start = {start} minDate={minDate} singleDatePicker={singleDatePicker} ref="startTriggerTime" />
                                    {/* <input type="text" id="startTriggerTime" name="startTriggerTime" className="form-control"/> */}
                                </div>
                                <div className='col-md-4 form-group' id='endTime' style={{display: 'none'}}>
                                    <label htmlFor="endTriggerTime" >结束时间: </label><span className="messages"></span>
                                    <DateRangePicker id="endTriggerTime" name="endTriggerTime" start = {start} minDate={minDate} singleDatePicker={singleDatePicker} ref="endTriggerTime" />
                                </div>
                                <div className='col-md-4 form-group'>
                                    <label htmlFor="misfireStrategy" >错过调度策略: </label><span className="messages"></span>
                                    <select name='misfireStrategy' id="misfireStrategy" className="form-control dataSourceWitch">
                                        <option value="DO_NOTHING">不补充执行</option>
                                        <option value="FIRE_ONCE_NOW">补充执行一次</option>
                                        <option value="FIRE_ALL_MISSED">补充执行二次</option>
                                    </select>
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-md-4 form-group'>
                                    <label htmlFor="offsetColumn" >偏移字段: </label><span className="messages"></span>
                                    <select type="text" id="offsetColumn" name="offsetColumn" className="form-control select2me"/>
                                </div>
                                <div className='col-md-4 form-group'>
                                    <label htmlFor="doneOffset" >偏移量: </label><span className="messages"></span>
                                    <input type="text" id="doneOffset" maxLength={16} name="doneOffset" className="form-control"/>
                                </div>
                                <div className='col-md-4 form-group' style={{display: 'none'}} id='cronDiv'>
                                    <label htmlFor="cronExpression">调度频率: </label><span className="messages"></span>
                                    <div className='row TimeUnit'>
                                        <div className='col-md-10'>
                                            <input type="text" id="cronExpression" name="cronExpression" className="form-control" onBlur={this.isExistPassword}/>
                                        </div>
                                        <div className='col-md-2'>
                                            <select name="" id="TimeUnit" className="form-control dataSourceWitch">
                                                <option value="1">秒</option>
                                                <option value="2">分</option>
                                                <option value="3">时</option>
                                                <option value="4">日</option>
                                                <option value="5">月</option>
                                                <option value="6">年</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12 form-group'>
                                    <label htmlFor="description" >说明: </label><span className="messages"></span>
                                    <textarea className="form-control" id="description" name = "description" rows="4" placeholder="请输入说明" data-gramm_editor="true" style={{resize: 'none'}}>
                                    </textarea>
                                </div>
                            </div>
                            <div className='buttonModel col-md-12 form-group'>
                                <button name="Result" className="btn btn-primary" type="button" onClick={this.ResultSet}>显示结果集</button>
                                <button name="colums" className="btn btn-primary" type="button" style={{ margin: '0px 25px' }} onClick={this.columnSelect}>列选择</button>
                                <button name="saveBtn" className="btn btn-primary" type="button" onClick={this.saveModel}> 保存</button>
                            </div>
                            {/* 显示结果集 */}
                            <ResultSet ref='showResult'/>
                            {/* 列选择 */}
                            <CloumnList ref='ColumnList' sqlSave={this.sqlSave} ReceiveDate={this.ReceiveDate}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }
}


