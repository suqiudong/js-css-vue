/**
 * 数据集新建组件
 * User: gaogy
 * Date: 2016/1/12
 * Time: 20:10
 */
import React, { Component } from 'react';
import createiCheck from 'UTIL/baseiCheck';
import createList from 'UTIL/baseList';
import { error } from 'UTIL/notification';
import { baseValidate } from 'UTIL/baseValidate';

let dateFieldObj = {};
let prevVal = '';
let analyzerSelect = '';
let typeSelect = '<select name="type" class="form-control"><option value="string">string</option><option value="long">long</option><option value="double">double</option><option value="date">date</option><option value="geo_point">geo_point</option><option value="nested">nested</option></select>';
let storeSelect = '<select name="store" class="form-control"><option value="true">是</option><option value="false" selected>否</option></select>';
let indexSelect = '<select name="index" class="form-control"><option value="true" selected>是</option><option value="false">否</option></select>';
let keySelect = '<select class="form-control" name="key"><option value="true">是</option><option value="false" selected>否</option></select>';

class DateSetCreate extends Component {
    constructor(props) {
        super(props);
        this.isNameExistsHandler = this.isNameExistsHandler.bind(this);
        this.createDataSetHandler = this.createDataSetHandler.bind(this);
        this.changePartitionRangeHandler = this.changePartitionRangeHandler.bind(this);
        this.selectIndexHandler = this.selectIndexHandler.bind(this);
        this.selectTypeHandler = this.selectTypeHandler.bind(this);
        this.shardJudge = this.shardJudge.bind(this);
        this.replicationJudge = this.replicationJudge.bind(this);
        this.partitionRuleJudge = this.partitionRuleJudge.bind(this);
        this.validateHandler = this.validateHandler.bind(this);
        this.showPartitionRangeHandler = this.showPartitionRangeHandler.bind(this);
        this.partitionRuleHandler = this.partitionRuleHandler.bind(this);
        this.fieldInputHandler = this.fieldInputHandler.bind(this);
        this.focusVal = this.focusVal.bind(this);
        this.schemaValidate = this.schemaValidate.bind(this);
        this.isExistNameChange = this.isExistNameChange.bind(this);
    }

    componentWillMount() {
        this.props.getMaxSettingNums();
        this.props.listAnalyzers();
    }

    componentDidMount() {
        dateFieldObj = {};
        // 创建字段列表
        this.crateTableHandler();

        // 渲染单选控件
        createiCheck('input[ type = "radio"]');

        for (let key in this.props.dataset.dateFields) {
            delete this.props.dataset.dateFields[key];
        }
        $('div[name = "partitionArea"]').hide();
        // 控制分区信息显示
        this.showPartitionRangeHandler();
    }

    componentDidUpdate() {
        // 列模板
        let options = '';
        for (let i = 0; i < this.props.dataset.analyzers.length; i++) {
            options += '<option value="' + this.props.dataset.analyzers[i] + '">' + this.props.dataset.analyzers[i] + '</option>';
        }
        analyzerSelect = '<select name="analyzer" class="form-control" id="analyzer">' + options + '</select>';

        if (!$('#shard').val()) {
            $('#shard').val(this.props.dataset.maxSettingNums.maxShardNum);
        }
    }

    /**
     控制分区信息显示
     * */
    showPartitionRangeHandler() {
        $('input[name="isPartition"]').on('ifChanged', function() {
            if ($(this).val() == 'true') {
                $('div[name = "partitionArea"]').show();
            } else {
                $('#partitionRule', $('#datasetAdd')).val('');
                $('div[name = "partitionArea"]').hide();
            }
        })
    }

    /**
     * 控制分区范围
     */
    changePartitionRangeHandler(e) {
        let partitionRule = $(e.currentTarget).val();
        if (partitionRule === 'date') {
            $('select[name = "dateRange"]').removeClass('hide');
            $('span[name = "numRange"]').addClass('hide');
        } else if (partitionRule === 'number') {
            $('select[name = "dateRange"]').addClass('hide');
            $('span[name = "numRange"]').removeClass('hide');
        }

    }

