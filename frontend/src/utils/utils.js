import { getCars, addAuth, setLoading, selectCar } from '../actions/actions';
import store from '../store/index';

export const dashLink = 'http://localhost:8000/api/';
export const listLink = 'http://localhost:8000/api/list/';

export const getInitCars = (link) => {
    store.dispatch(setLoading());
    fetch(link)
    .then(res => res.json())
    .then(result => store.dispatch(getCars(result)));
}

export const getCar = (id) => {
    store.dispatch(setLoading());
    fetch(dashLink+id)
    .then(res => res.json())
    .then(result => store.dispatch(selectCar(result)));
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

export const range = (start, end) => {
    return Array.from(Array(end - start + 1).keys(), x => x + start)
}