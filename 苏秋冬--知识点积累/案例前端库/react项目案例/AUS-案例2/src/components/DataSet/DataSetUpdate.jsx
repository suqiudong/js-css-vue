/**
 * 数据集更新组件
 * User: gaogy
 * Date: 2016/1/13
 * Time: 16:10
 */
import React, { Component } from 'react';
import createiCheck from 'UTIL/baseiCheck';
import createList from 'UTIL/baseList';
import { error } from 'UTIL/notification';
import { cutStr } from 'UTIL/util';
import { baseValidate } from 'UTIL/baseValidate';


let property = '';
let dateFieldObj = {};
let analyzerSelect = '';
let typeSelect = '<select name="type" class="form-control"><option value="string">string</option><option value="long">long</option><option value="double">double</option><option value="date">date</option><option value="geo_point">geo_point</option><option value="nested">nested</option></select>';
let storeSelect = '<select name="store" class="form-control"><option value="true">是</option><option value="false" selected>否</option></select>';
let indexSelect = '<select name="index" class="form-control"><option value="true" selected>是</option><option value="false">否</option></select>';
let keySelect = '<select class="form-control" name="key"><option value="true">是</option><option value="false" selected>否</option></select>';

class DataSetUpdate extends Component {
    constructor(props) {
        super(props);
        this.createDataSetHandler = this.createDataSetHandler.bind(this);
        this.selectIndexHandler = this.selectIndexHandler.bind(this);
        this.selectTypeHandler = this.selectTypeHandler.bind(this);
        this.fieldDetailHandler = this.fieldDetailHandler.bind(this);
        this.createNestedFieldHandler = this.createNestedFieldHandler.bind(this);
        this.replicationJudge = this.replicationJudge.bind(this);
        this.fieldInputHandler = this.fieldInputHandler.bind(this);
        this.schemaValidate = this.schemaValidate.bind(this);
    }

    componentWillMount() {
        this.props.getDataset(this.props.params.datasetName);
        this.props.getMaxSettingNums();
        this.props.listAnalyzers();
    };
    componentDidUpdate() {
        this.crateTableHandler();
        property = this.props.dataset.selectedRecord.schema.properties;
        // 列模板
        let options = '';
        for (let i = 0; i < this.props.dataset.analyzers.length; i++) {
            options += '<option value="' + this.props.dataset.analyzers[i] + '">' + this.props.dataset.analyzers[i] + '</option>';
        }
        analyzerSelect = '<select name="analyzer" class="form-control" id="analyzer">' + options + '</select>';
    }
    componentDidMount() {
        // 设置默认值
        if (this.props.dataset.selectedRecord.isPartition == false) {
            $('div[name = "partitionArea"]').hide();
        }
        if (this.props.dataset.selectedRecord.isPartition == true) {
            $('input[name="isPartition"][value="true"]', $('#datasetUpdate')).attr('checked', true);
        } else {
            $('input[name="isPartition"][value="false"]', $('#datasetUpdate')).attr('checked', true);
        }
        if (this.props.dataset.selectedRecord.visable == 'PRIVATE') {
            $('input[name="isVisible"][value="PRIVATE"]', $('#datasetUpdate')).attr('checked', true);
        } else {
            $('input[name="isVisible"][value="PUBLIC"]', $('#datasetUpdate')).attr('checked', true);
        }
        $('input[name="isVisible"]:checked', $('#datasetUpdate')).attr('checked', true);
        $('input[name = "isPartition"]', $('#datasetUpdate')).attr('disabled', 'disabled');
        createiCheck('input[ type = "radio"]');
        // 创建字段列表
        // 列模板
        /*
         let options = '';
         /*
         for (let i = 0; i < this.props.dataset.analyzers.length; i++) {
         options += '<option value="' + this.props.dataset.analyzers[i] + '">' + this.props.dataset.analyzers[i] + '</option>';
         }
         analyzerSelect = '<select name="analyzer" class="form-control" disabled id="analyzer">' + options + '</select>';
         */
    }

    /**
     * 控制分区范围
     */
    /*
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
    */

