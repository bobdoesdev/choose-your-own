import React, {Component} from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';
import Layout from './hoc/Layout/Layout';
import StoryList from './containers/StoryList/StoryList';
import Search from './containers/Search/Search';
import Story from './containers/Story/Story';
import Profile from './containers/Profile/Profile';
import WriteStory from './containers/WriteStory/WriteStory';
import Logout from './containers/Auth/Logout/Logout';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';
import { render } from '@testing-library/react';

class  App extends Component{

  render(){
    let routes = (
      <Layout>
        <Route path="/" exact component={StoryList}/>
        <Route path="/search" exact component={Search}/>
        <Route path="/stories/" component={Story}/>
        <Route path="/auth" component={Auth}/>
      </Layout>
    )

    if( this.props.isAuthenticated ){
      routes = (
        <Layout>
          <Route path="/" exact component={StoryList}/>
          <Route path="/search" exact component={Search}/>
          <Route path="/stories/" component={Story}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/writestory" component={WriteStory}/>
          <Route path="/logout" component={Logout}/>
          <Redirect to="/" />
        </Layout>
      );
    }
    return (
      <div>
      {routes}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(App));
