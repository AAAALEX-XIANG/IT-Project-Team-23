import React, {Component} from 'react';
<<<<<<< HEAD
import {Form, Button, Upload,Radio, Input, Select,Divider} from 'antd';
import "antd/dist/antd.css";
import { InboxOutlined, PlusOutlined  } from '@ant-design/icons';
=======
import {Form, Upload,Radio, Input, Select,Divider} from 'antd';
import "antd/dist/antd.css";
import { InboxOutlined } from '@ant-design/icons';
>>>>>>> d52c83d3506513f90fc81884cf2d74934ff42f70
import { upload } from "../../containers/artifactApi";
import { addCategory } from "../../containers/categoryApi"

import Navbar from "../../components/Navbar";
<<<<<<< HEAD
import { Redirect } from 'react-router-dom';
=======
//import { Redirect } from 'react-router-dom';
>>>>>>> d52c83d3506513f90fc81884cf2d74934ff42f70

const { Option } = Select;
let index = 0;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const normFile = e => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};


export default class Article extends Component {

    state = {
<<<<<<< HEAD
        items: ['1', '2'],
=======
        items: [],
>>>>>>> d52c83d3506513f90fc81884cf2d74934ff42f70
        name: '',
    };

    onNameChange = event => {
        this.setState({
            name: event.target.value,
        });
    };

    addItem = () => {
        console.log('addItem');
        const { items, name } = this.state;
        this.setState({
            items: [...items, name || `New item ${index++}`],
            name: '',
        });
<<<<<<< HEAD
        addCategory({email: this.state.email, categoryName: this.state.name});
    };

=======
        addCategory({email: localStorage.getItem('email'), categoryName: this.state.name});
    };

    uploadFiles = () => {
        console.log("add files...");
        upload({ email:localStorage.getItem('email'), category: this.state.name, title:"tit", description:"desc", attachment:"files"})
    }

>>>>>>> d52c83d3506513f90fc81884cf2d74934ff42f70
    render() {
        const { items, name } = this.state;
        return (
            <div className="pageContainer">
                <Navbar />

                <Form name="validate_other"{...formItemLayout}>
                    <Form.Item>
                        <div id="header">
                            <br /><br />
                            Upload Document
                        </div>
                    </Form.Item>

                    <Form.Item label="Title">
                        <Input placeholder="Enter Title" />
                    </Form.Item>

                    <Form.Item label="Description">
                        <Input placeholder=" " />
                    </Form.Item>

                    <Form.Item label="Select the catagory">
                        <Select
                            style={{ width: 240 }}
                            placeholder="add new catagory"
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                        <Input style={{ flex: 'auto' }} value={name} onChange={this.onNameChange} />
                                        <button onClick={this.addItem}> Add item </button>
                                       
                                    </div>
                                </div>
                            )}
                        >
                            {items.map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="radio-group" label="Make Private">
                        <Radio.Group>
                            <Radio value="a">Public</Radio>
                            <Radio value="b">Private</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Dragger">
                        <Form.Item name="dragger"
                                   valuePropName="fileList"
                                   getValueFromEvent={normFile}
                                   noStyle
                        >
                            <Upload.Dragger name="files" action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 12,
                            offset: 6,
                        }}
                    >   
<<<<<<< HEAD
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
=======
                    <button onClick={this.uploadFiles}>
                        Submit
                    </button>
>>>>>>> d52c83d3506513f90fc81884cf2d74934ff42f70
                        
                    </Form.Item>
                </Form>
            </div>
        )
    }
};