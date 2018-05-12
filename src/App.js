import React, { Component } from 'react';
import './App.css';
/* Components */
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageInputForm from './components/ImageInputForm/ImageInputForm';
import FaceRecognitionFrame from './components/FaceRecognitionFrame/FaceRecognitionFrame';

/* Background setting of particles-js*/
import Particles from 'react-particles-js';
import particlesOpts from './particlesjs-config.json';
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
      faceIdentifiedBox: {}
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

  displayFaceIdentifiedBox = (box) => {
    console.log(box);
    this.setState({ faceIdentifiedBox: box });
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
      this.displayFaceIdentifiedBox(this.findFaceLocation(res));
      //console.log(res.outputs[0].data.regions[0].region_info.bounding_box);
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="App" >
        <Particles
          className='particles'
          params={particlesOpts}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageInputForm
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit} />
        <FaceRecognitionFrame imageUrl={this.state.imageUrl} />
      </div>

    );
  }
}

export default App;
