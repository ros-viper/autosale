import React, { Component } from 'react';
import { selectCar } from '../../actions/actions';
import { push } from 'react-router-redux';
import { connect } from "react-redux";
import { Row, Col, Glyphicon } from 'react-bootstrap';
import store from '../../store/index';
import './list.css';


const mapStateToProps = state => {
    return {
        cars: state.rootReducer.cars
    };
};

const mapDispatchToProps = {
    selectCar,
}

class ConnectedList extends Component {
    constructor(props) {
        super(props)

        this.selectCar = this.selectCar.bind(this);
    }

    selectCar(event) {
        const car_id = parseInt(event.target.getAttribute('car_id'));
        const car = this.props.cars.find(car => car.id === car_id);
        this.props.selectCar(car);
        store.dispatch(push(`/car/${car_id}`));
    }

    render() {
        return (
            this.props.cars.map(car => (
                <Row key={car.id}>
                    <Col lg={3} md={4}>                    
                        <img src={require('../../images/no-car.jpeg')} alt="" />
                    </Col>
                    <Col lg={4} md={4}>
                        <a className="link details" car_id={car.id} onClick={this.selectCar}>{car.make} {car.model} - {car.year}</a>
                        <h3 className="price">${car.price}</h3>
                        <ul className="unstyle characteristic">
                            <li className="char item"><img className="icon speed" src={require('../../images/icon-speedometer.png')} />&nbsp;{car.odometer} km</li>
                            <li className="char item"><img className="icon location" src={require('../../images/icon-location.png')} />&nbsp;{car.location}</li>
                            <li className="char item"><img className="icon fuel" src={require('../../images/icon-fuel.png')} />&nbsp;{car.fuel}, {car.engine_size} L.</li>
                            <li className="char item"><img className="icon gear" src={require('../../images/icon-gear-res.png')} />&nbsp;{car.transmission}</li>
                        </ul>
                    </Col>
                </Row>
            ))
        )
    };
};

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;