import React, { Component } from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

const ListCar = (props) => {
    const car = props.car;    
    return (
        <Row>
            <Col lg={3} md={4}>                    
                <img src={require('../../images/no-car.jpeg')} alt="" />
            </Col>
            <Col lg={4} md={4}>
                <a className="link details" car_id={car.id} onClick={props.selectCar}>{car.title} - {car.year}</a>
                <h3 className="price">${car.price}</h3>
                <ul className="unstyle characteristic">
                    <li className="char item"><img className="icon speed" src={require('../../images/icon-speedometer.png')} />&nbsp;{car.odometer} km</li>
                    <li className="char item"><img className="icon location" src={require('../../images/icon-location.png')} />&nbsp;{car.location}</li>
                    <li className="char item"><img className="icon fuel" src={require('../../images/icon-fuel.png')} />&nbsp;{car.fuel}, {car.engine_size} L.</li>
                    <li className="char item"><img className="icon gear" src={require('../../images/icon-gear-res.png')} />&nbsp;{car.transmission}</li>
                </ul>
            </Col>
        </Row>
    )
}

export default ListCar;