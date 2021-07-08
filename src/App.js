import './App.css';
import {Layout, Menu, Breadcrumb, Divider, PageHeader, Button} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LaptopOutlined, NotificationOutlined
} from '@ant-design/icons';
import {BrowserRouter, Link, Route} from "react-router-dom";
import React from "react";
import Welcome from "./page/welcome";
import WebsocketTest from "./page/WebsocketTest/WebsocketTest";
import DataPresentation from "./page/DataPresentation/DataPresentation";


function App() {
    const {Header, Content, Footer, Sider} = Layout;
    // const pathname = this.props.history.location.pathname;
    // let defaulS = []
    // defaulS.push(pathname)
    // console.log(defaulS)//实时根据当前路径更新

    return (
        <div className="App">
            {/*整体布局*/}
            <Layout>


                <Header className="header" style={{"padding": "0px"}}>
                    <Content style={{color: "#fafafa", paddingLeft: "25px", fontSize: "25px"}}>Beepbeep 控制台</Content>
                </Header>

                <Content
                    style={{
                        padding: '24px 24px 24px'
                    }}>

                    <Layout className="site-layout-background"
                            style={{
                                padding: '24px 0',
                                minHeight: '100vh'
                            }}>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                // defaultSelectedKeys={['1']}
                                style={{height: '100%'}}
                            >
                                <Menu.Item key="/welcome">
                                    <Link to={"/welcome"}>Welcome</Link>
                                </Menu.Item>
                                <Menu.Item key="/wstest">
                                    <Link to={"/wstest"}>Websocket测试</Link>
                                </Menu.Item>
                                <Menu.Item key="/data-pre">
                                    <Link to={"/data-pre"}>数据展示</Link>
                                </Menu.Item>


                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Route exact path="/" component={Welcome}/>
                            <Route path="/welcome" component={Welcome}/>
                            <Route path="/wstest" component={WebsocketTest}/>
                            <Route path="/data-pre" component={DataPresentation}/>

                        </Content>
                        {/*<Layout style={{*/}
                        {/*    padding: '24px 24px 24px',*/}
                        {/*}}>*/}
                        {/*    <Route exact path="/" component={Welcome}/>*/}
                        {/*    <Route path="/welcome" component={Welcome}/>*/}
                        {/*    <Route path="/wstest" component={WebsocketTest}/>*/}
                        {/*    <Route path="/data-pre" component={DataPresentation}/>*/}
                        {/*</Layout>*/}
                    </Layout>
                </Content>


            </Layout>

        </div>
    );
}

export default App;
