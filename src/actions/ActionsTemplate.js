import * as types from '../constants/actionTypes';
import api from '../api/Api';
import {makeThunkCall} from './ActionsUtils';

export function getSomeDataSuccess(data) {
    return { type: types.SOME_TYPE, data};
}

export function getSomeData() {
    return makeThunkCall( api.getSomeData, getSomeDataSuccess);
}
