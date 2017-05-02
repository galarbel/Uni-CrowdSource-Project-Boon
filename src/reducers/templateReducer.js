import * as types from "../constants/actionTypes";
import initialState from './initialState';

export default function employeeInfoReducer(state = initialState.data , action) {
    switch (action.type) {
        case types.SOME_TYPE:
            return Object.assign({}, state, { someData: action.someData } );

        default:
            return state;
    }
}
