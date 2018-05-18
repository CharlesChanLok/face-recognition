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

const { REACT_APP_CLARIFAI_API_KEY } = process.env;

const app = new Clarifai.App({
    apiKey: REACT_APP_CLARIFAI_API_KEY
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            faceBoundingBox: {},
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.create_at
            }
        })
    }

    clearUser = () => {
        this.setState({
            input: '',
            imageUrl: '',
            faceBoundingBox: {},
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        })
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
        this.setState({ faceBoundingBox: box });
    }

    handleInputChange = (event) => {
        this.setState({ input: event.target.value });

    }

    handleImageSubmit = async () => {
        this.setState({ imageUrl: this.state.input });
        try {
            const clarifaiResponse = await app.models.predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input);
            if (clarifaiResponse) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SERVER}/image`, {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    });
                    const entries = await response.json();
                    this.setState({
                        user: {
                            ...this.state.user,
                            entries: entries
                        }
                    })
                }
                catch (err) {
                    console.log(err);
                }
            }
            this.displayFaceBoundingBox(this.findFaceLocation(clarifaiResponse));
            //console.log(res.outputs[0].data.regions[0].region_info.bounding_box);
        }
        catch (err) {
            console.log(err);
        }
    }

    /* handle sign and signout methods */
    handleRouteChange = (route) => {
        if (route === 'signout' || route === 'signin') {
            this.clearUser();
        } else if (route === 'home') {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route: route });
    }

    render() {
        const { imageUrl, faceBoundingBox, isSignedIn, route, user } = this.state;
        return (
            <div className="App" >
                <Navigation isSignedIn={isSignedIn} handleRouteChange={this.handleRouteChange} />
                {route === 'home'
                    ?
                    <div>
                        <Logo />
                        <Rank name={user.name} entries={user.entries} />
                        <ImageInputForm
                            handleInputChange={this.handleInputChange}
                            handleImageSubmit={this.handleImageSubmit} />
                        <FaceRecognitionFrame
                            faceBoundingBox={faceBoundingBox}
                            imageUrl={imageUrl} />
                    </div>
                    :
                    (
                        route === 'signin'
                            ? <Signin handleRouteChange={this.handleRouteChange} loadUser={this.loadUser} />
                            : <Signup handleRouteChange={this.handleRouteChange} loadUser={this.loadUser} />
                    )
                }
            </div>
        )
    }
}

export default App;
