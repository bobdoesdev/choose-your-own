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
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        // orderForm: {
        //     name: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: 'Your Name'
        //         },
        //         value: '',
        //         validation: {
        //             required: true,
        //         },
        //         valid: false,
        //         touched: false
        //     },
        //     street: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: 'Street'
        //         },
        //         value: '',
        //         validation: {
        //             required: true,
        //         },
        //         valid: false,
        //         touched: false
        //     },
        //     zipCode: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: 'Zip Code'
        //         },
        //         value: '',
        //         validation: {
        //             required: true,
        //             minLength: 5,
        //             maxLength: 5,
        //         },
        //         valid: false,
        //         touched: false
        //     },
        //     country: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: 'Country'
        //         },
        //         value: '',
        //         validation: {
        //             required: true,
        //         },
        //         valid: false,
        //         touched: false
        //     },
        //     email: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'email',
        //             placeholder: 'Email Address'
        //         },
        //         value: '',
        //         validation: {
        //             required: true,
        //         },
        //         valid: false,
        //         touched: false
        //     },
        //     deliveryMethod: {
        //         elementType: 'select',
        //         elementConfig: {
        //             options: [
        //                 {
        //                     value: 'fastest',
        //                     displayValue: 'Fastest'
        //                 },
        //                 {
        //                     value: 'cheapest',
        //                     displayValue: 'Cheapest'
        //                 },
        //             ],
        //         },
        //         value: '',
        //         validation: {},
        //         valid: true
        //     },
        // },
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

    storySubmitHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for(let formElId in this.state.storyDetailsForm){
            formData[formElId] = this.state.storyDetailsForm[formElId].value;
        }
        // formData.id = uuid();
        const stage = Object.keys(this.state.stage).find(key => this.state.stage[key] === true);

        //stage should determine which api endpoint it's being sent to
        //change type of id to add to formdata depending on if intro, storydetails or choice
        //if is storydetails, it's a new story
        //if its intro, needs story id

        let storyData = {};
        if(stage === 'isStoryDetails'){
            storyData = {
                ...formData,
                introId: uuid(),
                storyId: uuid(),
                author: 'Alexander Hamilton',
                datePublished: Date.now()
            }
        }

        console.log(storyData);

        axios.post('/stories.json', storyData)
        .then( response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });


    }

    inputChangedHandler = (event, inputId) => {

        const updatedStoryDetailsFormElement = updateObject(this.state.storyDetailsForm[inputId], {
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.storyDetailsForm[inputId].validation),
            touch: true
        });

        const updatedStoryDetailsForm = updateObject(this.state.storyDetailsForm, {
            [inputId]: updatedStoryDetailsFormElement
        } );

        let formIsValid = true;
        for(let inputIdentifier in updatedStoryDetailsForm){
            formIsValid = updatedStoryDetailsForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            storyDetailsForm: updatedStoryDetailsForm,
            formIsValid: formIsValid
        });
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.storyDetailsForm){
            formElementsArray.push({
                id: key,
                config: this.state.storyDetailsForm[key],
            });
        }

        let form = (<form onSubmit={this.storySubmitHandler}>
            {formElementsArray.map( formElement => {
                return <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id )}
                    />
                })
            }
            <Button
                btnType="Save"
                disabled={!this.state.formIsValid}
            >
                Save and Continue
            </Button>
        </form>);
        if(this.props.loading){
            form = <Spinner />;
        }
        return(
            <div className={classes.WriteStory}>
                <h2>Your story starts here</h2>
                {form}
            </div>
        );
    }
}

export default WriteStory;