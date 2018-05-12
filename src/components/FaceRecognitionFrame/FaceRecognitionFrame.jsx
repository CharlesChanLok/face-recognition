import React from 'react';

import 'tachyons';
import './FaceRecognitionFrame.css';

const FaceRecognitionFrame = (props) => {
    const { imageUrl } = props;
    return (
        <div className='center'>
        <div className='absolute mt2'>
            <img id='imageFrame' className='FaceRecognitionFrame_image_size' src={imageUrl} alt="Recognized face" />
        </div>
        </div>
    )
};

export default FaceRecognitionFrame;