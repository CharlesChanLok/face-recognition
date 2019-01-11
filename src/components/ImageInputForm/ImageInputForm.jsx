import React from 'react';
import './ImageInputForm.css';

const ImageInputForm = (props) => {
    const { handleInputChange, handleImageSubmit, input } = props;
    return (
        <div >
            <p>Please input the image url which contains some faces in there below</p>
            <div className='center'>
                <div className='ImageInputForm_background pa4 br3 shadow-5 '>
                    <input
                        id='imageInput'
                        placeholder='Put the image url here'
                        value={input}
                        type="text"
                        className='f4 pa2 w-70'
                        onChange={handleInputChange} />
                    <button
                        onClick={handleImageSubmit}
                        className='FontFace_moonhouse w-15 grow f4 link ph3 pv2 dib white bg-lightest-blue'>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ImageInputForm;