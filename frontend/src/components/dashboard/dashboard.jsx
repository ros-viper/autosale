import React, { Component } from 'react';
import { selectCar, setLoading } from '../../actions/actions';
import { push } from 'react-router-redux';
import { connect } from "react-redux";
import store from '../../store/index';
import * as utils from '../../utils/utils.js';
import ListCar from '../listCar/listCar';
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate';
import './dashboard.css';


const mapStateToProps = state => {
    return {
        cars: state.rootReducer.cars,
        loading: state.rootReducer.loading,
        current_page: state.rootReducer.current_page,
        pages_count: state.rootReducer.pages_count
    };
};

const mapDispatchToProps = {
    selectCar,
    setLoading
}

class ConnectedDashboard extends Component{
    constructor(props) {
        super(props)

        this.selectCar = this.selectCar.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentWillMount() {
        this.props.setLoading();
        utils.getInitCars(utils.dashLink);
    }

    selectCar(event) {
        const car_id = parseInt(event.target.getAttribute('car_id'));
        const car = this.props.cars.find(car => car.id === car_id);
        this.props.selectCar(car);
        store.dispatch(push(`/car/${car_id}`));
    }

    changePage(event) {        
        utils.getInitCars("http://localhost:8000/api/?page=" + (event.selected+1));
    }

    render() {
        if (this.props.loading) {
            return <ReactLoading className="busy wrapper" type="bubbles" color="grey" height={64} />
        }
        return(
            <div className="main">
                {this.props.cars.map(car => (
                    <ListCar key={car.id} car={car} selectCar={this.selectCar} />
                ))}
                <ReactPaginate  previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={<a href="">...</a>}
                                breakClassName={"break-me"}
                                pageCount={this.props.pages_count}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.changePage}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                                forcePage={this.props.current_page-1}
                />
            </div>
        )
    }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(ConnectedDashboard);

export default Dashboard;