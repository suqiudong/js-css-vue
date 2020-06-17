import React, { Component } from 'react';
let timer;
export default class Refresh extends Component {
    constructor(props) {
        super(props);
        this.RefreshHide = this.RefreshHide.bind(this);
        this.RefreshShow = this.RefreshShow.bind(this);
        this.state = {
            width: 60
        }
    }
    RefreshHide() {
        $(' #Refresh-model').modal('hide');
        clearInterval(timer);
    }
    RefreshShow() {
        let num = 60;
        $(' #Refresh-model').modal();
        clearInterval(timer);
        timer = setInterval(()=>{
            if (num >= 100) {
                num = 0;
            }
            num += 5;
            this.setState({width: num});
        }, 80);
    }
    render() {
        return <div className='modal fade' id='Refresh-model' role='dialog' aria-labelledby='myModalLabel'>
                    <div className='modal-dialog Refresh-dialog'>
                        <div className='modal-content Refresh-content'>
                            <div className='progress progress-striped active'>
                                <div className='progress-bar progress-bar-success' role='progressbar'
                                     aria-valuenow='60' aria-valuemin='0' aria-valuemax='100'
                                     style={{width: this.state.width + '%'}}>
                                </div>
                                <span className='sr-only'>Í¬²½ÖĞ</span>
                            </div>
                        </div>
                    </div>
                </div>
    }
}
