import React, { Component } from 'react';
import Communal from '../Communal';
export default class GROUPBY extends Component {
    constructor(props) {
        super(props);
        this.GROUPBYConditions = this.GROUPBYConditions.bind(this);
        this.delectMenu = this.delectMenu.bind(this);
    }
    GROUPBYConditions() {
        this.props.BYpublicConditions('GROUPBY');
    }
    delectMenu() {
        this.props.delectMenu('GROUPBY');
    }
    render() {
        let nodesList = this.props.GROUPBY;
        let addList = <span className="label label-info key-right cursor" onClick={this.GROUPBYConditions}>&lt;添加GROUP BY&gt;</span>;
        let GROUPBYHTML = nodesList.map((date, i)=>{
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
                            <i className="fa fa-trash-o cursor" title='删除' onClick={this.delectMenu}></i>
                            <span className='GROUPBY-str'>{str}</span>
                        </div>;
            });
        GROUPBYHTML = <li className="list-group-item">{GROUPBYHTML} {addList}</li>;
        if (GROUPBYHTML.length == 0) GROUPBYHTML = <li className="list-group-item">{addList}</li>;
        return <Communal content={GROUPBYHTML} title={'GROUP BY'}></Communal>
    }
}
