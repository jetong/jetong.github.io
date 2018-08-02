import React from 'react';
import Slider from 'react-slick';

import slide_one from '../../resources/images/slide_one.jpg';
import slide_two from '../../resources/images/slide_two.jpg';
import slide_three from '../../resources/images/slide_three.jpg';

const Carousel = () => {

    // prop settings for Slider
    const settings = {
        dots: false,        // remove default dots at bottom of carousel
        infinite: true,     // loop infinitely
        autoplay: true,
        speed: 500
    }

    return (
        <div
            className="carousel_wrapper"
            style={{
                height:`${window.innerHeight}px`,   // each time page loads or refreshes, we dynamically set the height of the carousel to the window's full height height
                overflow:'hidden'
            }}
        >

            <Slider {...settings}>  {/* ES6 spread all the properties of settings */}
                <div>
                    <div
                        className='carousel_image'
                        style={{
                            background:`url(${slide_one})`,
                            height:`${window.innerHeight}px`
                        }}
                    >
                    </div>
                </div>
                    
                <div>
                    <div
                        className='carousel_image'
                        style={{
                            background:`url(${slide_two})`,
                            height:`${window.innerHeight}px`
                        }}
                    >
                    </div>
                </div>

                <div>
                    <div
                        className='carousel_image'
                        style={{
                            background:`url(${slide_three})`,
                            height:`${window.innerHeight}px`
                        }}
                    >
                    </div>
                </div>
            </Slider>
            
        </div>
    );
};


export default Carousel;