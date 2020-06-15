import React from 'react';
import classes from './NavToggle.module.css';

const NavToggle = (props) => {
    console.log(props);

    return (

        <div className={classes.NavToggle} onClick={props.toggle}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default NavToggle;