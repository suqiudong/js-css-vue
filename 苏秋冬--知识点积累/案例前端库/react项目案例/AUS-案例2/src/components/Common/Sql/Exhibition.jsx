import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SELECT from './Common/SELECT';
import FORM from './Common/FORM';
import WHERE from './Common/WHERE';
import LIMIT from './Common/LIMIT';
import HAVING from './Common/HAVING';
import GROUPBY from './Common/GROUPBY';
import ORDERBY from './Common/ORDERBY';
import createSelect from 'UTIL/baseSelect2';
import { error} from 'UTIL/notification';

let cloumsDate = {
    StorageAlias: {
        from: {},
        where: [],
        GROUPBY: [],
        HAVING: [],
        ORDERBY: []
    }, // 存储更改别名后所有字段,添加的限制条件
    LastAliasTable: {}, // 存储上一次别名
    joinCondition: {}, // 存储关联类型
    calc: ['=', '<', '>', '<=', '>=', '<>'] // 计算符
}
export default class Exhibition extends Component {
    constructor(props) {
        super(props);
        this.bdName = this.bdName.bind(this);
        this.ExtractCloums = this.ExtractCloums.bind(this);
        this.fromChange = this.fromChange.bind(this);
        this.publicChange = this.publicChange.bind(this);
        this.clearcloumsDate = this.clearcloumsDate.bind(this);
        this.creatCondition = this.creatCondition.bind(this);
        this.LimitingConditions = this.LimitingConditions.bind(this);
        this.publicConditions = this.publicConditions.bind(this);
        this.BYpublicConditions = this.BYpublicConditions.bind(this);
        this.BYpublicChange = this.BYpublicChange.bind(this);
        this.delectMenu = this.delectMenu.bind(this);
        this.ReturnInformation = this.ReturnInformation.bind(this);
        this.joinCondition = this.joinCondition.bind(this);
        this.isAlias = this.isAlias.bind(this);
        this.clearJsplumStorageAlias = this.clearJsplumStorageAlias.bind(this);
        this.state = {
            StorageState: {
                from: {},
                where: [],
                GROUPBY: [],
                HAVING: [],
                ORDERBY: []
            }
        }
    }
    componentWillMount() {
        createSelect({class: 'offsetColumn', minimumResultsForSearch: 2});
        this.props.sql.tableName.map((date)=>{
            cloumsDate.LastAliasTable[date] = 'miasd';
        })
    }
    componentWillUpdate() {
        // 每次添加新表时更新本地对象
        let sql = this.props.sql;
        let where = cloumsDate.StorageAlias.where;
        let GROUPBY = cloumsDate.StorageAlias.GROUPBY;
        let ORDERBY = cloumsDate.StorageAlias.ORDERBY;
        let from = cloumsDate.StorageAlias.from;
        let HAVING = cloumsDate.StorageAlias.HAVING;
        let allCloums = this.ExtractCloums(sql.allCloums); // 取出所有的字段
        let cloums = this.ExtractCloums(sql.cloums);
        // 更新GROUPBY字段
        GROUPBY.map((nodes, i)=>{
            GROUPBY[i] = allCloums;
        })
        // 更新GROUPBY字段
        ORDERBY.map((nodes, i)=>{
            ORDERBY[i] = allCloums;
        })

        // 更新where字段
        where.map((arr, x)=>{
            arr.map((nodes, i)=>{
                if (i == 1) return;
                where[x][i] = allCloums;
            })
        })
        // 更新from字段
        for (let key in from) {
            from[key].map((nodes, i)=>{
                let fromList = from[key][i];
                nodes.map((list, x)=>{
                    if (x == 1) return;
                    fromList[x] = allCloums;
                });
            })
        }
        // 更新HAVING字段
        HAVING.map((arr, x)=>{
            arr.map((nodes, i)=>{
                if (i == 1) return;
                HAVING[x][i] = cloums;
            })
        })

    }
    componentDidUpdate() {
    }
    // 判断是否存在别名，存在恢复
    isAlias(source, target) {
        for (let key in cloumsDate.LastAliasTable) {
            let sourceBD = source.split('.');
            let targetBD = target.split('.')
            if (cloumsDate.LastAliasTable[key] == sourceBD[0]) {
                source = key + '.' + sourceBD[sourceBD.length - 1];
            }
            if (cloumsDate.LastAliasTable[key] == targetBD[0]) {
                target = key + '.' + targetBD[targetBD.length - 1];
            }
        }
        return {source, target}
    }
    ReturnInformation() {
        return cloumsDate;
    }
    // 删除模块清除限制
    clearJsplumStorageAlias(key) {
        let from = cloumsDate.StorageAlias.from;
        from[key] = [];
    }
    // 删除表情况本地缓存对象信息
    clearcloumsDate() {
        let sql = this.props.sql;
        let from = cloumsDate.StorageAlias.from;
        let allCloums = this.ExtractCloums(sql.allCloums); // 取出所有的字段
        let cloums = this.ExtractCloums(sql.cloums);
        if (allCloums.length == 0) {
            cloumsDate.StorageAlias.where = []; // 恢复where
            cloumsDate.StorageAlias.GROUPBY = []; // 恢复GROUPBY
            cloumsDate.StorageAlias.ORDERBY = []; // 恢复ORDERBY
        };
        if (cloums == 0) cloumsDate.StorageAlias.HAVING = []; // 恢复HAVING
        let objKeys = Object.keys(sql.allCloums); // 获取表对象长度
        // 选择框中表小于两个不成立限制条件
        if (objKeys.length < 2) {
            for (let key in from) {
                from[key] = [];
            }
        }
        this.setState({StorageState: cloumsDate.StorageAlias});
    }
    // 取出字段
    ExtractCloums(cloums) {
        let nodes = [];
        for (let key in cloums) {
            for (let k in cloums[key]) {
                let cloumsAll = cloums[key];
                nodes.push(cloumsAll[k].name);
            }
        }
        return nodes;
    }
    // 别名
    bdName () {
        // 字段设置别名
        let value = event.target.value;
        let parents = $(event.target).parents('.list-group-item');
        parents.find('.AS').remove(); // 初始
        // 获取表名
        let cloumsName = parents.find('.key-name').html();
        this.props.bdChange(value, cloumsName);
        if (value == '' || value.indexOf(' ') > -1) {
            parents.find('.alias').html('别名');
            $(this).val('');
            // 更新select区域字段
            this.fromChange(cloumsName, cloumsName);
            this.publicChange(cloumsName, cloumsName, 'HAVING');
            this.publicChange(cloumsName, cloumsName, 'where');
            this.BYpublicChange(cloumsName, cloumsName, 'ORDERBY');
            this.BYpublicChange(cloumsName, cloumsName, 'GROUPBY');
            cloumsDate.LastAliasTable = value;
            this.setState({StorageState: cloumsDate.StorageAlias});
            return;
        }
        parents.find('.alias').before('<span class="AS">AS</span>');
        parents.find('.alias').html(value);
        // 更新select区域字段
        this.fromChange(value, cloumsName);
        this.BYpublicChange(value, cloumsName, 'GROUPBY');
        this.publicChange(value, cloumsName, 'HAVING');
        this.publicChange(value, cloumsName, 'where');
        this.BYpublicChange(value, cloumsName, 'ORDERBY');
        cloumsDate.LastAliasTable[cloumsName] = value;
        this.setState({StorageState: cloumsDate.StorageAlias});
    }
    BYpublicChange(value, cloumsName, target) {
        let onecStorageAlias = cloumsDate.StorageAlias[target];
        onecStorageAlias.map((date, i)=>{
            let bd = date.map((nodes)=>{
                let arr = nodes.split('.');
                if (nodes.indexOf(cloumsName) > -1 || nodes.indexOf(cloumsDate.LastAliasTable[cloumsName]) > -1) {
                    let arrs = value + '.' + arr[arr.length - 1];
                    return arrs;
                }
                return nodes;
            })
            onecStorageAlias[i] = bd;
            onecStorageAlias[i] = bd
        })
    }
    publicChange(value, cloumsName, target) {
        let onecStorageAlias = cloumsDate.StorageAlias[target];
        onecStorageAlias.map((date, i)=>{
            let bd = date[0].map((nodes)=>{
                let arr = nodes.split('.');
                if (nodes.indexOf(cloumsName) > -1 || nodes.indexOf(cloumsDate.LastAliasTable[cloumsName]) > -1) {
                    let arrs = value + '.' + arr[arr.length - 1];
                    return arrs;
                }
                return nodes;
            })
            onecStorageAlias[i][0] = bd;
            onecStorageAlias[i][2] = bd
        })
    }
    fromChange(value, cloumsName) {
            let onecStorageAlias = cloumsDate.StorageAlias.from;
            for (let k in onecStorageAlias) {
                onecStorageAlias[k].map((date, i)=>{
                    let bd = date[0].map((nodes)=>{
                        let arr = nodes.split('.');
                        if (nodes.indexOf(cloumsName) > -1 || nodes.indexOf(cloumsDate.LastAliasTable[cloumsName]) > -1) {
                            let arrs = value + '.' + arr[arr.length - 1];
                            return arrs;
                        }
                        return nodes;
                    })
                    onecStorageAlias[k][i][0] = bd;
                    onecStorageAlias[k][i][2] = bd
                })
            }

    }
    // 打印字段或 =
    creatCondition(nodes) {
        let options = nodes.map((date, i)=>{
            return <option value={date} key={i}> {date} </option>;
        });
        return <div className="dropdown form-group">
            <select className="form-control offsetColumn SelectMode">
                {options}
            </select>
        </div>
    }
    // 添加关联限制条件
    LimitingConditions() {
        // 更改join
        let prev = $(event.target).parents('.list-group-item').prev();
        let targetName = prev.find('.tableName').html();
        if (prev.find('.joinCondition').val() == ',') {
            prev.find('.joinCondition').val('INNER JOIN');
            cloumsDate.joinCondition[targetName] = 'INNER JOIN';
        };
        let sql = this.props.sql;
        let allCloums = this.ExtractCloums(sql.allCloums); // 取出所有的字段
        let maps = [allCloums, cloumsDate.calc, allCloums]; // 存储打印信息
        let forms = cloumsDate.StorageAlias.from;
        // 添加到本地对象中存储
        sql.tableName.map((date)=>{
            if (!(date in cloumsDate.StorageAlias.from)) {
                forms[date] = [];
            }
            if (date == event.target.getAttribute('title')) {
                forms[date].push(maps);
                let source = allCloums[0]; // 获取源
                let target = allCloums[0]; // 获取目标
                // 判断是否存在别名
                let isAlias = this.isAlias(source, target);
                this.props.jsPlumbPush(date, isAlias.source, isAlias.target, forms[date].length);
            }
        })

        // 更新state
        this.setState({StorageState: cloumsDate.StorageAlias});
    }

