import React, { Component } from 'react';
import { error} from 'UTIL/notification';
import Communal from '../Communal';
export default class LIMIT extends Component {
    constructor(props) {
        super(props);
        this.LIMIT = this.LIMIT.bind(this);
    }
    LIMIT() {
        let self = event.target;
        let value = self.value;
        if (value == '') {
            $(self).parents('.bdMode').find('.alias').html('&lt;--&gt;');
            return ;
        }
        // 验证是否为数字
        if (isNaN(value)) {
            error('请输入正确的格式');
            self.value = '';
            return ;
        }
        // 更改value
        $(self).parents('.bdMode').find('.alias').html(Math.floor(value));
    }
    render() {
        let Limit = <li className="list-group-item">
                        <div className="dropdown bdMode">
                            <span className="label label-info key-right alias cursor" data-toggle="dropdown">&lt;--&gt;</span>
                            <ul className="dropdown-menu" role="menu">
                                <li><input type="text" className='LIMIT' onBlur={this.LIMIT}/></li>
                            </ul>
                        </div>
                        <span>,</span>
                        <div className="dropdown bdMode">
                            <span className="label label-info key-right alias cursor" data-toggle="dropdown">&lt;--&gt;</span>
                            <ul className="dropdown-menu" role="menu">
                                <li><input type="text" className='LIMIT' onBlur={this.LIMIT}/></li>
                            </ul>
                        </div>
                    </li>;
        return <Communal title={'LIMIT'} content={Limit}></Communal>
    }
}