    /**
     * 生成字段列表
     * @param data
     */
    crateTableHandler() {
        let that = this;
        // 构造列表配置项
        let tableConfig = {};

        tableConfig.id = 'schema';
        tableConfig.columns = [
            {
                className: 'textCenter',
                orderable: false,
                data: null,
                defaultContent: ''
            },
            { data: 'fieldName', orderable: false },
            { data: 'name', orderable: false },
            { data: 'type', orderable: false },
            { data: 'store', orderable: false },
            { data: 'index', orderable: false },
            { data: 'analyzer', orderable: false },
            { data: 'key', orderable: false },
            {
                className: '',
                orderable: false,
                data: null,
                defaultContent: ''
            }
        ];
        tableConfig.dom = '<"top">rt<"bottom"i>';
        tableConfig.scrollX = false;
        tableConfig.paging = false;
        tableConfig.createdRow = function(row, data, index) {
            $('td:eq(0)', row).html("<span class='row-details row-details-close mt10 hide'></span><i class='fa fa-circle-thin mt10'></i>");
            $('td:eq(8)', row).html("<i class='fa fa-trash-o' style='cursor: pointer;' title='删除'></i>");
        };

        // 获取列表内数据列
        tableConfig.data = [];
        // 生成列表
        let table = createList(tableConfig);

        // 绑定删除记录事件
        $('#schema').on('click', 'tbody td .fa-trash-o', function() {
            let tr = $(this).parents('tr');
            let fieldName = $(this).closest('tr').find('input.fieldName').val().trim();
            let row = table.row(tr);
            row.remove();
            table.draw();

            if ($(this).closest('tr').find('select[name = "type"]').val() == 'date') {
                delete dateFieldObj[fieldName];
            }
            that.props.setDateField(dateFieldObj);
            // 判断字段类型是否含有 date 类型
            let partitionFieldVal = [];
            for (let i = 0; i < $('select[name = "type"]').length; i++) {
                partitionFieldVal.push($('select[name = "type"]').eq(i).val());
            }
            if (partitionFieldVal.indexOf('date') !== -1) {
                $('#partitionField').prop('disabled', false);
            } else {
                $('#partitionField').prop('disabled', true);
            }
        });


        // 绑定列表展开事件
        $('#schema').on('click', 'tbody td .row-details', function() {
            let tr = $(this).parents('tr');
            let row = table.row(tr);
            if (row.child.isShown()) {
                for (var i = 0; i < $('input.fieldName').length; i++) {
                    if (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/.test($('input.fieldName', $(tr.next())).eq(i).val())) {
                        $('input.fieldName', $(tr.next())).eq(i).blur();
                        return;
                    }
                }
                $(this).addClass('row-details-close').removeClass('row-details-open');
                let childTr = row.child().find('tbody tr');
                let childFields = [];
                for (let i = 0; i < $(childTr).length; i++) {
                    let currentRow = $(childTr)[i];
                    if ($('input.fieldName', $(currentRow)).length != 0) {
                        let fieldObj = {};
                        // 字段名
                        fieldObj.fieldName = $('input.fieldName', $(currentRow)).val();
                        // 字段中文名
                        fieldObj.name = $('input.name', $(currentRow)).val();
                        // 字段类型
                        let type = $('select[name = "type"]', $(currentRow)).val();// 字段类型
                        fieldObj.type = type;
                        if (type === 'date') {
                            fieldObj.format = 'yyyy-MM-dd HH:mm:ss';
                        }
                        fieldObj.store = $('select[name = "store"]', $(currentRow)).val();
                        // 字段类型
                        let index = $('select[name = "index"]', $(currentRow)).val();
                        // 字段类型
                        let analyzer = $('select[name = "analyzer"]', $(currentRow)).val();
                        if ($('input.fieldName', $(currentRow)).length != 0) {
                            if (index == 'false') {
                                fieldObj.index = 'no';
                            } else if (type != 'string') {
                                fieldObj.index = 'not_analyzed';
                            } else if (type == 'string' && analyzer == 'not_analyzed') {
                                fieldObj.index = 'not_analyzed';
                            } else if (type == 'string' && analyzer != 'not_analyzed') {
                                fieldObj.index = 'analyzed';
                                fieldObj.analyzer = analyzer;
                            }
                        }

                        // 主键
                        fieldObj.key = $('select[name = "key"]', $(currentRow)).val();
                        childFields.push(fieldObj);
                    }
                }
                tr.attr('schema', JSON.stringify(childFields));
                row.child.hide();
            } else {
                $(this).addClass('row-details-open').removeClass('row-details-close');
                    // 子行列表存在时不需重新创建
                if (row.child()) {
                    row.child.show();
                    return;
                }

                // 插入嵌套列表
                row.child(`<div id="nestRow_${row.index()}"><button type="submit" name="createNested" class="btn btn-sm btn-default mb5">
                                <i class="fa fa-fw fa-plus-circle"></i>
                                添加子字段
                           </button>
                           <table id="nestTable_${row.index()}"  class="table table-bordered" width="100%">
                           <thead>
                               <tr>
                                   <th>子字段名</th>
                                   <th>子字段描述</th>
                                   <th>子字段类型</th>
                                   <th>存储</th>
                                   <th>索引</th>
                                   <th>分词</th>
                                   <th>主键</th>
                                   <th>操作</th>
                               </tr>
                           </thead>
                        </table></div>`).show();

                // 嵌套列表配置项
                let nestedTableConfig = {};
                nestedTableConfig.id = 'nestTable_' + row.index();
                nestedTableConfig.columns = [
                    { data: 'fieldName', orderable: false },
                    { data: 'name', orderable: false },
                    { data: 'type', orderable: false },
                    { data: 'store', orderable: false },
                    { data: 'index', orderable: false },
                    { data: 'analyzer', orderable: false },
                    { data: 'key', orderable: false },
                    {
                        className: '',
                        orderable: false,
                        data: null,
                        defaultContent: ''
                    }
                ];
                nestedTableConfig.createdRow = function(row, data, index) {
                    $('td:eq(7)', row).html("<i class='fa fa-trash-o' style='cursor: pointer;' title='删除'></i>");
                };
                nestedTableConfig.paging = false;
                nestedTableConfig.dom = '<"top">rt<"bottom"i>';
                nestedTableConfig.scrollX = false;

                // 获取列表内数据列
                nestedTableConfig.data = [];
                // 生成嵌套列表
                let nestedTable = createList(nestedTableConfig);

                // 绑定删除子列表事件
                $('#nestTable_' + row.index()).on('click', 'tbody td .fa-trash-o', function() {
                    let tr = $(this).parents('tr');
                    let row = nestedTable.row(tr);
                    row.remove();
                    nestedTable.draw();
                    let fieldName = $(this).closest('tr').find('input.fieldName').val().trim();
                    if ($(this).closest('tr').find('select[name = "type"]').val() == 'date') {
                        delete dateFieldObj[fieldName];
                    }
                    that.props.setDateField(dateFieldObj);
                    // 判断字段类型是否含有 date 类型
                    let partitionFieldVal = [];
                    for (let i = 0; i < $('select[name = "type"]').length; i++) {
                        partitionFieldVal.push($('select[name = "type"]').eq(i).val());
                    }
                    if (partitionFieldVal.indexOf('date') !== -1) {
                        $('#partitionField').prop('disabled', false);
                    } else {
                        $('#partitionField').prop('disabled', true);
                    }
                });

                // 添加嵌套列表字段
                $('button[name = "createNested"]', $('#nestRow_' + row.index())).off('click').on('click', function() {
                    var table = $('#nestTable_' + row.index()).DataTable();
                    table.row.add({
                        'data': '',
                        'fieldName': '<div class="fieldNameDiv form-group"><input type="text" placeholder="支持英文、数字、下划线" name="fieldName" maxlength= "30" class="fieldName form-control"><span class="messages"></span></div>',
                        'name': '<input type="text" class="name form-control">',
                        'type': '<select name="type" class="form-control"><option value="string">string</option><option value="long">long</option><option value="double">double</option><option value="date">date</option><option value="geo_point">geo_point</option></select>',
                        'store': '<select name="store" class="form-control"><option value="true">是</option><option value="false" selected>否</option></select>',
                        'index': '<select name="index" class="form-control"><option value="true">是</option><option value="false">否</option></select>',
                        'analyzer': analyzerSelect,
                        'key': '<select class="form-control"  name="key" id="key"><option value="true">是</option><option value="false" selected>否</option></select>'
                    }).draw();

                    $('input.fieldName', $('#nestTable_' + row.index())).focus(function(e) {
                        if ($(e.currentTarget).val().trim() != '') {
                            prevVal = $(e.currentTarget).val().trim();
                        }
                    });
                    // 嵌套字段名的 失焦事件
                    $('input.fieldName', $('#nestTable_' + row.index())).blur(function(e) {
                        let constraints = {
                            'fieldName': {
                                // 必填
                                presence: {
                                    message: '请输入字段名(同级字段不能重名)'
                                },
                                format: {
                                    pattern: '^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$',
                                    message: '请输入合法字段名'
                                }
                            }
                        }
                        baseValidate($(e.currentTarget).closest($('.fieldNameDiv')), constraints);
                    });
                    // 嵌套字段名修改处理;
                    $('input.fieldName', $('#nestTable_' + row.index())).change(function(e) {
                        let fieldName = $(e.currentTarget).val().trim();
                        let type = $(e.currentTarget).closest('tr').find('select[name="type"]').val();
                        let fieldNameArr = [];
                        $('input.fieldName', $('#nestTable_' + row.index())).not($(e.currentTarget)).each(function(i, e) {
                            if ($(e).val().trim() != '') {
                                fieldNameArr.push($(e).val());
                            }
                        });
                        if (fieldNameArr.indexOf(fieldName) != -1) {
                            $(e.currentTarget).val('');
                            $(e.currentTarget).focus();
                            return;
                        }
                        $('input.fieldName', $('#nestTable_' + row.index())).each(function() {
                            fieldNameArr.push($(this).val())
                        });
                        if (fieldName == '') {
                            delete dateFieldObj[prevVal];
                        } else if (type == 'date') {
                            delete dateFieldObj[prevVal];
                            dateFieldObj[fieldName] = fieldName;
                        }
                        that.props.setDateField(dateFieldObj)
                    });
                    // 嵌套字段 类型 处理
                    $('select[name = "type"]', $('#nestTable_' + row.index())).change(function() {
                        if ($(this).val() === 'string' && $(this).closest('tr').find('select[name = "index"]').val() == 'true') {
                            $(this).closest('tr').find('select[name = "analyzer"]').prop('disabled', false);
                        } else {
                            $(this).closest('tr').find('select[name = "analyzer"]').prop('disabled', true);
                        }
                        let currentType = $(this).val();
                        let fieldName = $(this).closest('tr').find('input.fieldName').val().trim();
                        // 存储事件类型字段
                        if (currentType === 'date' && fieldName != '') {
                            dateFieldObj[fieldName] = fieldName;
                        } else {
                            delete dateFieldObj[fieldName];
                        }
                        that.props.setDateField(dateFieldObj);
                        // 判断字段类型是否含有 date 类型
                        let partitionFieldVal = [];
                        for (let i = 0; i < $('select[name = "type"]').length; i++) {
                            partitionFieldVal.push($('select[name = "type"]').eq(i).val());
                        }
                        if (partitionFieldVal.indexOf('date') !== -1) {
                            $('#partitionField').prop('disabled', false);
                        } else {
                            $('#partitionField').prop('disabled', true);
                        }

                    });
                    // 索引选择处理
                    $('select[name = "index"]', $('#nestTable_' + row.index())).change(function() {
                        if ($(this).val() === 'true' && $(this).closest('tr').find('select[name = "type"]').val() == 'string') {
                            $(this).closest('tr').find('select[name = "analyzer"]').prop('disabled', false);
                        } else {
                            $(this).closest('tr').find('select[name = "analyzer"]').prop('disabled', true);
                        }
                    });
                });
            }
        });
    }
    /**
     * 判断数据集名称是否存在且输入格式正确
     */
    isNameExistsHandler() {
        let constraints = {
            'datasetName': {
                // 必填
                presence: {
                    message: '请输入数据集名'
                },
                format: {
                    pattern: '^(?!_)(?!.*?_$)[a-z0-9_]+$',
                    // message: '请输入正确的数据集名'
                    message: '不能为空，命名格式为小写英文字母和数字组成、除下划线外不能包含特殊字符，下划线不能出现在开头和结尾'
                },
                length: {
                    maximum: 30,
                    message: '不能超过30个字符'
                }
            }
        };
        baseValidate($('.datasetNameDiv'), constraints);
        if ($('#datasetName', $('#datasetAdd')).val().trim() != '') {
            let exist = this.props.dataset.isExists;
            if (exist) {
                let constraints = {
                    'datasetName': {
                        format: {
                            pattern: '!^(?!_)(?!.*?_$)[a-z0-9_]+$',
                            message: '数据集名已存在, 请重新输入 !'
                        }
                    }
                };
                baseValidate($('.datasetNameDiv'), constraints);
                return;
            };
        }
    }
    isExistNameChange() {
        if ($('#datasetName', $('#datasetAdd')).val().trim() != '') {
            this.props.isExists($('#datasetName', $('#datasetAdd')).val());
        }
    }

