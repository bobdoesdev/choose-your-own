import React from 'react';
import {Route, withRouter} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout/Layout';
import StoryList from './containers/StoryList/StoryList';
import Search from './containers/Search/Search';
import Story from './containers/Story/Story';

function App() {
  return (
    <Layout>
      <Route path="/" exact component={StoryList}/>
      <Route path="/search" exact component={Search}/>
      <Route path="/stories/" component={Story}/>
    </Layout>
  );
}

export default withRouter(App);
