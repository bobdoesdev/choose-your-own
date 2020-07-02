import React, {Component} from 'react';
import classes from './Profile.module.css';

class Profile extends Component{

    state = {

    };

    render(){
        return (
            <div className={classes.Profile}>
                <h1>User Profile</h1>

                <div className={classes.Section}>
                    <h3>Account Information</h3>
                    <p><strong>Username: </strong> bobadoo</p>
                    <p><strong>Email address: </strong> bobobrienpa@gmail.com</p>
                    <p><strong>Password: </strong> ********* <button>Change Password</button></p>
                </div>

                <div className={classes.Section}>
                    <h3>Author Information</h3>
                    <img src="https://via.placeholder.com/150" alt="Profile picture" />
                    <p><strong>Author handle (defaults to username): </strong> shewhowaits <button>Change Handle</button></p>
                    <p><strong>Bio: </strong> A love of the arts, shewhowaits is a budding storyteller who loves to give readers choice.</p>
                    <p><strong>Stories published: </strong> 3</p>
                    <p><strong>Highest rated: </strong> Once Upon a Midnight Gory</p>
                    <p><strong>Most read: </strong> To Mock a Killingbird</p>
                    <p><strong>Most published genre: </strong> paranormal romance</p>

                </div>

            </div>
        );
    }
}

export default Profile;