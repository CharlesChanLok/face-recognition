import React from 'react';
import './ImageInputForm.css';

const ImageInputForm = (props) => {
    const { handleInputChange, handleSubmit } = props;
    return (
        <div >
            <p>Please upload your image below</p>
            <div className='center'>
                <div className='ImageInputForm_background pa4 br3 shadow-5 '>
                    <input type="text" className='f4 pa2 w-70' onChange={handleInputChange} />
                    <button 
                    onClick={handleSubmit}
                    className='FontFace_moonhouse w-15 grow f4 link ph3 pv2 dib white bg-lightest-blue'>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ImageInputForm;