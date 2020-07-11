import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.module.css';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';

class Layout extends Component{

    state = {
        sidebarOpen: false
    };

    sidebarToggleHandler = () => {
        this.setState( (prevState) => {
            return{
                sidebarOpen: !prevState.sidebarOpen
            }
        });
    }

    sidebarClosedHandler = () => {
        this.setState({
            sidebarOpen: false
        });
    }


    render(){
        return (
            <>
                <Navbar toggle={this.sidebarToggleHandler} isAuth={this.props.isAuthenticated}/>
                <Sidebar open={this.state.sidebarOpen} closeHandler={this.sidebarClosedHandler} isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}


const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);