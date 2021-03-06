import React, { Component } from "react";
import { Button, Collapse } from "antd";
import { DownloadOutlined, PictureOutlined } from "@ant-design/icons";

import { getGuestPublic, getGuestAttachment } from "../guestApi";

import GuestNavbar from "../../components/GuestNavbar";
import Loading from "../../containers/Loading"
const { Panel } = Collapse;
let currentLink = window.location.pathname.split("/").pop();

export default class GuestCate extends Component {
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
    getGuestPublic({ link: currentLink }).then((files) =>
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
        type === "image/png" ||
        type === "text/plain"
      ) {
        // view file
        var firstobj = document.createElement("object");
        firstobj.className = "viewContainer";
        if (type === "application/pdf" || type === "text/plain") {
          firstobj.style.height = "700px";
        } else {
          firstobj.style.height = "45%";
          firstobj.style.maxHeight = "650px";
          firstobj.style.maxWidth = "700px";
        }
        firstobj.style.width = "60%";
        firstobj.style.cssFloat = "center";
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

  downloadAttachment(item, num) {
    getGuestAttachment(item).then((file) => this.downloadFile(file.res));
    this.enterLoading(num);
  }
  viewAttachment(item, num) {
    getGuestAttachment(item).then((file) => this.viewFile(file.res));
    this.enterLoading(num);
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
          loadings: newLoadings
        };
      });
    }, 50000);
  };

  render() {
    const { files, loadings, isLoaded } = this.state;
    let cates = [];
    let categories = new Map();

    // store response categories in a map and artifacts in an array
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
          <GuestNavbar />
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="pageContainer">
          <GuestNavbar />
          <div className="cateContainer">

          <Collapse accordion>
            {cates.map((item) => (
              <Panel header={"Category: "+item} key={item}>
                <Collapse accordion>
                  {categories.get(item).map((title) => (
                    <Panel header={"Artifact: "+title} key={title}>
                      <div className="CateInfo">
                        Description:
                        <div className="currentInfo">
                          <p>{files[item][title][0]}</p>
                        </div>
                      </div>
                      <div className="CateInfo">
                      Attachments:
                      {files[item][title].slice(1).map((file, num) => (
                        <div key={num+1}>
                          <div className="currentAttachmentInfo">
                          <p>
                            {file}
                          </p>
                          </div>

                            <Button
                              loading={loadings[num+1]}
                              onClick={() =>
                                this.viewAttachment({
                                  link: currentLink,
                                  category: item,
                                  artifact: title,
                                  attachment: file,
                                }, num+1)
                              }
                              id="downloadBtn"
                              icon={<PictureOutlined />}
                              size="small"
                            >
                              View
                            </Button>
                            <Button
                              loading={loadings[num+files[item][title].length]}
                              onClick={() =>
                                this.downloadAttachment({
                                  link: currentLink,
                                  category: item,
                                  artifact: title,
                                  attachment: file,
                                }, num+files[item][title].length)
                              }
                              id="downloadBtn"
                              icon={<DownloadOutlined />}
                              size="small"
                            >
                              download
                            </Button>
                        </div>
                      ))}
                      <br />
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
            ))}
          </Collapse>
          </div>
        </div>
      );
    }
  }
}
