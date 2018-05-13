import React from 'react';

import 'tachyons';
import './FaceRecognitionFrame.css';

const FaceRecognitionFrame = (props) => {
    const { imageUrl, faceBoundingBox } = props;
    return (
        <div className='center'>
            <div className='absolute mt2'>
                <img
                    id='imageFrame'
                    className='FaceRecognitionFrame_image_size'
                    src={imageUrl} alt="Recognized face" />
                <div
                    className='bounding_box'
                    style={{
                        top: faceBoundingBox.topRow,
                        right: faceBoundingBox.rightCol,
                        bottom: faceBoundingBox.bottomRow,
                        left: faceBoundingBox.leftCol
                    }}>
                </div>
            </div>
        </div >
    )
};

export default FaceRecognitionFrame;