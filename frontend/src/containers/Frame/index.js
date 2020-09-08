import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd'

const {SubMenu} = Menu
const {Content, Sider} = Layout
import Header from "./components/header";

export default class Frame extends Component{
    render(){
        return(
            <Layout>
                <Header  />
            </Layout>
        )
    }
}