    // where与HAVING公共方法
    publicConditions(target) {
        let name = target == 'where' ? 'allCloums' : 'cloums';
        let date = this.props.sql[name];
        let allCloums = this.ExtractCloums(date); // 取出所有的字段
        let maps = [allCloums, cloumsDate.calc, allCloums]; // 存储打印信息
        if (allCloums == 0) {
            target == 'where' ? error('请选择表信息') : error('请选择字段');
            return;
        }
        // 添加到本地对象中存储
        cloumsDate.StorageAlias[target].push(maps);
        // 更新state
        this.setState({StorageState: cloumsDate.StorageAlias});
    }
    // ORDERBY与GROUPBY公共方法
    BYpublicConditions(target) {
        let sql = this.props.sql;
        let allCloums = this.ExtractCloums(sql.allCloums); // 取出所有的字段
        if (allCloums == 0) {
            error('请选择表信息');
            return;
        }
        // 添加到本地对象中存储
        cloumsDate.StorageAlias[target].push(allCloums);
        // 更新state
        this.setState({StorageState: cloumsDate.StorageAlias});
    }
    delectMenu(target) {
        let parents = $(event.target).parents('.join-condition-menu');
        let index = parents.attr('value'); // 删除的位置
        let targetName = parents.attr('data-name');// 删除所在位置的表名
        // 判断target
        switch (target) {
            case 'from' :
                this.props.jsPlumbDelete(targetName, index);
                let parents = $(event.target).parents('.list-group-item');
                let prevName = parents.prev().attr('title'); // join位置所在的表
                cloumsDate.StorageAlias.from[targetName].splice(index, 1);
                if (cloumsDate.StorageAlias.from[targetName].length == 0) {
                    parents.prev().find('.joinCondition').val(',');
                    cloumsDate.joinCondition[prevName] = ',';
                }
                break;
            case 'where' :
                cloumsDate.StorageAlias.where.splice(index, 1);
                break;
            case 'GROUPBY' :
                cloumsDate.StorageAlias.GROUPBY.splice(index, 1);
                break;
            case 'HAVING' :
                cloumsDate.StorageAlias.HAVING.splice(index, 1);
                break;
            case 'ORDERBY' :
                cloumsDate.StorageAlias.ORDERBY.splice(index, 1);
                break;
            default :
                break;

        }

        this.setState({StorageState: cloumsDate.StorageAlias});
    }
    // 存储关联类型
    joinCondition (value, name) {
        cloumsDate.joinCondition[name] = value;
    }
    render() {
        return <div className='Exhibition'>
                    <SELECT nodes={this.props.sql}
                            FuncMenuChange={this.props.FuncMenuChange}
                            bdCloums={this.props.bdCloums}></SELECT>
                    <FORM nodes={this.props.sql}
                          from={this.state.StorageState.from}
                          ExtractCloums={this.ExtractCloums}
                          bdName={this.bdName}
                          LimitingConditions={this.LimitingConditions}
                          creatCondition={this.creatCondition}
                          delectMenu= {this.delectMenu}
                          joinCondition={this.joinCondition}
                          isAlias={this.isAlias}
                          jsPlumbChange={this.props.jsPlumbChange}
                    ></FORM>
                    <WHERE where={this.state.StorageState.where}
                           publicConditions={this.publicConditions}
                           creatCondition={this.creatCondition}
                           delectMenu= {this.delectMenu}
                    ></WHERE>
                    <GROUPBY GROUPBY={this.state.StorageState.GROUPBY}
                             BYpublicConditions={this.BYpublicConditions}
                             delectMenu= {this.delectMenu}
                    ></GROUPBY>
                    <HAVING HAVING={this.state.StorageState.HAVING}
                            publicConditions={this.publicConditions}
                            creatCondition={this.creatCondition}
                            delectMenu= {this.delectMenu}></HAVING>
                    <ORDERBY ORDERBY={this.state.StorageState.ORDERBY}
                             BYpublicConditions={this.BYpublicConditions}
                             delectMenu= {this.delectMenu}
                            ></ORDERBY>
                    <LIMIT></LIMIT>
                </div>
    }
}
