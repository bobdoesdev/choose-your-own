import React from 'react';
import classes from './Navbar.module.css';
import NavItems from '../NavItems/NavItems';
import NavToggle from '../Sidebar/NavToggle/NavToggle';
import Logo from '../Logo/Logo';

const Navbar = (props) => {
    console.log(props, 'first set');
    return (
        <header className={classes.Header}>
            <Logo />
            <NavItems isAuthenticated={props.isAuth}/>
            <NavToggle toggle={props.toggle}/>
        </header>
    );
};

export default Navbar;