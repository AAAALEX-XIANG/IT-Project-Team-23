import React from 'react';
import { Input } from 'antd';
import { List } from 'antd';
import { search } from '../adminApi';
import { NavLink } from "react-router-dom";

const { Search } = Input;

export default class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initLoading: true,
            loading: false,
            data: {}
        };
    }    

    searchUser = (value) => {
        search({info: value}).then(
            (info) => {
                // console.log(info.res)
                this.setState({
                    data: info.res
                })
            }
        )
    }

    logout = () => {
        localStorage.clear();
        window.location.replace("/login");
    };

    render() {
        // source from https://ant.design/components/list/
        const { data } = this.state;
        let userID = [];

        for (var user in data) {
            userID.push(user);
        }

        return(
            <div>
                <div className="adminButton">       
                    <NavLink to="/login" onClick={this.logout}>
                        {" "}
                        Logout{" "}
                    </NavLink>
                </div>
                <br/>
                <br/>
                <div className="adminSearch">
                <Search placeholder="search users" onSearch={value => this.searchUser(value)} enterButton />
                </div>
                <List
                    className = "adminList"
                    itemLayout="horizontal"
                    dataSource={userID}
                    renderItem={item => (
                    <List.Item>
                    <List.Item.Meta
                        title={<a href={"http://localhost:3000/guest/dashboard/"+ data[item][4]}>{data[item][1]}</a>}
                        description={data[item][2] + " " + data[item][3] + ", " + data[item][0]}
                    />
                    </List.Item>
                    )}
                />

                
            </div>
        )
    }
}

