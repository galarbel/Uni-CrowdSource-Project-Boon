import * as types from '../constants/actionTypes';
import api from '../api/Api';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function getCalculatedDaysSuccess(calculatedDays) {
    return { type: types.GET_CALCULATED_DAYS_SUCCESS, calculatedDays};
}

export function getCalculatedDays(formData) {
    return function(dispatch) {
        // dispatch(beginAjaxCall());
        return api.getCalculatedDays(formData).then(calculatedDays => {
            // dispatch(getCalculatedDaysSuccess(calculatedDays));
            return calculatedDays;
        }).catch(error => {
            // dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function createRequest(formData) {
    return function(dispatch) {
        return api.createRequest(formData).then(createdRequest => {
            return createdRequest;
        }).catch(error => {
            throw(error);
        });
    };
}
