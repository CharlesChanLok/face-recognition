import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
/* Background setting of particles-js*/
import Particles from 'react-particles-js';
import particlesOpts from './particlesjs-config.json';

ReactDOM.render(
    <div>
        <Particles
            className='particles'
            params={particlesOpts}
        />
        <App />
    </div>
    , document.getElementById('root'));
registerServiceWorker();
