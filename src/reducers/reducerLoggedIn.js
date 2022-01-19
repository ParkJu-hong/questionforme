import initalState from './initalState'
export const reducerLoggedIn = (state = initalState, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return Object.assign({}, state, { isLoggedIn: true });
        case 'LOG_OUT':
            return Object.assign({}, state, { isLoggedIn: false });
        case 'SET_USER_OBJ':
            return Object.assign({}, state, { userObj: action.payload.userObj})
        default:
            return state;
    }
}