import { SELECT_CAR, GET_CARS, ADD_AUTH, REMOVE_AUTH } from '../actions/action-types';

const initialState = {
    cars: [],
    selectedCar: null,
    token: null,
    username: null
}

const rootReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    // const newSelectedCar = Object.assign({}, state.selectedCar);

    switch (action.type) {
        case SELECT_CAR:
            newState.selectedCar = action.payload;
            return newState;
        case GET_CARS:
            newState.cars = action.payload;
            return newState;
        case ADD_AUTH:
            newState.token = action.token;
            newState.username = action.username;
            return newState;
        case REMOVE_AUTH:
            newState.token = null;
            newState.username = null;
            return newState;
        default:
            return state;
    }    
};

export default rootReducer;