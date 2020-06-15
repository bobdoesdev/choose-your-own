import React, {Component} from 'react';
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
                <Navbar toggle={this.sidebarToggleHandler} />
                <Sidebar open={this.state.sidebarOpen} closeHandler={this.sidebarClosedHandler}/>
                <main className={classes.Content}>
                    main content
                </main>
            </>
        );
    }
}

export default Layout;