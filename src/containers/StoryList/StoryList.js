import React, {Component} from 'react';
import axios from '../../axios';

import classes from './StoryList.module.css';
import Story from './Story/Story';

class StoryList extends Component{

    state = {
        stories: []
    };

    componentDidMount(){
        axios.get('/stories.json?')
        .then( response => {
            const stories = [];
            for(let key in response.data){
                stories.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({stories: stories});
        })
        .catch( error => {
            console.log(error);
        });
    }

    render(){

        const stories = this.state.stories.map( story =>{
            return (
                <li className={classes.StoryListItem} key={story.id}>
                <Story
                    title={story.title}
                    description={story.description}
                    // genreTags={story.genreTags.join( ', ')}
                    author={story.author}
                    publicationDate={story.datePublished}
                    rating={story.rating}
                    id={story.id}
                />
                </li>
            );
        });

        return (
            <div className={classes.StoryListWrapper}>
                <h1>List Title</h1>

                <ul className={classes.StoryList}>
                   {stories}
                </ul>
            </div>
        );
    }
}

export default StoryList;