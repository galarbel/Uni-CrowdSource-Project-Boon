import {combineReducers} from "redux";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import loggedIn from "./loginReducer";
import ajaxError from "./ajaxErrorReducer";

const rootReducer = combineReducers({
    ajaxCallsInProgress,
    ajaxError,
    loggedIn
});

export default rootReducer;
