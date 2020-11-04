import React, { Component } from "react";
import {
  Form,
  Upload,
  Radio,
  Input,
  Select,
  Divider,
  message,
  Button,
} from "antd";
import "antd/dist/antd.css";
import { InboxOutlined } from "@ant-design/icons";
import { upload } from "../../containers/artifactApi";
import { addCategory, showCategory } from "../../containers/categoryApi";

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
let baseURL = "https://fate-e-portfolio.herokuapp.com/api/cache/upload";
//let baseURL = "http://localhost:8080/api/cache/upload";
const props = {
  name: "file",
  multiple: true,
  action: baseURL + `/${localStorage.getItem("email")}`,
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      file = info.fileList;
      console.log(info.file, info.fileList);
    }
    
    if (status === "done") {
      file = info.fileList;
      console.log("file:::", file);

      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      items: [],
      name: "",
      title: "",
      description: "",
      privacy: "",
      loadings: []
    };
  }

  componentWillUnmount() {
    this.setState({
      value: "",
      items: [],
      name: "",
      title: "",
      description: "",
      privacy: "",
      loadings: []
    });
    console.log("clear artifact");
  }

  categories = showCategory({ email: localStorage.getItem("email") }).then(
    (categories) =>
      this.setState({
        items: categories.res.categories,
      })
  );

  onNameChange = (event) => {
    this.setState({
      name: event.target.value,
      value: event.target.value,
    });
  };

  onCategoryChange = (event) => {
    this.setState({
      name: event,
    });
    console.log("event", event);
  };

  componentDidMount() {
    this.setState({
      value: "",
      items: [],
      name: "",
      title: "",
      description: "",
      privacy: "",
      loadings: []
    });
    this.loadAllcates();
    console.log("load artifact");
  }

  // show all existing categories
  loadAllcates = () => {
    showCategory({ email: localStorage.getItem("email") }).then((categories) =>
      this.setState({
        items: categories.res.categories,
      })
    );
  };

  onTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  onDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onPrivacyChange = (event) => {
    this.setState({
      privacy: event.target.value,
    });
  };

  // add category
  addItem = () => {
    const { items, name, value} = this.state;
    // check if user creates an exist category
    if (items.indexOf(value) === -1) {
      this.setState({
        items: [...items, name || `New item ${index++}`],
        name: "",
        value: "",
      });
      addCategory({
        email: localStorage.getItem("email"),
        categoryName: name,
      });
    } else {
      alert("Category exists");
    }
  };

  uploadFiles = () => {
    this.enterLoading(0);
    var i;
    var myFile = [];
    for (i = 0; i < file.length; i++) {
      myFile.push(file[i].name);
    }
    if (this.state.title ==="") {
      alert("Title cannot be empty");
    } else if (this.state.privacy === "") {
      alert("Please choose privary");
    } else {
      upload({
        email: localStorage.getItem("email"),
        category: this.state.name,
        title: this.state.title,
        description: this.state.description,
        attachment: myFile,
        privacy: this.state.privacy,
      }).then(response => 
          this.checkArti(response.res)
        )
    }
  }
  
  checkArti(res) {
    if (!res.result) {
      alert(res.reason);
    } else {
      window.location.replace("/admin/dashboard");
    }
  }

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
    }, 3000);
  };

  render() {
    const {
      items,
      title,
      description,
      value,
      loadings
    } = this.state;

    if (props.action === baseURL + `/null`) {
      window.location.replace("/admin/article");
    }
    return (
      <div className="pageContainer">
        <Navbar />

        <Form name="validate_other" {...formItemLayout}>
          <Form.Item>
            <div id="header">
              <br />
              <br />
              Upload Document
            </div>
          </Form.Item>

          <Form.Item 
          label={<label className="variables" >Title</label>} required>
          <Input
              placeholder="Enter Title"
              style={{ flex: "auto" }}
              value={title}
              onChange={this.onTitleChange}
            />
          </Form.Item>

          <Form.Item label={<label className="variables" >Description</label>}>
            <Input
              placeholder="Enter Description"
              style={{ flex: "auto" }}
              value={description}
              onChange={this.onDescriptionChange}
            />
          </Form.Item>

          <Form.Item label={<label className="variables" >Select the category</label>} required>
            <Select
              onChange={this.onCategoryChange}
              style={{ width: 240 }}
              placeholder="add new category"
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: "4px 0" }} />
                  <div
                    style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}
                  >
                    <Input
                      value={value}
                      style={{ flex: "auto" }}
                      onChange={this.onNameChange}
                    />
                    <button className={"cateButton"} onClick={this.addItem}> Add </button>
                  </div>
                </div>
              )}
            >
              {items.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="radio-group" label={<label className="variables" >Privacy</label>} required>
            <Radio.Group>
              <Radio value="public" onChange={this.onPrivacyChange}>
                <label className="privacy" > Public </label>
              </Radio>
              <Radio value="private" onChange={this.onPrivacyChange}>
                <label className="privacy" > Private </label>
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label={<label className="variables" >Dragger</label>}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <p>
              {" "}
              Note: You can upload several files, but the size of each file must
              be less than 1 MB.{" "}
            </p>
            <Button
              value="default"
              loading={loadings[0]}
              onClick={this.uploadFiles}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
          );
  }
}
