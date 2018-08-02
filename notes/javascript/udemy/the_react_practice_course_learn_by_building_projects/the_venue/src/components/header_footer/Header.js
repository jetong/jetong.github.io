import React, { Component } from 'react';

// Import UI components from Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';    // acts like container
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import SideDrawer from './SideDrawer';

class Header extends Component {

    state = {
        drawerOpen: false,      // Track state of SideDrawer visibility.  The fact that IconButton and SideDrawer shares this state creates an interactive connection between the two components.
        headerShow: false       // Track state of AppBar transparency effect
    }

    // vanilla js to attach a scroll event listener to the wondow
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    /*
    // Note that if our app had other routes, we should remember to clear event listeners before we go to another component in a different route if we don't want this transparency effect.
    // Here we don't need it since we have a single landing page application.
    componentWillUnmount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    */

    handleScroll = () => {
        if(window.scrollY > 0){
            this.setState({
                headerShow: true
            })
        }else{
            this.setState({
                headerShow: false
            })
        }
        
    }

    // This is to exemplify passing a value from child component; we could have easily just
    // set the drawerOpen state to false.
    toggleDrawer = (value) => {
        this.setState({
            drawerOpen: value
        })
    }

    render() {
        return (
            <div>
                <AppBar
                    position="fixed"    // fixes the AppBar to top even when scrolling
                    style={{
                        backgroundColor: this.state.headerShow ? '#2f2f2f' : 'transparent', // toggle transparency based on state
                        boxShadow: 'none',
                        padding: '10px 0px'
                    }}
                >
                    <Toolbar>

                        <div className="header_logo">
                            {/* Get font_righteous from Goggle Fonts first & link the style in index.html */}
                            <div className="font_righteous header_logo_venue">The Venue</div>
                            <div className="header_logo_title">Musical Events</div>
                        </div>

                        { /* 3 horizontal bar icon */ }
                        <IconButton
                            aria-label="Menu"
                            color="inherit"     // inherit the default white

                            // set drawerOpen state to true, which triggers re-rendering of SideDrawer with the new state                    
                            onClick={()=> this.toggleDrawer(true)}  
                        >
                            <MenuIcon/>
                        </IconButton>

                        <SideDrawer
                            open={this.state.drawerOpen}    // pass current state to Drawer component
                            onClose={(value)=> this.toggleDrawer(value)}
                        />


                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;