/**
 * Jsplumb
 * User: xiongjie
 * Date: 2017/8/5
 * Time: 15:45
 * */

import React, { Component } from 'react';
import { error} from 'UTIL/notification';
import { jsPlumb } from 'jsplumb';

var instance;
var isModifyFlag = false;
var sourceTable = '';
var targetTable = '';
var table1Select = {};
var table2Select = {};
var linkType = 'innerJoin';
// 数据库类型
var valueType = ['tinyint', 'int', 'integer', 'float', 'double', 'smallint']; // 数值类型
var dateType = ['time', 'date', 'timestamp', 'datetime']; // 日期类型
var stringType = ['char', 'varchar']; // 字符串类型
var dataBaseType = [{valueType: valueType}, {dateType: dateType}, {stringType: stringType}];
var tableDate;

export default class Tree extends Component {
    constructor(props) {
         super(props);
         this.getModels = this.getModels.bind(this);
         this.deleteModel = this.deleteModel.bind(this);
         this.jsPlumbMove = this.jsPlumbMove.bind(this);
         this.initJsPlumbTable = this.initJsPlumbTable.bind(this);
         this.findLinks = this.findLinks.bind(this);
         this.showLinkModal = this.showLinkModal.bind(this);
         this.AssociationConfiguration = this.AssociationConfiguration.bind(this);
         this.addFields = this.addFields.bind(this);
         this.TemplateSelect = this.TemplateSelect.bind(this);
         this.addSelectTable = this.addSelectTable.bind(this);
         this.addOrUpdateLink = this.addOrUpdateLink.bind(this);
         this.creatSql = this.creatSql.bind(this);
    }
    componentDidUpdate() {
        tableDate = {
            tableContent: '',
            links: [], // 存储连接线
            tables: [], // 所有的数据表
            columns: [], // 字段
            moveTable: [], // 选中的数据表
            model: [], //
            colName: [],
            sql: '', // 生成sql
            appen: [], //
            colNameFale: [] //
        };
        this.jsPlumbMove()
    }
    // 修改模型时获取模型信息
    getModels(detail) {
            let oLeft = 10;
            let oTop = 100;
            detail.sources.map((node)=> {
                let dataSource = node.sourceName; // 数据源名
                let sourceDB = node.sourceDB; // 数据库名
                let TableName = node.sourceTable[0].TableName;
                let center = sourceDB + '.' + TableName;
                // 创建初始div
                let p = $('<div data_source=' + sourceDB + ' id=' + TableName + ' tableId=' + center + ' style=width:inherit;min-width:180px;left:' + oLeft + 'px;top:' + oTop + 'px; class="window jtk-node" dataSource="' + dataSource + '" tableName= "' + center + '"></div>');
                p.append($('<div class="eq"></div>'));
                p.append($('<p>' + center + '</p>'));
                $(' #canvas').append(p);
                oLeft = oLeft + 250;

                // 添加事件
                this.initJsPlumbTable(TableName);
                this.deleteModel('#' + TableName);

                let columns = {};
                node.sourceTable[0].TableCol.map((colum)=> {
                    columns[colum.colName] = colum.colType;
                });
                // 防止重复添加
                for (let i = 0; i < tableDate.moveTable.length; i++) {
                    if (tableDate.moveTable[i].tableName == TableName) {
                        return;
                    }
                }

                // 添加入tableDate
                tableDate.moveTable.push({
                    Id: center,
                    columns: columns,
                    connectionConfig: {
                        url: node.sourceUrl,
                        user: node.sourceUsername,
                        pwd: node.sourcePwd
                    },
                    dataBaseName: sourceDB,
                    dataSourceName: dataSource,
                    dataSourceType: node.sourceType,
                    owner: node.sourceUsername,
                    tableName: TableName
                });
            });
            // 添加连线
             let links = detail.sourceTableRelation.relation;
            if (links) {
                links.map((nodes)=> {
                    instance.connect({
                        source: nodes.tableA,
                        target: nodes.tableB,
                        anchor: ['Perimeter', {shape: 'Circle'}],
                        PaintStyle: {
                            stroke: 'rgb(58, 156, 143)',
                            strokeWidth: 3
                        }
                    });
                });
                // 添加关联字段
                if (tableDate.links.length > 0) {
                    tableDate.links.map((table)=> {
                        table.columns = [];
                        links.map((col)=> {
                            if (table.sourceId == col.tableA && table.targetId == col.tableB) {
                                table.columns.push({
                                    equality: 0,
                                    sourceId: col.colA,
                                    targetId: col.colB
                                })
                            }
                        })
                    })
                }
            }
            this.props.ReceiveDate(tableDate);
    }
    // 移除事件
    deleteModel(id) {
        // 绑定点击右键删除事件
        let oThis = this;
        $(id).on('contextmenu', function (e) {
            let that = $(this);
            let oX = e.clientX - $('.flowchart-demo').offset().left;
            let oY = e.clientY - $('.flowchart-demo').offset().top;
            $(' #delete_dom').css({
                display: 'block',
                top: oY + 'px',
                left: oX + 'px'
            }).on('click', function(e) {
                e.stopPropagation();
                $(this).css({display: 'none'});
                tableDate.links.map(function(data, i) {
                    if (that.attr('tableId') == data.sourceTableName || that.attr('tableId') == data.targetTableName) {
                        tableDate.links.splice(i, 1);
                    }
                });
                // 清除tableModel.moveTable中删除数据
                tableDate.moveTable.map(function(data, i) {
                    if (that.attr('tableId') == data.Id) {
                        tableDate.moveTable.splice(i, 1);
                    }
                });
                // 移除模块
                instance.remove(that);
                instance.deleteObject(that);
                // 清除偏移值
                oThis.props.OffsetField();
                // 清空sql
                tableDate.sql = '';
                console.log(tableDate);
                console.log('a');
                oThis.creatSql(tableDate.colName, tableDate.colNameFale);
                oThis.props.ReceiveDate(tableDate);
            });
            // 隐藏删除按钮
            $(this).mousedown(()=>$(' #delete_dom').css({display: 'none'}));
            document.addEventListener('click', function() {
                $(' #delete_dom').css({display: 'none'});
            }, true);
        });
    }
    // jsPlumb初始化
    jsPlumbMove() {
        instance = jsPlumb.getInstance({
            DragOptions: {
                cursor: 'pointer',
                zIndex: 2000
            },
            Endpoint: ['Dot', {radius: 2}],
            Connector: 'StateMachine',
            ConnectionOverlays: [
                ['Arrow', {
                    location: 1,
                    visible: true,
                    width: 11,
                    length: 11
                }],
                ['Label', {
                    label: '<span class="glyphicon glyphicon-refresh" style="cursor: pointer;"></span>',
                    id: 'label',
                    cssClass: 'aLabel'
                }
                ]
            ], PaintStyle: {
            stroke: 'rgb(58, 156, 143)',
                strokeWidth: 2,
                oulineStroke: 'transparent',
                outlineWidth: 4
            },
            ConnectionsDetachable: false,
            Container: 'canvas'
        });
        /*
        instance.registerConnectionType('basic', {
            anchor: 'Continuous',
            connector: 'StateMachine'
        });*/
        // 点击右键删除
        instance.bind('contextmenu', function(p) {
            tableDate.links.map(function(data, i) {
                if (p.id == data.connectionId) {
                    tableDate.links.splice(i, 1);
                }
            });
            jsPlumb.deleteObject(p);
        });
        //
        instance.bind('click', (p)=> {
            let sourceId = p.sourceId;
            let targetId = p.targetId;
            let link = this.findLinks(sourceId, targetId);
            this.showLinkModal(sourceId, targetId, link);
        });

        instance.bind('connection', (p)=> {
            // 判断是否连接自己
            if (p.connection.sourceId == p.connection.targetId) {
                jsPlumb.deleteObject(p);
                return;
            }
            // 获取源元素
            var source = p.source;
            // 获取源元素上的点
            var sourceEndPoints = instance.getEndpoints(source);
            $.each(sourceEndPoints, (i, sourceEndPoint)=>{
                // 判断是否重复连接
                if (p.connection != sourceEndPoint.connections[0]
                    && (sourceEndPoint.connections[0].targetId == p.targetId)) {
                    jsPlumb.deleteObject(p);
                    return;
                }
                // 判断是否环形连接
                if (sourceEndPoint.connections[0].sourceId == p.targetId
                    && sourceEndPoint.connections[0].targetId == p.sourceId) {
                    instance.deleteObject(p);
                    return;
                }
            });

            // 添加连接线属性到tableModel
            if (!isModifyFlag) {
                tableDate.links.push({
                    connectionId: p.connection.id,
                    sourceId: p.connection.sourceId,
                    sourceTableName: $('#' + p.connection.sourceId).attr('tableName'),
                    targetId: p.connection.targetId,
                    targetTableName: $('#' + p.connection.targetId).attr('tableName'),
                    type: 'innerJoin',
                    columns: []
                });
            }
            this.props.ReceiveDate(tableDate);
        });
    }
    // 创建连接线
    initJsPlumbTable(id, tableModel = tableDate) {
        tableDate = tableModel;
        var el = jsPlumb.getSelector('#' + id);
        instance.draggable(el, {
        });
        instance.makeSource(el, {
            filter: '.eq', // 筛选子元素.eq
            connectorStyle: { // 连接线样式
                stroke: 'rgb(58, 156, 143)',
                strokeWidth: 2,
                oulineStroke: 'transparent',
                outlineWidth: 4
            },
            connectionType: 'basic'
        });
        instance.makeTarget(el, {
            allowLoopback: false // 防住回路自身连接
        });
        instance.fire('jsPlumbDemoNodeAdded', el);
    }
    // 查询联动的对象
    findLinks(sourceId, targetId) {
        var linkx;
        $.each(tableDate.links, (k, link)=> {
            if ((link.sourceId == sourceId && link.targetId == targetId)
                || (link.sourceId == targetId && link.targetId == sourceId)) {
                linkx = link;
            }
        });
        return linkx;
    }