    /**
     * 分片数校验
     */
    shardJudge(e) {
        let constraints = {
            'shard': {
                presence: {
                    message: '请输入分片数'
                },
                numericality: {
                    onlyInteger: true,
                    notInteger: '请输入整数',
                    notValid: '请输入数字',
                    greaterThanOrEqualTo: 1,
                    lessThanOrEqualTo: parseInt(e.target.max, 10),
                    notGreaterThanOrEqualTo: '最小值应大于等于 1',
                    notLessThanOrEqualTo: '最大值应小于等于 ' + e.target.max
                }
            }
        }
        baseValidate($('.shardJudgeDiv'), constraints);
    }
    /**
     * 副本数校验
     */
    replicationJudge(e) {
        let constraints = {
            'replication': {
                presence: {
                    message: '请输入副本数'
                },
                numericality: {
                    onlyInteger: true,
                    notInteger: '请输入整数',
                    notValid: '请输入数字',
                    greaterThanOrEqualTo: 0,
                    lessThanOrEqualTo: parseInt(e.target.max, 10),
                    notGreaterThanOrEqualTo: '最小值为 0',
                    notLessThanOrEqualTo: '最大值应小于等于 ' + e.target.max
                }
            }
        }
        baseValidate($('.replicationJudgeDiv'), constraints);
    }
    /**
     * 分区规则校验
     */
    partitionRuleJudge(e) {
        let constraints = {
            'partitionRule': {
                presence: $('input[name="isPartition"]:checked').val() != 'true' ? false : {
                    message: '请输入分区规则数'
                },
                numericality: {
                    onlyInteger: true,
                    notInteger: '请输入整数',
                    notValid: '请输入数字',
                    greaterThanOrEqualTo: 1,
                    notGreaterThanOrEqualTo: '最小值为 1',
                    lessThanOrEqualTo: 1024,
                    notLessThanOrEqualTo: '最大值不能超过 1024'
                }
            }
        }
        baseValidate($('#partitionRuleDiv'), constraints);
    }

