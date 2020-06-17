/**
 * 数据源模型管理
 * User: xiongjie
 * Date: 2017/8/5
 * Time: 15:45
 * */
import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createList, { bindTableEvent } from 'UTIL/baseList';
export default class DataSourceModel extends Component {
    constructor(props) {
            super(props);
        this.createTable = this.createTable;
        this.deletBut = this.deletBut.bind(this);
        this.addtable = this.addtable.bind(this);
        this.UpdateModel = this.UpdateModel.bind(this);
        this.okHandler = this.okHandler.bind(this);
        this.onSch = this.onSch.bind(this);
        this.offSch = this.offSch.bind(this);
        this.killCurrent = this.killCurrent.bind(this);
        this.runOnce = this.runOnce.bind(this);
        this.getList = this.getList.bind(this);
         this.isRunningBatch = this.isRunningBatch.bind(this);
         this.isOnSchBatch = this.isOnSchBatch.bind(this);
        this.state = {
            Name: {
                modelName: ''  // 点击时的模型名称
            },
            arrName: {
                modelName: []
            }, // 所有的模型名称
            schStatus: [], // 所有的上线状态
            runStatus: [] // 所有的同步状态
        }
    }
    componentWillMount() {
        (async ()=>{
            await this.props.ModelManagerList();
            if (this.props.dataSourceModel.modelList) {
                let list = this.props.dataSourceModel.modelList;
                let arrName = [];
                let schStatus = [];
                let runStatus = [];
                let sch = true;
                let kill = true;
                list.map(function (nodes) {
                    if (nodes.schStatus == 'ON') {
                        sch = true;
                    } else {
                        sch = false;
                    }
                    if (nodes.runStatus == 'READY') {
                        kill = false;
                    } else {
                        kill = true;
                    }
                    arrName.push(nodes.modelName);
                    schStatus.push(sch);
                    runStatus.push(kill);
                });

                this.setState({arrName: {
                    modelName: arrName
                }});
                this.createTable(list);
            }
        })();
    }
    componentDidUpdate() {
    }
    createTable(data = []) {
        // 构造列表配置项
        let tableConfig = {};
        tableConfig.id = 'dataSourceModelList';
        tableConfig.scrollX = false;
        tableConfig.columns = [
            {data: 'modelName', 'defaultContent': '-'},
            {data: 'runStatus',
                'render': function(key) {
                  return key == 'READY' ? '待同步' : '同步中';
                },
                'defaultContent': '-'},
            {data: 'owner', 'defaultContent': '-'},
            {data: 'createDate', 'defaultContent': '-'},
            {
                data: 'schStatus',
                'render': function (sch, type, row) {
                    let html = '';
                    let schHtml = sch == 'ON' ? '下线' : '上线';
                    let schClass = sch == 'ON' ? 'offSch' : 'onSch';
                    let iocClass = sch == 'ON' ? 'fa-arrow-down' : 'fa-arrow-up';
                    let syncHtml = row.runStatus == 'READY' ? '同步' : '取消';
                    let syncClass = row.runStatus == 'READY' ? 'runOnce' : 'killCurrent';
                    html += `<a href='javascript:void(0);'  class='` + schClass + ` btn btn-default btn-xs'><i class='fa ` + iocClass + `'></i>` + schHtml + `</a> `;
                    html += `<a href='javascript:void(0);' class='UpdateModel btn btn-default btn-xs'><i class='fa fa-pencil-square-o'></i>更新</a> `;
                    html += `<a href='javascript:void(0);' class='` + syncClass + ` btn btn-default btn-xs'><i class='fa fa-wrench'></i> ` + syncHtml + `</a> `;
                    html += `<a href='javascript:void(0);' class='dataRemove btn btn-default btn-xs' data-toggle="modal" data-target="#removeModel"><i class='fa fa-trash-o'></i> 删除</a> `;

                    return html;
                },
                'defaultContent': '-'
            }
        ];
        tableConfig.order = [[4, 'desc']];
        // 获取列表内数据列
        tableConfig.data = data;
        // 生成列表
        createList(tableConfig);

        // 上线
        bindTableEvent('dataSourceModelList', 'click', 'a.onSch', this.onSch);
        // 上线
        bindTableEvent('dataSourceModelList', 'click', 'a.offSch', this.offSch);
        // 列表内编辑事件绑定
        bindTableEvent('dataSourceModelList', 'click', 'a.UpdateModel', this.UpdateModel);
        // 列表内删除事件绑定
        bindTableEvent('dataSourceModelList', 'click', 'a.dataRemove', this.deletBut);
        // 列表内同步事件绑定
        bindTableEvent('dataSourceModelList', 'click', 'a.runOnce', this.runOnce);
        // 列表内同步事件绑定
        bindTableEvent('dataSourceModelList', 'click', 'a.killCurrent', this.killCurrent);
    }
    // 点击删除
    deletBut(e) {
        let selectedRecord = $('#dataSourceModelList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.setState({Name: {
            modelName: selectedRecord.modelName
        }});
        this.refs.deleteModel.setContent('您确定要删除数据模型：' + selectedRecord.modelName + '吗？');
    }
    // 新建
    addtable() {
        this.props.history.replace('/dataSourceModel/add');
    }
    // 修改事件
    UpdateModel(e) {
        e.stopPropagation();
        let selectedRecord = $('#dataSourceModelList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.history.replace('/dataSourceModel/Update/' + selectedRecord.modelName);
    }
    // 删除成功
    okHandler() {
        this.props.deleteModel(this.state.Name);
        $('#removeModel').modal('hide');
        setTimeout(()=> {
            this.props.history.replace('/dataSourceModel');
        }, 3000);
    }
    // 上线
    onSch(e) {
        let selectedRecord = $('#dataSourceModelList').DataTable().row($(e.currentTarget).parents('tr')).data();
        let modeName = {
            modeName: selectedRecord.modelName
        };
        (async ()=>{
            await this.props.onSch(modeName);
            if (this.props.dataSourceModel.schStatus.code == '0') {
                this.getList();
            }
        })();

    }
    // 下线
    offSch(e) {
        let selectedRecord = $('#dataSourceModelList').DataTable().row($(e.currentTarget).parents('tr')).data();
        let modeName = {
            modeName: selectedRecord.modelName
        };
        (async ()=>{
            await this.props.offSch(modeName);
            if (this.props.dataSourceModel.schStatus.code == '0') {
                this.getList();
            }
        })();

    }
    // 停止同步
    killCurrent (e) {
        let selectedRecord = $('#dataSourceModelList').DataTable().row($(e.currentTarget).parents('tr')).data();
        let modeName = {
            modeName: selectedRecord.modelName
        };
        (async ()=>{
            await this.props.killCurrent(modeName);
            if (this.props.dataSourceModel.runStatus.code == '0') {
                this.getList();
            }
        })();
    }
    // 运行同步
    runOnce(e) {
        let selectedRecord = $('#dataSourceModelList').DataTable().row($(e.currentTarget).parents('tr')).data();
        let modeName = {
            modeName: selectedRecord.modelName
        };
        (async ()=>{
            await this.props.runOnce(modeName);
            if (this.props.dataSourceModel.runStatus.code == '0') {
                this.getList();
            }
        })();
    }
    getList() {
        (async ()=>{
            await this.props.ModelManagerList();
            if (this.props.dataSourceModel.modelList[0]) {
                let list = this.props.dataSourceModel.modelList;
                this.createTable(list);
            }
        })();
    }
    // 获取同步信息
    isRunningBatch(target, modeName) {

        (async ()=>{
            await this.props.isRunningBatch(modeName);
            if (this.props.dataSourceModel.getRuning.result) {
                target.html('<i class="fa fa-wrench"></i>取消').addClass('killCurrent').removeClass('runOnce');
            } else {
                target.html('<i class="fa fa-wrench"></i>同步').addClass('runOnce').removeClass('killCurrent');
            }
        })();
    }
    // 获取上线信息
    isOnSchBatch(target, modeName) {

        (async ()=>{
            await this.props.isOnSchBatch(modeName);
            if (this.props.dataSourceModel.sch.result) {
                target.html('<i class="fa fa-arrow-down"></i>下线').addClass('offSch').removeClass('onSch');
            } else {
                target.html('<i class="fa fa-arrow-up"></i>上线').addClass('onSch').removeClass('offSch');
            }
        })();
    }
    render() {
        return (
            <div id='dataSourceModel' className="box box-primary" >
              <div className='row'>
                  <div className="col-md-12">
                      <div className="box-header" style={{float: 'left'}}>
                          <button type="submit" name="createDataScource" className="btn btn-primary" onClick={this.addtable}>新建</button>
                      </div>
                      <div className="box-body">
                          <table id="dataSourceModelList" className="table table-striped table-bordered">
                              <thead>
                                 <tr>
                                    <th>模型名称</th>
                                     <th>同步状态</th>
                                     <th>创建用户</th>
                                     <th>创建时间</th>
                                     <th>操作</th>
                                 </tr>
                              </thead>
                          </table>
                      </div>
                  </div>
              </div>
                <Modal modalId="removeModel" ref='deleteModel' title="删除数据模型" okHandler={this.okHandler}/>
            </div>
        )
    }
}
