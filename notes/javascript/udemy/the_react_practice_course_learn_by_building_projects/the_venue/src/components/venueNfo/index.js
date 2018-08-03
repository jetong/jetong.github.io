import React from 'react';
import Zoom from 'react-reveal/Zoom';

import icon_calendar from '../../resources/images/icons/calendar.png';
import icon_location from '../../resources/images/icons/location.png';

const VenueNfo = () => {
    return (
        <div className="bck_black">     {/* black background */}
            <div className="center_wrapper">    {/* center the elements */}
                <div className="vn_wrapper">    {/* flex the elements side by side*/}

                    {/* CALENDAR */}
                    <Zoom duration={500}>
                        <div className="vn_item">
                            <div className="vn_outer">
                                <div className="vn_inner">
                                    <div className="vn_icon_square bck_red">    {/* red square rotated 45 deg */}
                                    </div>
                                    <div        // actual icon
                                        className="vn_icon"
                                        style={{
                                            background: `url(${icon_calendar})`
                                        }}
                                    >
                                    </div>
                                    <div className="vn_title">
                                        Event Date & Time
                                </div>
                                    <div className="vn_desc">
                                        7 August 2017 @10:00 pm
                                </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>

                    {/* LOCATION */}
                    <Zoom duration={500} delay={500}>
                        <div className="vn_item">
                            <div className="vn_outer">
                                <div className="vn_inner">
                                    <div className="vn_icon_square bck_yellow">    {/* yellow square rotated 45 deg */}
                                    </div>
                                    <div        // actual icon
                                        className="vn_icon"
                                        style={{
                                            background: `url(${icon_location})`
                                        }}
                                    >
                                    </div>
                                    <div className="vn_title">
                                        Event Location
                                </div>
                                    <div className="vn_desc">
                                        345 Speer Street Oakland, CA 9835
                                </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </div>
            </div>
        </div>
    );
};

export default VenueNfo;