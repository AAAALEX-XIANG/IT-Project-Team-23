import React from 'react';
import { Input, Button } from 'antd';
import { List } from 'antd';
import { search } from '../adminApi';
import {serverAddress} from '../../ServerAddress'

const { Search } = Input;

export default class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initLoading: true,
            loadings: [],
            data: {}
        };
    }    

    searchUser = (value) => {
        this.enterLoading(0);
        search({info: value}).then(
            (info) => {
                this.setState({
                    data: info.res,
                    loadings: []
                })
            }
        )
    }

    //the loading button is referenced from https://ant.design/components/button-cn/
    enterLoading = (index) => {
        this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = true;

        return {
            loadings: newLoadings,
        };
        });
        setTimeout(() => {
        this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[index] = false;

            return {
            loadings: newLoadings,
            };
        });
        }, 10000);
    };

    logout = () => {
        if (
            window.confirm(
              "Are you sure to log out?"
            )){
                localStorage.clear();
                window.location.replace("/login");
            }
    };

    render() {
        // source from https://ant.design/components/list/
        const { data, loadings } = this.state;
        let userID = [];

        for (var user in data) {
            userID.push(user);
        }

        return(
            <div>
                <div className="adminButton">     
                    <Button onClick={this.logout}>
                        Logout{" "}
                    </Button>
                </div>
                <br/>
                <div className="adminTitle">
                    Fate e-Portfolio
                </div>
                <div className="adminSearch">
                    <Search placeholder="search users" onSearch={value => this.searchUser(value)} loading={loadings[0]} enterButton/>
                </div>
                <br />
                <div className = "adminList">
                    <List
                        itemLayout="horizontal"
                        dataSource={userID}
                        renderItem={item => (
                            <List.Item className="adminUser">
                                <List.Item.Meta
                                    title={<a href={serverAddress+"guest/dashboard/"+ data[item][4]}>{data[item][1]}</a>}
                                    description={data[item][2] + " " + data[item][3] + ", " + data[item][0]}
                                />   
                            </List.Item>
                        )}
                    />
                </div>
               <br /> 
            </div>
        )
    }
}

