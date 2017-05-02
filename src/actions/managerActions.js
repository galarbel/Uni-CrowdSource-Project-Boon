import * as types from '../constants/actionTypes';
import api from '../api/Api';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function getManagerPendingAbsencesSuccess(managerPendingAbsences) {
    return { type: types.GET_MANAGER_PENDING_SUCCESS, managerPendingAbsences };
}

export function getManagerPendingAbsences() {
    return makeThunkCall(api.getManagerPendingAbsences, getManagerPendingAbsencesSuccess);
}

function makeThunkCall(apiFunction, successFunction, errorFunction) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return apiFunction().then(result => {
            dispatch(successFunction(result));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            if (errorFunction && typeof  errorFunction == "function") {
                errorFunction();
            } else {
                throw(error);
            }
        });
    };
}


