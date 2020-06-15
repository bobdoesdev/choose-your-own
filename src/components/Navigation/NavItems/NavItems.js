import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const NavItems = (props) => {
    return (
        <ul className={classes.NavItems}>
            <NavItem link="/">Home</NavItem>
            <NavItem link="/search">Search</NavItem>
            <NavItem link="/favorites">Sign In</NavItem>
        </ul>
    );
};

export default NavItems;