    /**
     * 校验函数
     */
    validateHandler() {
        let constraints = {
            'datasetName': {
                presence: {
                    message: '请输入数据集名'
                },
                format: {
                    pattern: '^(?!_)(?!.*?_$)[a-z0-9_]+$',
                    message: '请输入正确的数据集名'
                }
            },
            'shard': {
                presence: {
                    message: '请输入分片数'
                },
                numericality: {
                    onlyInteger: true,
                    notInteger: '请输入整数',
                    notValid: '请输入数字',
                    greaterThanOrEqualTo: 1,
                    lessThanOrEqualTo: this.props.dataset.maxSettingNums.maxShardNum,
                    notGreaterThanOrEqualTo: '最小值应大于等于 1',
                    notLessThanOrEqualTo: '最大值应小于等于 ' + this.props.dataset.maxSettingNums.maxShardNum
                }
            },
            'replication': {
                presence: {
                    message: '请输入副本数'
                },
                numericality: {
                    onlyInteger: true,
                    notInteger: '请输入整数',
                    notValid: '请输入数字',
                    greaterThanOrEqualTo: 0,
                    lessThanOrEqualTo: this.props.dataset.maxSettingNums.maxReplicationNum,
                    notGreaterThanOrEqualTo: '最小值为 0',
                    notLessThanOrEqualTo: '最大值为 ' + this.props.dataset.maxSettingNums.maxReplicationNum
                }
            },
            'partitionRule': {
                presence: $('input[name="isPartition"]:checked').val() != 'true' ? false : {
                    message: '请输入分区规则数'
                },
                numericality: {
                    onlyInteger: true,
                    notInteger: '请输入整数',
                    notValid: '请输入数字',
                    greaterThanOrEqualTo: 1,
                    notGreaterThanOrEqualTo: '最小值为 1',
                    lessThanOrEqualTo: 1024,
                    notLessThanOrEqualTo: '最大值不能超过 1024'
                }
            }
        };
        baseValidate($('#datasetAdd'), constraints);
    }

