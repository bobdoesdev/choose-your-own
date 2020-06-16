import React from 'react';
import classes from './StoryDetails.module.css';

const StoryDetails = (props) => {
    return (
        <div className={classes.Details}>
            <p className={classes.Detail}><strong>Written by: </strong>{props.author}</p>
            <p className={classes.Detail}><strong>Published: </strong>{props.publicationDate}</p>
            <p className={classes.Detail}><strong>Rating: </strong>{props.rating}</p>
        </div>
    );
};

export default StoryDetails;