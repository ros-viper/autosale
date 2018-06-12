import { SELECT_CAR, GET_CARS, ADD_AUTH, REMOVE_AUTH, SET_LOADING } from '../actions/action-types';
import * as utils from '../utils/utils.js';

const years = utils.range(1900, 2020);

const CONFIG = {
    'transmission': ['Manual', 'Automatic', ' Variator', 'Robotized'],
    'fuels': ['Petrol', 'Diesel', 'LPG', 'Electric', 'Hybrid'],
    'drives': ['Front', 'Rear', 'Full'],
    'bodyTypes': ['Convertible', 'Coupe', 'Hatchback', 'Sedan', 'Station Wagon', 'RV/SUV', 'Ute', 'Van'],
    'years': years
}

const initialState = {
    cars: [],
    selectedCar: null,
    token: null,
    username: null,
    pages_count: 1,
    prev_page: null,
    next_page: null,
    current_page: 1,
    loading: true,
    makes: null,
    config: CONFIG
}

const rootReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    // const newSelectedCar = Object.assign({}, state.selectedCar);

    switch (action.type) {
        case SELECT_CAR:
            newState.selectedCar = action.payload;
            return newState;
        case GET_CARS:
            newState.cars = action.payload.cars;
            newState.pages_count = action.payload.pages;
            newState.prev_page = action.payload.links.previous;
            newState.next_page = action.payload.links.next;
            newState.current_page = action.payload.current_page;
            newState.loading = false;
            return newState;
        case ADD_AUTH:
            newState.token = action.token;
            newState.username = action.username;
            return newState;
        case REMOVE_AUTH:
            newState.token = null;
            newState.username = null;
            return newState;
        case SET_LOADING:
            newState.loading = true;
            return newState;
        default:
            return state;
    }    
};

export default rootReducer;