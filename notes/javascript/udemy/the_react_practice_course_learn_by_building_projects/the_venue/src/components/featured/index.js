import React from 'react';
import Carousel from './Carousel';
import TimeUntil from './TimeUntil';

const Featured = () => {
    return (
        // position relative in order to float the title and countdown timer
        <div style={{position:'relative'}}>

            <Carousel/>
            
            <div className="artist_name">
                <div className="wrapper">
                    Ariana Grande
                </div>
            </div>

            <TimeUntil/>

        </div>
    );
};

export default Featured;