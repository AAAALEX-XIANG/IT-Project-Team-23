import React, {Component} from 'react';
import { Button, Collapse } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
//import { showCategory, deleteCategory, showArtifacts } from "../../containers/categoryApi"
import { getCategoryArtifact, getAttachment } from "../../containers/artifactApi"

import Navbar from "../../components/Navbar";

const { Panel } = Collapse;

let categories=[];
let files = [];
let attachment = [];
let file = []
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: {},
        };
        this.showAllCate = this.showAllCate.bind(this);
        this.downloadAttachment = this.downloadAttachment.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    componentWillUnmount() {
        this.setState({
            files: {},
        })
        console.log("clear");
    }
    componentDidMount() {
        this.showAllCate();
        console.log("loading");
    }
    
    showAllCate = () => {

        files = getCategoryArtifact({email: localStorage.getItem('email')}).then(
            files => 
                // console.log(files.res)
                this.setState({
                    files: files.res
                })
        )
    }

    downloadFile(request) {
        // Decode Base64 to binary and show some information about the file
        var b64 = request.content;
        var type = request.filetype;
        
        var obj = document.createElement('object');
        obj.style.width = '100%';
        obj.style.height = '842pt';
        obj.type = type;
        obj.data = 'data:' + type + ';base64,' + b64;
        document.body.appendChild(obj);

        // Insert a link that allows the user to download the PDF file
        var link = document.createElement('a');
        link.innerHTML = 'Download file';
        link.download = request.filename;
        link.href = 'data:application/octet-stream;base64,' + b64;
        document.body.appendChild(link);
    }

    downloadAttachment(item){
        file = getAttachment(item).then(
            file => this.downloadFile(file.res)
        )
    }
    
    render() {
        const { files } = this.state;
        let cates = []
        let categories = new Map();

        for (var cate in files) {
            cates.push(cate);
            let artifacts = [];
            for (var title in files[cate]){
                artifacts.push(title);
            }
            categories.set(cate, artifacts);
        }
        

        return (
            <div className="pageContainer">
                <Navbar />
                    
                    <Collapse>

                        {cates.map(item => (
                        <Panel header={item} key={item}>
                            <Collapse>

                                {categories.get(item).map(title => (
                                <Panel header={title} key={title}>
                                    Description:
                                    <p>{files[item][title][0]}</p>
                                    Attachments:
                                    {files[item][title].slice(2).map(file => (
                                        <div key = {file}>
                                            <p>{file}
                                        
                                            <Button onClick={()=>this.downloadAttachment({email: localStorage.getItem("email"), category: item, artifact: title, attachment:file})}
                                            id= "downloadBtn" type="primary" shape="round" icon={<DownloadOutlined />}>
                                            View
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
        )
    }
}
        
        