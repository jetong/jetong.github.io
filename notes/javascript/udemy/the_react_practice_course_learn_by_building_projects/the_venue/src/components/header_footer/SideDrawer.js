import React from 'react';
import { scroller } from 'react-scroll';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const SideDrawer = (props) => {

    const scrollToElement = (element) => {
        // scrollTo() takes an elementReference and props.
        scroller.scrollTo(element, {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -80    // adjust for fixed header covering
        });
        props.onClose(false);   // close drawer on selection
    }

    return (
        <Drawer
            anchor="right"      // anchors Drawer to the right of screen
            open={props.open}   // boolean passed from Header.js.  Visble when true, else hidden.  This is a stateless component, so don't need this.props.open
            onClose={()=> props.onClose(false)} // on close, trigger the parent's toggleDrawer function to set the drawerOpen state to false.
        >
            <List component="nav">
                {/* button gives the item mouseover effects */}
                <ListItem button onClick={()=> scrollToElement('featured')}>
                    Event starts in
                </ListItem>

                <ListItem button onClick={()=> scrollToElement('venuenfo')}>
                    Venue INFO
                </ListItem>

                <ListItem button onClick={()=> scrollToElement('highlights')}>
                    Highlights
                </ListItem>

                <ListItem button onClick={()=> scrollToElement('pricing')}>
                    Pricing
                </ListItem>

                <ListItem button onClick={()=> scrollToElement('location')}>
                    Location
                </ListItem>

            </List>
        </Drawer>
    );
};

export default SideDrawer;