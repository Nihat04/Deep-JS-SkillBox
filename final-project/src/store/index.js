import { createStore } from 'redux';

const defaultState = {
    user: { ...JSON.parse(localStorage.getItem('user')) },
    token: localStorage.getItem('token'),
};

export const UPDATE = 'update';
export const UPDATE_USER = 'updateUser';
export const UPDATE_TOKEN = 'updateToken';

function reducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case UPDATE_USER:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, user: action.payload };
        case UPDATE_TOKEN:
            localStorage.setItem('token', action.payload);
            return { ...state, token: action.payload };
        default:
            return state;
    }
}

export const store = createStore(reducer);
