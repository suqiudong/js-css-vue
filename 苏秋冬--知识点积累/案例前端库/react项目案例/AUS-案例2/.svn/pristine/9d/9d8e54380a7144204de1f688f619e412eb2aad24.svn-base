/**
 * 数据集新建组件
 * User: gaogy
 * Date: 2016/1/12
 * Time: 20:10
 */
import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createList, { bindTableEvent } from 'UTIL/baseList';
import { baseValidate } from 'UTIL/baseValidate';

let dateFieldObj = {};
let setStatusSelect = '<select class="form-control status" name="key"><option value="true">连接</option><option value="false" selected>断开</option></select>';
let roleSelect = '<select class="form-control role" name="key"><option value="0">超级管理员</option><option value="1" selected>系统管理员</option><option value="2" selected>普通用户</option></select>';

class NodeServerManage extends Component {
    constructor(props) {
        super(props);
        this.createDataSetHandler = this.createDataSetHandler.bind(this);
        this.fieldInputHandler = this.fieldInputHandler.bind(this);
        this.nameListValidate = this.nameListValidate.bind(this);
        this.ipListValidate = this.ipListValidate.bind(this);
        this.ipInputHandler = this.ipInputHandler.bind(this);
        this.RemoveOKHandler = this.RemoveOKHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.privilegeHandler = this.privilegeHandler.bind(this);
    }

    componentWillMount() {
        // 获取节点/服务列表
        this.props.getNodeServerList();
        this.props.getServerList();
    }

    componentDidMount() {
        dateFieldObj = {};
    }

    componentDidUpdate() {
        // 生成节点/服务列表
        let { nodeManage, serverManage } = this.props.nodeServerManage;
        this.crateTableHandler(nodeManage, 'nodeList');
        this.crateTableHandler(serverManage, 'serverList');
    }

