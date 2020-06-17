import React, { Component } from 'react';
import Communal from '../Communal';
export default class HAVING extends Component {
    constructor(props) {
        super(props);
        this.HAVINGConditions = this.HAVINGConditions.bind(this);
        this.delectMenu = this.delectMenu.bind(this);
    }
    HAVINGConditions() {
        this.props.publicConditions('HAVING');
    }
    delectMenu() {
        this.props.delectMenu('HAVING');
    }
    render() {
        let addList = <span className="label label-info key-right cursor" onClick={this.HAVINGConditions}>&lt;添加条件&gt;</span>;
        let item = this.props.HAVING.map((maps, i)=>{
            let nodesList = maps.map((date)=>{
                return this.props.creatCondition(date);
            });
            let keyOn = '';
            if (i > 0)keyOn = 'AND';
            return <div className="join-condition-menu">
                        <span className="key-right">{keyOn}</span>
                        {nodesList}
                        <i className="fa fa-trash-o cursor" title='删除' onClick={this.delectMenu}></i>
                    </div>;
        });
        item = <li className="list-group-item">{item} {addList}</li>
        if (item.length == 0) item = <li className="list-group-item">{addList}</li>;
        return <Communal content={item} title={'HAVING'}></Communal>

    }
}
