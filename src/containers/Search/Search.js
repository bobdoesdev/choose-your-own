import React, {Component} from 'react';
import classes from './Search.module.css';
import SearchToggle from './SearchToggle/SearchToggle';

class Search extends Component{

    state = {
        searchIsOpen: false,
        filterTypes: [
            'genre',
            'author',
            'rating'
        ]
    };

    toggleSearch = () => {
        this.setState({
            searchIsOpen: false
        })
    }

    render(){

        let attachedClasses = [classes.Search, classes.Closed];

        if(this.state.searchIsOpen){
            attachedClasses = [classes.Search, classes.Open];
        }
        return (
            <div className={attachedClasses.join(' ')}>
                <SearchToggle toggle={this.toggleSearch}/>
                <h1 className={classes.Title}>Search</h1>
            </div>
        );
    }
}

export default Search;