    /**
     * 生成字段列表
     * @param data
     */
    crateTableHandler(data, el) {
        // 构造列表配置项
        let tableConfig = {
            id: el,
            columns: [
                {
                    className: 'textCenter',
                    orderable: false,
                    data: null,
                    defaultContent: ''
                },
                { data: 'name', orderable: false },
                { data: 'status', orderable: false },
                { data: 'ip', orderable: false },
                { data: 'place', orderable: false },
                { data: 'role', orderable: false },
                {
                    className: '',
                    orderable: false,
                    data: null,
                    defaultContent: ''
                }
            ],
            dom: '<"top">rt<"bottom"i>',
            scrollX: false,
            paging: false,
            columnDefs: [{
                    'targets': 0, // 操作列生成位置，当前为列表第0列
                    'render': function (data, type, row) {
                        return `<span class='row-details row-details-close mt10 hide'></span><i class='fa fa-circle-thin mt10'></i>`;
                    }
                },
                {
                'targets': 6, // 操作列生成位置，当前为列表第6列
                'render': function (data, type, row) {
                    let html = '';
                    if (row.privilege.DATASET == '删除') {
                        html += `<i class='fa fa-trash-o' style='cursor: pointer;' title='删除'></i>`;
                    }else {
                        if (row.privilege.DATASET.length !== 0) {
                            if (row.privilege.DATASET.indexOf('查看') != -1) {
                                html += `<a href='javascript:void(0);'  class='datasetDetail btn btn-default btn-xs'  ><i class='fa fa-file-text-o'></i> 详情</a> `;
                            }
                            if (row.privilege.DATASET.indexOf('修改') != -1) {
                                html += `<a href='javascript:void(0);' class='datasetEdit btn btn-default btn-xs'><i class='fa fa-pencil-square-o'></i> 修改</a> `;
                            }
                            if (row.privilege.DATASET.indexOf('删除') != -1) {
                                html += `<a href='javascript:void(0);' class='datasetRemove btn btn-default btn-xs' data-toggle="modal" data-target="#removeDataset"><i class='fa fa-trash-o'></i> 删除</a> `;
                            }
                            if (row.privilege.DATASET.indexOf('授权') != -1) {
                                html += `<a href='javascript:void(0);' class='privilege btn btn-default btn-xs'><i class='fa fa-wrench'></i> 授权</a> `;
                            }
                        } else {
                            html += `<span>  无操作权限<span/>`
                        }
                    }
                    return html;
                }
            }],
            // createdRow: function(row, data, index) {
            //     $('td:first', row).html("<span class='row-details row-details-close mt10 hide'></span><i class='fa fa-circle-thin mt10'></i>");
            //     $('td:last', row).html("<i class='fa fa-trash-o' style='cursor: pointer;' title='删除'></i>");
            // },
            data: data
        };
        // 生成列表
        let table = createList(tableConfig);
        // 列表内查看事件绑定
        bindTableEvent(el, 'click', 'a.datasetDetail', this.detailHandler);
        // 列表内编辑事件绑定
        bindTableEvent(el, 'click', 'a.datasetEdit', this.editHandler);
        // 列表内删除事件绑定
        bindTableEvent(el, 'click', 'a.datasetRemove', this.removeHandler);
        // 列表内授权事件绑定
        bindTableEvent(el, 'click', 'a.privilege', this.privilegeHandler);
        let element = $('#' + el);
        // 绑定删除记录事件
        element.on('click', 'tbody td > i.fa-trash-o', function() {
            let tr = $(this).parents('tr');
            let name = $(this).closest('tr').find('input.name').val().trim();
            let row = table.row(tr);
            row.remove();
            table.draw();
            if ($(this).closest('tr').find('select[name = "type"]').val() == 'date') {
                delete dateFieldObj[name];
            }
            // this.props.setDateField(dateFieldObj);
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
    }

    // 保存组件单条数据
    selectRow(e) {
        let tableObj = $(e.currentTarget).parents('table');
        return tableObj.DataTable().row($(e.currentTarget).parents('tr')).data();
    }

    // 节点或服务详情
    detailHandler() {
        //
    }

    // 节点或服务修改
    editHandler() {
        //
    }

    // 节点或服务授权
    privilegeHandler(e) {
        let selectedRecord = this.selectRow(e);
        this.props.history.replace('/nodeServerManage/accredit/' + selectedRecord.name);
    }

    // 删除节点或服务
    removeHandler(e) {
        let tableName = $(e.currentTarget).parents('table').attr('id') + 'Remove';
        let selectedRecord = this.selectRow(e);
        $('#' + tableName).modal();
        this.refs[tableName].setContent('您确定要卸载' + selectedRecord.name + '插件吗？');
        // this.props.isUsePlugin(pluginData.name);
        // if (this.props.pluginManage.isUse.result) {
        //     $('#pluginRemove').modal();
        //     this.refs.nodeRemove.setContent('检测到您的插件正在作业，您确定要卸载' + pluginData.name + '插件吗？');
        // } else {
        //     $('#pluginRemove1').modal();
        //     this.refs.nodeRemove.setContent('您确定要卸载' + pluginData.name + '插件吗？');
        // }
    }

    // 节点或服务删除确认事件
    RemoveOKHandler() {
        $('.modal').modal('hide');
    }

    /**
     * 字段名校验
     */
    nameListValidate (e) {
        let constraints = {
            'name': {
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
        baseValidate($(e.currentTarget).closest($('.nameDiv')), constraints);
    }
    /**
     * 字段名校验
     */
    ipListValidate (e) {
        let constraints = {
            'ip': {
                // 必填
                presence: {
                    message: '请输入IP(同级字段不能重名)'
                },
                format: {
                    pattern: '^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$',
                    message: '请输入合法IP'
                }
            }
        }
        baseValidate($(e.currentTarget).closest($('.ipDiv')), constraints);
    }
    /**
     * 新建数据集事件
     */
    createDataSetHandler() {
        let nodeServerObj = {
            nodeList: [],
            serverList: []
        };
        if ($('input.name').length != 0) {
            let names = $('tbody tr td input.name');
            for (let i = 0; i < names.length; i++) {
                let tableID = names.eq(i).closest('table').attr('id');
                let row = names.eq(i).closest('tr');
                let [name, status, ip, place, role] = [names.eq(i), $('select.status', $(row)), $('input.ip', $(row)), $('input.place', $(row)), $('select.role', $(row))];
                debugger
                if (name.val().trim() == '') {
                    name.blur();
                    return;
                }
                if (ip.val().trim() == '') {
                    ip.blur();
                    return;
                }
                let obj = {
                    'name': name.val(),
                    'status': status.val(),
                    'ip': ip.val(),
                    'place': place.val(),
                    'role': role.val()
                };
                nodeServerObj[tableID].push(obj);
            }
        }
        this.props.addNodeServerList(nodeServerObj);
        // if (this.props.requestResult.code.code == '0') {
        //     success('新增成功！');
        // } else {
        //     return;
        // }
    }

    /**
     * 添加行事件
     */
    handleCreateHandler(event) {
        let target = event.target || event.srcElement;
        let ele = $('#' + target.getAttribute('data-table'));
        // 插入行
        let table = ele.DataTable();
        table.row.add({
            'name': '<div class="nameDiv form-group"><input type="text" name="name" placeholder="支持英文、数字、下划线" maxlength= "30" class="name namer form-control"><span class="messages"></span></div>',
            'status': setStatusSelect,
            'ip': '<div class="ipDiv form-group"><input type="text" class="ip form-control" name="ip"><span class="messages"></span></div>',
            'place': '<input type="text" class="place form-control">',
            'role': roleSelect,
            'privilege': {
                'DATASET': '删除'
            }
        }).draw();

        // 字段名修改事件
        $('input.name', ele).blur(this.fieldInputHandler);
        // 嵌套类型字段处理
        $('select[name = "type"]', ele).change(this.selectTypeHandler);
        // 索引选择处理
        $('select[name = "index"]', ele).change(this.selectIndexHandler);
        // ip
        $('input.ip', ele).blur(this.ipInputHandler);
    };

    /**
     * 父字段名失焦/ 重复字段名 校验
     */
    fieldInputHandler(e) {
        let name = $(e.currentTarget).val().trim();
        let nameArr = [];
        this.nameListValidate(e);
        $('input.namer').not($(e.currentTarget)).each(function(i, e) {
            if ($(e).val().trim() != '') {
                nameArr.push($(e).val());
            }
        });
        if (nameArr.indexOf(name) != -1) {
            $(e.currentTarget).val('');
            $(e.currentTarget).blur();
            return;
        }
    }

    /**
     * ip字段名失焦/ 重复字段名
     */
    ipInputHandler(e) {
        let name = $(e.currentTarget).val().trim();
        let nameArr = [];
        this.ipListValidate(e);
        $('input.namer').not($(e.currentTarget)).each(function(i, e) {
            if ($(e).val().trim() != '') {
                nameArr.push($(e).val());
            }
        });
        if (nameArr.indexOf(name) != -1) {
            $(e.currentTarget).val('');
            $(e.currentTarget).blur();
            return;
        }
    }

    render() {
        return (
            <div id="nodeServerAdd">
                <div className="box box-primary">
                    <div className="row box-body">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label><small>节点管理 (下划线不能放在节点首尾)</small></label>
                            </div>
                            <div className="box-header pull-left">
                                <button type="submit" name="createDataset" className="btn btn-primary" data-table="nodeList" onClick={this.handleCreateHandler.bind(this)}>
                                    <i className="fa fa-fw fa-plus-circle" style={{verticalAlign: 'middle', padding: '0 8px 0 0'}}></i>
                                    新增节点
                                </button>
                            </div>
                            <div className="box-body">
                                <table id="nodeList" className="table table-striped table-bordered" style={{ width: '100%' }}>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>节点名</th>
                                        <th>配置状态</th>
                                        <th>管理IP</th>
                                        <th>机柜位置</th>
                                        <th>角色</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box box-primary">
                    <div className="row box-body">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label><small>服务管理</small></label>
                            </div>
                            <div className="box-header pull-left">
                                <button type="submit" name="createDataset" className="btn btn-primary" data-table="serverList" onClick={this.handleCreateHandler.bind(this)}>
                                    <i className="fa fa-fw fa-plus-circle" style={{verticalAlign: 'middle', padding: '0 8px 0 0'}}></i>
                                    新建服务
                                </button>
                            </div>
                            <div className="box-body">
                                <table id="serverList" className="table table-striped table-bordered" style={{ width: '100%' }}>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>服务名</th>
                                        <th>服务状态</th>
                                        <th>管理IP</th>
                                        <th>机柜位置</th>
                                        <th>角色</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <button name="saveBtn" className="btn btn-primary" onClick={ this.createDataSetHandler } ><i className="fa fa-save" ></i> 保存</button>
                <Modal modalId="nodeListRemove" ref='nodeListRemove' title="节点删除" okHandler={ this.RemoveOKHandler }/>
                {/* <Modal modalId="serverListRemove" ref='serverListRemove' title="服务删除" okHandler={ this.RemoveOKHandler }/> */}
            </div>
        )
    }
}
export default NodeServerManage;
