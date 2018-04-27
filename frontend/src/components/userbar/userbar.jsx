import React, { Component } from 'react';
import { Navbar, Nav, MenuItem, NavItem, NavDropdown } from 'react-bootstrap';
import { addAuth, removeAuth } from '../../actions/actions';
import { connect } from 'react-redux';
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
    }

    render() {
        return(
            <Navbar>
                <Navbar.Brand>
                    <a href="/">Autosale</a>
                </Navbar.Brand>
                <Nav style={{marginRight: 15}} pullRight>
                    {this.props.token ? <Logged logout={this.logOut} username={this.props.username} /> : <NotLogged />}
                </Nav>
            </Navbar>
        );
    };
};

function Logged(props) {
    return (
        <NavDropdown eventKey={3} title={`Hello, ${props.username}`} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
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