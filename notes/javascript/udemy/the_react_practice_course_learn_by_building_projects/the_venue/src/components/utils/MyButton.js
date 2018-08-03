import React from 'react';
import Button from '@material-ui/core/Button';

import TicketIcon from '../../resources/images/icons/ticket.png';

// We make this button reusable by having it take in props that would populate the button "template"
const MyButton = (props) => {
    return (
        <Button
            href={props.link}
            variant="contained"
            size="small"
            style={{
                background: props.bck,
                color: props.color
            }}
        >
            <img
                src={TicketIcon}
                className="iconImage"
                alt="icon_button"
            />
            {props.text}
        </Button>
    );
};

export default MyButton;