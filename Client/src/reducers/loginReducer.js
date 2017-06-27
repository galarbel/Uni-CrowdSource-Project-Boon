import * as types from "../constants/actionTypes";
import initialState from './initialState';

export default function loginReducer(state = initialState.loggedIn , action) {
    let login = false;
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            if (!state && action.data.user_id > 0) {
                login = true;
                localStorage.setItem("userDetails", JSON.stringify(action.data));
                let currentUrl = window.location.href;
                if (currentUrl.indexOf("login") >= 0) {
                    window.location = currentUrl.replace("login","catalog");
                }
            }
            return login;

        default:
            return state;
    }
}