    /**
     * 生成字段列表
     * @param data
     */
    crateTableHandler() {
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
            { data: 'fieldName',
                render: function (data, type, row) {
                    if (data) {
                        if (data.indexOf('<input') != -1) {
                            return data;
                        } else {
                            return cutStr(data, 15)
                        }
                    } else {
                        return data
                    }
                },
                orderable: false },
            { data: 'name',
                render: function (data, row, meta) {
                    if (data) {
                        if (data.indexOf('<input') != -1) {
                            return data;
                        } else {
                            return cutStr(data, 15);
                        }
                    } else {
                        return data
                    }
                },
                orderable: false },
            { data: 'type', orderable: false },
            { data: 'store',
                render: function (data, type, row, meta) {
                    if (row.type == 'nested') {
                        return '-';
                    } else if (data == 'false') {
                        return '否';
                    } else if (data == 'true') {
                        return '是';
                    }
                },
                orderable: false, defaultContent: storeSelect },
            { data: 'index',
                render: function (data, type, row, meta) {
                    if (row.type == 'nested') {
                        return '-';
                    } else if (data == 'not_analyzed' || data == 'analyzed') {
                        return '是';
                    } else if (data == 'no') {
                        return '否';
                    }
                },
                orderable: false, defaultContent: indexSelect },
            { data: 'analyzer', orderable: false, defaultContent: '-'},
            { data: 'key',
                render: function (data, type, row) {
                    if (row.type == 'nested') {
                        return '-';
                    } else if (data == 'false') {
                        return '否';
                    } else if (data == 'true') {
                        return '是';
                    }
                },
                orderable: false, defaultContent: keySelect },
            {
                className: '',
                orderable: false,
                data: 'operation',
                defaultContent: '-'
            }
        ];
        tableConfig.dom = '<"top">rt<"bottom"i>';
        tableConfig.scrollX = false;
        tableConfig.paging = false;
        tableConfig.createdRow = function (row, data, index) {
            let detailTpl = "<span class='row-details row-details-close mt10 hide'></span><i class='fa fa-circle-thin mt10'></i>";
            if (data.type === 'nested') {
                detailTpl = "<span class='row-details row-details-close mt10'></span>";
            }
            if (data.fieldName.indexOf('<input') == -1) {
                $('td:eq(1)', row).attr('title', data.fieldName)
            }
            if (data.name.indexOf('<input') == -1) {
                $('td:eq(2)', row).attr('title', data.name);
            }
            $('td:eq(0)', row).html(detailTpl);
        };

        // 获取列表内数据列
        tableConfig.data = this.props.dataset.selectedRecord.schema.properties;

        // 生成列表
        let table = createList(tableConfig);

