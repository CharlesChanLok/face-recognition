import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageInputForm from './components/ImageInputForm/ImageInputForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import particlesOpts from './particlesjs-config.json';

class App extends Component {
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
        <ImageInputForm />

        {/* <FaceRecognition />   */}
      </div>

    );
  }
}

export default App;
