import React from 'react';
import classes from './Sidebar.module.css';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Sidebar = (props) => {
    let attachedClasses = [classes.Sidebar, classes.Closed];

    if(props.open){
        attachedClasses = [classes.Sidebar, classes.Open];
    }
    return (
        <>
            <Backdrop click={props.closeHandler} open={props.open}/>
            <div className={attachedClasses.join(' ')}>
                <NavItems isAuthenticated={props.isAuth}/>
            </div>
        </>
    );
};

export default Sidebar;