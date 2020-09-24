import React, {Component} from 'react';
import Navbar from '../../components/Navbar';
import { Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { viewProfile, updateProfile } from '../profileApi';

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
            username: "",
            firstname: "",
            lastname: "",
            isLoaded: false,
            error: null,
            loading: false,
            imageUrl: null,
            ifEdit: false,
            status: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.changeEdit = this.changeEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.submitProfile = this.submitProfile.bind(this);
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

    handleUpdate(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    submitProfile(detail) {
        const { firstname, lastname, username } = detail;
        if (firstname.length === 0 || lastname.length === 0 || username.length === 0) {
            alert("name cannot be empty");
        } else {
            updateProfile({ email: localStorage.getItem('email'), firstname: firstname, 
            lastname: lastname, username: username }).then(
                status => this.setState({
                    status: status.res.result
                })
            )
        }
    }

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

    changeEdit = () => {
        this.setState({
            ifEdit: true
        })
    }

    componentDidMount() {
        this.fetchInfo(localStorage.getItem('email'));
    }

    render() {
        const {isLoaded, firstname, lastname, username, error, loading, imageUrl, ifEdit} = this.state;
        if (this.state.status === true) {
            window.location.replace("/admin/dashboard");
            // console.log("refresh");
        }
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
            const uploadButton = (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            );
            if ( ifEdit ) {
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
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '200%', height: '200%' }} /> : uploadButton}
                                    </Upload>
                                </div>

                                <br /><br />
                                <div className="buttonBox"> 
                                    <Button block onClick={this.changeEdit}>Edit Profile</Button>
                                    <br /><br />

                                </div>
                            </div>
                            <div className="rightCol">
                                <div className="profileHeadings">My Account</div>

                                <div className="profileInfo">Email:
                                    <div className="currentInfo"> 
                                        {localStorage.getItem('email')}
                                    </div>
                                </div>
                                
                                <div className="profileInfo">Username: 
                                    <div className="currentInfo"> 
                                        <input type="text" name="username" value={this.state.username} onChange={this.handleUpdate} required/>
                                    </div>
                                </div>
                                <div className="nameInfo">
                                    <div className="profileInfo">First name: 
                                        <div className="currentInfo"> 
                                            <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleUpdate} required/>
                                        </div>
                                    </div>

                                    <div className="profileInfo">Last name: 
                                        <div className="currentInfo"> 
                                            <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleUpdate} required/>
                                        </div>
                                    </div>

                                    <div className="buttonBox"> 
                                        <Button block onClick={() => this.submitProfile({firstname, lastname, username})}>Update</Button>
                                    <br /><br />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
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
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '200%', height: '200%' }} /> : uploadButton}
                                    </Upload>
                                </div>

                                <br /><br />
                                <div className="buttonBox"> 
                                <Button block onClick={this.changeEdit}>Edit Profile</Button>
                                    <br /><br />

                                </div>
                            </div>
                            <div className="rightCol">
                                <div className="profileHeadings">My Account</div>

                                <div className="profileInfo">Email:
                                    <div className="currentInfo"> 
                                        {localStorage.getItem('email')}
                                    </div>
                                </div>
                                
                                <div className="profileInfo">Username: 
                                    <div className="currentInfo"> 
                                        {this.state.username}
                                    </div>
                                </div>
                                <div className="nameInfo">
                                    <div className="profileInfo">First name: 
                                        <div className="currentInfo"> 
                                            {this.state.firstname}
                                        </div>
                                    </div>

                                    <div className="profileInfo">Last name: 
                                        <div className="currentInfo"> 
                                            {this.state.lastname}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}