import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import store from '../../store/index';
import { push } from 'react-router-redux';

class CreateListing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            make: null,
        }

        this.changeMake = this.changeMake.bind(this);
    }

    componentDidMount() {
        if (!store.getState().rootReducer.token) {
            store.dispatch(push('/login'));
        }
    }

    changeMake(event) {
        this.setState({
            make: event.target.value
        })
    }

    render() {
        return (
            <form>
                <FormGroup bsSize="small" controlId="carDetails">
                    <ControlLabel>Choose make</ControlLabel>
                    <FormControl type="text" value={this.state.make} onChange={this.changeMake}></FormControl>
                </FormGroup>
            </form>
        )
    }
}




export default CreateListing;