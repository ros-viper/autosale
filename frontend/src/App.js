import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Header from './components/header/header';
import Userbar from './components/userbar/userbar';
import List from './components/list/list';
import Login from './components/login/login';
import Car from './components/car/car';
import store from './store/index';
import * as utils from './utils/utils.js';
import './App.css';

const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {

  componentDidMount() {
    utils.getInitCars();
  }

  render() {
    return (
      <Grid>
        <Header />
        <Userbar />
        <Router history={history}>
          <Route path="/list" exact component={List} />
          <Route path="/car/:id" exact component={Car} />
          <Route path="/login" exact component={Login} />
        </Router>
      </Grid>
    );
  }
}

export default App;
