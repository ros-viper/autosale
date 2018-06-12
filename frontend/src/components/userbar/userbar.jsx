import React, { Component } from 'react';
import { Navbar, Nav, MenuItem, NavItem, NavDropdown } from 'react-bootstrap';
import { addAuth, removeAuth } from '../../actions/actions';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import store from '../../store/index';

const mapStateToProps = state => {
    return {
        token: state.rootReducer.token,
        username: state.rootReducer.username
    };
};

class ConnectedUserbar extends Component {
    constructor(props) {
        super(props)

        this.logOut = this.logOut.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('token') && !this.props.token) {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            store.dispatch(addAuth(token, username));
        }
    }

    logOut() {
        store.dispatch(removeAuth());
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        store.dispatch(push('/'));
    }

    redirect(event) {
        event.preventDefault();
        store.dispatch(push(event.target.getAttribute('location')));
    }

    render() {
        return(
            <Navbar>
                <Navbar.Brand style={{cursor: "pointer"}}>
                    <a href="" location="/" onClick={this.redirect}>Autosale</a>                                                           
                </Navbar.Brand>
                <Nav>
                    <NavItem location="/list" onClick={this.redirect}>List</NavItem>                    
                </Nav>
                <Nav style={{marginRight: 15}} pullRight>
                    {this.props.token ? <Logged logout={this.logOut} username={this.props.username} redirect={this.redirect} /> : <NotLogged />}
                </Nav>
            </Navbar>
        );
    };
};

function Logged(props) {
    return (
        <NavDropdown eventKey={3} title={`Hello, ${props.username}`} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1} location="/create" onClick={props.redirect}>Sell car</MenuItem>
            <MenuItem eventKey={3.2}>My deals</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4} onClick={props.logout}>Log Out</MenuItem>
        </NavDropdown>
    )
}

function NotLogged() {
    return (
        <NavItem eventKey={1} href="/login">
            Log In
        </NavItem>
    )
}

const Userbar = connect(mapStateToProps)(ConnectedUserbar);

export default Userbar;