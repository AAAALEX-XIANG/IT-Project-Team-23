import React, {Component} from 'react';
import { Button, Collapse } from 'antd';
//import { showCategory, deleteCategory, showArtifacts } from "../../containers/categoryApi"
import { getCategoryArtifact } from "../../containers/artifactApi"

import Navbar from "../../components/Navbar";

const { Panel } = Collapse;

let categories=[];
let files = [];
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: {}
        };
        this.showAllCate = this.showAllCate.bind(this);
    }

    componentWillUnmount() {
        this.setState({
            files: {}
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
                                    {files[item][title].slice(1).map(item => (
                                    <Panel header={item} key={item}>
                                        <p>{item}</p>
                                    </Panel>
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
        
        