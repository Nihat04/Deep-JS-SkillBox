import { createStore } from 'redux';

const defaultState = {
    user: { ...JSON.parse(localStorage.getItem('user')) },
};

export const UPDATE_USER = 'updateUser';

function reducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

export const store = createStore(reducer);
