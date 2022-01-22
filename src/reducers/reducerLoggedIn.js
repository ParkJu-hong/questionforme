import initalState from './initalState'
export const reducerLoggedIn = (state = initalState, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return Object.assign({}, state, { isLoggedIn: true });
        case 'LOG_OUT':
            return Object.assign({}, state, { isLoggedIn: false });
        case 'SET_USER_OBJ':
            return Object.assign({}, state, { userObj: action.payload.userObj });
        case "CHANGE_CALENDER":
            return Object.assign({}, state, { calenderSelected: "" });
        case "CHANGE_CALENDER_NOT_NULL":
            return Object.assign({}, state, { calenderSelected: action.payload.calenderSelected});
        default:
            return state;
    }
}