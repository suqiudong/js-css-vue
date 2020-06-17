/**
 * 列表组件
 * User: gaogy
 * Date: 2016/12/20
 * Time: 15:10
 */
import React, { Component } from 'react';
import createList from 'UTIL/baseList';
import Select from 'COMPONENT/Common/Select/Select';

class DataList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.drawTableHandler(this.props.mqlResult);
    }

    componentDidUpdate() {
        this.drawTableHandler(this.props.mqlResult);
    }

    /**
     *  字段显示隐藏事件
     * @param belongTableId
     * @param colName
     */
    colsSelectHandler(belongTableId, colName) {
        let table = $('#' + belongTableId).DataTable();
        let columnIndex = table.column(colName + ':name').index();
        let isVisible = table.column(columnIndex + 1).visible();
        table.column(columnIndex + 1).visible(!isVisible, false);
        if (isVisible) {
            $(window).resize();
        }
        // table.columns.adjust();
    }

    /**
     * 列表渲染事件
     * @param data
     */
    drawTableHandler(data) {
        let columnObj = {};
        let columnDefsObj = {};
        let nestColObj = {};
        // 构造列表字段集合
        if (data.meta) {
            for (let key in data.meta) {
                let i = 0;
                // 数据列模板
                columnObj[key] = [{
                    'orderable': false,
                    'class': 'textCenter',
                    'data': null,
                    'defaultContent': ''
                }];
                // 修饰列模板
                columnDefsObj[key] = [];
                // 嵌套列模板
                nestColObj[key] = {};
                for (let subKey in data.meta[key]) {
                    // 构造嵌套列模板
                    if (typeof (data.meta[key][subKey]) === 'object') {
                        nestColObj[key][subKey] = [];
                        let item = data.meta[key][subKey];
                        for (let itemKey in item) {
                            nestColObj[key][subKey].push({
                                'data': itemKey,
                                'defaultContent': '-'
                            });
                        }

                        // 构造列模板
                        columnObj[key].push({
                            'data': subKey,
                            'defaultContent': '嵌套字段',
                            'render': function(a, b, c) {
                                return '嵌套字段';
                            }
                        });
                    } else {
                        // 构造列模板
                        columnObj[key].push({
                            'data': subKey,
                            'defaultContent': '-'
                        });
                    }

                    // 构造修饰列模板
                    columnDefsObj[key].push({
                        'name': subKey,
                        'targets': i
                    });
                    i++;
                }
            }
        }

        /**
         * 构造列表数据集合
         */
        if (data.result) {
            for (let key in data.result.mql) {
                // 构造结果集列表
                let tableConfig = {};
                tableConfig.id = 'table' + key + this.props.chartId;
                tableConfig.columns = columnObj[key];
                tableConfig.columnDefs = columnDefsObj[key];
                tableConfig.scrollX = true;
                tableConfig.data = data.result.mql[key];
                tableConfig.createdRow = function(row, data, index) {
                    $('td:eq(0)', row).html("<span class='row-details row-details-close'></span>");
                };
                createList(tableConfig);
                let currentTable = $('#' + tableConfig.id).DataTable();
                // 绑定列表展开事件
                $('#table' + key + this.props.chartId).off('click').on('click', 'tbody td .row-details', function() {
                    let tr = $(this).parents('tr');
                    let row = currentTable.row(tr);
                    if (row.child.isShown()) {
                        $(this).addClass('row-details-close').removeClass('row-details-open');
                        row.child.hide();
                    } else {
                        $(this).addClass('row-details-open').removeClass('row-details-close');
                        // 插入嵌套列表
                        row.child(`<div key="${row.index()}" class="nestTable"><ul class="nav nav-tabs" id="TAB_${row.index()}" role="tablist"></ul><div class="tab-content" id="NEST_TABLE_${row.index()}"></div></div>`).show();
                        for (let colKey in nestColObj[key]) {
                            // 列头模板
                            let th = '';
                            for (let i = 0;i < nestColObj[key][colKey].length; i++) {
                                th += `<th>${ nestColObj[key][colKey][i].data }</th>`;
                            }

                            // tab模板
                            let tabTpl = `<li class="">
                                <a href="#${row.index() + colKey}" data-toggle="tab" aria-expanded="false">${colKey}</a>
                            </li>`;

                            // 嵌套列表模板
                            let nestTable = `<div class="tab-pane" id="${row.index() + colKey}">
                            <table id="nestTable_${row.index() + colKey}"  class="table table-bordered" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                    ${ th }
                                    </tr>
                                </thead>
                            </table></div>`;

                            // 将模板添加到row中
                            $('#TAB_' + row.index()).append(tabTpl);
                            $('#NEST_TABLE_' + row.index()).append(nestTable);

                            // 渲染列表
                            let nestTableConfig = {};
                            nestTableConfig.id = 'nestTable_' + row.index() + colKey;
                            nestTableConfig.columns = nestColObj[key][colKey];
                            nestTableConfig.dom = '<"top">rt<"bottom"lip>';
                            nestTableConfig.data = data.result.mql[key][row.index()][colKey];
                            createList(nestTableConfig);

                            // 默认选中第一个TAB
                            $('li:first', $('div.nestTable')).find('a').click();
                            let table = $('#' + nestTableConfig.id).DataTable();

                            // 嵌套列表自适应
                            table.columns.adjust();
                        }
                    }
                });

                // 非嵌套列表隐藏展开按钮
                if (JSON.stringify(nestColObj[key]) === '{}') {
                    currentTable.column(0).visible(false, false);
                    $(window).resize();
                }
            }
        }
    }

    render() {
        // 结果集列表模板
        let tableTpls = [];
        if (this.props.mqlResult.meta) {
            for (let key in this.props.mqlResult.meta) {
                // 如存在列表清空之，避免重复查询时多次插入
                $('#table' + key + this.props.chartId).empty();

                // 列头模板
                let thTpls = [];
                // 下拉选项模板
                let selectData = [];
                for (let col in this.props.mqlResult.meta[key]) {
                    thTpls.push(<th>{ col }</th>);

                    if (typeof (this.props.mqlResult.meta[key][col]) === 'object') {
                        continue
                    }

                    let selectObj = {};
                    selectObj.id = col;
                    selectObj.belongTableId = 'table' + key + this.props.chartId;
                    selectObj.text = col;
                    selectObj.selected = 'selected';
                    selectData.push(selectObj);
                }

                // 构造字段选择下拉配置项
                let selectOpt = {
                    id: 'select2_' + key + new Date().getTime(),
                    placeholder: '请选择展示字段',
                    data: selectData,
                    multiple: true
                };

                if (thTpls.length > 0) {
                    // 构造结果集列表模板
                    let tableTpl = <div className="resultList" key={ 'div_' + key + new Date().getTime() }>
                        <div>
                            <label>结果集：</label>{ key }
                        </div>
                        <div style={{ width: '100%' }}>
                            <label className="left">展示字段：</label>
                            <Select className="left mb10" options={ selectOpt } colsSelectHandler={ this.colsSelectHandler } />
                        </div>
                        <table key={ 'table' + key + new Date().getTime() } id={ 'table' + key + this.props.chartId } className="table table-striped table-bordered mt10">
                            <thead><tr><th></th>{ thTpls }</tr></thead>
                        </table>
                    </div>;

                    tableTpls.push(tableTpl);
                }
            }
        }

        // 列表无数据展现
        if (tableTpls.length == 0) {
            return (
                <div id="dataList" className="row noResultInfo">
                    <div id="dataTableArea" style={{ width: '130px;' }}>
                        <i className='fa fa-exclamation-triangle'></i><span>当前无列表数据</span>
                    </div>
                </div>
            )
        }

        return (
            <div id="dataList" className="row">
                <div className="col-md-12" id="dataTableArea">
                    { tableTpls }
                </div>
            </div>
        )
    }
}
export default DataList;
