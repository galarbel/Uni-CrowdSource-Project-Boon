import * as types from "../constants/actionTypes";
import initialState from './initialState';

export default function managerInfoReducer(state = initialState.managerInfo , action) {
    switch (action.type) {
        case types.GET_MANAGER_PENDING_SUCCESS:
            return Object.assign({}, state, {managerPendingAbsences : action.managerPendingAbsences });

        default:
            return state;
    }
}
