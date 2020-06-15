import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = (props) => {
    let attachedClasses = [classes.Backdrop, classes.Closed];

    if(props.open){
        attachedClasses = [classes.Backdrop, classes.Open];
    }

    return (
        <div className={attachedClasses.join(' ')} onClick={props.click}></div>
    );
};

export default Backdrop;