import React, { Component } from 'react'
import Navbar from 'COMPONENT/Navbar/Navbar'
import ContentHeader from 'COMPONENT/ContentHeader/ContentHeader'
import Sidebar from 'COMPONENT/Sidebar/Sidebar'
import Footer from 'COMPONENT/Footer/Footer'
import Login from 'COMPONENT/Login/Login'
// import Loading from 'COMPONENT/Common/Loading/Loading'

let DevTools;
if (__DEV__ && __COMPONENT_DEVTOOLS__) {
    // 组件形式的 Redux DevTools
    DevTools = require('COMPONENT/DevTools').default
};

let App;
let loginCookie = sessionStorage.getItem('XDataUserName');
if (!loginCookie) {
    App = Login
} else {
    App = class extends Component {

        componentDidMount() {
            // this.refs.loading.hideLoadingPageHandler();
            $(window, '.wrapper').resize();
        }

        componentWillUpdate() {
            // this.refs.loading.showLoadingPageHandler();
        }

        componentDidUpdate() {
            // this.refs.loading.hideLoadingPageHandler();
        }

        render() {
            return (
                <div className="wrapper">
                    <Navbar history={this.props.history} location={this.props.location}/>
                    <Sidebar />
                    <div className="content-wrapper">
                        <ContentHeader history={this.props.history} location={this.props.location}/>
                        <section className="content">
                            { this.props.children }
                        </section>
                    </div>
                    <Footer />
                    { DevTools && <DevTools /> }
                </div>
            )
        }
    }
}

export default App;