    /**
     * 字段名校验
     */
    schemaValidate (e) {
        let constraints = {
            'fieldName': {
                // 必填
                presence: {
                    message: '请输入字段名(同级字段不能重名)'
                },
                format: {
                    pattern: '^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$',
                    message: '请输入合法字段名'
                }
            }
        }
        baseValidate($(e.currentTarget).closest($('.fieldNameDiv')), constraints);
    }
    /**
     * 新建数据集事件
     */
    createDataSetHandler() {
        if ($('input.fieldName').length == 0) {
            if ($('input[name = "isPartition"]:checked', $('#datasetAdd')).val() == 'true') {
                error('没有字段不能设置分区！');
                return;
            }
        } else {
            for (var i = 0; i < $('input.fieldName').length; i++) {
                if ($('input.fieldName').eq(i).val() == '') {
                    $('input.fieldName').eq(i).blur();
                    return;
                }
            }
        }

        this.validateHandler();

        if ($('span.messages').find('p').length > 0) {
            return;
        };
        /*
        if ($('#shard', $('#datasetAdd')).val().trim() == '') {
            $('#shard', $('#datasetAdd')).val(this.props.dataset.maxSettingNums.maxShardNum / 10);
            warning('分片数输入为空，将默认为节点数！');
            return;
        }
        if ($('#replication', $('#datasetAdd')).val().trim() == '') {
            warning('副本数输入为空将默认为 1！');
            $('#replication', $('#datasetAdd')).val(1);
            return;
        }
        */


        if ($('input[name = "isPartition"]:checked', $('#datasetAdd')).val() == 'true' && $('#partitionField', $('#datasetAdd')).val() == '') {
            error('请选择分区字段！');
            return;
        }

        if ($('input[name = "isPartition"]:checked', $('#datasetAdd')).val() == 'true' && $('#partitionRule', $('#datasetAdd')).val().trim() == '') {
            this.validateHandler();
            return;
        }

        let datasetObj = {};
        // 数据集名称
        datasetObj.datasetName = $('#datasetName', $('#datasetAdd')).val();
        // 是否分区
        datasetObj.isPartition = $('input[name = "isPartition"]:checked', $('#datasetAdd')).val();
        // 构造分区信息
        if (datasetObj.isPartition == 'true') {
            datasetObj.partitionField = $('#partitionField', $('#datasetAdd')).val();
            datasetObj.partitionRule = $('#partitionRule', $('#datasetAdd')).val() + $('#partitionRuleSelect', $('#datasetAdd')).val();
        }
        // 可见性
        datasetObj.visable = $('input[name = "isVisible"]:checked', $('#datasetAdd')).val();
        // 分片数
        datasetObj.shard = $('#shard', $('#datasetAdd')).val();
        // 副本数
        datasetObj.replication = $('#replication', $('#datasetAdd')).val();
        // 表结构
        datasetObj.schema = {};
        // owner
        datasetObj.owner = sessionStorage.getItem('XDataUserName');
        datasetObj.schema.properties = [];

        // 关闭嵌套字段
        $('span.row-details-open', $('#schema')).click();
        if ($('input.fieldName', $('#schema')).length != 0) {
            for (let i = 0; i < $('tbody tr', $('#schema')).length; i++) {
                let currentRow = $('tbody tr', $('#schema'))[i];
                let index = $('select[name = "index"]', $(currentRow)).val();
                let type = $('select[name = "type"]', $(currentRow)).val();
                let analyzer = $('select[name = "analyzer"]', $(currentRow)).val();

                let fieldObj = {};
                // 字段名
                fieldObj.fieldName = $('input.fieldName', $(currentRow)).val();
                // 字段中文名
                fieldObj.name = $('input.name', $(currentRow)).val();
                // 字段类型
                fieldObj.type = type;
                if (type === 'date') {
                    fieldObj.format = 'yyyy-MM-dd HH:mm:ss';
                }
                // 判断是否为嵌套结构
                if (type === 'nested') {
                    fieldObj.schema = $(currentRow).attr('schema') ? JSON.parse($(currentRow).attr('schema')) : [];
                } else {
                    // 字段类型
                    fieldObj.store = $('select[name = "store"]', $(currentRow)).val();
                    // 主键
                    fieldObj.key = $('select[name = "key"]', $(currentRow)).val();

                    // 索引 分词设置规则：
                    // 1. 索引选是，字段类型string，不分词：index:not_analyzed;
                    // 2. 索引选否：index：no;
                    // 3. 索引选是，字段类型string，分词：analyzer:standard （选择的分词器） index属性默认是analyzed;
                    if ($('input.fieldName', $(currentRow)).length != 0) {
                        if (index == 'false') {
                            fieldObj.index = 'no';
                        } else if (type != 'string') {
                            fieldObj.index = 'not_analyzed';
                        } else if (type == 'string' && analyzer == 'not_analyzed') {
                            fieldObj.index = 'not_analyzed';
                        } else if (type == 'string' && analyzer != 'not_analyzed') {
                            fieldObj.index = 'analyzed';
                            fieldObj.analyzer = analyzer;
                        }
                    }
                }
                datasetObj.schema.properties.push(fieldObj);
            }
        }

        this.props.createDataset(datasetObj)
        if (this.props.dataset.code.code == '0') {
            setTimeout(() => {
                this.props.history.replace('/dataSet');
            }, 500)
        } else {
            return;
        }
    }

