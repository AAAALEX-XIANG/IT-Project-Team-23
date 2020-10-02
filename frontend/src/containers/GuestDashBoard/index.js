import React, { Component } from "react";
import GuestNavbar from "../../components/GuestNavbar";
import { getGuestDashboard } from "../guestApi";

//let baseURL = 'https://fatewhole.herokuapp.com/profile/updateAvatar';
//let baseURL = "http://localhost:8080/api/profile/updateAvatar";
let currenLink = window.location.pathname.split("/").pop();

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default class GuestDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: null,
      username: "",
      firstname: "",
      lastname: "",
      description: "",
      isLoaded: false,
      error: null,
      loading: false,
      imageUrl: null,
      ifEdit: false,
      status: false,
      loadings: [],
      shareLink: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl: imageUrl,
          loading: false,
        })
      );
      console.log("done!");
    }
  };

  fetchInfo(currenLink) {
    getGuestDashboard({ link: currenLink }).then((userInfo) =>
      this.setState({
        userInfo: userInfo,
        isLoaded: true,
        username: userInfo.res.username,
        loading: false,
        firstname: userInfo.res.firstname,
        lastname: userInfo.res.lastname,
        description: userInfo.res.description,
        imageUrl: this.setImage(userInfo.res.avatar),
      })
    );
  }

  setImage(avatar) {
    if (avatar !== null) {
      var prevUrl = avatar.image.data;
      return "data:" + avatar.imageType + ";base64," + prevUrl;
    }
    return null;
  }

  componentDidMount() {
    this.fetchInfo(currenLink);
  }

  //the loading button is referenced from https://ant.design/components/button-cn/
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
    }, 12000);
  };
  render() {
    const { isLoaded, error, imageUrl } = this.state;
    if (this.state.status === true) {
      window.location.replace("/admin/dashboard");
      // console.log("refresh");
    }
    if (error) {
      //couldn't fetch data from server
      return (
        <div className="pageContainer">
          <GuestNavbar />
          <p className="message">
            Something went wrong. Error: {error.message}
          </p>
          ;
        </div>
      );
    } else if (!isLoaded) {
      //loading screen
      return (
        <div className="pageContainer">
          <GuestNavbar />
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
    }

    return (
      <div className="pageContainer">
        <GuestNavbar />
        <div className="grid-container">
          <div className="leftCol">
            <div className="avatarBox-guest">
              <div className="avatar-uploader">
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: "150%", height: "150%" }}
                />
              </div>
            </div>
            <br />
            <br />
          </div>
          <div className="rightCol">
            <div className="profileHeadings">My Account</div>

            {/* <div className="profileInfo">
              Email:
              <div className="currentInfo">{localStorage.getItem("email")}</div>
            </div> */}

            <div className="profileInfo">
              Username:
              <div className="currentInfo">{this.state.username}</div>
            </div>
            <div className="nameInfo">
              <div className="profileInfo">
                First name:
                <div className="currentInfo">{this.state.firstname}</div>
              </div>

              <div className="profileInfo">
                Last name:
                <div className="currentInfo">{this.state.lastname}</div>
              </div>
            </div>
            <div className="profileInfo">
              Self Introduction:
              <div className="intro">{this.state.description}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
