/**
 * 侧边栏组件
 * User: gaogy
 * Date: 2016/11/29
 * Time: 14:58
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect(
    ({ sidebar, router }) => ({sidebar, router}),
    require('ACTION/sidebar').default
)
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.setMenuActive = this.setMenuActive.bind(this);
    }

    componentDidMount() {
        this.setMenuActive();
    }

    componentDidUpdate() {
        this.setMenuActive();
    }

    setMenuActive() {
        // 菜单渲染
        let pathname = this.props.router.locationBeforeTransitions.pathname;
        pathname = '/' + pathname.split('/')[1];
        if (pathname) {
            $('li', $('ul.sidebar-menu')).removeClass('active');
            $('li[name = "' + pathname + '"]', $('ul.sidebar-menu')).addClass('active');
            $('li[name = "' + pathname + '"]', $('ul.sidebar-menu')).parents('li').addClass('active');
        }
        // 根路径下菜单渲染
        if (pathname === '/') {
            $('li', $('ul.sidebar-menu')).removeClass('active');
            $('li:eq(1)', $('ul.sidebar-menu')).addClass('active');
        }
    }

    generateMenu(menuObj, ulClassName) {
        if (menuObj == undefined) return;
        let vdom = [];
        if (menuObj instanceof Array) {
            let list = [];
            for (var item of menuObj) {
                list.push(this.generateMenu(item, item.secondLevel != undefined ? 'treeview-menu' : ''));
            }
            vdom.push(
                <ul className={ulClassName} key="single">
                    {list}
                </ul>
            );
        } else {
            vdom.push(
                <li key={menuObj.id} name={menuObj.path}>
                    <Link to={menuObj.path}>
                        <i className={menuObj.iconType}></i>
                        <span>{menuObj.name}</span>
                        {
                            ulClassName == 'treeview-menu' ? <i className="fa fa-angle-left" style={{float: 'right', fontSize: '20px'}}></i> : ''
                        }
                    </Link>
                    {
                        this.generateMenu(menuObj.secondLevel, 'treeview-menu')
                    }
                </li>
            );
        }
        return vdom;
    }

    render() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    {this.generateMenu(this.props.sidebar.menuList, 'sidebar-menu')}
                </section>
            </aside>
        )
    }
}
export default Sidebar;
