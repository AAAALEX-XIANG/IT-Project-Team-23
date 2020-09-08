import React, {Component} from 'react';
import {Form, Button, Upload,Radio, Input} from 'antd';
import "antd/dist/antd.css";
import { InboxOutlined } from '@ant-design/icons';
import Navbar from "../../components/Navbar";

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
    render() {
        return (
            <Form
                name="validate_other"
                {...formItemLayout}

            >
                <Form.Item label="Artifact title">
                    <Input placeholder="Enter Title" />
                </Form.Item>
                <Form.Item label="Description">
                    <Input placeholder=" " />
                </Form.Item>

                <Form.Item name="radio-group" label="Radio.Group">
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
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
};