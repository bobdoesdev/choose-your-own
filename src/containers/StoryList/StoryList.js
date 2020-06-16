import React, {Component} from 'react';
import classes from './StoryList.module.css';
import Story from './Story/Story';

class StoryList extends Component{

    state = {

    };

    render(){
        return (
            <div className={classes.StoryListWrapper}>
                <h1>List Title</h1>

                <ul className={classes.StoryList}>
                    <li className={classes.StoryListItem}>
                        <Story
                            title="Story 1"
                            description="This is a description."
                            genreTags={['romance', 'horror']}
                            author="Frank herbert"
                            publicationDate="05/03/1988"
                            rating="5/10"
                        />
                    </li>

                    <li className={classes.StoryListItem}>
                        <Story
                            title="Story 2"
                            description="This is a description."
                            genreTags={['romance', 'horror']}
                            author="Frank Herbert"
                            publicationDate="05/03/1988"
                            rating="5/10"
                        />
                    </li>

                </ul>



            </div>
        );
    }
}

export default StoryList;