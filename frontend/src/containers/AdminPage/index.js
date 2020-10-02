import React from 'react';
import { Input } from 'antd';
import { List } from 'antd';
import { search } from '../adminApi';

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

    onChange = e => {
        this.setState({
            inputValue: e.target.value
        });
    };

    onKeyDown = e => {
        /* istanbul ignore next */
        if (e.keyCode === 13) {
            this.searchUser();
        }
    };

    render() {
        // source from https://ant.design/components/list/
        const { initLoading, loading, data } = this.state;
        let userID = [];

        for (var user in data) {
            userID.push(user);
        }

        return(
            <div>
                <div className="adminSearch">
                <Search placeholder="search users" onSearch={value => this.searchUser(value)} enterButton />
            
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={userID}
                    renderItem={item => (
                    <List.Item>
                    <List.Item.Meta
                        title={<a href={"http://localhost:3000/guest/dashboard/"+ data[item][3]}>{data[item][0]}</a>}
                        description={data[item][1] + data[item][2]}
                    />
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}

