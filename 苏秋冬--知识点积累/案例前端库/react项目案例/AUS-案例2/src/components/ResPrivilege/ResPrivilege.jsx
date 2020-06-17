/**
 * 资源权限管理组件
 * User: zhangax
 * Date: 2016/12/21
 * Time: 10:18
 */
import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createList from 'UTIL/baseList';
import { cutStr } from 'UTIL/util';
import createiCheck from 'UTIL/baseiCheck';
import { error } from 'UTIL/notification';

class ResPrivilege extends Component {
    constructor(props) {
        super(props);
        this.removeRoleOKHandler = this.removeRoleOKHandler.bind(this);
        this.addRoleHandler = this.addRoleHandler.bind(this);
        this.createRoleTable = this.createRoleTable.bind(this);
        this.createRoleResTable = this.createRoleResTable.bind(this);
        this.filterDetail = this.filterDetail.bind(this);
        this.createFilterHandler = this.createFilterHandler.bind(this);

        this.removeUserOKHandler = this.removeUserOKHandler.bind(this);
        this.addUserHandler = this.addUserHandler.bind(this);
        this.createUserTable = this.createUserTable.bind(this);
        this.filterUserDetail = this.filterUserDetail.bind(this);
        this.createUserFilterHandler = this.createUserFilterHandler.bind(this);

        this.saveResPrivilege = this.saveResPrivilege.bind(this);
        this.cancel = this.cancel.bind(this);
        this.modelContent = this.modelContent.bind(this);
    }
    componentWillMount() {
        let data = {};
        data.resType = this.props.params.type.toUpperCase();
        data.resName = this.props.params.id;
        this.props.allUserList();
        this.props.allRoleList();
        this.props.readResPrivilege(data);
        this.props.selectedRecord(data.resName, data.resType);
    }
    componentDidUpdate() {
        this.createRoleResTable();
    }
    /**
     * 创建角色/用户资源权限列表
     */
    createRoleResTable() {
        let name = this.props.resPrivilege.resPrivilegeData.result.data;
        let resType = this.props.params.type.toUpperCase();
        let roleNameArr = [];
        let userNameArr = [];
        for (let i = 0;i < name.length; i++) {
            for (let key in name[i]) {
                let roleRes = {};
                let userRes = {};
                if (key == 'roleName') {
                    roleRes.name = name[i][key];
                    roleRes.privilege = name[i].privilege[resType];
                    if (name[i].filter) {
                        roleRes.filter = name[i].filter;
                    }
                    roleNameArr.push(roleRes);
                } else if (key == 'userName') {
                    userRes.name = name[i][key];
                    userRes.privilege = name[i].privilege[resType];
                    if (name[i].filter) {
                        userRes.filter = name[i].filter;
                    }
                    userNameArr.push(userRes);
                }
            }
        }

        let tableConfig = {};
        let columns = [];
        if (resType == 'DATASET') {
            columns = [
                {
                    className: 'textCenter',
                    orderable: false,
                    data: null,
                    'render': function (data, type, row) {
                        let detailTpl = "<span class='row-details row-details-close hide'></span><i class='fa fa-circle-thin'></i>";
                        if (resType === 'DATASET' && $.inArray('查看', row.privilege) != -1) {
                            detailTpl = "<span class='row-details row-details-close'></span><i class='fa fa-circle-thin hide'></i>";
                        };
                        return detailTpl;
                    },
                    defaultContent: ''
                },
                {
                    'data': 'name',
                    className: 'textCenter selectName',
                    'render': function (data, type, row) {
                        let dashboardName = row.name || '';
                        let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 20) }</span> `;
                        return html;
                    }},
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" name="query" data-name="查看"/> &nbsp 查看</label>`;
                        if ($.inArray('查看', row.privilege) != -1) {
                            label = `<label><input type="checkBox" name="query" checked data-name="查看"/> &nbsp 查看</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="查看" name="query"/> &nbsp 查看</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="修改"/> &nbsp 修改</label>`;
                        if ($.inArray('修改', row.privilege) != -1) {
                            label = `<label><input type="checkBox" data-name="修改" checked/> &nbsp 修改</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="修改"/> &nbsp 修改</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="删除"/> &nbsp 删除</label>`;
                        if ($.inArray('删除', row.privilege) != -1) {
                            label = `<label><input type="checkBox" data-name="删除" checked/> &nbsp 删除</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="删除" /> &nbsp 删除</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="操作"/> &nbsp 操作</label>`;
                        if ($.inArray('操作', row.privilege) != -1) {
                            label = `<label><input type="checkBox" checked data-name="操作"/> &nbsp 操作</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="操作"/> &nbsp 操作</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="授权"/> &nbsp 管理</label>`;
                        if ($.inArray('授权', row.privilege) != -1) {
                            label = `<label><input type="checkBox" checked data-name="授权"/> &nbsp 管理</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="授权"/> &nbsp 管理</label>`
                },
                {
                    'data': null,
                    className: 'textCenter',
                    'orderable': false,
                    'defaultContent': `<i class="fa fa-trash-o" style="cursor: pointer;" title="删除"></i>`
                }
            ]
        }
        if (resType == 'REPORT') {
            columns = [
                {
                    className: 'textCenter',
                    orderable: false,
                    data: null,
                    'render': function (data, type, row) {
                        let detailTpl = "<span class='row-details row-details-close hide'></span><i class='fa fa-circle-thin'></i>";
                        if (resType === 'DATASET' && $.inArray('查看', row.privilege) != -1) {
                            detailTpl = "<span class='row-details row-details-close'></span><i class='fa fa-circle-thin hide'></i>";
                        };
                        return detailTpl;
                    },
                    defaultContent: ''
                },
                {
                    'data': 'name',
                    className: 'textCenter selectName',
                    'render': function (data, type, row) {
                        let dashboardName = row.name || '';
                        let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 20) }</span> `;
                        return html;
                    }},
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" name="query" data-name="查看"/> &nbsp 查看</label>`;
                        if ($.inArray('查看', row.privilege) != -1) {
                            label = `<label><input type="checkBox" name="query" checked data-name="查看"/> &nbsp 查看</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="查看" name="query"/> &nbsp 查看</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="修改"/> &nbsp 修改</label>`;
                        if ($.inArray('修改', row.privilege) != -1) {
                            label = `<label><input type="checkBox" data-name="修改" checked/> &nbsp 修改</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="修改"/> &nbsp 修改</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="删除"/> &nbsp 删除</label>`;
                        if ($.inArray('删除', row.privilege) != -1) {
                            label = `<label><input type="checkBox" data-name="删除" checked/> &nbsp 删除</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="删除" /> &nbsp 删除</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="授权"/> &nbsp 管理</label>`;
                        if ($.inArray('授权', row.privilege) != -1) {
                            label = `<label><input type="checkBox" checked data-name="授权"/> &nbsp 管理</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="授权"/> &nbsp 管理</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="分析"/> &nbsp 分析</label>`;
                        if ($.inArray('分析', row.privilege) != -1) {
                            label = `<label><input type="checkBox" checked data-name="分析"/> &nbsp 分析</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="分析"/> &nbsp 分析</label>`
                },
                {
                    'data': null,
                    className: 'textCenter',
                    'orderable': false,
                    'defaultContent': `<i class="fa fa-trash-o" style="cursor: pointer;" title="删除"></i>`
                }
            ]
        }
        if (resType == 'PLUGIN') {
            columns = [
                {
                    className: 'textCenter',
                    orderable: false,
                    data: null,
                    'render': function (data, type, row) {
                        let detailTpl = "<span class='row-details row-details-close hide'></span><i class='fa fa-circle-thin'></i>";
                        if (resType === 'DATASET' && $.inArray('查看', row.privilege) != -1) {
                            detailTpl = "<span class='row-details row-details-close'></span><i class='fa fa-circle-thin hide'></i>";
                        };
                        return detailTpl;
                    },
                    defaultContent: ''
                },
                {
                    'data': 'name',
                    className: 'textCenter selectName',
                    'render': function (data, type, row) {
                        let dashboardName = row.name || '';
                        let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 20) }</span> `;
                        return html;
                    }},
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" name="query" data-name="查看"/> &nbsp 查看</label>`;
                        if ($.inArray('查看', row.privilege) != -1) {
                            label = `<label><input type="checkBox" name="query" checked data-name="查看"/> &nbsp 查看</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="查看" name="query"/> &nbsp 查看</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="安装"/> &nbsp 安装</label>`;
                        if ($.inArray('安装', row.privilege) != -1) {
                            label = `<label><input type="checkBox" data-name="安装" checked/> &nbsp 安装</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="安装"/> &nbsp 安装</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="修改"/> &nbsp 修改</label>`;
                        if ($.inArray('修改', row.privilege) != -1) {
                            label = `<label><input type="checkBox" data-name="修改" checked/> &nbsp 修改</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="修改"/> &nbsp 修改</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="卸载"/> &nbsp 卸载</label>`;
                        if ($.inArray('卸载', row.privilege) != -1) {
                            label = `<label><input type="checkBox" data-name="卸载" checked/> &nbsp 卸载</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="卸载" /> &nbsp 卸载</label>`
                },
                {
                    'data': null,
                    className: 'textCenter',
                    'orderable': false,
                    'defaultContent': `<i class="fa fa-trash-o" style="cursor: pointer;" title="删除"></i>`
                }
            ]
        }
        if (resType == 'JOB') {
            columns = [
                {
                    className: 'textCenter',
                    orderable: false,
                    data: null,
                    'render': function (data, type, row) {
                        let detailTpl = "<span class='row-details row-details-close hide'></span><i class='fa fa-circle-thin'></i>";
                        if (resType === 'DATASET' && $.inArray('查看', row.privilege) != -1) {
                            detailTpl = "<span class='row-details row-details-close'></span><i class='fa fa-circle-thin hide'></i>";
                        }
                        ;
                        return detailTpl;
                    },
                    defaultContent: ''
                },
                {
                    'data': 'name',
                    className: 'textCenter selectName',
                    'render': function (data, type, row) {
                        let dashboardName = row.name || '';
                        let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 20) }</span> `;
                        return html;
                    }
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" name="query" data-name="查看"/> &nbsp 查看</label>`;
                        if ($.inArray('查看', row.privilege) != -1) {
                            label = `<label><input type="checkBox" name="query" checked data-name="查看"/> &nbsp 查看</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="查看" name="query"/> &nbsp 查看</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="修改"/> &nbsp 修改</label>`;
                        if ($.inArray('修改', row.privilege) != -1) {
                            label = `<label><input type="checkBox" data-name="修改" checked/> &nbsp 修改</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="修改"/> &nbsp 修改</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="删除"/> &nbsp 删除</label>`;
                        if ($.inArray('删除', row.privilege) != -1) {
                            label = `<label><input type="checkBox" data-name="删除" checked/> &nbsp 删除</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="删除" /> &nbsp 删除</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="操作"/> &nbsp 操作</label>`;
                        if ($.inArray('操作', row.privilege) != -1) {
                            label = `<label><input type="checkBox" checked data-name="操作"/> &nbsp 操作</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="操作"/> &nbsp 操作</label>`
                },
                {
                    'data': null,
                    className: 'textCenter',
                    'orderable': false,
                    'defaultContent': `<i class="fa fa-trash-o" style="cursor: pointer;" title="删除"></i>`
                }
            ]
        }
        if (resType == 'DASHBOARD') {
            columns = [
                {
                    className: 'textCenter',
                    orderable: false,
                    data: null,
                    'render': function (data, type, row) {
                        let detailTpl = "<span class='row-details row-details-close hide'></span><i class='fa fa-circle-thin'></i>";
                        if (resType === 'DATASET' && $.inArray('查看', row.privilege) != -1) {
                            detailTpl = "<span class='row-details row-details-close'></span><i class='fa fa-circle-thin hide'></i>";
                        };
                        return detailTpl;
                    },
                    defaultContent: ''
                },
                {
                    'data': 'name',
                    className: 'textCenter selectName',
                    'render': function (data, type, row) {
                        let dashboardName = row.name || '';
                        let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 20) }</span> `;
                        return html;
                    }},
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" name="query" data-name="查看"/> &nbsp 查看</label>`;
                        if ($.inArray('查看', row.privilege) != -1) {
                            label = `<label><input type="checkBox" name="query" checked data-name="查看"/> &nbsp 查看</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="查看" name="query"/> &nbsp 查看</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="修改"/> &nbsp 修改</label>`;
                        if ($.inArray('修改', row.privilege) != -1) {
                            label = `<label><input type="checkBox" data-name="修改" checked/> &nbsp 修改</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="修改"/> &nbsp 修改</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="删除"/> &nbsp 删除</label>`;
                        if ($.inArray('删除', row.privilege) != -1) {
                            label = `<label><input type="checkBox" data-name="删除" checked/> &nbsp 删除</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="删除" /> &nbsp 删除</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="授权"/> &nbsp 管理</label>`;
                        if ($.inArray('授权', row.privilege) != -1) {
                            label = `<label><input type="checkBox" checked data-name="授权"/> &nbsp 管理</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="授权"/> &nbsp 管理</label>`
                },
                {
                    'data': 'privilege',
                    className: 'textCenter',
                    'orderable': false,
                    'render': function (data, type, row) {
                        let label = `<label><input type="checkBox" data-name="分析"/> &nbsp 分析</label>`;
                        if ($.inArray('分析', row.privilege) != -1) {
                            label = `<label><input type="checkBox" checked data-name="分析"/> &nbsp 分析</label>`;
                        }
                        return label;
                    },
                    'defaultContent': `<label><input type="checkBox" data-name="分析"/> &nbsp 分析</label>`
                },
                {
                    'data': null,
                    className: 'textCenter',
                    'orderable': false,
                    'defaultContent': `<i class="fa fa-trash-o" style="cursor: pointer;" title="删除"></i>`
                }
            ]
        }
        tableConfig.id = 'roleResPrivilege';
        tableConfig.columns = columns;
        tableConfig.data = roleNameArr;
        tableConfig.paging = false;
        createList(tableConfig);
        /**
         * 展开角色详细事件绑定
         */
        $('input[name="query"]').on('ifChanged', function(e) {
            if (resType == 'DATASET') {
                if ($(e.currentTarget).is(':checked')) {
                    $('span.row-details', $(e.currentTarget).closest('tr')).removeClass('hide');
                    $('i.fa-circle-thin', $(e.currentTarget).closest('tr')).addClass('hide');
                } else {
                    $('span.row-details', $(e.currentTarget).closest('tr')).addClass('hide');
                    $('i.fa-circle-thin', $(e.currentTarget).closest('tr')).removeClass('hide');
                }
            }
        });
        let table = $('#roleResPrivilege').DataTable();
        $('#roleResPrivilege').on('click', 'tbody td .fa-trash-o', function () {
            let tr = $(this).parents('tr');
            let row = table.row(tr);
            row.remove();
            table.draw();
        });
        $('#roleResPrivilege').on('click', 'tbody td .row-details', this.filterDetail);

       /* ***********************  用户部分    ****************** */

        // 用户res 列表
        let userTableConfig = {};
        userTableConfig.id = 'userResPrivilege';
        userTableConfig.columns = columns;
        userTableConfig.data = userNameArr;
        userTableConfig.paging = false;
        createList(userTableConfig);

        /**
         * 展开用户详细事件绑定
         */
        $('input[name="query"]', $('#userResPrivilege')).on('ifChanged', function(e) {
            if (resType == 'DATASET') {
                if ($(e.currentTarget).is(':checked')) {
                    $('span.row-details', $(e.currentTarget).closest('tr')).removeClass('hide');
                    $('i.fa-circle-thin', $(e.currentTarget).closest('tr')).addClass('hide');
                } else {
                    $('span.row-details', $(e.currentTarget).closest('tr')).addClass('hide');
                    $('i.fa-circle-thin', $(e.currentTarget).closest('tr')).removeClass('hide');
                }
            }
        });
        let userTable = $('#userResPrivilege').DataTable();
        $('#userResPrivilege').on('click', 'tbody td .fa-trash-o', function () {
            let tr = $(this).parents('tr');
            let row = userTable.row(tr);
            row.remove();
            userTable.draw();
        });
        $('#userResPrivilege').on('click', 'tbody td .row-details', this.filterUserDetail);
        createiCheck('input[type = "checkBox"]');
    }


    /**
     * 生成角色列表 ①
     */
    createRoleTable() {
        let tableConfig = {};
        tableConfig.id = 'roleList';
        tableConfig.columns = [
            { 'data': 'roleName', 'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.roleName || '';
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 20) }</span> `;
                    return html;
                }},
            { 'data': 'desc', 'orderable': false, 'defaultContent': '-', 'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.desc || '';
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 70) }</span> `;
                    return html;
                }}
        ];
        this.props.allRoleList();
        let roleData = this.props.resPrivilege.allRoleList.member;
        tableConfig.data = roleData;
        let roleNameArr = [];
        if ($('#roleResPrivilege').attr('name')) {
            let name = $('#roleResPrivilege').attr('name').split(',');
            for (let i = 0; i < name.length; i++) {
                roleNameArr.push(name[i]);
            }
        }
        for (let i = 0;i < roleData.length; i++) {
            for (let j = 0;j < roleNameArr.length; j++) {
                if (roleData[i].roleName == roleNameArr[j]) {
                    roleData.splice(i, 1);
                }
            }
        }
        createList(tableConfig);
        // 角色模态框选择事件
        $('#roleList tbody').off().on('click', 'tr', function (e) {
            $(e.currentTarget).toggleClass('selected');
        });
        // 展开详细事件绑定
        // $('#roleResPrivilege').on('click', 'tbody td .row-details', this.fieldDetailHandler);
    }

    /**
     * 生成角色列表 ②
     */
    addRoleHandler() {
        let name = $('#roleResPrivilege').DataTable().column(1).data().join();
        $('#roleResPrivilege').attr('name', name)
        let roleList =
            <div className="">
                <table id="roleList" className = "table table-bordered">
                    <thead>
                    <tr>
                        <th>角色名</th>
                        <th>角色描述</th>
                    </tr>
                    </thead>
                </table>
            </div>
        this.refs.addRole.setContent(roleList);
    }

    /**
     * 生成用户列表 ①
     */
    createUserTable() {
        let tableConfig = {};
        tableConfig.id = 'userList';
        tableConfig.columns = [
            { 'data': 'userName', 'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.userName || '';
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 20) }</span> `;
                    return html;
                }},
            { 'data': 'name', 'orderable': false, 'defaultContent': '-', 'autoWidth': true,
                'render': function (data, type, row) {
                    let dashboardName = row.name || '';
                    let html = `<span style="cursor: pointer;" title="${dashboardName}" > ${ cutStr(dashboardName, 70) }</span> `;
                    return html;
                }}
        ];
        this.props.allUserList();
        let userData = this.props.resPrivilege.allUserList.member;
        tableConfig.data = userData;
        let userNameArr = [];
        if ($('#userResPrivilege').attr('name')) {
            let name = $('#userResPrivilege').attr('name').split(',');
            for (let i = 0; i < name.length; i++) {
                userNameArr.push(name[i]);
            }
        }
        for (let i = 0;i < userData.length; i++) {
            for (let j = 0;j < userNameArr.length; j++) {
                if (userData[i].userName == userNameArr[j]) {
                    userData.splice(i, 1);
                }
            }
        }
        createList(tableConfig);
        // 角色模态框选择事件
        $('#userList tbody').off().on('click', 'tr', function (e) {
            $(e.currentTarget).toggleClass('selected');
        });
        // 展开详细事件绑定
        // $('#roleResPrivilege').on('click', 'tbody td .row-details', this.fieldDetailHandler);
    }

    /**
     * 生成用户列表 ②
     */
    addUserHandler() {
        let name = $('#userResPrivilege').DataTable().column(1).data().join();
        $('#userResPrivilege').attr('name', name);
        let userList =
            <div className="">
                <table id="userList" className = "table table-bordered">
                    <thead>
                    <tr>
                        <th>用户名</th>
                        <th>姓名</th>
                    </tr>
                    </thead>
                </table>
            </div>
        this.refs.addUser.setContent(userList);
    }


    /**
     *  角色嵌套列表的展开;
     */
    filterDetail (e) {
        let table = $('#roleResPrivilege').DataTable();
        let tr = $(e.currentTarget).parents('tr');
        let row = table.row(tr);
        if (row.child.isShown()) {
            $(e.currentTarget).addClass('row-details-close').removeClass('row-details-open');
            let childTr = row.child().find('textarea');
            let childFields = childTr.val();
            tr.attr('filter', childFields);
            row.child.hide();
        } else {
            $(e.currentTarget).addClass('row-details-open').removeClass('row-details-close');
            // 子行列表存在时不需重新创建
            if (row.child()) {
                row.child.show();
                return;
            }
            this.createFilterHandler(row);
        }
    }

    /**
     *  用户嵌套列表的展开;
     */
    filterUserDetail (e) {
        let table = $('#userResPrivilege').DataTable();
        let tr = $(e.currentTarget).parents('tr');
        let row = table.row(tr);
        if (row.child.isShown()) {
            $(e.currentTarget).addClass('row-details-close').removeClass('row-details-open');
            let childTr = row.child().find('textarea');
            let childFields = childTr.val();
            tr.attr('filter', childFields);
            row.child.hide();
        } else {
            $(e.currentTarget).addClass('row-details-open').removeClass('row-details-close');
            // 子行列表存在时不需重新创建
            if (row.child()) {
                row.child.show();
                return;
            }
            this.createUserFilterHandler(row);
        }
    }
    /**
     * 创建角色嵌套列表;
     */
    createFilterHandler (row) {
        let filter = row.data().filter ? row.data().filter : '';
        row.child(`
        <div class="">
            <div class="form-group col-md-8" id="nestRole_${row.index()}">
                <label for="rolefilterInput_${row.index()}">过滤条件: &nbsp <textarea type="text" id="rolefilterInput_${row.index()}" class="form-control" style="max-width: 1400px">${filter}</textarea></label>
            </div>
        </div>`).show();
    }
    /**
     * 创建用户嵌套列表;
     */
    createUserFilterHandler (row) {
        let filter = row.data().filter ? row.data().filter : '';
        row.child(`
        <div class="">
            <div class="form-group col-md-8" id="nestUser_${row.index()}">
                <label for="userfilterInput_${row.index()}">过滤条件: &nbsp <textarea type="text" id="userfilterInput_${row.index()}" class="form-control" style="max-width: 1400px" >${filter}</textarea></label>
            </div>
        </div>`).show();
    }

    /**
     *  角色添加确认处理
     */
    removeRoleOKHandler() {
        // 获取选取到的角色名;
        let selectedRoleArr = [];
        let resType = this.props.params.type.toUpperCase();
        let selected = $('#roleList').DataTable().rows('.selected').data();
        for (let i = 0; i < selected.length; i++) {
            selectedRoleArr.push($('#roleList').DataTable().rows('.selected').data()[i].roleName);
        }
        var table = $('#roleResPrivilege').DataTable();
        for (let i = 0; i < selectedRoleArr.length; i++) {
            table.row.add({
                'name': selectedRoleArr[i]
            }).draw();
        }
        createiCheck('input[ type = "checkBox"]');

        $('input[name="query"]').on('ifChanged', function(e) {
            if (resType == 'DATASET') {
                if ($(e.currentTarget).is(':checked')) {
                    $('span.row-details', $(e.currentTarget).closest('tr')).removeClass('hide');
                    $('i.fa-circle-thin', $(e.currentTarget).closest('tr')).addClass('hide');
                } else {
                    $('span.row-details', $(e.currentTarget).closest('tr')).addClass('hide');
                    $('i.fa-circle-thin', $(e.currentTarget).closest('tr')).removeClass('hide');
                }
            }
        });
        $('#addRole').modal('hide');
    }

    /**
     *  用户添加确认处理
     */
    removeUserOKHandler() {
        // 获取选取到的角色名;
        let selectedUserArr = [];
        let resType = this.props.params.type.toUpperCase();
        let selected = $('#userList').DataTable().rows('.selected').data();
        for (let i = 0; i < selected.length; i++) {
            selectedUserArr.push($('#userList').DataTable().rows('.selected').data()[i].userName);
        }
        var table = $('#userResPrivilege').DataTable();
        for (let i = 0; i < selectedUserArr.length; i++) {
            table.row.add({
                'name': selectedUserArr[i]
            }).draw();
        }
        createiCheck('input[ type = "checkBox"]');

        $('input[name="query"]').on('ifChanged', function(e) {
            if (resType == 'DATASET') {
                if ($(e.currentTarget).is(':checked')) {
                    $('span.row-details', $(e.currentTarget).closest('tr')).removeClass('hide');
                    $('i.fa-circle-thin', $(e.currentTarget).closest('tr')).addClass('hide');
                } else {
                    $('span.row-details', $(e.currentTarget).closest('tr')).addClass('hide');
                    $('i.fa-circle-thin', $(e.currentTarget).closest('tr')).removeClass('hide');
                }
            }
        });
        $('#addUser').modal('hide');
    }

    /**
     * 保存授权事件
     * @returns {XML}
     */
    saveResPrivilege() {
        let resType = this.props.params.type.toUpperCase();
        let resName = this.props.params.id;
        let resPrivilege = {};
        resPrivilege.data = [];
        $('span.row-details-close', $('#roleResPrivilege')).click();
        $('span.row-details-open', $('#roleResPrivilege')).click();
        $('span.row-details-open', $('#userResPrivilege')).click();
        if ($('tbody tr input', $('#roleResPrivilege')).length != 0) {
            for (let i = 0; i < $('tbody tr', $('#roleResPrivilege')).length; i++) {
                let currentRow = $('tbody tr', $('#roleResPrivilege'))[i];
                let fieldObj = {};
                // 角色名
                fieldObj.roleName = $(('td'), currentRow).eq(1).text().trim();
                fieldObj.resType = resType;
                fieldObj.resName = resName;
                fieldObj.privilege = {};
                fieldObj.privilege[resType] = [];
                for (let i = 0; i < $('input', currentRow).length; i++) {
                    if ($('input', currentRow)[i].checked) {
                        fieldObj.privilege[resType].push($('input', currentRow).eq(i).attr('data-name'));
                    }
                }
                resPrivilege.data.push(fieldObj);
            }
        }
        if ($('tbody tr input', $('#userResPrivilege')).length != 0) {
            for (let i = 0; i < $('tbody tr', $('#userResPrivilege')).length; i++) {
                let currentRow = $('tbody tr', $('#userResPrivilege'))[i];
                let fieldObj = {};
                // 角色名
                fieldObj.userName = $(('td'), currentRow).eq(1).text().trim();
                fieldObj.resType = resType;
                fieldObj.resName = resName;
                fieldObj.privilege = {};
                fieldObj.privilege[resType] = [];
                for (let i = 0; i < $('input', currentRow).length; i++) {
                    if ($('input', currentRow)[i].checked) {
                        fieldObj.privilege[resType].push($('input', currentRow).eq(i).attr('data-name'));
                    }
                }
                resPrivilege.data.push(fieldObj);
            }
        }

        if ($('tbody tr input', $('#userResPrivilege')).length == 0 && $('tbody tr input', $('#roleResPrivilege')).length == 0) {
            let fieldObj = {};
            fieldObj.resType = resType;
            fieldObj.resName = resName;
            fieldObj.privilege = [];
            resPrivilege.data.push(fieldObj);
        }

        this.props.checkResPrivilege(resPrivilege.data);
        let checkRes = this.props.resPrivilege.checkResPrivilege;
        let add = checkRes.result.detail.add;
        let remove = checkRes.result.detail.remove;
        if (checkRes.code == '0') {
            let a = '';
            if (add.length == 0 && remove.length == 0) {
                return;
            } else {
                for (let i = 0; i < add.length; i++) {
                    a = `<li>因 <mark>${add[i].dependency}</mark> 权限添加, 其依赖权限影响的 <u> ${add[i].privileges} </u> 权限将被 <strong>自动添加</strong> ;</li>`
                    $('#dependency').append(a);
                }
                for (let i = 0; i < remove.length; i++) {
                    a = `<li>因 <mark>${remove[i].dependency}</mark> 权限移除, 其依赖权限影响的 <u>${remove[i].privileges}</u> 权限将被 <strong>自动移除</strong> ;</li>`
                    $('#dependency').append(a);
                }
            }
        } else {
            error(checkRes.msg);
            return;
        }
    }

    modifyOKHandle () {
        let resType = this.props.params.type.toUpperCase();
        let resName = this.props.params.id;
        let resPrivilege = {};
        resPrivilege.data = [];
        $('span.row-details-close', $('#roleResPrivilege')).click();
        $('span.row-details-open', $('#roleResPrivilege')).click();
        $('span.row-details-open', $('#userResPrivilege')).click();
        if ($('tbody tr input', $('#roleResPrivilege')).length != 0) {
            for (let i = 0; i < $('tbody tr', $('#roleResPrivilege')).length; i++) {
                let currentRow = $('tbody tr', $('#roleResPrivilege'))[i];
                let query = $('input[name="query"]', currentRow).is(':checked');
                let fieldObj = {};
                // 角色名
                fieldObj.roleName = $(('td'), currentRow).eq(1).text().trim();
                fieldObj.resType = resType;
                fieldObj.resName = resName;
                fieldObj.privilege = {};
                fieldObj.privilege[resType] = [];
                for (let i = 0; i < $('input', currentRow).length; i++) {
                    if ($('input', currentRow)[i].checked) {
                        fieldObj.privilege[resType].push($('input', currentRow).eq(i).attr('data-name'));
                    }
                }
                // 判断是否为嵌套结构
                if (resType == 'DATASET' && query) {
                    fieldObj.filter = $(currentRow).attr('filter') ? $(currentRow).attr('filter') : '';
                }
                resPrivilege.data.push(fieldObj);
            }
        }

        if ($('tbody tr input', $('#userResPrivilege')).length != 0) {
            for (let i = 0; i < $('tbody tr', $('#userResPrivilege')).length; i++) {
                let currentRow = $('tbody tr', $('#userResPrivilege'))[i];
                let query = $('input[name="query"]', currentRow).is(':checked');
                let fieldObj = {};
                // 角色名
                fieldObj.userName = $(('td'), currentRow).eq(1).text().trim();
                fieldObj.resType = resType;
                fieldObj.resName = resName;
                fieldObj.privilege = {};
                fieldObj.privilege[resType] = [];
                for (let i = 0; i < $('input', currentRow).length; i++) {
                    if ($('input', currentRow)[i].checked) {
                        fieldObj.privilege[resType].push($('input', currentRow).eq(i).attr('data-name'));
                    }
                }
                // 判断是否为嵌套结构
                if (resType == 'DATASET' && query) {
                    fieldObj.filter = $(currentRow).attr('filter') ? $(currentRow).attr('filter') : '';
                }
                resPrivilege.data.push(fieldObj);
            }
        }
        if ($('tbody tr input', $('#userResPrivilege')).length == 0 && $('tbody tr input', $('#roleResPrivilege')).length == 0) {
            let fieldObj = {};
            fieldObj.resType = resType;
            fieldObj.resName = resName;
            fieldObj.privilege = [];
            resPrivilege.data.push(fieldObj);
        }
        this.props.createResPrivilege(resPrivilege.data);
        $('#resModify').modal('hide');
        this.props.history.replace('/' + this.props.params.type);

    }

    modelContent() {
        let resName = this.props.params.id;
        let content = <ol id="dependency" className='todo-list ui-sortable'><li>您确定要对资源： <strong>{resName}</strong> 进行授权吗？</li></ol>
        $('#dependency').html('');
        this.refs.resModify.setContent(content);
    }

    // 取消事件
    cancel() {
        this.props.history.replace('/' + this.props.params.type);
    }


    render() {
        let desc = '';
        if (this.props.resPrivilege.selectedRecord.desc) {
            desc = this.props.resPrivilege.selectedRecord.desc;
        } else {
            desc = ' 无';
        }
        return (
            <div id="resPrivilege">
                <div className="box box-primary">
                    <div className="box-header with-border ">
                        <p className="box-title">资源信息</p>
                    </div>
                    <div className="box-body">
                        <div className="">
                            <div className="col-md-12 form-group">
                                <label htmlFor="datasetName">资源名称 : </label>
                                <span className="detailSpan ml10">{ this.props.params.id }</span>
                            </div>
                            <div name='isPartition' className="form-group col-md-12">
                                <label htmlFor="isPartition">描述 : </label>
                                <span className="detailSpan ml10">{ desc }</span>
                            </div>
                            <div name='isVisible' className="form-group col-md-12">
                                <label htmlFor="isVisible">所有者 : </label>
                                <span className="detailSpan ml10">{ this.props.resPrivilege.selectedRecord.owner }</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box box-primary">
                    <div className="box-header with-border ">
                        <p className="box-title">角色授权</p>
                    </div>
                    <div className="box-body">
                        <div className="box-header pull-left">
                            <button type="submit" name="createDataset" className="btn btn-primary" data-toggle="modal" data-target="#addRole" onClick={this.addRoleHandler}>
                                <i className="fa fa-fw fa-plus-circle" style={{verticalAlign: 'middle', padding: '0 8px 0 0'}}></i>
                                添加角色
                            </button>
                        </div>
                        <div className="box-body">
                            <table id="roleResPrivilege" className="table table-striped table-bordered" style={{ width: '100%' }}>
                                <thead className='hide'>
                                {/*
                                 <tr>
                                 <th></th>
                                 <th>角色名</th>
                                 <th>查看</th>
                                 <th>创建</th>
                                 <th>修改</th>
                                 <th>删除</th>
                                 <th>管理</th>
                                 <th>分析</th>
                                 <th>操作</th>
                                 </tr>
                                */}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="box box-primary">
                    <div className="box-header with-border ">
                        <p className="box-title">用户授权</p>
                    </div>
                    <div className="box-body">
                        <div className="box-header pull-left">
                            <button type="submit" name="createDataset" className="btn btn-primary" data-toggle="modal" data-target="#addUser" onClick={this.addUserHandler}>
                                <i className="fa fa-fw fa-plus-circle" style={{verticalAlign: 'middle', padding: '0 8px 0 0'}}></i>
                                添加用户
                            </button>
                        </div>
                        <div className="box-body">
                            <table id="userResPrivilege" className="table table-striped table-bordered" style={{ width: '100%' }}>
                                <thead className='hide'>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal modalId="addRole" ref='addRole' title="选择角色 ( 点击列表进行选择 ) " okHandler={ this.removeRoleOKHandler } loadModalControlHandler = { this.createRoleTable }/>
                <Modal modalId="addUser" ref='addUser' title="选择角色 ( 点击列表进行选择 ) " okHandler={ this.removeUserOKHandler } loadModalControlHandler = { this.createUserTable }/>
                <button name="saveBtn" className="btn btn-primary" onClick={ this.cancel }><i className="fa fa-save"></i> 取消 </button>
                <button name="saveBtn" data-toggle="modal" data-target="#resModify" className="btn btn-primary ml15" onClick={ this.modelContent }><i className="fa fa-save"></i> 保存 </button>
                <Modal modalId="resModify" ref='resModify' title="权限依赖确认" loadModalControlHandler = {this.saveResPrivilege} okHandler={this.modifyOKHandle.bind(this)} />
            </div>
        )
    }
}
export default ResPrivilege;
