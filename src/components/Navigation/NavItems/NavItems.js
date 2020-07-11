import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const NavItems = (props) => {


    let navItems = (
        <React.Fragment>
            <NavItem link="/">Home</NavItem>
            <NavItem link="/stories">Stories</NavItem>
        </React.Fragment>
    );

    if(props.isAuthenticated) {
        navItems = (
            <React.Fragment>
                <NavItem link="/">Home</NavItem>
                <NavItem link="/stories">Stories</NavItem>
                <NavItem link="/profile" >Profile</NavItem>
            </React.Fragment>
        );
    }


    return (
        <ul className={classes.NavItems}>

            {/* <NavItem link="/search" appearance="Button">Search</NavItem> */}

            { navItems}

            {
                props.isAuthenticated ?
                <NavItem link="/logout">Log Out</NavItem> :
                <NavItem link="/auth">Sign In</NavItem>
            }



        </ul>
    );
};

export default NavItems;