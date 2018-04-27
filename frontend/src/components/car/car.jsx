import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'react-bootstrap';

const mapStateToProps = state => {
    return {
        selectedCar: state.rootReducer.selectedCar
    };
};

class ConnectedCar extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const car = this.props.selectedCar;
        if (!car) {
            return null;
        }
        return ([
            <Row>
                <Col lg={8} md={6} sm={4}>
                    <h2>{car.make} {car.model} {car.year}</h2>
                </Col>
            </Row>,
            <Row>
                <Col lg={8} md={6} sm={4}>
                    <img src={require('../../images/no-car.jpeg')} alt="" />
                </Col>
            </Row>,
        ]);
    };
};

const Car = connect(mapStateToProps)(ConnectedCar);

export default Car;