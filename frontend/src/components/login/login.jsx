import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { push, goBack } from 'react-router-redux';
import store from '../../store/index';
import * as utils from '../../utils/utils.js';
import Popup from 'react-popup';
import './popup.css';

class ConnectedLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.submit = this.submit.bind(this);
    }

    changeUsername(event) {
        this.setState({
            username: event.target.value
        });
    };

    changePassword(event) {
        this.setState({
            password: event.target.value
        });
    };

    submit(event) {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        utils.getToken(username, password)
        .then(res => {
            if(res === 'Success') {
                store.dispatch(push(`list`));
            } else if( res === 'Wrong credentials') {
                this.setState({
                    username: '',
                    password: ''
                })
                Popup.alert('Wrong credentials');
            }
        })
    }

    render() {
        return (
            <form>
                <Popup />
                <FormGroup controlId="username">
                    <ControlLabel>Please enter username</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.changeUsername}
                    />                    
                </FormGroup>
                <FormGroup controlId="password">
                    <ControlLabel>Please enter password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.changePassword}
                    />
                </FormGroup>
                <Button type="submit" onClick={this.submit}>Submit</Button>
            </form>
        )
    };

};

const Login = connect()(ConnectedLogin);

export default Login;