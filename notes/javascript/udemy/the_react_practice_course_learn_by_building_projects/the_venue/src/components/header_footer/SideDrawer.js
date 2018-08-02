import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const SideDrawer = (props) => {
    return (
        <Drawer
            anchor="right"      // anchors Drawer to the right of screen
            open={props.open}   // boolean passed from Header.js.  Visble when true, else hidden.  This is a stateless component, so don't need this.props.open
            onClose={()=> props.onClose(false)} // on close, trigger the parent's toggleDrawer function to set the drawerOpen state to false.
        >
            <List component="nav">
                {/* button gives the item mouseover effects */}
                <ListItem button onClick={()=> console.log('Featured')}>
                    Event starts in
                </ListItem>

                <ListItem button onClick={()=> console.log('Venue INFO')}>
                    Venue INFO
                </ListItem>

                <ListItem button onClick={()=> console.log('Highlights')}>
                    Highlights
                </ListItem>

                <ListItem button onClick={()=> console.log('Pricing')}>
                    Pricing
                </ListItem>

                <ListItem button onClick={()=> console.log('Location')}>
                    Location
                </ListItem>

            </List>
        </Drawer>
    );
};

export default SideDrawer;