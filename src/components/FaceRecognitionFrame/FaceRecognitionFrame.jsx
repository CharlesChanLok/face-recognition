import React from 'react';

import 'tachyons';
import './FaceRecognitionFrame.css';

const FaceRecognitionFrame = (props) => {
    const { imageUrl } = props;
    return (
        <div className='center'>
            <img className='FaceRecognitionFrame_image_size' src={imageUrl} alt="Recognized face" />
        </div>
    )
};

export default FaceRecognitionFrame;