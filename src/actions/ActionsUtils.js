import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function makeThunkCall(apiFunction, successFunction, errorFunction) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return apiFunction().then(result => {
            dispatch(successFunction(result));
        }).catch(error => {
            dispatch(ajaxCallError());
            if (errorFunction && typeof  errorFunction == "function") {
                errorFunction();
            } else {
                throw(error);
            }
        });
    };
}