    /**
     * 添加行事件
     */
    handleCreateHandler() {
        // 插入行
        let table = $('#schema').DataTable();
        table.row.add({
            'data': '',
            'fieldName': '<div class="fieldNameDiv form-group"><input type="text" name="fieldName" placeholder="支持英文、数字、下划线" maxlength= "30" class="fieldName fieldNamer form-control"><span class="messages"></span></div>',
            'name': '<input type="text" class="name form-control">',
            'type': typeSelect,
            'store': storeSelect,
            'index': indexSelect,
            'analyzer': analyzerSelect,
            'key': keySelect
        }).draw();

        $('input.fieldName', $('#schema')).focus(this.focusVal);
        // 字段名修改事件
        // $('input.fieldName', $('#schema')).change(this.fieldInputHandler);
        $('input.fieldName', $('#schema')).blur(this.fieldInputHandler);
        // 嵌套类型字段处理
        $('select[name = "type"]', $('#schema')).change(this.selectTypeHandler);
        // 索引选择处理
        $('select[name = "index"]', $('#schema')).change(this.selectIndexHandler);
    };

    /**
     * 父字段名失焦/ 重复字段名 校验
     */
    focusVal(e) {
        if ($(e.currentTarget).val().trim() != '') {
            prevVal = $(e.currentTarget).val().trim();
        }
    }
    fieldInputHandler(e) {
        let fieldName = $(e.currentTarget).val().trim();
        let type = $(e.currentTarget).closest('tr').find('select[name="type"]').val();
        let fieldNameArr = [];
        this.schemaValidate(e);
        $('input.fieldNamer').not($(e.currentTarget)).each(function(i, e) {
            if ($(e).val().trim() != '') {
                fieldNameArr.push($(e).val());
            }
        });
        if (fieldNameArr.indexOf(fieldName) != -1) {
            $(e.currentTarget).val('');
            $(e.currentTarget).blur();
            return;
        }
        if (fieldName == '') {
            delete dateFieldObj[prevVal];
            this.props.setDateField(dateFieldObj);
            return;
        } else if (type == 'date') {
            delete dateFieldObj[prevVal];
            dateFieldObj[fieldName] = fieldName;
            this.props.setDateField(dateFieldObj);
        }
    }

