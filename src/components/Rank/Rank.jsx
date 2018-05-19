import React from 'react';

const Rank = (props) => {
    const { name, entries } = props;
    return (
        <div >
            {`${name} , you uploaded`}
            <div className='white f1 '>
                {`${entries} photos.`}
            </div>
        </div>
    )
};

export default Rank;