import * as types from '../constants/actionTypes';
import api from '../api/Api';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function getAbsenceTypesSuccess(absenceTypes) {
    return { type: types.GET_ABSENCE_TYPES_SUCCESS, absenceTypes};
}

export function getAbsenceRelatedInfoSuccess(absenceRelatedInfo) {
    return { type: types.GET_ABSENCE_RELATED_INFO_SUCCESS, absenceRelatedInfo};
}

export function getAbsencesSummarySuccess(absencesSummary) {
    return { type: types.GET_ABSENCES_SUMMARY_SUCCESS, absencesSummary};
}

export function getMyAbsencesSuccess(myAbsences) {
    return { type: types.GET_MY_ABSENCE_SUCCESS, myAbsences };
}

export function getAbsenceRequestSuccess(absenceRequest) {
    return { type: types.GET_ABSENCE_REQUEST_SUCCESS, absenceRequest};
}

export function getAbsenceTypes() {
    return makeThunkCall( api.getAbsenceTypes, getAbsenceTypesSuccess);
}

export function getAbsenceRelatedInfo() {
    return makeThunkCall( api.getAbsenceRelatedInfo, getAbsenceRelatedInfoSuccess);
}

export function getAbsencesSummary() {
    return makeThunkCall( api.getAbsencesSummary, getAbsencesSummarySuccess);
}

export function getMyAbsences() {
    return makeThunkCall( api.getMyAbsences, getMyAbsencesSuccess);
}

export function getAbsenceRequest() {
    return makeThunkCall( api.getRequestDetails, getAbsenceRequestSuccess);
}

function makeThunkCall(apiFunction, successFunction, errorFunction) {
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
