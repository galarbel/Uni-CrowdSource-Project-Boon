import * as types from "../constants/actionTypes";
import initialState from './initialState';

export default function loginReducer(state = initialState.loggedIn , action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            if (!state && action.data.data.login) {
                localStorage.setItem("userDetails", JSON.stringify(action.data.data));
                let currentUrl = window.location.href;
                window.location = currentUrl.replace("login","catalog");
            }
            return action.data.data.login;

        default:
            return state;
    }
}
