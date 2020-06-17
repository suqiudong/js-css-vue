/**
 * User: zhangaoxiang
 * Date: 2016/12/9
 * Time: 17:10
 */
import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import { unitTransform } from 'UTIL/util';
import createList, { bindTableEvent } from 'UTIL/baseList';
import createTip from 'UTIL/baseTip';
import usermanageService from 'SERVICE/usermanageService';

export default class DataSet extends Component {
    constructor(props) {
        super(props);
        this.createTable = this.createTable.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.detailHandler = this.detailHandler.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.removeOKHandler = this.removeOKHandler.bind(this);
        this.clickOwnerHandler = this.clickOwnerHandler.bind(this);
        this.privilegeHandler = this.privilegeHandler.bind(this);
    }

    componentWillMount() {
        // 读取列表数据
        this.props.readDataset();
    }

    componentDidUpdate() {
        if (this.props.dataset.datasetList.result.data) {
            this.createTable(this.props.dataset.datasetList.result.data);
        }
        $('button[name = "createDataset"]').on('click', this.addHandler);
    }

    createTable(data) {
        // 构造列表配置项
        let tableConfig = {};

        tableConfig.id = 'datasetList';
        tableConfig.scrollX = false;
        tableConfig.columns = [
            {data: 'datasetName', 'defaultContent': '-'},
            {data: 'count', 'defaultContent': '-'},
            {
                data: 'size',
                render: function (data, type, row, meta) {
                    return unitTransform(data);
                },
                'defaultContent': '-'
            },
            {
                data: 'status',
                render: function (data, type, row, meta) {
                    if (data == 'ONLINIE') {
                        return '上线';
                    } else {
                        return '下线';
                    }
                },
                'defaultContent': '-'
            },
            {
                data: 'visable',
                render: function (data, type, row, meta) {
                    if (data == 'PRIVATE') {
                        return '私有';
                    } else {
                        return '共享';
                    }
                },
                'defaultContent': '-'
            },
            {
                data: 'owner',
                'render': function (data, type, row) {
                    let html = `<a href="javascript:void(0);" class="owner">${ row.owner }</a> `;
                    return html;
                },
                'defaultContent': '-'},
            {data: 'createTime', 'defaultContent': '-'},
            {data: 'privilege', 'defaultContent': '-'}
        ];
        tableConfig.order = [[6, 'desc']];
        let userRolePermission = sessionStorage.getItem('userRolePermission');
        // 定义列表内操作列
        if (userRolePermission.indexOf('DATASET_') != -1) {
            tableConfig.columnDefs = [{
                'targets': 7, // 操作列生成位置，当前为列表第8列
                'render': function (data, type, row) {
                    let html = '';
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

                    return html;
                }
            }];
        }

        // 获取列表内数据列
        tableConfig.data = data;

        // 生成列表
        createList(tableConfig);

        // 列表内查看事件绑定
        bindTableEvent('datasetList', 'click', 'a.datasetDetail', this.detailHandler);
        // 列表内编辑事件绑定
        bindTableEvent('datasetList', 'click', 'a.datasetEdit', this.editHandler);
        // 列表内删除事件绑定
        bindTableEvent('datasetList', 'click', 'a.datasetRemove', this.removeHandler);
        // 列表内授权事件绑定
        bindTableEvent('datasetList', 'click', 'a.privilege', this.privilegeHandler);
        // 列表内创建人tip绑定
        bindTableEvent('datasetList', 'click', 'a.owner', this.clickOwnerHandler);
        $('.owner').off('click').on('click', this.clickOwnerHandler);
    }

    /**
     * 创建人点击事件
     * @param e
     */
    clickOwnerHandler(e) {
        // 读取用户详细信息
        let userDetail = usermanageService.userDetail($(e.currentTarget).text());
        userDetail = userDetail.result.detail;
        let tooltips = createTip({
            parent: e.currentTarget,
            event: 'click',
            content: `<dl><dt>用户名：</dt><dd>${userDetail.userName}</dd></dl>
            <dl><dt>姓名：</dt><dd>${userDetail.name}</dd></dl>
            </dl><dl><dt>部门：</dt><dd>${userDetail.department}</dd></dl>
            </dl><dl><dt>职位：</dt><dd>${userDetail.position}</dd></dl>
            </dl><dl><dt>电话：</dt><dd>${userDetail.phoneNo}</dd></dl>
            <dl><dt>邮箱：</dt><dd>${userDetail.email}</dd></dl>`
        });

        let api = tooltips.qtip('api');
        api.show();
    }

    // 数据集新建事件处理
    addHandler() {
        this.props.history.replace('/dataSet/add');
    }

    // 数据集记录详细事件
    detailHandler(e) {
        let selectedRecord = $('#datasetList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.selectDataset(selectedRecord);
        this.props.history.replace('/dataSet/detail/' + selectedRecord.datasetName);
    }

    // 数据集记录编辑事件
    editHandler(e) {
        let selectedRecord = $('#datasetList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.selectDataset(selectedRecord);
        this.props.history.replace('/dataSet/update/' + selectedRecord.datasetName);
    }

    privilegeHandler(e) {
        let selectedRecord = $('#datasetList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.selectDataset(selectedRecord);
        this.props.history.replace('/dataSet/accredit/' + selectedRecord.datasetName);
    }

    // 数据集记录删除处理
    removeHandler(e) {
        let selectedRecord = $('#datasetList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.selectDataset(selectedRecord);
        this.refs.delDataset.setContent('您确定要删除数据集：' + selectedRecord.datasetName + '吗？');
    }
    // 删除确认处理
    removeOKHandler() {
        let nameList = [];
        nameList.push(this.props.dataset.selectedRecord.datasetName);
        this.props.deleteDataset(nameList);
        $('#removeDataset').modal('hide');
        window.location.reload();
        // this.props.history.replace('/dataSet');
    }

    render() {
        let thTpl = <tr><th>名称</th>
            <th>记录数</th>
            <th>空间大小</th>
            <th>状态</th>
            <th>可见性</th>
            <th>创建人</th>
            <th>创建时间</th></tr>;

        // 判断有无数据集操作权限
        let userRolePermission = sessionStorage.getItem('userRolePermission');
        if (userRolePermission.indexOf('DATASET_') != -1) {
            thTpl = <tr><th>名称</th>
                <th>记录数</th>
                <th>空间大小</th>
                <th>状态</th>
                <th>可见性</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>操作</th></tr>;
        }

        // 判断是否存在数据集新建权限
        let addBtnTpl = '';
        if (sessionStorage.getItem('userRolePermission').indexOf('DATASET_CREATE') != -1) {
            addBtnTpl = <button type="submit" name="createDataset" className="btn btn-primary">新建</button>;
        }
        return (
            <div id="datasetManage" className="box box-primary">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box-header">
                            {addBtnTpl}
                        </div>
                        <div className="box-body">
                            <table id="datasetList" className="table table-striped table-bordered">
                                <thead>
                                {thTpl}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal modalId="removeDataset" ref='delDataset' title="删除数据集" okHandler={ this.removeOKHandler }/>
            </div>
        )
    }
}
