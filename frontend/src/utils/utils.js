import { getCars, addAuth } from '../actions/actions';
import store from '../store/index';

export const getInitCars = () => {
    fetch('http://localhost:8000/api/')
    .then(res => res.json())
    .then(cars => store.dispatch(getCars(cars)));
}

export const getToken = (username, password) => {
    const credStorage = localStorage;

    return fetch('http://localhost:8000/api-auth/', {
            body: JSON.stringify({ 'username': username, 'password': password }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(res => res.json())
        .then(result => {
            if(result.token) {
                store.dispatch(addAuth(result.token, username));
                credStorage.setItem('username', username);
                credStorage.setItem('token', result.token);

                return 'Success'
            } else {
                return 'Wrong credentials';
            }
        })
        .catch(e => console.log(`utils.getToken: ${e.massage}`));
}