import React, { Component } from 'react';
import Communal from '../Communal';
export default class ORDERBY extends Component {
    constructor(props) {
        super(props);
        this.ORDERBYConditions = this.ORDERBYConditions.bind(this);
        this.delectMenu = this.delectMenu.bind(this);
    }
    delectMenu() {
        this.props.delectMenu('ORDERBY');
    }
    ORDERBYConditions() {
        this.props.BYpublicConditions('ORDERBY');
    }
    render() {
        let nodesList = this.props.ORDERBY;
        let addList = <span className="label label-info key-right cursor" onClick={this.ORDERBYConditions}>&lt;添加GROUP BY&gt;</span>;
        let ORDERBYHTML = nodesList.map((date, i)=>{
            let str = '';
            // 长度大于1添加逗号
            if (nodesList.length > 0) str = ',';
            // 最后一位不添加逗号
            if (i == nodesList.length - 1)str = '';
            let options = date.map((nodes, i)=>{
                return <option value={nodes} key={i}>{nodes}</option>
            })
            return <div className="join-condition-menu">
                        <div className="dropdown FuncMode form-group">
                            <select className="form-control offsetColumn">
                                {options}
                            </select>
                        </div>
                        <span className='key-right ORDERBY-ASC' >ASC</span>
                        <i className="fa fa-trash-o cursor" title='删除' onClick={this.delectMenu}></i>
                        <span className='ORDERBY-str'>{str}</span>
                    </div>;
        });
        ORDERBYHTML = <li className="list-group-item">{ORDERBYHTML} {addList}</li>;
        if (ORDERBYHTML.length == 0) ORDERBYHTML = <li className="list-group-item">{addList}</li>;
        return <Communal content={ORDERBYHTML} title={'ORDER BY'}></Communal>
    }
}
