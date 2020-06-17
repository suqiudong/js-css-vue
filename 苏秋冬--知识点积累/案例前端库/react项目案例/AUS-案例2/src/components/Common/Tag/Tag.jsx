/**
 * 标签组件
 * User: gaogy
 * Date: 2017/1/7
 * Time: 15:10
 */
import React, { Component } from 'react';

class ChartTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagData: []
        };

        this.addTagDataHandler = this.addTagDataHandler.bind(this);
        this.removeTagDataHandler = this.removeTagDataHandler.bind(this);
        this.clearTagHandler = this.clearTagHandler.bind(this);
        this.getTagsHandler = this.getTagsHandler.bind(this);
    }

    /**
     * 添加标签
     * @param data
     */
    addTagDataHandler(data) {
        let tagData = this.state.tagData;
        tagData.push(data);
        this.setState({
            tagData: tagData
        });
    }

    /**
     * 获取tag数组
     * @returns {Array}
     */
    getTagsHandler() {
        return this.state.tagData;
    }

    /**
     * 删除标签
     * @param e
     */
    removeTagDataHandler(e) {
        let dataId = $(e.currentTarget).attr('id');
        let tagData = this.state.tagData.filter((item) => {
            return item.id != dataId;
        });
        this.setState({
            tagData: tagData
        });
        if (this.props.removeCallbackHandler) {
            this.props.removeCallbackHandler(dataId);
        }
    }

    /**
     * 清空标签
     */
    clearTagHandler() {
        this.setState({
            tagData: []
        });
    }

    render() {
        let tagTpl = this.state.tagData.map((item) =>
            <div id='tagItem' className="label label-primary left mt5 ml5">
                <span className="tagRemove" id={ item.id } onClick={ this.removeTagDataHandler }>×</span>
                { item.desc }
            </div>
        );

        return (
            <div id="chartTag">
                <div>
                    { tagTpl }
                </div>
            </div>
        )
    }
}
export default ChartTag;
