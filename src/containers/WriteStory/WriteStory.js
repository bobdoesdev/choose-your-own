import React, {Component} from 'react';
import { v4 as uuid } from 'uuid';
import axios from '../../axios';
import classes from './WriteStory.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject} from '../../shared/utility';

class WriteStory extends Component{

    state = {
        stage: {
            isStoryDetails: false,
            isIntro: true,
            isChoice: false,
        },
        storyDetailsForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Add a title for your story',
                    label: 'Title',
                    name: 'title'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Add a description for your story',
                    label: 'Description',
                    name: 'description'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            },
            genreTags: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Add genre tags for your story',
                    label: 'Genre Tags',
                    name: 'genreTags',
                    description: 'Add values seperated by a comma.'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            addAnother: false
        },

        storyIntroForm: {
            intro: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Add content for your story',
                    label: 'Intro',
                    name: 'intro',
                    rows: 10
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false,
            },
            choice: {
                elementType: 'text',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Add a choice',
                    label: 'Choices',
                    name: 'choices[]',
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false,
                addAnother: true,
            },

        },

        formIsValid: false
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    storySubmitHandler = (event, formName) => {
        event.preventDefault();

        const formData = {};
        for(let formElId in this.state[formName]){
            if( formElId  === 'genreTags'){
                formData[formElId] = this.state[formName][formElId].value.split(', ');
            } else{
                formData[formElId] = this.state[formName][formElId].value
            }

        }
        const stage = Object.keys(this.state.stage).find(key => this.state.stage[key] === true);

        //stage should determine which api endpoint it's being sent to
        //change type of id to add to formdata depending on if intro, storydetails or choice
        //if is storydetails, it's a new story, add story id
        //if its intro, needs story id

        let storyData = {};
        if(stage === 'isStoryDetails'){
            storyData = {
                ...formData,
                storyId: uuid(),
                author: 'Alexander Hamilton',
                datePublished: Date.now()
            }
            axios.post('/stories.json', storyData)
            .then( response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }

        if(stage === 'isIntro'){
            storyData = {
                ...formData,
            }

            console.log(storyData);
            //for each choice, generate a new section that will be filled with data later
            axios.post('/sections.json', storyData)
            .then( response => {
                //response should be name of newly created choice entry, add to intial story details so we know where the story starts
                console.log(response.data.name);
                //using temp story id since we don't have any user auth setup yet
                axios.patch('/stories/-MBWIauUxSsrxzRnWMqp.json', {introId: response.data.name})
                .then( response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            })
            .catch(error => {
                console.log(error);
            });

        }

        // if(stage === 'isChoice'){
        // }

    }

    addInputHandler = (event, formName) => {
        event.preventDefault();

        //make sure there is an input that allwos for this
        const input = Object.keys(this.state[formName]).find(key =>{
            return  this.state[formName][key].addAnother === true ;
        });

        //get a count for how many choices there are
        const choices = Object.keys(this.state[formName]).filter(key =>{
            return key.includes('choice');
        });
        const count = choices.length + 1;
        const name = 'choice_' + count;

        if(input){
            const newInput = {
                [name]: {...this.state[formName][input]}
            }
            const inputs = {...this.state[formName], ...newInput};
            this.setState(prevState => ({
                [formName]: inputs
            }));

        }
    }

    inputChangedHandler = (event, inputId, form) => {

        const updatedFormElement = updateObject(this.state[form][inputId], {
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state[form][inputId].validation),
            touch: true
        });

        const updatedForm = updateObject(this.state[form], {
            [inputId]: updatedFormElement
        } );

        let formIsValid = true;
        for(let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            [form]: updatedForm,
            formIsValid: formIsValid
        });
    }

    render(){

        console.log(this.state.storyIntroForm);
        const formElementsArray = [];
        let formName = '';
        let leadText = '';

        if(this.state.stage.isStoryDetails){
            leadText = 'Tell us about your story';
            formName = 'storyDetailsForm';
            for(let key in this.state.storyDetailsForm){
                formElementsArray.push({
                    id: key,
                    config: this.state.storyDetailsForm[key],
                });
            }
        }

        if(this.state.stage.isIntro){
            leadText = 'Your story starts here';
            formName = 'storyIntroForm';
            for(let key in this.state.storyIntroForm){
                formElementsArray.push({
                    id: key,
                    config: this.state.storyIntroForm[key],
                });
            }
        }

        if(this.state.stage.isChoice){
            leadText = 'Create a scenario and give us choices';
            formName = 'storyChoiceForm';
            for(let key in this.state.storyChoiceForm){
                formElementsArray.push({
                    id: key,
                    config: this.state.storyChoiceForm[key],
                });
            }
        }

        let form = (<form onSubmit={(event) => this.storySubmitHandler(event,formName)} >
            {formElementsArray.map( formElement => {
                return <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id, formName )}
                    />
                })
            }

            <Button
                btnType="AddChoice"
                clicked={(event) => this.addInputHandler(event, formName)}
            >
                Add Choice
            </Button>

            <Button
                btnType="Save"
                disabled={!this.state.formIsValid}

            >
                Save and Continue
            </Button>

            <Button
                btnType="Publish"
                disabled={!this.state.formIsValid}
            >
                Publish
            </Button>
        </form>);
        if(this.props.loading){
            form = <Spinner />;
        }
        return(
            <div className={classes.WriteStory}>
                <h2>{leadText}</h2>
                {form}
            </div>
        );
    }
}

export default WriteStory;