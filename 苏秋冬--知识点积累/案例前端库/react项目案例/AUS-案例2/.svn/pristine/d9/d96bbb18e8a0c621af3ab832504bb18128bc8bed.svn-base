/**
 * Loading加载组件
 * User: gaogy
 * Date: 2016/12/30
 * Time: 10:21
 */
import React, { Component } from 'react';

class Loading extends Component {
    constructor(props) {
        super(props);
        
        this.showLoadingPageHandler = this.showLoadingPageHandler.bind();
        this.hideLoadingPageHandler = this.hideLoadingPageHandler.bind();
    }

    /**
     * 显示loading页面
     */
    showLoadingPageHandler() {
        $('#loading').show();
    }

    /**
     * 隐藏loading页面
     */
    hideLoadingPageHandler() {
        $('#loading').fadeOut(800);
    }

    render() {
        return (
            <div id="loading" style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#3c8dbc', zIndex: 10000 }} >
                <div style={{ left: '50%', top: '50%', position: 'absolute', marginTop: '-20px', marginLeft: '-20px' }}>
                    <img src={ require('../../../assets/img/gears.gif') } />
                </div>
            </div>
        )
    }
}
export default Loading;
