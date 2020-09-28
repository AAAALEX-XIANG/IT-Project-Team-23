import React, { Component } from "react";
import { Button, Collapse } from "antd";
import { DownloadOutlined, PictureOutlined } from "@ant-design/icons";
//import { showCategory, deleteCategory, showArtifacts } from "../../containers/categoryApi"
import {
  getCategoryArtifact,
  getAttachment,
} from "../../containers/artifactApi";

import Navbar from "../../components/Navbar";

const { Panel } = Collapse;

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {},
      loadings: [],
      isLoaded: false,
    };
    this.showAllCate = this.showAllCate.bind(this);
    this.downloadAttachment = this.downloadAttachment.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      files: {},
    });
    console.log("clear");
  }
  componentDidMount() {
    this.showAllCate();
    console.log("loading");
  }

  showAllCate = () => {
    getCategoryArtifact({ email: localStorage.getItem("email") }).then(
      (files) =>
        // console.log(files.res)
        this.setState({
          files: files.res,
          isLoaded: true,
        })
    );
  };

  downloadFile(request) {
    // Decode Base64 to binary and show some information about the file
    var b64 = request.content;
    // var type = request.filetype;
    let foo = document.getElementsByClassName("pageContainer")[0];
    if (foo.hasChildNodes()) {
      let children = foo.childNodes;
      for (let i = 0; i < children.length; i++) {
        console.log(children[i].nodeName);
        if (children[i].nodeName === "OBJECT") {
          foo.removeChild(children[i]);
        }
        // if(children[i].nodeName === 'A'){
        //     foo.removeChild(children[i]);
        //     break;
        // }
      }
      // Insert a link that allows the user to download the PDF file
      var link = document.createElement("a");
      link.style.cssFloat = "right";
      //link.innerHTML = 'Download file';
      link.download = request.filename;
      link.href = "data:application/octet-stream;base64," + b64;
      foo.appendChild(link).click();
    }
    this.setState({
      loadings: [],
    });
  }

  viewFile(request) {
    // Decode Base64 to binary and show some information about the file
    var b64 = request.content;
    var type = request.filetype;
    let foo = document.getElementsByClassName("pageContainer")[0];
    if (foo.hasChildNodes()) {
      let children = foo.childNodes;
      for (let i = 0; i < children.length; i++) {
        console.log(children[i].nodeName);
        if (children[i].nodeName === "OBJECT") {
          foo.removeChild(children[i]);
        } else if (children[i].nodeName === "A") {
          foo.removeChild(children[i]);
          break;
        }
      }

      // we can only view pdf, text or image files
      if (
        type === "application/pdf" ||
        type === "image/jpeg" ||
        type === "text/plain"
      ) {
        // view file
        var firstobj = document.createElement("object");
        firstobj.class = "viewContainer";
        if (type === "application/pdf" || type === "text/plain") {
          firstobj.style.height = "700px";
        } else {
          firstobj.style.height = "45%";
        }
        firstobj.style.width = "60%";
        firstobj.style.cssFloat = "right";
        firstobj.type = type;
        firstobj.data = "data:" + type + ";base64," + b64;
        foo.appendChild(firstobj);
      } else {
        alert(`Sorry, you are not allowed to view ${type} files`);
      }
      this.setState({
        loadings: [],
      });
    }
  }

  downloadAttachment(item) {
    getAttachment(item).then((file) => this.downloadFile(file.res));
    this.enterLoading(1);
  }
  viewAttachment(item) {
    getAttachment(item).then((file) => this.viewFile(file.res));
    this.enterLoading(0);
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
    }, 50000);
  };

  render() {
    const { files, loadings, isLoaded } = this.state;
    let cates = [];
    let categories = new Map();

    for (var cate in files) {
      cates.push(cate);
      let artifacts = [];
      for (var title in files[cate]) {
        artifacts.push(title);
      }
      categories.set(cate, artifacts);
    }
    if (!isLoaded) {
      //loading screen
      return (
        <div className="pageContainer">
          <Navbar />
          <div className="loadingContainer">
            <div class="loading">
              <div class="loading-item loading-one"></div>
              <div class="loading-item loading-two"></div>
              <div class="loading-item loading-three"></div>
              <div class="loading-item loading-four"></div>
              <div class="loading-item loading-five"></div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="pageContainer">
          <Navbar />

          <Collapse>
            {cates.map((item) => (
              <Panel header={item} key={item}>
                <Collapse>
                  {categories.get(item).map((title) => (
                    <Panel header={title} key={title}>
                      Description:
                      <p>{files[item][title][0]}</p>
                      Attachments:
                      {files[item][title].slice(2).map((file) => (
                        <div key={file}>
                          <p>
                            {file}

                            <Button
                              loading={loadings[0]}
                              onClick={() =>
                                this.viewAttachment({
                                  email: localStorage.getItem("email"),
                                  category: item,
                                  artifact: title,
                                  attachment: file,
                                })
                              }
                              id="downloadBtn"
                              type="primary"
                              shape="round"
                              icon={<PictureOutlined />}
                            >
                              View
                            </Button>
                            <Button
                              loading={loadings[1]}
                              onClick={() =>
                                this.downloadAttachment({
                                  email: localStorage.getItem("email"),
                                  category: item,
                                  artifact: title,
                                  attachment: file,
                                })
                              }
                              id="downloadBtn"
                              type="primary"
                              shape="round"
                              icon={<DownloadOutlined />}
                            >
                              download
                            </Button>
                          </p>
                        </div>
                      ))}
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
            ))}
          </Collapse>
        </div>
      );
    }
  }
}
