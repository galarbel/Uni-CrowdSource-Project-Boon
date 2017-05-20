import * as types from "../constants/actionTypes";
import initialState from './initialState';

export default function loginReducer(state = initialState.loggedIn , action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            if (!state && action.data.login) {
                localStorage.setItem("userDetails", JSON.stringify(action.data));
                let currentUrl = window.location.href;
                if (currentUrl.indexOf("login") >= 0) {
                    window.location = currentUrl.replace("login","catalog");
                }
            }
            return action.data.login;

        default:
            return state;
    }
}
