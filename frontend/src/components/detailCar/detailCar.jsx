import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'react-bootstrap';
import * as utils from '../../utils/utils.js';
import ReactLoading from 'react-loading';
import store from '../../store/index';

const mapStateToProps = state => {
    return {
        selectedCar: state.rootReducer.selectedCar,
        cars: state.rootReducer.cars,
        loading: state.rootReducer.loading
    };
};

class ConnectedCar extends Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {
        if(!this.props.selectedCar) {
            const path = this.props.location.pathname;
            const car_id = parseInt(path.substring(path.lastIndexOf('/')+1));
            utils.getCar(car_id+'/');
        }
    }

    render() {
        const car = this.props.selectedCar;
        if (!car) {
            return <ReactLoading className="busy wrapper" type="bubbles" color="grey" height={64} />;
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

const DetailCar = connect(mapStateToProps)(ConnectedCar);

export default DetailCar;