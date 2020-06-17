/**
 * 下拉框组件
 * User: gaogy
 * Date: 2016/12/20
 * Time: 21:27
 */
import React, { Component } from 'react';
import createSelect2, { bindSelectEvent } from 'UTIL/baseSelect2';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.colsSelectHandler = this.colsSelectHandler.bind(this);
    }

    colsSelectHandler(evt) {
        this.props.colsSelectHandler(evt.params.data.belongTableId, evt.params.data.id);
    }

    componentDidMount() {
        let options = this.props.options || {};
        createSelect2(options);

        if (this.props.colsSelectHandler) {
            bindSelectEvent(options.id, 'select2:select', this.colsSelectHandler);
            bindSelectEvent(options.id, 'select2:unselect', this.colsSelectHandler);
        }
    }

    render() {
        return (
            <div id='select2Div' className={ this.props.className }>
                <select id={ this.props.options.id } style={{ width: '100%', minWidth: '265px' }}></select>
            </div>
        )
    }
}
export default Select;
