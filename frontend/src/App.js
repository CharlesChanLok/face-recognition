import React, { Component } from 'react';
import './App.css';
/* Components */
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageInputForm from './components/ImageInputForm/ImageInputForm';
import FaceRecognitionFrame from './components/FaceRecognitionFrame/FaceRecognitionFrame';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';

/* Face recognition API */
import Clarifai from 'clarifai';
/* environment variable */
import dotenv from 'dotenv';
dotenv.config();

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      faceBoundingBox: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  findFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageFrame');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }
  /* event handler methods*/
  displayFaceBoundingBox = (box) => {
    console.log(box);
    this.setState({ faceBoundingBox: box });
  }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });

  }

  handleSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    try {
      const res = await app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input);
      this.displayFaceBoundingBox(this.findFaceLocation(res));
      //console.log(res.outputs[0].data.regions[0].region_info.bounding_box);
    }
    catch (err) {
      console.log(err);
    }
  }

  /* handle sign and signout methods */
  handleRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }


  render() {
    const { imageUrl, faceBoundingBox, isSignedIn, route } = this.state;
    return (
      <div className="App" >
        <Navigation isSignedIn={isSignedIn} handleRouteChange={this.handleRouteChange} />
        {route === 'home'
          ?
          <div>
            <Logo />
            <Rank />
            <ImageInputForm
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit} />
            <FaceRecognitionFrame
              faceBoundingBox={faceBoundingBox}
              imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <Signin handleRouteChange={this.handleRouteChange} />
              : <Signup handleRouteChange={this.handleRouteChange} />
          )
        }
      </div>
    )
  }
}

export default App;
