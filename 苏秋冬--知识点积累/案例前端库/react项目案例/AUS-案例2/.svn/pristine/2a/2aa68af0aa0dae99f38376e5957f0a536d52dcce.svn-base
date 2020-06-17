import React, { Component } from 'react';
import Communal from '../Communal';
import createSelect, {bindSelectEvent} from 'UTIL/baseSelect2';
export default class FORM extends Component {
    constructor(props) {
        super(props);
        this.delectMenu = this.delectMenu.bind(this);
        this.joinCondition = this.joinCondition.bind(this);
        this.jsplumsChange = this.jsplumsChange.bind(this);
    }
    componentDidUpdate() {
        let options = {
            class: 'offsetColumn',
            minimumResultsForSearch: 2
        };
        createSelect(options);
        // 绑定select事件
        bindSelectEvent({class: 'joinCondition'}, 'select2:select', this.joinCondition);
        this.jsplumsChange();
    }
    delectMenu() {
        this.props.delectMenu('from');
    }
    jsplumsChange(e) {
         let that = this;
         $('.Exhibition_select[data-name = "FROM"] .SelectMode').on('change', function() {
         let parents = $(this).parents('.join-condition-menu');
         let SelectMode = parents.find('.SelectMode'); // 获取目标select
         let tableSource = parents.attr('data-name'); // 获取所在表名
         let index = parents.attr('value'); // 获取index
         let source = SelectMode.eq(0).val(); // 获取源
         let target = SelectMode.eq(2).val(); // 获取目标
         // 判断是否存在别名
         let isAlias = that.props.isAlias(source, target);
         that.props.jsPlumbChange(tableSource, isAlias.source, isAlias.target, index); // 重新连线
         });
    }
    joinCondition(e) {
        let innerHTML = event.target.innerHTML;
        let parents = $(e.currentTarget).parents('.list-group-item'); // currentTarget:当前节点
        // 获取字段名
        let joinName = parents.find('.tableName').html();
        this.props.joinCondition(innerHTML, joinName);
    }
    render() {
    // 写入表
        let sql = this.props.nodes;
        let tableName = sql.tableName.map((date, i)=>{
        // 条件
        let condition = [',', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN',
                'STRAIGHT JOIN', 'NATURAL JOIN', 'NATURL LEFT JOIN',
                'NATURAL RIGHT JOIN', '[Custom join]'];
        let conditionHTML = condition.map((date, i)=>{
            return <option value={date} key={i}>{date}</option>
        })
        let str = <div className="dropdown FuncMode form-group">
                        <select className="form-control offsetColumn joinCondition">
                            {conditionHTML}
                        </select>
                    </div>;
        let limit = <span className="label label-info key-right LimitingCondition" title={date} onClick={this.props.LimitingConditions}>限制</span>;
        // 最后一位不添加逗号，添加限制
        if (i == sql.tableName.length - 1)str = '';

        // 当表只有一个时不添加任何
        if (sql.tableName.length == 1) {
            limit = '';
            str = '';
        }
        // 多个表时第一位不添加限制字符
        if (i == 0 && sql.tableName.length > 1)limit = '';

        // 添加限制条件。state输出
        let joins = [];
        if (this.props.from.hasOwnProperty(date, i)) {
            joins = this.props.from[date].map((maps, i)=>{
                let nodesList = maps.map((date)=>{
                    return this.props.creatCondition(date);
                });
                let keyOn = 'ON';
                if (i > 0)keyOn = 'AND';
                return <div className="join-condition-menu" value={i} data-name={date}>
                            <span className="key-right">{keyOn}</span>
                            {nodesList}
                            <i className="fa fa-trash-o cursor" title='删除' onClick={this.delectMenu}></i>
                        </div>;
            })
        }
        return <li className="list-group-item" key={i} title={date}>
                    <span className='key-name tableName'>{date}</span>
                    <div className="dropdown bdMode">
                        <span className="label label-info key-right alias cursor" data-toggle="dropdown">别名</span>
                        <ul className="dropdown-menu" role="menu">
                            <li><input type="text" className='bdName' onBlur={this.props.bdName}/></li>
                        </ul>
                    </div>
                    {joins}
                    {limit}
                    {str}
                 </li>
        });
        if (tableName.length == 0) tableName = <li className="list-group-item"><span className="key-right Prompt-where">&lt;添加栏位&gt;</span></li>;
        return <Communal content={tableName} title={'FROM'}></Communal>
    }
}
