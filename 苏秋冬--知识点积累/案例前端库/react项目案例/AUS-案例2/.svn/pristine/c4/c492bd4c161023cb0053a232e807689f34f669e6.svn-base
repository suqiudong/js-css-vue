/**
 *  整个应用状态结构树 及其 初始值
 * User: gaogy
 * Date: 2016/11/25
 * Time: 15:05
 */
export default {
    userData: null,
    sidebar: {
        menuList: [
            {
                'id': '1',
                'isActive': 'active',
                'name': '快速导航',
                'iconType': 'fa fa-paper-plane',
                'path': '/quickNav'
            },
            {
                id: '2',
                name: '主题管理',
                iconType: 'fa fa-dashboard',
                path: '/dashboard'
            },
            {
                id: '3',
                name: '报表管理',
                iconType: 'fa fa-area-chart',
                path: '/report'
            },
            {
                id: '4',
                name: '数据集管理',
                iconType: 'fa fa-database',
                path: '/dataSet'
            },
            {
                id: '5',
                name: '数据源管理',
                iconType: 'fa fa-universal-access',
                path: '/dataSource',
                secondLevel: [
                    {
                        name: '数据源配置管理',
                        iconType: 'fa fa-plug',
                        path: '/dataSourceConf'
                    },
                    {
                        name: '驱动管理',
                        iconType: 'fa fa-plug',
                        path: '/driver'
                    },
                    {
                        name: '数据源模型管理',
                        iconType: 'fa fa-building',
                        path: '/dataSourceModel'
                }]
            },
            {
                id: '6',
                name: '数据接入管理',
                iconType: 'fa fa-universal-access',
                path: '/dataAccess',
                secondLevel: [
                    {
                        name: '插件管理',
                        iconType: 'fa fa-plug',
                        path: '/plugin'
                    },
                    {
                        name: '作业管理',
                        iconType: 'fa fa-plug',
                        path: '/job'
                    }
                ]
            },
            // {
            //     id: '7',
            //     name: '安装部署',
            //     iconType: 'fa fa-cogs',
            //     path: '/installDeploy',
            //     secondLevel: [{
            //         name: '安装',
            //         iconType: 'fa fa-cogs',
            //         path: '/installChoice'
            //     }, {
            //         name: '卸载',
            //         iconType: 'fa fa-cogs',
            //         path: '/uninstall'
            //     }]
            //
            // },
            {
                id: '8',
                name: '数据查看',
                iconType: 'fa fa-support',
                path: '/dataView'
            },
            {
                id: '9',
                name: '运维管理',
                iconType: 'fa fa-support',
                path: '/operations',
                secondLevel: [
                    // {
                    //     name: '节点/服务管理',
                    //     iconType: 'fa fa-sets',
                    //     path: 'nodeServerManage'
                    // },
                    {
                    name: '监控',
                    iconType: 'fa fa-video-camera',
                    path: 'monitor',
                    secondLevel: [{
                        name: '服务监控',
                        iconType: 'fa fa-video-camera',
                        path: '/ServiceMonitor'
                    }
                    // {
                    //     name: '节点监控',
                    //     iconType: 'fa fa-media',
                    //     path: '/NodeMonitor'
                    // }
                    ]
                }]
            },
            {
                id: '10',
                name: '日志查询',
                iconType: 'fa fa-file-text-o',
                path: '/logQuery'
            }

        ],
        selectedMenu: {}
    },

    breadcrumb: {
        defaultMenu: {
            name: '快速导航',
            path: '/quickNav'
        },
        '/': '快速导航',
        '/report': '报表管理',
        '/report/add': '报表新建',
        '/report/update': '报表修改',
        '/report/detail': '报表详情',
        '/report/analysis': '报表分析',
        '/quickNav': '快速导航',
        '/dataSet': '数据集管理',
        '/dataSet/detail': '数据集详情',
        '/dataSet/add': '数据集新建',
        '/dataSet/update': '数据集修改',
        '/dataSet/accredit': '数据集授权',
        '/report/accredit': '报表授权',
        '/dashboard/accredit': '仪表板授权',
        '/dataSourceModel/accredit': '数据源模型授权',
        '/driver/accredit': '驱动授权',
        '/plugin/accredit': '插件授权',
        '/job/accredit': '作业授权',
        '/dashboard': '主题管理',
        '/dashboard/add': '新建仪表板',
        '/dashboard/detail': '仪表板详情',
        '/dashboard/update': '仪表板修改',
        '/dashboard/analysis': '仪表板分析',
        '/systemPrivilege': '权限管理',
        '/systemPrivilege/roleSys': '权限管理',
        '/usercenter': '个人中心',
        '/changepasswd': '修改密码',
        '/usermanage': '用户管理',
        '/usermanage/detail': '用户详情',
        '/usermanage/update': '用户修改',
        '/usermanage/add': '用户新建',
        '/usermanage/sysPrivilege': '用户权限管理',
        '/roleManage': '角色管理',
        '/roleManage/edit': '角色内用户列表',
        '/roleManage/create': '新建角色',
        '/roleManage/detail': '角色详情',
        '/driver': '驱动管理',
        '/driver/add': '驱动新建',
        '/driver/detail': '驱动详情',
        '/driver/update': '驱动更新',
        '/plugin': '插件管理',
        '/plugin/add': '插件新建',
        '/plugin/detail': '插件详情',
        '/plugin/update': '插件更新',
        '/job': '作业管理',
        '/job/add': '作业新建',
        '/job/update': '作业更新',
        '/job/detail': '作业详情',
        '/deploy': '安装部署',
        '/installChoice': '安装选择',
        '/install': '安装向导',
        '/uninstall': '卸载',
        '/operations': '运维管理',
        '/dataView': '数据查看',
        '/nodeServerManage': '节点/服务管理',
        '/ServiceMonitor': '服务监控',
        '/NodeMonitor': '节点监控',
        '/logQuery': '日志查询',
        '/dataSourceConf': '数据源配置管理',
        '/dataSourceConf/add': '数据源模型新建',
        '/dataSourceConf/detail': '数据源模型详情',
        '/dataSourceConf/update': '数据源模型更新',
        '/dataSourceModel': '数据源模型管理',
        '/dataSourceModel/add': '数据源模型新建',
        '/dataSourceModel/Update': '数据源模型更新',
        '/dataSourceModel/detail': '数据源模型详情'
    },

    report: {
        reportsData: {},
        selectedRecord: {},
        reportRecordId: {},
        mqlResult: {},
        ListReport: {}
    },

    dashboard: {
        dashboardData: {},
        selectedRecord: {},
        reportList: [],
        breakpointCols: 12,
        layout: [],
        layouts: {},
        userInfo: {},
        selectedReports: [],
        isDelAll: false,
        dashboardList: {}
    },

    quickLink: {
        userInfo: {},
        DataSoucerInfo: {}
    },

    usermanage: {
        getSysPrivilege: {},
        usermanagesData: {},
        selectedRecord: {},
        userRecordId: {},
        userResRecordId: {},
        userDetail: {},
        checkSysPrivilege: {},
        userSysPrivilege: {}
    },
    systemPrivilege: {
        systemPrivilegeData: {},
        selectSystemPrivilegeData: {},
        modifySystemPrivilegeData: {},
        checkSysPrivilege: {},
        getSysPrivilege: {}
    },
    dataset: {
        analyzers: [],
        maxSettingNums: {},
        datasetList: {},
        selectedRecord: {},
        deleteDatasetID: {},
        getDatasetData: {},
        modifyDatasetId: {},
        isExists: ''
    },
    dataSourceConf: {
        dataSourceList: {},
        delDataSourceName: {},
        selectedRecord: {},
        dataSourceDetail: {},
        modifyData: {},
        restart: {},
        fileInfo: {},
        testIsExit: false,
        syncSchemaInfo: {},
        isExists: ''
    },
    dataSourceModel: {
        dataSourceModelList: {},
        modelList: {},
        getModel: {},
        getRuning: [],
        sch: [],
        schStatus: {}
    },
    roleManage: {
        selectedRecord: {},
        roleManagesData: {},
        selectRole: {},
        roleUserList: {},
        allUserList: {},
        isSave: {},
        createRole: {}
    },

    resPrivilege: {
        allUserList: {},
        allRoleList: {},
        resPrivilegeData: {},
        selectedRecord: {},
        checkResPrivilege: {}
    },

    login: {
        loginData: {},
        logoff: {},
        userRolePermission: {},
        isActive: {}
    },

    userCenter: {
        userCenterData: {}
    },

    changePasswd: {
        passwd: {}
    },

    pluginManage: {
        pluginList: {},
        jobList: {},
        fileInfo: {},
        isUse: {},
        lastPluginData: {},
        isInstall: {}
    },
    driverManage: {
        pluginList: {},
        fileInfo: {},
        isUse: {},
        lastPluginData: {},
        isInstall: {}
    },

    jobManage: {
        jobList: {},
        selectJobDate: {},
        pluginList: {},
        config: [],
        isjobAddSuccess: {},
        props: [],
        jobInfor: {},
        dataSetsName: {}
    },

    installStep: {
        nowStep: 1
    },

    dataView: {
        mqlResult: '',
        planResult: []
    },

    serviceMonitor: {
        serviceName: [],
        serviceList: []
    },

    logQuery: {
        logQueryData: [],
        allUserList: []
    },

    nodeServerManage: {
        nodeManage: {},
        serverManage: {}
    },

    nodeMonitor: {
        nodeList: [],
        nodeCompare: {},
        nodeDetail: {}
    }

}
