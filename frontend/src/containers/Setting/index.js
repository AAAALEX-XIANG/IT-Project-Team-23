import React, {Component} from 'react';
import { Form, Input, Button, List, Avatar } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Navbar from "../../components/Navbar";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};
const data = [
    {
        title: 'Title 1',
        description: "There is some sentences"
    },
    {
        title: 'Title 2',
        description: "There is some sentences"
    }
];

export default class Setting extends Component {
    render() {
        return (
            <div className="pageContainer">
                <Navbar />

                <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel}>

                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="/404">{item.title}</a>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />

                    <Form.List name="names">
                        {(fields, { add, remove }) => {
                            return (
                                <div>
                                    <br /><br /><br /><br /><br />
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'My Catalogue' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input your catalogue's name.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder="Catalogue Name" style={{ width: '60%' }} />
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    style={{ margin: '0 8px' }}
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add();
                                            }}
                                            style={{ width: '60%' }}
                                        >
                                            <PlusOutlined />Add Catalogue
                                        </Button>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add('The head Catalogue', 0);
                                            }}
                                            style={{ width: '60%', marginTop: '20px' }}
                                        >
                                            <PlusOutlined /> Add Catalogue at head
                                        </Button>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

