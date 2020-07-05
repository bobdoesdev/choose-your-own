import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const NavItems = (props) => {
    return (
        <ul className={classes.NavItems}>
            <NavItem link="/">Home</NavItem>
            <NavItem link="/writestory">Write Story</NavItem>
            {/* <NavItem link="/favorites">Sign In</NavItem> */}
            {/* <NavItem link="/profile" >Profile</NavItem> */}
            {/* <NavItem link="/search" appearance="Button">Search</NavItem> */}

        </ul>
    );
};

export default NavItems;