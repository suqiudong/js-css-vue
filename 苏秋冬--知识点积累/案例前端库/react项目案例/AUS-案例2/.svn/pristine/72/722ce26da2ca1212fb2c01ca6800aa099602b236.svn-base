/**
 * 显示结果集
 * User: xiongjie
 * Date: 2017/8/5
 * Time: 15:45
 * */

import React, { Component } from 'react';
import createList from 'UTIL/baseList';
import dataSourceModelService from 'SERVICE/dataSourceModelService';
import {encodeSMS4} from 'UTIL/sm4';
import { error} from 'UTIL/notification';
import { cutStr } from 'UTIL/util';
import Modal from 'COMPONENT/Common/Modal/Modal';

const key = '2C023A86BD32812A4C180A7152EEBF0A';
export default class ResultSet extends Component {
    constructor(props) {
        super(props);
        this.ResultSet = this.ResultSet.bind(this);
        this.createdataViewList = this.createdataViewList.bind(this);
    }
    // 生成结果集
    createdataViewList(data = [], keys = []) {
        // 构造列表配置项
        let tableConfig = {};
        let columns = [];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            columns.push({
                data: key,
                'render': function (data, type, row) {
                    let dashboardName = row[key] || '';
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 70) }</span> `;
                    return html;
                },
                'defaultContent': '-'
            });
        }
        tableConfig.id = 'dataViewList';
        tableConfig.columns = columns;
        tableConfig.scrollX = true;
        tableConfig.searching = false;
        // 获取列表内数据列
        tableConfig.data = data;
        // 生成列表
        createList(tableConfig);
    }
    // 显示结果集
    ResultSet(data) {
        if (!data) {
            error('请关联字段后在显示结果集');
            return;
        }
        var content = <table id='dataViewList' className="table table-striped table-bordered">
            <thead><tr></tr></thead>
        </table>;
        this.refs.ResultSet.setContent(content);
        let sql = {
            sql: encodeSMS4(data, key).join(','),
            limit: 20
        };
        (async ()=>{
            let result = await dataSourceModelService.getPlanResult(sql);
            return result;
        })().then((result) => {
            // 生成结果集
            if (result.length > 0) {
                let keys = [];
                let tr = $('#dataViewList thead tr');
                tr.empty();
                for (let i in result[0]) {
                    tr.append(`<th>${i}</th>`);
                    keys.push(i);
                }
                setTimeout(() => {
                    this.createdataViewList(result, keys);
                }, 1000);
            } else {
                this.refs.ResultSet.setContent(`<p>显示结果集为空</p>`);
            }
            $('#ResultSet').modal();
        });
    }
    render() {
        return (<Modal modalId="ResultSet" ref='ResultSet' title="显示结果集" button="noButton" width="60%"/>)
    }
}

