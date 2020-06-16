import React from 'react';
import classes from './GenreTags.module.css';

const GenreTags = (props) => {

    let genres = props.genres.map( (genre) => {
        return ( <li className={classes.Tag}>{genre}</li>)
    });

    return (
        <ul className={classes.List}>
            <p className={classes.Title}>Genres:</p>
            {genres}
        </ul>
    );
};

export default GenreTags;