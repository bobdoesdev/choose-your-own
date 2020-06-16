import React from 'react';
import classes from './Story.module.css';
import GenreTags from './GenreTags/GenreTags';
import StoryDetails from './StoryDetails/StoryDetails';

const Story = (props) => {


    console.log(props);
    return (
        <div className={classes.Story}>
            <h3 className={classes.Title}>{props.title}</h3>
            <p className={classes.Description}>{props.description} </p>

            <StoryDetails
                author={props.author}
                publicationDate={props.publicationDate}
                rating={props.rating}
            />
            <GenreTags genres={props.genreTags}/>
        </div>
    );
};

export default Story;