        // 绑定删除记录事件
        $('#schema').on('click', 'tbody td .fa-trash-o', function () {
            let tr = $(this).parents('tr');
            let row = table.row(tr);
            row.remove();
            table.draw();
        });
        // 绑定列表展开事件
        $('#schema').on('click', 'tbody td .row-details', this.fieldDetailHandler);
    }

    /**
     * 字段详细事件
     * @param e
     */
    fieldDetailHandler(e) {
        let table = $('#schema').DataTable();
        let tr = $(e.currentTarget).parents('tr');
        let row = table.row(tr);
        if (row.child.isShown()) {
            for (var i = 0; i < $('input.fieldName').length; i++) {
                if (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/.test($('input.fieldName', $(tr.next())).eq(i).val())) {
                    $('input.fieldName', $(tr.next())).eq(i).blur();
                    return;
                }
            }
            $(e.currentTarget).addClass('row-details-close').removeClass('row-details-open');
            let childTr = row.child().find('tbody tr');
            let childFields = [];
            for (let i = 0; i < $(childTr).length; i++) {
                let currentRow = $(childTr)[i];
                if ($('input.fieldName', $(currentRow)).length != 0) {
                    let fieldObj = {};
                    let type = $('select[name = "type"]', $(currentRow)).val();
                    let index = $('select[name = "index"]', $(currentRow)).val();
                    let analyzer = $('select[name = "analyzer"]', $(currentRow)).val();
                    // 字段名
                    fieldObj.fieldName = $('input.fieldName', $(currentRow)).val();
                    // 字段中文名
                    fieldObj.name = $('input.name', $(currentRow)).val();
                    fieldObj.type = type;
                    if (type === 'date') {
                        fieldObj.format = 'yyyy-MM-dd HH:mm:ss';
                    }
                    // 字段类型
                    fieldObj.store = $('select[name = "store"]', $(currentRow)).val();
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
            $(e.currentTarget).addClass('row-details-open').removeClass('row-details-close');

            // 子行列表存在时不需重新创建
            if (row.child()) {
                row.child.show();
                return;
            }
            this.createNestedFieldHandler(row);
        }
    }

    /**
     * 创建嵌套列表事件
     * @param row
     */
    createNestedFieldHandler(row) {
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
            { data: 'fieldName',
                render: function (data, meta) {
                    if (data) {
                        if (data.indexOf('<input') != -1) {
                            return data;
                        } else {
                            return cutStr(data, 15);
                        }
                    } else {
                        return data
                    }

                },
                orderable: false },
            { data: 'name',
                render: function (data, meta) {
                    if (data) {
                        if (data.indexOf('<input') != -1) {
                            return data;
                        } else {
                            return cutStr(data, 15);
                        }
                    } else {
                        return data
                    }

                },
                orderable: false },
            { data: 'type', orderable: false },
            { data: 'store',
                render: function (data, type, row, meta) {
                    if (data == 'false') {
                        return '否';
                    } else if (data == 'true') {
                        return '是';
                    }
                },
                orderable: false, defaultContent: storeSelect },
            { data: 'index',
                render: function (data, type, row, meta) {
                    if (data == 'not_analyzed' || data == 'analyzed') {
                        return '是';
                    } else if (data == 'no') {
                        return '否';
                    }
                },
                orderable: false, defaultContent: indexSelect },
            { data: 'analyzer', orderable: false, defaultContent: '-' },
            { data: 'key',
                render: function (data, type, row, meta) {
                    if (data == 'false') {
                        return '否';
                    } else if (data == 'true') {
                        return '是';
                    }
                },
                orderable: false, defaultContent: keySelect },
            {
                className: '',
                orderable: false,
                data: 'operation',
                defaultContent: '-'
            }
        ];
        nestedTableConfig.paging = false;
        nestedTableConfig.dom = '<"top">rt<"bottom"i>';
        nestedTableConfig.scrollX = false;
        nestedTableConfig.createdRow = function (row, data, index) {
            if (data.fieldName.indexOf('<input') == -1) {
                $('td:eq(0)', row).attr('title', data.fieldName)
            }
            if (data.name.indexOf('<input') == -1) {
                $('td:eq(1)', row).attr('title', data.name);
            }
        };

        // 获取列表内数据列
        nestedTableConfig.data = row.data().schema;
        // 生成嵌套列表
        let nestedTable = createList(nestedTableConfig);

        // 绑定删除子列表事件
        $('#nestTable_' + row.index()).on('click', 'tbody td .fa-trash-o', function () {
            let tr = $(this).parents('tr');
            let row = nestedTable.row(tr);
            row.remove();
            nestedTable.draw();
        });

        // 添加嵌套列表字段
        $('button[name = "createNested"]', $('#nestRow_' + row.index())).off('click').on('click', function () {
            var table = $('#nestTable_' + row.index()).DataTable();
            table.row.add({
                'data': '',
                'fieldName': '<div class="fieldNameDiv form-group"><input type="text" placeholder="支持英文、数字、下划线" name="fieldName" maxlength= "30" class="fieldName form-control"><span class="messages"></span></div>',
                'name': '<input type="text" class="name form-control">',
                'type': '<select name="type" class="form-control" id="a"><option value="string">string</option><option value="long">long</option><option value="double">double</option><option value="date">date</option><option value="geo_point">geo_point</option></select>',
                'store': '<select name="store" class="form-control"  id="store"><option value="true">是</option><option value="false" selected>否</option></select>',
                'index': '<select name="index" class="form-control"  id="index"><option value="true">是</option><option value="false">否</option></select>',
                'analyzer': analyzerSelect,
                'key': '<select class="form-control"  name="key" id="key"><option value="true">是</option><option value="false" selected>否</option></select>',
                'operation': '<i class="fa fa-trash-o" style="cursor: pointer;" title="删除"></i>'
            }).draw();

            // 嵌套类型字段处理
            $('select[name = "type"]', $('#nestTable_' + row.index())).change(function () {
                if ($(this).val() === 'string' && $(this).closest('tr').find('select[name = "index"]').val() == 'true') {
                    $(this).closest('tr').find('select[name = "analyzer"]').prop('disabled', false);
                } else {
                    $(this).closest('tr').find('select[name = "analyzer"]').prop('disabled', true);
                }
            });

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
                let fieldName = $(e.currentTarget).val().trim();
                let fieldNameArr = [];
                let a = [];
                for (let i = 0; i < property.length; i++) {
                    if (property[i].type == 'nested') {
                        a.push(property[i]);
                    }
                }
                for (let i = 0; i < a.length; i++) {
                    if (i + 1 == row.index()) {
                        for (let j = 0; j < property[row.index()].schema.length; j++) {
                            fieldNameArr.push(property[row.index()].schema[j].fieldName);
                        }
                    }
                }
                $('input.fieldName', $('#nestTable_' + row.index())).not($(e.currentTarget)).each(function(i, e) {
                    if ($(e).val().trim() != '') {
                        fieldNameArr.push($(e).val());
                    }
                });
                if (fieldNameArr.indexOf(fieldName) != -1) {
                    $(e.currentTarget).val('');
                    $(e.currentTarget).blur();
                    return;
                }
            });

            // 索引选择处理
            $('select[name = "index"]', $('#nestTable_' + row.index())).change(function () {
                if ($(this).val() === 'true' && $(this).closest('tr').find('select[name = "type"]').val() == 'string') {
                    $(this).closest('tr').find('select[name = "analyzer"]').prop('disabled', false);
                } else {
                    $(this).closest('tr').find('select[name = "analyzer"]').prop('disabled', true);
                }
            });
        });
    }

    // 去除数组中空对象
    deleteEmptyObj (obj) {
        let newArr = [];
        for (let j in obj) {
            for (let prop in obj[j]) {
                if (prop == '' || obj[j][prop] == '') {
                    return;
                } else {
                    newArr.push(obj[j]);
                    break;
                }
            }
        }
        return newArr;
    }



    /**
     * 新建数据集事件
     */
    createDataSetHandler() {
        for (var i = 0; i < $('input.fieldName').length; i++) {
            if ($('input.fieldName').eq(i).val() == '') {
                $('input.fieldName').eq(i).blur();
            }
        }
        this.validateHandler();
        if ($('span.messages').find('p').length > 0) {
            error('输入有异常，请检查后重新提交！')
            return;
        };
        let datasetObj = {};
        // 数据集名称
        datasetObj.datasetName = $('#datasetName', $('#datasetUpdate')).val();
        // 是否分区
        datasetObj.isPartition = $('input[name = "isPartition"]:checked', $('#datasetUpdate')).val();
        // 构造分区信息
        /*
        if (datasetObj.isPartition == 'true') {
            datasetObj.partitionField = $('#partitionField', $('#datasetUpdate')).val();
            datasetObj.partitionRule = $('#partitionRule', $('#datasetUpdate')).val() + $('#partitionRuleSelect', $('#datasetUpdate')).val();
        }
        */
        // 可见性
        datasetObj.visable = $('input[name = "isVisible"]:checked', $('#datasetUpdate')).val();
        // 副本数
        datasetObj.replication = $('#replication', $('#datasetUpdate')).val();
        datasetObj.shard = $('#shard', $('#datasetUpdate')).val();
        // 表结构
        datasetObj.schema = {};
        // owner
        datasetObj.owner = sessionStorage.getItem('XDataUserName');
        datasetObj.schema.properties = [];

        // 关闭嵌套字段
        $('span.row-details-open', $('#schema')).click();

        // 判断现有字段中是否有nested 类型;
        // 已有嵌套字段的添加;
        let properties = this.props.dataset.selectedRecord.schema.properties;
        let hadProp = [];
        for (let i = 0; i < properties.length; i++) {
            if (properties[i].type == 'nested') {
                let currentRow = $('tbody tr', $('#schema'))[i];
                let newSchema = properties[i].schema.concat($(currentRow).attr('schema') ? JSON.parse($(currentRow).attr('schema')) : []);
                properties[i].schema = this.deleteEmptyObj(newSchema);
                hadProp.push(properties[i]);
            }
        }
        // 新建字段的添加
        for (let i = properties.length; i < $('tbody tr', $('#schema')).length; i++) {
            let currentRow = $('tbody tr', $('#schema'))[i];
            let index = $('select[name = "index"]', $(currentRow)).val();
            let type = $('select[name = "type"]', $(currentRow)).val();
            let analyzer = $('select[name = "analyzer"]', $(currentRow)).val();

            if ($('input.fieldName', $(currentRow)).length != 0) {
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
        if (hadProp.length != 0) {
            datasetObj.schema.properties = datasetObj.schema.properties.concat(hadProp);
        }
        this.props.modifyDataset(datasetObj);
        this.props.history.replace('/dataSet');
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
            'index': '',
            'analyzer': analyzerSelect,
            'key': '',
            'operation': '<i class="fa fa-trash-o" style="cursor: pointer;" title="删除"></i>'
        }).draw();

        // 嵌套类型字段处理
        $('select[name = "type"]', $('#schema')).change(this.selectTypeHandler);
        $('input.fieldName', $('#schema')).blur(this.fieldInputHandler);
        // 索引选择处理
        $('select[name = "index"]', $('#schema')).change(this.selectIndexHandler);
    };

    fieldInputHandler(e) {
        let properties = this.props.dataset.selectedRecord.schema.properties;
        let fieldName = $(e.currentTarget).val().trim();
        let fieldNameArr = [];
        this.schemaValidate(e);
        for (let i = 0; i < properties.length; i++) {
            fieldNameArr.push(properties[i].fieldName)
        }
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
            return;
        }
    }

    /*
    fieldNameOnBlur(e) {
        if ($(e.currentTarget).val().length >= 30) {
            $(e.currentTarget).css('border', '1px #dd4b39 solid');
            error('字段名最长为30个字符 !');
            return;
        } else {
            $(e.currentTarget).css('border', '1px #d2d6de solid');
        }
        if (!/^(?!_)(?!.*?_$)/.test($(e.currentTarget).val())) {
            $(e.currentTarget).css('border', '1px #dd4b39 solid');
            error('请检查字段名填写，下划线不能放在首尾 !');
            return;
        } else {
            $(e.currentTarget).css('border', '1px #d2d6de solid');
        }
        if (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/.test($(e.currentTarget).val())) {
            $(e.currentTarget).css('border', '1px #dd4b39 solid');
            error('请检查字段名填写，只能含有英文字母、数字和下划线 !');
            return;
        } else {
            $(e.currentTarget).css('border', '1px #d2d6de solid');
        };
    }
    */

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

    validateHandler() {
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
                    lessThanOrEqualTo: this.props.dataset.maxSettingNums.maxReplicationNum,
                    notGreaterThanOrEqualTo: '最小值为 0',
                    notLessThanOrEqualTo: '最大值为 ' + this.props.dataset.maxSettingNums.maxReplicationNum
                }
            }
        };
        baseValidate($('.replicationJudgeDiv'), constraints);
    }

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
     * 类型选择事件
     * @param e
     */
    selectTypeHandler(e) {
        let currentType = $(e.currentTarget).val();
        let fieldName = $(e.currentTarget).closest('tr').find('input.fieldName').val();
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
                $(e.currentTarget).closest('tr').find('span.row-details-open').addClass('row-details-close').removeClass('row-details-open');
                row.child.hide();
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
            if (currentType === 'date') {
                dateFieldObj[fieldName] = fieldName;
            } else {
                delete dateFieldObj[fieldName];
            }

            // 类型为string，且索引时，分词器可用
            if (currentType === 'string' && $(e.currentTarget).closest('tr').find('select[name = "index"]').val() == 'true') {
                $(e.currentTarget).closest('tr').find('select[name = "analyzer"]').prop('disabled', false);
            } else {
                $(e.currentTarget).closest('tr').find('select[name = "analyzer"]').prop('disabled', true);
            }
        }
    }

    render() {
        let partitionRule = '';
        // 构造分区字段模板
        let optionsTpl = [<option value=''>请选择</option>];
        for (let key in this.props.dataset.dateFields) {
            optionsTpl.push(<option value={key}>{this.props.dataset.dateFields[key]}</option>);
        }
        if (this.props.dataset.selectedRecord.partitionRule) {
            partitionRule = this.props.dataset.selectedRecord.partitionRule;
        }
        if (partitionRule.indexOf('d') != -1) {
            partitionRule = partitionRule.substring(0, partitionRule.length - 1) + ' 天'
        } else if (partitionRule.indexOf('w') != -1) {
            partitionRule = partitionRule.substring(0, partitionRule.length - 1) + ' 周'
        } else if (partitionRule.indexOf('M') != -1) {
            partitionRule = partitionRule.substring(0, partitionRule.length - 1) + ' 月'
        } else if (partitionRule.indexOf('y') != -1) {
            partitionRule = partitionRule.substring(0, partitionRule.length - 1) + ' 年'
        }
        return (
            <div id="datasetUpdate">
                <div className="box box-primary">
                    <div className="box-header with-border ">
                        <p className="box-title">基本信息</p>
                    </div>
                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label htmlFor="datasetName"><span className="identify">* </span>名称 : </label>
                                <input type="text" id="datasetName" className="form-control" disabled value={this.props.dataset.selectedRecord.datasetName}/>
                            </div>
                            <div name='isPartition' className="form-group col-md-3">
                                <label htmlFor="isPartition"><span className="identify">* </span>是否分区 : </label>

                                <div className="radio">
                                    <label>
                                        <input name="isPartition" type="radio" value="true"/>
                                        &nbsp;是
                                    </label>
                                    <label className="ml20">
                                        <input name="isPartition" type="radio" value="false"/>
                                        &nbsp;否
                                    </label>
                                </div>
                            </div>

                            <div name='isVisible' className="form-group col-md-3">
                                <label htmlFor="isVisible"><span className="identify">* </span>可见性 : </label>

                                <div className="radio">
                                    <label>
                                        <input name="isVisible" type="radio" value="PUBLIC" />
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
                            <div className="col-md-6 form-group">
                                <label><span className="identify">* </span>分片数 : </label>
                                <input type="number" id="shard" className="form-control" disabled value={this.props.dataset.selectedRecord.shard}/>
                            </div>

                            <div className="replicationJudgeDiv col-md-6 form-group">
                                <label><span className="identify">* </span>副本数 : </label><span className="messages"></span>
                                <input type="text" name="replication" id="replication" onBlur={ this.replicationJudge } min='0' max={ this.props.dataset.maxSettingNums.maxReplicationNum } defaultValue={this.props.dataset.selectedRecord.replication} className="form-control" placeholder={'0 <= 副本数 <= ' + this.props.dataset.maxSettingNums.maxReplicationNum}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box box-primary">
                    <div className="box-header with-border ">
                        <p className="box-title">字段</p>
                    </div>
                    <div className="row box-body">
                        <div className="col-md-12">
                            <div className="box-header pull-left">
                                <button type="submit" name="createDataset" className="btn btn-primary"
                                        onClick={this.handleCreateHandler.bind(this)}>
                                    <i className="fa fa-fw fa-plus-circle"
                                       style={{verticalAlign: 'middle', padding: '0 8px 0 0'}}></i>
                                    添加字段
                                </button>
                            </div>
                            <div className="box-body">
                                <table id="schema" className="table table-striped table-bordered"
                                       style={{ width: '100%' }}>
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
                <div name="partitionArea" className="box box-primary">
                    <div className="box-header with-border">
                        <p className="box-title">分区信息</p>
                    </div>
                    <div className="partition box-body">
                        <div className="partitionDetails row">
                            <div className="form-group col-md-6">
                                <label htmlFor="partitionField">分区字段：</label>
                                <span className="detailSpan ml10"> { this.props.dataset.selectedRecord.partitionField } </span>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="partitionRule">分区规则：</label>
                                <span className="detailSpan ml10"> { partitionRule } </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/*
                 <div name="partitionArea" className="box box-primary">
                 <div className="box-header with-border">
                 <p className="box-title">设置分区</p>
                 </div>
                 <div className="partition box-body">
                 <div className="partitionDetails row">
                 <div className="form-group col-md-6">
                 <label htmlFor="partitionField">分区字段</label>
                 <select id="partitionField" className="form-control" style={{ width: '100%' }}>
                 { optionsTpl }
                 </select>
                 </div>

                 <div className="form-group col-md-6">
                 <label htmlFor="partitionRule">分区规则</label>

                 <div>
                 <input id="partitionRule" type="number" min='1'
                 className="distanceNum form-control left" style={{ width: '88%' }}/>
                 <select id="partitionRuleSelect" className="form-control ml5 left"
                 style={{ width: '10%' }}>
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
                 */}
                <button name="saveBtn" className="btn btn-primary" onClick={ this.createDataSetHandler }><i className="fa fa-save"></i> 保存 </button>
            </div>
        )
    }
}
export default DataSetUpdate;
