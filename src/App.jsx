import React, { Component } from "react";
import "./App.css";
/* Components */
import FaceRecognitionFrame from "./components/FaceRecognitionFrame/FaceRecognitionFrame";
import ImageInputForm from "./components/ImageInputForm/ImageInputForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";

const initialState = {
  input: "",
  imageUrl: "",
  faceBoundingBoxes: [],
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    age: 0,
    pet: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  async componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    try {
      if (token) {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}/users/signin`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        );
        const data = await res.json();
        if (data && data.id) {
          const res = await fetch(
            `${process.env.REACT_APP_SERVER}/profile/${data.id}`,
            {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            }
          );

          const user = await res.json();
          if (user && user.email) {
            this.loadUser(user);
            this.handleRouteChange("home");
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        age: data.age,
        pet: data.pet
      }
    });
  };

  findFaceLocations = (data) => {
    if (data && data.outputs) {
      const faces = data.outputs[0].data.regions;
      const image = document.getElementById("imageFrame");
      const width = Number(image.width);
      const height = Number(image.height);

      return faces.map((face) => {
        face = face.region_info.bounding_box;
        return {
          leftCol: face.left_col * width,
          topRow: face.top_row * height,
          rightCol: width - face.right_col * width,
          bottomRow: height - face.bottom_row * height
        };
      });
    }
    return;
  };

  /* event handler methods*/
  displayfaceBoundingBoxes = (boxes) => {
    if (boxes) {
      this.setState({ faceBoundingBoxes: boxes });
    }
  };

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleImageSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    const imageInput = document.getElementById("imageInput");
    const newImage = document.getElementById("imageFrame").src;
    imageInput.value = "";

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/clarifai/facedetection`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: window.sessionStorage.getItem("token")
          },
          body: JSON.stringify({
            input: this.state.input
          })
        }
      );
      const clarifaiResponse = await response.json();
      //This will run only if the image url is valid and not the same image url
      if (clarifaiResponse.outputs && this.state.imageUrl !== newImage) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER}/users/image`,
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Authorization: window.sessionStorage.getItem("token")
              },
              body: JSON.stringify({
                id: this.state.user.id
              })
            }
          );
          const entries = await response.json();
          this.setState({
            user: {
              ...this.state.user,
              entries: entries
            }
          });
        } catch (err) {
          // console.log(err);
        }
        this.displayfaceBoundingBoxes(this.findFaceLocations(clarifaiResponse));
      }
    } catch (err) {
      // console.log(err);
    }
  };

  /* handle sign and signout methods */
  handleRouteChange = async (route) => {
    if (route === "signout") {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}/users/signout`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: window.sessionStorage.getItem("token")
            }
          }
        );
        if (res.status === 200) {
          this.removeAuthTokenInSession();
          this.setState(initialState);
        }
      } catch (err) {
        console.log(err);
      }

    } else if (route === "signin" || route === "signup") {
      this.setState(initialState);
      this.setState({ route: route });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
      this.setState({ route: route });
    }
  };

  removeAuthTokenInSession = () => {
    window.sessionStorage.removeItem("token");
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  };

  render() {
    const {
      imageUrl,
      faceBoundingBoxes,
      isSignedIn,
      route,
      user,
      input,
      isProfileOpen
    } = this.state;

    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          handleRouteChange={this.handleRouteChange}
          toggleModal={this.toggleModal}
        />
        {isProfileOpen && (
          <Modal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              loadUser={this.loadUser}
              user={user}
            />
          </Modal>
        )}
        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageInputForm
              handleInputChange={this.handleInputChange}
              handleImageSubmit={this.handleImageSubmit}
              input={input}
            />
            <FaceRecognitionFrame
              faceBoundingBoxes={faceBoundingBoxes}
              imageUrl={imageUrl}
            />
          </div>
        ) : route === "signin" ? (
          <Signin
            handleRouteChange={this.handleRouteChange}
            loadUser={this.loadUser}
          />
        ) : (
              <Signup
                handleRouteChange={this.handleRouteChange}
                loadUser={this.loadUser}
              />
            )}
      </div>
    );
  }
}

export default App;
