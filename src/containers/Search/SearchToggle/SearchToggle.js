import React from 'react';
import classes from './SearchToggle.module.css';

const SearchToggle = (props) => {
    return (
        <div className={classes.Toggle} onClick={props.toggle}>
            <span></span>
            <span></span>
        </div>
    );
};

export default SearchToggle;