    /**
     * 选择索引事件
     * @param e
     */
    selectIndexHandler(e) {
        let currentIndex = $(e.currentTarget).val();
        // 类型为string，且索引时，分词器可用
        if (currentIndex === 'true' && $(e.currentTarget).closest('tr').find('select[name = "type"]').val() == 'string') {
            $(e.currentTarget).closest('tr').find('select[name = "analyzer"]').prop('disabled', false);
        } else {
            $(e.currentTarget).closest('tr').find('select[name = "analyzer"]').prop('disabled', true);
        }
    }


    /**
     * 类型选择事件
     * @param e
     */
    selectTypeHandler(e) {
        let currentType = $(e.currentTarget).val();
        let fieldName = $(e.currentTarget).closest('tr').find('input.fieldName').val().trim();
        if (currentType === 'nested') {
            // 展开嵌套字段操作按钮显示
            $(e.currentTarget).closest('tr').find('span.row-details-close').click();
            $('span.row-details', $(e.currentTarget).closest('tr')).removeClass('hide');
            $('i.fa-circle-thin', $(e.currentTarget).closest('tr')).addClass('hide');

            // 【存储、索引、主键、分词器】不可编辑
            $(e.currentTarget).closest('tr').find('select[name = "store"]').prop('disabled', true);
            $(e.currentTarget).closest('tr').find('select[name = "index"]').prop('disabled', true);
            $(e.currentTarget).closest('tr').find('select[name = "key"]').prop('disabled', true);
            $(e.currentTarget).closest('tr').find('select[name = "analyzer"]').prop('disabled', true);
            delete dateFieldObj[fieldName];
        } else {
            // 展开嵌套字段操作按钮隐藏
            let table = $('#schema').DataTable();
            let tr = $(e.currentTarget).parents('tr');
            let row = table.row(tr);
            if (row.child.isShown()) {
                $('tbody td .fa-trash-o', $('#nestTable_' + row.index())).click();
                $(e.currentTarget).closest('tr').find('span.row-details-open').addClass('row-details-close').removeClass('row-details-open');
                row.child.remove();
            };
            // $(e.currentTarget).closest('tr').find('span.row-details-open').click();
            $('span.row-details', $(e.currentTarget).closest('tr')).addClass('hide');
            $('i.fa-circle-thin', $(e.currentTarget).closest('tr')).removeClass('hide');
            // 【存储、索引、主键、分词器】可编辑
            $(e.currentTarget).closest('tr').find('select[name = "store"]').prop('disabled', false);
            $(e.currentTarget).closest('tr').find('select[name = "index"]').prop('disabled', false);
            $(e.currentTarget).closest('tr').find('select[name = "key"]').prop('disabled', false);
            $(e.currentTarget).closest('tr').find('select[name = "analyzer"]').prop('disabled', false);

            // 存储事件类型字段
            if (currentType === 'date' && fieldName != '') {
                dateFieldObj[fieldName] = fieldName;
            } else {
                delete dateFieldObj[fieldName];
            }
            this.props.setDateField(dateFieldObj);
            // 类型为string，且索引时，分词器可用
            if (currentType === 'string' && $(e.currentTarget).closest('tr').find('select[name = "index"]').val() == 'true') {
                $(e.currentTarget).closest('tr').find('select[name = "analyzer"]').prop('disabled', false);
            } else {
                $(e.currentTarget).closest('tr').find('select[name = "analyzer"]').prop('disabled', true);
            }
        }

        // 判断字段类型是否含有 date 类型
        let partitionFieldVal = [];
        for (let i = 0; i < $('select[name = "type"]').length; i++) {
            partitionFieldVal.push($('select[name = "type"]').eq(i).val());
        }
        if (partitionFieldVal.indexOf('date') !== -1) {
            $('#partitionField').prop('disabled', false);
        } else {
            $('#partitionField').prop('disabled', true);
        }

        // 判断input值不为空
        /*
        for (var i = 0; i < $('input.fieldName').length; i++) {
            if ($('input.fieldName').eq(i).val() == '') {
                error('请输入字段名！');
                return;
            }
        }
        */
    };

