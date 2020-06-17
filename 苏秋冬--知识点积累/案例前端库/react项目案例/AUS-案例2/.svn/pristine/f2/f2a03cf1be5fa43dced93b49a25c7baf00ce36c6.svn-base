/**
 * 显示列
 * User: xiongjie
 * Date: 2017/8/5
 * Time: 15:45
 * */
import React, { Component } from 'react';

var tableDate = {};
export default class CloumnList extends Component {
    constructor(props) {
        super(props);
        this.columnSelect = this.columnSelect.bind(this);
        this.colNameSave = this.colNameSave.bind(this);
    }
    columnSelect(tableModel) {
        $(' #columnListBody').html(''); // 防止重复
        // 生成表名
        tableModel.moveTable.map(function(data) {
            let listDiv = $('<div class="row columListDiv"></div>');
            let columsName = Object.getOwnPropertyNames(data.columns);
            let label = '';
            columsName.map(function(colum) {
                let val = colum + '_' + data.tableName;
                let bm = data.dataSourceType + '.' + data.Id + '.' + colum;
                label = $('<div class="col-md-3"><input type="checkbox" name="' + bm + '" checked id="' + val + '"/><label for="' + val + '">' + colum + '</label></div>');
                listDiv.append(label);
            });
            $(' #columnListBody').append(listDiv);
        });
        // 设置未被选中checked为false
        if (tableModel.colNameFale) {
            tableModel.colNameFale.map(function(data) {
                $(' #columnListBody input[name="' + data + '"]').attr('checked', false);
            });
        }
        $(' #columnList').modal();

        tableDate = tableModel;
    }
    // 选择列后保存
    colNameSave() {
        let colName = []; // 保存选中的checked；
        let colNameFale = []; // 保存未被选择中的checked
        $(' #columnListBody input:checkbox').each(function(i) {
            if ($(this).is(':checked')) {
                colName[i] = $(this).attr('name');
            } else {
                colNameFale[i] = $(this).attr('name');
            }
        });
        tableDate.colNameFale = colNameFale;
        tableDate.colName = colName;
        this.props.ReceiveDate(tableDate);
        this.props.sqlSave(colName, colNameFale);
    }
    render() {
        return <div className='modal in' id='columnList'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={this.closeModal}>
                            <span aria-hidden='true'>×</span>
                        </button>
                        <h4 className='modal-title'>显示列信息</h4>
                    </div>
                    <div className='modal-body popBody' id='columnListBody'>

                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-default' data-dismiss='modal'>取消</button>
                        <button type='button' className='btn btn-primary' data-dismiss='modal' id='colNameSave' onClick={this.colNameSave}>保存</button>
                    </div>
                </div>
            </div>
        </div>
    }
}
