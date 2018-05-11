import { SELECT_CAR, GET_CARS, ADD_AUTH, REMOVE_AUTH, SET_LOADING } from '../actions/action-types';

const initialState = {
    cars: [],
    selectedCar: null,
    token: null,
    username: null,
    pages_count: 1,
    prev_page: null,
    next_page: null,
    loading: true
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