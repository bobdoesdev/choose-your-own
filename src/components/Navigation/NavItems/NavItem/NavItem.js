import React from 'react';
import classes from './NavItem.module.css';

const NavItem = (props) => {

    let attachedClasses = [classes.NavItem];

    if(props.appearance){
        attachedClasses = [classes.NavItem, classes[props.appearance]]
    }
    return (
        <li className={attachedClasses.join(' ')}>
            <a href={props.link}>{props.children}</a>
        </li>
    );
};

export default NavItem;