import React, {Component} from 'react';
import { Collapse } from 'antd';
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
            items: [],
            artifactItems: [],
            files: {}
        };
        this.showAllCate = this.showAllCate.bind(this);
    }

    componentWillUnmount() {
        this.setState({
            items: [],
            artifactItems: [],
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
        let cates = [];
        for (var key in files) {
            cates.push(key);
        }

        return (
            <div className="pageContainer">
                <Navbar />
                    
                    <Collapse>

                        {cates.map(item => (
                        <Panel header={item} key={item}>
                                    {files[item].map(item => (
                                 <Panel header={item} key={item}>
                                    <p>{item}</p>
                                </Panel>
                            ))}
                        </Panel>
                    ))}
    
                 </Collapse>
            </div>
        )
    }
}
        
        