    showLinkModal(sourceId, targetId, link) {
        sourceTable = sourceId;
        targetTable = targetId;
        // 查询出两张表的下拉列
        for (let i in tableDate.moveTable) {
            let data = tableDate.moveTable[i];
            if (data.tableName == sourceId) {
                table1Select = data;
            }
            if (data.tableName == targetId) {
                table2Select = data;
            }
        }
        let links = this.findLinks(sourceId, targetId);
        this.addFields(links);
    }
    closeModal() {
        $(' #linkModal').modal('hide');
    }
    // 关联配置
    AssociationConfiguration() {
        $(' .leftList li').click(function() {
            $(this).addClass('gary').siblings().removeClass('gary');
            if ($(this).hasClass('UNION')) {
                $('.modal-title').html('合并配置');
                $('#UNION').css({display: 'block'});
                $('.btn-add').html('添加合并字段');
                return;
            }
            $('.modal-title').html('关联配置');
            $('#UNION').css({display: 'none'});
            $('.btn-add').html('添加关联字段');
        })
    }
    // 添加关联字段
    addFields(link) {
        $('.btn-add').off(); // 解除事件绑定,避免重复绑定
        $('#linkModal').off();

        // 隐藏清楚数据
        $('#linkModal').on('hidden.bs.modal', function(e) {
            $(this).removeData('bs.modal');
            $('#linkTable').html('');
        });
        // 保存后在次点击显示保存的关联结果
        $('#linkModal').on('shown.bs.modal', (e)=> {
            this.AssociationConfiguration();
            if (link && link.columns) {
                $.each(link.columns, (e, com)=> {
                    let select = $(' <select class="sourceSelect tableSelect form-control dataSourceWitch"></select>');
                    let select2 = $('<select class="targetSelect  tableSelect form-control dataSourceWitch"></select>');
                    let option, option2 ;
                    let columns = Object.getOwnPropertyNames(table1Select.columns);
                    let columns2 = Object.getOwnPropertyNames(table2Select.columns);
                    $.each(columns, (i, key)=> {
                        option = $('<option value="' + key + '">' + key + '</option> ');
                        if (com.sourceId == key) {
                            option.attr('selected', true);
                        }
                        select.append(option);
                    });
                    $.each(columns2, (i, key)=> {
                        option2 = $('<option value="' + key + '">' + key + '</option> ');
                        if (com.targetId == key) {
                            option2.attr('selected', true);
                        }
                        select2.append(option2);
                    });
                    this.TemplateSelect(select, select2);
                })};
        });
        $('#linkModal').modal();
    }
    // 创建select关联字段
    TemplateSelect(select, select2) {
        let table = $(' <div class="row Associated"></div>');
        let left = $(' <div class="col-md-6 form-group"></div>');
        let right = $(' <div class="col-md-5 form-group"></div>');
        let deletes = $(' <div class="col-md-1 form-group"></div>');
        // sourceSelect
        left.append(select);
        table.append(left);
        right.append(select2);
        table.append(right);

        deletes.append('<a href="javascript:void(0);" class="ModelRemove btn btn-default btn-xs" data-toggle="cmodal"><i class="fa fa-trash-o"></i></a>');
        table.append(deletes);
        $(' #linkTable').append(table);
        $(' .ModelRemove').on('click', function() {
            $(this).parents('.Associated').remove();
        });
    }
    // 点击进行创建select关联字段
    addSelectTable(e) {
        let option, option2 ;
        let select = $(' <select class="sourceSelect tableSelect form-control dataSourceWitch"></select>');
        let select2 = $('<select class="targetSelect  tableSelect form-control dataSourceWitch"></select>');
        let columns = Object.getOwnPropertyNames(table1Select.columns);
        let columns2 = Object.getOwnPropertyNames(table2Select.columns);
        // sourceSelect
        $.each(columns, function(i, key) {
            option = $('<option value="' + key + '">' + key + '</option> ');
            select.append(option);
        });
        $.each(columns2, function(i, key) {
            option2 = $('<option value="' + key + '">' + key + '</option> ');
            select2.append(option2);
        });
        this.TemplateSelect(select, select2);
    }
    // 点击保存储存关联字段
    addOrUpdateLink(e) {
        let sourceId;
        let sourceType;
        let targetType;
        let targetId;
        let sourceTypeBelong;
        let targetTypeBelong;
        let selects = $('.tableSelect');
        let link = this.findLinks(sourceTable, targetTable);
        if (link == null) {
            link = {sourceId: sourceTable, targetId: targetTable, type: linkType, columns: []};
            tableDate.links.push(link);
        }
        link.type = linkType;
        link.columns = [];
        $.each(selects, function(k, select) {
            var column = {};
            var val = $(select).find('option:selected').attr('value');
            if (k % 2 == 0) {
                sourceId = val;
                // 等式关系

                var sourceColumns;
                var sourceTableName = link.sourceId;

                for (let i = 0;i < tableDate.moveTable.length; i++) {
                    if (tableDate.moveTable[i].tableName == sourceTableName) {
                        sourceColumns = tableDate.moveTable[i].columns;
                        break;
                    }
                }
                var arr = Object.getOwnPropertyNames(sourceColumns);
                for (let i = 0;i < arr.length; i++) {
                    if (arr[i] == sourceId) {
                        sourceType = sourceColumns[sourceId];
                        break;
                    }
                }
                for (let i = 0; i < sourceColumns.length; i++) {
                    if (Object.getOwnPropertyNames(sourceColumns[i]) == sourceId) {
                        sourceType = sourceColumns[i][sourceId];
                        break;
                    }
                }

            } else {
                targetId = val;
                // 获取转换类型的SELECT 集合
                var targetTableName = link.targetId;
                var targetColumns;

                for (let i = 0; i < tableDate.moveTable.length; i++) {
                    if (tableDate.moveTable[i].tableName == targetTableName) {
                        targetColumns = tableDate.moveTable[i].columns;
                        break;
                    }
                }
                var arr1 = Object.getOwnPropertyNames(targetColumns);
                for (let i = 0; i < arr1.length; i++) {
                    if (arr1[i] == targetId) {
                        targetType = targetColumns[targetId];
                        break;
                    }
                }
                for (let i in dataBaseType) {
                    var typeName = Object.getOwnPropertyNames(dataBaseType[i]);
                    var sindex = $.inArray(sourceType, dataBaseType[i][typeName]);
                    var tindex = $.inArray(targetType, dataBaseType[i][typeName]);
                    if (sindex > 0) {
                        sourceTypeBelong = typeName;
                    }
                    if (tindex > 0) {
                        targetTypeBelong = typeName;
                    }
                }

                if (sourceTypeBelong !== targetTypeBelong) {
                    return false;
                }
                column.sourceId = sourceId;
                column.sourceType = sourceType;
                column.targetId = targetId;
                column.targetType = targetType;
                link.columns.push(column);
                link.type = $('.gary').attr('type');
                tableDate.moveTable.map(function (data, i) {
                    if (data.Id == link.sourceTableName) {
                        link.sourceDataType = data.dataSourceType;
                        link.sourceDataSourceName = data.dataSourceName;
                    }
                    if (data.Id == link.targetTableName) {
                        link.targetDataType = data.dataSourceType;
                        link.targetDataSourceName = data.dataSourceName;
                    }
                });
            }
        });
        // 判断是否关联成功
        if (sourceTypeBelong !== targetTypeBelong) {
            var message = '保存失败，源表' + sourceId + '字段为' + sourceType + '类型，目标表' + targetId + '字段为' + targetType + '类型，' + '关联失败!';
            error(message);
            return;
        }
        this.creatSql(tableDate.colName, tableDate.colNameFale);
        $('#linkModal').modal('hide');
    }
    // 保存生成sql语句
    creatSql(colName = [], colNameFale = []) {
        tableDate.colName = colName;
        tableDate.colNameFale = colNameFale;
        let queryType; // 查询类型：1.单库且是oracle 2.单库且是hive 3.其他单库 4.跨库查询
        let sql;
        let Libname = '';
        if (tableDate.moveTable.length <= 0) {
            tableDate.sql = '';
            return;
        }
        var dataType = tableDate.moveTable[0].dataSourceType;
        var dataSourceName = tableDate.moveTable[0].dataSourceName;
        for (let i = 1; i < tableDate.moveTable.length; i++) {
            if (tableDate.moveTable[i].dataSourceType !== dataType) {
                queryType = 4;
                break;
            }
        }
        if (queryType !== 4) {
            if (dataType == 'oracle') {
                queryType = 1;
            } else if (dataType == 'hive') {
                queryType = 2;
            } else {
                queryType = 3;
            }
        }
        // 判断选择列是否存在
        if (tableDate.colName.length > 0) {
            if (tableDate.colNameFale.length > 0) {
                tableDate.colName.map(function(val) {
                    Libname += ' ' + val + ' ';
                })
            } else {
                Libname = ' * ';
            }

        } else {
            Libname = ' * ';
        }
        if (queryType == 4) {
            sql = 'select * from '; // 跨库查询
        } else {
             sql = 'DIRECT ' + dataSourceName + ' select' + Libname + 'from'; // 同源查询
            // sql = ' select' + Libname + 'from'; // 同源查询
        }
        let formSql = '';
        let onSql = '';
        let unionSource = '';
        let unionTarget = '';
        tableDate.links.map(function(data, i) {
            let a = dataSourceName + '.' + data.sourceTableName; // 源名+库+表
            let b = dataSourceName + '.' + data.targetTableName;// 源名+库+表
            // sql条件
            if (data.columns.length > 0) {
                for (let i = 0; i < data.columns.length; i++) {
                    if (data.columns.length == 1) {
                        onSql = a + '.' + data.columns[i].sourceId + '=' + b + '.' + data.columns[i].targetId;
                        unionSource = data.columns[i].sourceId;
                        unionTarget = data.columns[i].targetId;
                    } else {
                        let and = ' and ';
                        let un = ',';
                        if (i == (data.columns.length - 1)) {
                            and = '';
                            un = '';
                        }
                        // 关联字段处理
                        onSql += a + '.' + data.columns[i].sourceId + '=' + b + '.' + data.columns[i].targetId + and;
                        // 合并字段处理
                        unionSource += data.columns[i].sourceId + un;
                        unionTarget += data.columns[i].targetId + un;
                    }
                }
            }
            if (i == 0) {
                if (data.columns.length > 0) {
                    formSql = a + ' ' + data.type.replace('J', ' J') + ' ' + b;
                }
                sql = sql + ' ' + formSql + ' ON ' + onSql;
            } else {
                if (data.columns.length > 0) {
                    formSql = ' ' + data.type.replace('J', ' J') + ' ' + b;
                }
                sql = sql + ' ' + formSql + ' ON ' + onSql;
            }
            // 合并类型
            if (data.type == 'UNION') {
                sql = 'select ' + unionSource + ' from ' + a + ' ' + $('#UNION').val() + ' select ' + unionTarget + ' from ' + b;
            }
        });

        tableDate.sql = sql;
        console.log(sql);
        this.props.ReceiveDate(tableDate);
    }
    render() {
        return <div className="jtk-demo-main">
                    <div className="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="canvas"></div>
                    <button name='delete' id='delete_dom' className='btn btn-primary'>删除</button>
                    {/* 关联模态框*/}
                    <div className='modal in' id='linkModal'>
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={this.closeModal}>
                                        <span aria-hidden='true'>×</span>
                                    </button>
                                    <h4 className='modal-title' ref='title'>关联配置</h4>
                                    <select name="UNION" id="UNION" className='form-control dataSourceWitch' style={{width: '150px', margin: 'auto', display: 'none'}}>
                                        <option value="UNION">UNION</option>
                                        <option value="UNION ALL">UNION ALL</option>
                                    </select>
                                </div>
                                <div className='modal-body popBody '>
                                    <div className='row'>
                                        <div className="col-md-3">
                                            <ul className="changeLi leftList">
                                                <li className="gary" type="innerJoin">
                                                    <img src={require('../../../assets/img/set01.png')}/>
                                                    <p>内部</p>
                                                </li>
                                                <li type="leftJoin">
                                                    <img src={require('../../../assets/img/set02.png')}/>
                                                    <p>左侧</p>
                                                </li>
                                                <li type="rightJoin">
                                                    <img src={require('../../../assets/img/set03.png')}/>
                                                    <p>右侧</p>
                                                </li>
                                                <li type="outSideJoin">
                                                    <img src={require('../../../assets/img/set04.png')}/>
                                                    <p>完全外部</p>
                                                </li>
                                                <li className='UNION' type="UNION">
                                                    <img src={require('../../../assets/img/set04.png')}/>
                                                    <p>合并</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-9">
                                            <div className='form_table' id='linkTable'>
                                            </div>
                                            <button className='btn btn-default btn-add' type="button" onClick={this.addSelectTable}>添加关联字段</button>
                                        </div>
                                    </div>


                                </div>
                                <div className='modal-footer'>
                                    <button type='button' className='btn btn-default' data-dismiss='modal' onClick={this.closeModal}>取消</button>
                                    <button type='button' className='btn btn-primary' id='submitParam' onClick={this.addOrUpdateLink}>保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    }
}