    /**
     * 分区规则的下拉框点击事件
     * @returns {XML}
     */
    partitionRuleHandler() {
        for (let i = 0; i < $('input.fieldName').length; i++) {
            let fieldName = $('input.fieldName').eq(i).val().trim();
            let type = $('input.fieldName').eq(i).closest('tr').find('select[name="type"]').val();
            if (fieldName != '' && type == 'date') {
                dateFieldObj[fieldName] = fieldName;
                this.props.setDateField(dateFieldObj);
            }
        }
    }
    render() {
        let optionsTpl = [<option value=''>请选择</option>];
        for (let key in this.props.dataset.dateFields) {
            optionsTpl.push(<option value={key}>{this.props.dataset.dateFields[key]}</option>);
        }
        return (
            <div id="datasetAdd">
                <div className="box box-primary">
                    <div className="box-header with-border ">
                        <p className="box-title">基本信息</p>
                    </div>
                    <div className="box-body">
                        <div className="row">
                            <div className="datasetNameDiv col-md-6 form-group">
                                <label htmlFor="datasetName" ><span className="identify">* </span>名称 : </label><span className="messages"></span>
                                <input type="text" id="datasetName" maxLength={30} name="datasetName" className="form-control" placeholder="30个字符以内，只允许含有小写英文、数字和下划线且下划线不能放首尾" onChange = {this.isExistNameChange} onBlur={ this.isNameExistsHandler }/>
                            </div>
                            <div name='isPartition' className="form-group col-md-3">
                                <label htmlFor="isPartition">是否分区 : </label>
                                <div className="radio">
                                    <label>
                                        <input name="isPartition" type="radio" value="true" />
                                        &nbsp;是
                                    </label>
                                    <label className="ml20">
                                        <input name="isPartition" type="radio" value="false" defaultChecked/>
                                        &nbsp;否
                                    </label>
                                </div>
                            </div>

                            <div name='isVisible' className="form-group col-md-3">
                                <label htmlFor="isVisible">可见性 : </label>
                                <div className="radio">
                                    <label>
                                        <input name="isVisible" type="radio" value="PUBLIC" defaultChecked />
                                        &nbsp;共享
                                    </label>
                                    <label className="ml20">
                                        <input name="isVisible" type="radio" value="PRIVATE" />
                                        &nbsp;私有
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="shardJudgeDiv col-md-6 form-group">
                                <label><span className="identify">* </span>分片数 : </label><span className="messages"></span>
                                <input type="text" name="shard" id="shard" min='1' onBlur={ this.shardJudge } max={ this.props.dataset.maxSettingNums.maxShardNum } className="form-control" placeholder={'1 <= 分片数 <= ' + this.props.dataset.maxSettingNums.maxShardNum}/>
                            </div>

                            <div className="replicationJudgeDiv col-md-6 form-group">
                                <label><span className="identify">* </span>副本数 : </label><span className="messages"></span>
                                <input type="text" name="replication" id="replication" onBlur={ this.replicationJudge } min='0' max={ this.props.dataset.maxSettingNums.maxReplicationNum } defaultValue={1} className="form-control" placeholder={'0 <= 副本数 <= ' + this.props.dataset.maxSettingNums.maxReplicationNum}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box box-primary">
                    <div className="box-header with-border ">
                        <p className="box-title" >字段 <small> （下划线不能放在字段名首尾 且 同级字段名不能相同）</small></p>
                    </div>
                    <div className="row box-body">
                        <div className="col-md-12">
                            <div className="box-header pull-left">
                                <button type="submit" name="createDataset" className="btn btn-primary" onClick={this.handleCreateHandler.bind(this)}>
                                    <i className="fa fa-fw fa-plus-circle" style={{verticalAlign: 'middle', padding: '0 8px 0 0'}}></i>
                                    添加字段
                                </button>
                            </div>
                            <div className="box-body">
                                <table id="schema" className="table table-striped table-bordered" style={{ width: '100%' }}>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>字段名</th>
                                        <th>字段描述</th>
                                        <th>字段类型</th>
                                        <th>存储</th>
                                        <th>索引</th>
                                        <th>分词</th>
                                        <th>主键</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div name="partitionArea" id="partitionArea" className="box box-primary">
                    <div className="box-header with-border">
                        <p className="box-title">设置分区 <small> （新建字段需包含 [date] 类型且字段名不为空）</small></p>
                    </div>
                    <div className="partition box-body">
                        <div className="partitionDetails row">
                            <div className="form-group col-md-6">
                                <label htmlFor="partitionField">分区字段</label><span className="messages"></span>
                                <select onMouseEnter = {this.partitionRuleHandler} name="partitionField" id="partitionField" disabled className="form-control" style={{ width: '100%' }}>
                                    { optionsTpl }
                                </select>
                            </div>
                            <div className="col-md-6 row">
                                <div id="partitionRuleDiv" className="form-group col-md-6" style={{ width: '86%' }}>
                                    <label htmlFor="partitionRule">分区规则</label>
                                    <span className="messages"></span>
                                    <div>
                                        <input type="text" onBlur={ this.partitionRuleJudge } id="partitionRule" name="partitionRule" min='1' className="distanceNum form-control left" />
                                    </div>
                                </div>
                                <div className="col-md-6" style={{ width: '13%', marginTop: '25px' }}>
                                    <select id="partitionRuleSelect" className="form-control ml5 left">
                                        <option value="d" selected>天</option>
                                        <option value="w">周</option>
                                        <option value="M">月</option>
                                        <option value="y">年</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button name="saveBtn" className="btn btn-primary" onClick={ this.createDataSetHandler } ><i className="fa fa-save" ></i> 保存</button>
            </div>
        )
    }
}
export default DateSetCreate;
