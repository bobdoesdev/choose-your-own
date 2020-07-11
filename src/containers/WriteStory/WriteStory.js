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
            isStoryDetails: true,
            isIntro: false,
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
                    required: true,
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

    componentDidMount(){
        console.log('component mounted');
    }

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

        const stage = Object.keys(this.state.stage).find(key => this.state.stage[key] === true);
        const formData = {};

        if(stage === 'isIntro' || stage === 'isChoice'){
            formData['choices'] = [];
        }

        for(let formElId in this.state[formName]){
            if( formElId  === 'genreTags'){
                formData[formElId] = this.state[formName][formElId].value.split(', ');
                continue;
            }

            if( formElId.includes('choice') ){
                if(this.state[formName][formElId].value !== ''){
                    formData['choices'].push({
                        choice: this.state[formName][formElId].value,
                        sectionId: uuid()
                    });
                }
                continue;
            }

            formData[formElId] = this.state[formName][formElId].value;

        }

        //if is storydetails, it's a new story, create storyId to be returned and used in state later
        let storyData = {};
        if(stage === 'isStoryDetails'){
            const id = uuid();
            storyData = {
                ...formData,
                author: 'Alexander Hamilton',
                datePublished: Date.now()
            }
            console.log(storyData);
            axios.put('/stories/'+id+'.json', storyData)
            .then( response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }

        if(stage === 'isIntro'){
            // then add a section with matching id

            // for each choice, generate a new section that will be filled with data later
            const introId = uuid();
            axios.put('/sections/'+introId+'.json', formData)
            .then( response => {

                //temp story id atm
                axios.patch('/stories/d2f26b7b-a2ee-456f-843f-80b3d7e49fc1).json', {introId: introId})
                .then( response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            })
            .then(response => {
                formData.choices.forEach( choice  => {
                    console.log('sectionID: ', choice.sectionId);
                    axios.put('/sections/'+choice.sectionId+'.json', {content: '', choices: []})
                    .then( response => {
                        console.log(response);
                    })
                    .catch( error => {
                        console.log(error);
                    })
                });
            })
            .catch(error => {
                console.log(error);
            });

            // axios.get('/stories.json?orderBy="storyId"&equalTo="sdfsdfkj345459dfg"')
            // .then( response => {
            //     console.log(response);
            // })
            // .catch( error => {
            //     console.log(error);
            // })


        }

        // if(stage === 'isChoice'){
        // }

        //on form submission, add a link for each choice to go and add the content for that. when this is clicked, submit

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

        const oldInputs = {...this.state[formName]};

        if(input){
            const newInput = {
                [name]: JSON.parse(JSON.stringify(oldInputs[input]))
            };
            newInput[name].elementConfig.label = '';
            newInput[name].value = '';
            const inputs = { ...oldInputs, ...newInput};
            this.setState(
                {
                    [formName]: inputs
                }
            );

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