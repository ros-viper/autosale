import React, { Component } from 'react';
import { selectCar, setLoading } from '../../actions/actions';
import { push } from 'react-router-redux';
import { connect } from "react-redux";
import store from '../../store/index';
import ListCar from '../listCar/listCar';
import * as utils from '../../utils/utils.js';
import ReactLoading from 'react-loading';
import './list.css';


const mapStateToProps = state => {
    return {
        cars: state.rootReducer.cars,
        loading: state.rootReducer.loading
    };
};

const mapDispatchToProps = {
    selectCar,
    setLoading
}

class ConnectedList extends Component {
    constructor(props) {
        super(props)

        this.selectCar = this.selectCar.bind(this);
    }

    componentWillMount() {
        this.props.setLoading();
        utils.getInitCars(utils.listLink);
    }

    selectCar(event) {
        const car_id = parseInt(event.target.getAttribute('car_id'));
        const car = this.props.cars.find(car => car.id === car_id);
        this.props.selectCar(car);
        store.dispatch(push(`/car/${car_id}`));
    }

    render() {
        if (this.props.loading) {
            return <ReactLoading className="busy wrapper" type="spinningBubbles" color="grey" height={64} />
        }
        return (
            this.props.cars.map(car => (
                <ListCar key={car.id} car={car} selectCar={this.selectCar} />
            ))
        )
    };
};

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;