import * as types from '../constants/actionTypes';
import api from '../api/Api';
import {makeThunkCall} from './ActionsUtils';

export function doLoginSuccess(data) {
    return { type: types.LOGIN_SUCCESS, data};
}

export function doLogin(params) {
    return makeThunkCall( () => { return api.doLogin(params);}, doLoginSuccess);
}
