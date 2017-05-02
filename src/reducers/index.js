import {combineReducers} from "redux";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import deviceProfile from "./deviceProfileReducer";
import employeeInfo from "./employeeInfoReducer";
import managerInfo from "./managerInfoReducer";
import ajaxError from "./ajaxErrorReducer";

const rootReducer = combineReducers({
    ajaxCallsInProgress,
    ajaxError,
    deviceProfile,
    employeeInfo,
    managerInfo,
});

export default rootReducer;
