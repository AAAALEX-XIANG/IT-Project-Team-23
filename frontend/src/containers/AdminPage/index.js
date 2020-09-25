import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default function RegPage() {
    return (
        <div className="pageContainer">
        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />

        </div>
    );
}