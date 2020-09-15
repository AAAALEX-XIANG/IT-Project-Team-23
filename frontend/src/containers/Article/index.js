import React, {Component} from 'react';
import {Form, Upload,Radio, Input, Select,Divider, message} from 'antd';
import "antd/dist/antd.css";
import { InboxOutlined} from '@ant-design/icons';
import { upload } from "../../containers/artifactApi";
import { addCategory, showCategory } from "../../containers/categoryApi"

import Navbar from "../../components/Navbar";

const { Option } = Select;
const { Dragger } = Upload;
let index = 0;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

// const normFile = e => {
//     console.log('Upload event:', e);

//     if (Array.isArray(e)) {
//         return e;
//     }

//     return e && e.fileList;
// };

let file = [];
let baseURL = 'https://fate-server.herokuapp.com/api/cache/upload';
//let categories = [];

const props = {
    name: 'file',
    multiple: true,
    action: baseURL + `/${localStorage.getItem('email')}`,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        file = info.fileList;
        console.log("file:::",file);
        
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    
};


export default class Article extends Component {
    categories = showCategory({email: localStorage.getItem('email')}).then(
        categories =>
            this.setState({
                items: categories.res.categories,
            })
    );
    state = {
        value: '',
        items: [],
        name: '',
        title: '', 
        description: '', 
    };

    onNameChange = event => {
        this.setState({
            name: event.target.value,
            value: event.target.value
        });
    };
    
    onCategoryChange = event => {
        this.setState({
            name: event,
        });
        console.log("event",event);
        // console.log('email:::', props.action);
    };

    onTitleChange = event => {
        this.setState({
            title: event.target.value,
        });
    }

    onDescriptionChange = event => {
        this.setState({
            description: event.target.value,
        });
    }

    addItem = () => {
        console.log('addItem');
        const { items, name } = this.state;
        this.setState({
            items: [...items, name || `New item ${index++}`],
            name: '',
            value: ''
        });
        addCategory({email: localStorage.getItem('email'), categoryName: this.state.name});
    
    };

    uploadFiles = () => {
        
        var i;
        var myFile = [];
        for(i=0;i<file.length;i++){
            myFile.push(file[i].name);
        }
        
        upload({ email:localStorage.getItem('email'), category: this.state.name, title:this.state.title, description: this.state.description, attachment: myFile})
        console.log(myFile);

        window.location.replace('/admin/dashboard');
        
    }

    render() {
        const { items, title, description, value } = this.state;
        
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
                        <Input placeholder="Enter Title" style={{ flex: 'auto' }} value={title} onChange={this.onTitleChange} />
                    </Form.Item>

                    <Form.Item label="Description">
                        <Input placeholder="Enter Description" style={{ flex: 'auto' }} value={description} onChange={this.onDescriptionChange} />
                    </Form.Item>

                    <Form.Item label="Select the category">
                        <Select
                            onChange={this.onCategoryChange}
                            style={{ width: 240 }}
                            placeholder="add new category"
                            dropdownRender={menu => (
                                <div>
                                    {menu} 
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                        <Input value = {value} style={{ flex: 'auto' }} onChange={this.onNameChange} />
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
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 12,
                            offset: 6,
                        }}
                    >   
                    <button onClick={this.uploadFiles}>
                        Submit
                    </button>
                        
                    </Form.Item>
                </Form>
            </div>
        )
    }
};