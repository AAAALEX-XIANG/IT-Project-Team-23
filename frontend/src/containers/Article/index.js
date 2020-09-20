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


let file = [];
let baseURL = 'https://fate-server.herokuapp.com/api/cache/upload';

const props = {
    name: 'file',
    multiple: true,
    action: baseURL + `/${localStorage.getItem('email')}`,
    onChange(info) {
        console.log(props.action);
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
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            items: [],
            name: '',
            title: '', 
            description: '',
            privacy: '' 
        };
    }

    componentWillUnmount() {
        this.setState({
            value: '',
            items: [],
            name: '',
            title: '', 
            description: '',
            privacy: ''
        })
        this.onNameChange = this.onNameChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPrivacyChange = this.onPrivacyChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        console.log("clear artifact");
    }

    componentDidMount() {
        this.setState({
            value: '',
            items: [],
            name: '',
            title: '', 
            description: '',
            privacy: ''
        })
        this.onNameChange = this.onNameChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPrivacyChange = this.onPrivacyChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        console.log("load artifact");
    }
    
    categories = showCategory({email: localStorage.getItem('email')}).then(
        categories =>
            this.setState({
                items: categories.res.categories,
            })
    );
    

    onNameChange = event => {
        this.setState({
            name: event.target.value,
            value: event.target.value
        });
    };
    
    onCategoryChange = event => {
        this.setState({
            name: event
        });
        console.log("event",event);
        // console.log('email:::', props.action);
    };

    onTitleChange = event => {
        this.setState({
            title: event.target.value
        });
    }

    onDescriptionChange = event => {
        this.setState({
            description: event.target.value
        });
    }

    onPrivacyChange = event => {
        this.setState({
            privacy: event.target.value
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
        
        upload({ email:localStorage.getItem('email'), category: this.state.name, title:this.state.title, description: this.state.description, attachment: myFile, privacy: this.state.privacy})
        console.log(myFile);
        console.log(this.state.privacy);

        window.location.replace('/admin/dashboard');
    }

    render() {
       // const { items, title, description, value, privacy } = this.state;

        const { items, title, description, value } = this.state;
        if (props.action === baseURL + `/null`) {
            window.location.replace('/admin/article');
        }
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
                        {/*<br />*/}
                        {/*<input type="radio" name="is_teacher" value="false" onChange={this.handleChange} required /><label>No</label>*/}
                        {/*<input type="radio" name="is_teacher" value="true" onChange={this.handleChange} required /><label>Yes</label><br />*/}
                        {/*<br />*/}
                        <Radio.Group>
                            <Radio value = "public" onChange={this.onPrivacyChange}>Public</Radio>
                            <Radio value="private" onChange={this.onPrivacyChange}>Private</Radio>
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