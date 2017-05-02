import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function ajaxErrorReducer(state = initialState.ajaxError, action) {
    switch (action.type) {
        case types.AJAX_CALL_ERROR:
            if (!state) {
                return action.error && action.error.message ? action.error.message : "Unknown Error Occurred";
            }
            return state;

        case types.CLEAR_ERRORS:
            return null;

        default:
            return state;
    }
}
