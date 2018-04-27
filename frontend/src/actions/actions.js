import { SELECT_CAR, GET_CARS, ADD_AUTH, REMOVE_AUTH } from './action-types';

export const selectCar = car => ({
    type: SELECT_CAR,
    payload: car
});

export const getCars = cars => ({
    type: GET_CARS,
    payload: cars
});

export const addAuth = (token, username) => ({
    type: ADD_AUTH,    
    token: token,
    username: username
});

export const removeAuth = () => ({
    type: REMOVE_AUTH,
    payload: null
});



