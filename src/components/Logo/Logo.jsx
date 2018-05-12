import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';

const Logo = () => {
    return (
        <Tilt className="Tilt Logo_tilt br2 shadow-2 center" options={{ max: 360 }} style={{ height: 100, width: 100}} >
            <div className="Tilt-inner"></div>
        </Tilt>
    )
};

export default Logo;