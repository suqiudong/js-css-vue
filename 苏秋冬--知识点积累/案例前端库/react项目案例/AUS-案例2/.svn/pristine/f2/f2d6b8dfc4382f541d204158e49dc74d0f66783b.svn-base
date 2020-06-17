import React, { Component } from 'react';
import createSelect, {bindSelectEvent} from 'UTIL/baseSelect2';
export default class SELECT extends Component {
    constructor(props) {
        super(props);
        this.FuncMenu = this.FuncMenu.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.ergodic = this.ergodic.bind(this);
    }
    componentWillUpdate() {
    }
    componentDidUpdate() {
        let dataSelect = [{id: 0, text: 'Func'}, {id: 1, text: 'sum'}, {id: 2, text: 'max'}, {id: 3, text: 'min'}, {id: 4, text: 'Avg'}, {id: 5, text: 'Count'}];
        let options = {
            class: 'FuncChange',
            placeholder: 'Func',
            minimumResultsForSearch: 2,
            data: dataSelect
        };
        createSelect(options);
        // 绑定select事件
        bindSelectEvent(options, 'select2:select', this.FuncMenu);
        let nodes = this.ergodic();
        $('.FuncChange').each(function() {
            let cloumsName = $(this).parents('.list-group-item').find('.cloumsName').html();
            // 判断是存在括号，存在去除
            if (cloumsName.indexOf('(') > -1) {
                cloumsName = cloumsName.slice(1, cloumsName.length - 1);
            }
            nodes.map((date)=>{
                let index = '0';
                if (date.name == cloumsName || date.bd == cloumsName) {
                    switch (date.Func) {
                        case 'sum' :
                            index = '1';
                            break;
                        case 'max' :
                            index = '2';
                            break;
                        case 'min' :
                            index = '3';
                            break;
                        case 'Avg' :
                            index = '4';
                            break;
                        case 'Count' :
                            index = '5';
                            break;
                        default :
                            index = '0';
                            break;
                    }
                    $(this).select2('val', index);
                }
            })
        })
    }
    ergodic() {
        // 获取字段输出为数组
        let sql = this.props.nodes;
        let nodes = []; // 储存所有字段对象
        for (let key in sql.cloums) {
            let cloumsNodes = sql.cloums[key];
            for (let k in cloumsNodes) {
                nodes.push(cloumsNodes[k]);
            }
        }
        return nodes;
    }
    // 切换distinct状态
    toggleClass () {
        $(event.target).toggleClass('label label-primary');
    }
    // 函数
    FuncMenu(e) {
        let innerHTML = event.target.innerHTML;
        // 获取字段名
        let cloumsName = $(e.currentTarget).parents('.list-group-item').find('.cloumsName').html(); // currentTarget:当前节点
        this.props.FuncMenuChange(innerHTML, cloumsName);
    }
    render() {
        let nodes = this.ergodic();
        let nodeList = nodes.map((date, i)=>{
            let str = i == (nodes.length - 1) ? '' : ','; // 判断是否为最后一位加逗号
            let AS = date.switch ? '' : <span class="AS">AS</span> ;// 存在别名时添加AS关键字
            // 在源对象中分别存储别名和原始字段名，当设置别名时相互对换。以switch判断是否存在别名
            let value = date.Func == 'Func' ? date.name : '(' + date.name + ')'; // 判断是否存在函数，存在加括号
            let value1 = date.Func == 'Func' ? date.bd : '(' + date.bd + ')';
            return <li className="list-group-item btn-group" key={i} style={{height: '40px'}}>
                        <div className="dropdown FuncMode form-group">
                            <select className="form-control offsetColumn FuncChange" data-placeholder='a'>
                            </select>
                        </div>
                        <span className='key-name cloumsName'>{date.switch ? value : value1}</span>
                        <div className="dropdown bdMode">
                            {AS}
                            <span className="label label-info key-right alias cursor" data-toggle="dropdown">
                                {date.switch ? (date.bd == '' ? '别名' : date.bd) : date.name}
                            </span>
                            <ul className="dropdown-menu" role="menu">
                                <li><input type="text" className='bdName' onBlur={this.props.bdCloums}/></li>
                            </ul>
                        </div>
                        {str}
                    </li>
        });
        // 字段为空时
        if (nodeList.length == 0) nodeList = <li className="list-group-item">&lt;添加栏位&gt;</li>;
        return <div className='Exhibition_select'>
                    <h4>
                        <span className="label label-primary Keyword">SELECT</span>
                        <span className='key-right cursor Distinct' onClick={this.toggleClass}>&lt;Distinct&gt;</span>
                    </h4>
                    <ul className="list-group">
                        {nodeList}
                    </ul>
                </div>
    }
}
