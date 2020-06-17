import React, { Component } from 'react';
import Communal from '../Communal';
export default class WHERE extends Component {
    constructor(props) {
        super(props);
        this.whereConditions = this.whereConditions.bind(this);
        this.delectMenu = this.delectMenu.bind(this);
    }
    whereConditions() {
        this.props.publicConditions('where');
    }
    delectMenu() {
        this.props.delectMenu('where');
    }
    render() {
        let addList = <span className="label label-info key-right cursor" onClick={this.whereConditions}>&lt;添加条件&gt;</span>;
        let whereHtml = this.props.where.map((maps, i)=>{
                let nodesList = maps.map((date)=>{
                    return this.props.creatCondition(date);
                });
                let keyOn = '';
                if (i > 0)keyOn = 'AND';
                return <div className="join-condition-menu">
                            <span className="key-right">{keyOn}</span>
                            {nodesList}
                            <i className="fa fa-trash-o" title='删除' onClick={this.delectMenu}></i>
                          </div>;
            });
        whereHtml = <li className="list-group-item">{whereHtml} {addList}</li>
        if (whereHtml.length == 0) whereHtml = <li className="list-group-item">{addList}</li>;
        return <Communal title={'WHERE'} content={whereHtml}></Communal>
    }
}
