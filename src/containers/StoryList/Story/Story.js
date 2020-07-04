import React from 'react';
import {Link} from 'react-router-dom';

import classes from './Story.module.css';
import GenreTags from './GenreTags/GenreTags';
import StoryDetails from './StoryDetails/StoryDetails';


const Story = (props) => {

    console.log(props);

    const link = '/stories/'+props.id;

    return (
        <div className={classes.Story}>
            <Link to={link} className={classes.Title}>{props.title}</Link>
            <p className={classes.Description}>{props.description} </p>

            <StoryDetails
                author={props.author}
                publicationDate={props.publicationDate}
                rating={props.rating}
            />
            {/* <GenreTags genres={props.genreTags}/> */}
        </div>
    );
};

export default Story;