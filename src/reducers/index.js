import {combineReducers} from "redux";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import template from "./templateReducer";
import ajaxError from "./ajaxErrorReducer";

const rootReducer = combineReducers({
    ajaxCallsInProgress,
    ajaxError,
    template
});

export default rootReducer;
