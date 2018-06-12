import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Header from './components/header/header';
import Userbar from './components/userbar/userbar';
import List from './components/list/list';
import Login from './components/login/login';
import DetailCar from './components/detailCar/detailCar';
import Dashboard from './components/dashboard/dashboard';
import CreateListing from './components/createListing/createListing';
import store from './store/index';
import './App.css';

const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {

  render() {
    return (
      <Grid>
        <Header />
        <Userbar />
        <Router history={history}>
          <Route path="/" exact component={Dashboard} />
          <Route path="/list" exact component={List} />
          <Route path="/car/:id" exact component={DetailCar} />
          <Route path="/login" exact component={Login} />
          <Route path="/create" component={CreateListing} />
        </Router>
      </Grid>
    );
  }
}

export default App;
