import React, {Component} from 'react';
import axios from '../../axios';
import classes from './Story.module.css';

class Story extends Component{

    state = {
        title: null,
        chapters: null,
        author: null,
        id: 'sdfsdsdfklk3234234234sdsdfsdf',
        genreTags: null,
        rating: null,
        randomOther: null
    };

    componentDidMount(){
        axios.get('/stories/'+ this.state.id +'.json')
        .then( response => {
            const newState = {...this.state};

            for(let storyKey in response.data){
                // console.log(storyKey);
                if(newState.hasOwnProperty(storyKey)){
                    newState[storyKey] = response.data[storyKey];
                }
            }

            this.setState({
                ...newState
            });


        })
        .catch( error => {
            console.log(error);
        });
    }

    componentDidUpdate (){
        console.log(this.state);
    }

    render(){
        return (
            <div className={classes.Story}>

                <div className={classes.Content}>
                    <h1 className={classes.Title}>{this.state.title}</h1>
                    <h3 className={classes.Subtitle}>Chapter 1: The Beginning</h3>

                    <hr></hr>

                    <p>Once upon a time, in a land far, far away, there lived a catcher who was obssessed with rye.</p>
                    <p>I'm baby taxidermy wolf flexitarian kombucha lyft raw denim pork belly next level activated charcoal health goth snackwave. Shaman pok pok ramps salvia. Cliche pork belly 3 wolf moon squid church-key pitchfork cronut meditation seitan plaid pinterest shaman banjo. Locavore pinterest brooklyn glossier cliche viral lyft, small batch vegan microdosing la croix. Mlkshk poutine pickled lo-fi. Distillery tacos wayfarers pitchfork stumptown PBRB vinyl bitters.</p>
                    <p>Vaporware banjo farm-to-table marfa beard. Mixtape glossier raclette tumblr typewriter cornhole before they sold out. PBRB air plant keffiyeh semiotics enamel pin. Adaptogen pinterest listicle fam tumeric. Wolf man braid 3 wolf moon edison bulb thundercats plaid twee subway tile pop-up, cray hoodie. Actually vape raclette banjo cliche post-ironic echo park copper mug gochujang meh wolf taiyaki cardigan.</p>
                    <p>Your back is against the wall. Brendan's ugly mug is inches from your own. You can smell the stench of his breath, hot on your face, and you want to vomit, but the knife he is tickling your chin with stops you from moving. You flinch as he drags it across your skin. The feeling of the blade on your flesh matches the one crawling up your spine: ice cold.</p>
                    <p>"Well?" he asks. "What'll it be, cupcake?"</p>
                </div>

                <div className={classes.Choices}>
                    <h4 className={classes.Highlight}>What do you do?</h4>
                    <div className={classes.Choice}>
                        <p>Tell him to blow it out his ass!</p>
                    </div>

                    <div className={classes.Choice}>
                        <p>Apologize for offending him and offer to clean his bunk for a month.</p>
                    </div>

                    <div className={classes.Choice}>
                        <p>Swipe the knife out of his hands and kick him in the balls.</p>
                    </div>


                    <div className={classes.Save}>
                        <p>Save Progress</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Story;

