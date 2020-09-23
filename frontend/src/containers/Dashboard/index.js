import React, {Component} from 'react';
import Navbar from '../../components/Navbar';
import { Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { viewProfile } from '../profileApi';

let baseURL = 'https://fate-server.herokuapp.com/api/profile/updateAvatar';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('Image must smaller than 1MB!');
    }
    return isJpgOrPng && isLt1M;
}

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            userInfo : null,
            isLoaded: false,
            error: null,
            loading: false,
            imageUrl: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchInfo = this.fetchInfo.bind(this);
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl:imageUrl,
              loading: false,
            }),
          );
          console.log("done!");
        }
    };

    fetchInfo(email) {
        viewProfile({email:email}).then(
            userInfo =>
            this.setState({userInfo: userInfo, isLoaded: true, username: userInfo.res.username, loading: false,
                firstname: userInfo.res.firstname, lastname: userInfo.res.lastname, imageUrl: this.setImage(userInfo.res.avatar)})
        );
        
    }

    setImage(avatar) {
        if (avatar !== null) {
            var prevUrl = avatar.image.data;
            return ("data:"+ avatar.imageType +";base64," + prevUrl);

        }
        return null;
    }

    componentDidMount() {
        this.fetchInfo(localStorage.getItem('email'));
    }

    render() {
        const {isLoaded, error, loading, imageUrl} = this.state;

        if (error) {
            //couldn't fetch data from server
            return(
                <div className="pageContainer">
                    <Navbar />            
                        <p className = "message">Something went wrong. Error: {error.message}</p>;
                </div>
            );
        } else if (!isLoaded) {
            //loading screen
            return(
                <div className="pageContainer">
                    <Navbar />

                    <p className = "message">Loading your info...</p>

                </div>
            );
        } else {
            const uploadButton = (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            );
            
            return(
                <div className="pageContainer">
                    <Navbar />
                    <div className="grid-container">
                        <div className="leftCol">
                            <div className="avatarBox">
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action = {baseURL + `/${localStorage.getItem('email')}`}
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div>
                            
                            <div className="buttonBox"> 
                                <Button block>Edit Profile</Button>
                                <br /><br />

                            </div>
                        </div>
                        <div className="rightCol">
                            <div className="profileHeadings">My Account</div>

                            <div className="profileInfo">Email: {localStorage.getItem('email')}</div>
                            
                            <div className="profileInfo">Username: {this.state.username}</div>

                            <div className="profileInfo">First name: {this.state.firstname}</div>

                            <div className="profileInfo">Last name: {this.state.lastname}</div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}