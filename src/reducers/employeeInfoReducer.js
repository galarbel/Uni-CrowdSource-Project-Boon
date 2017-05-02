import * as types from "../constants/actionTypes";
import initialState from './initialState';

export default function employeeInfoReducer(state = initialState.employeeInfo , action) {
    switch (action.type) {
        case types.GET_ABSENCE_TYPES_SUCCESS:
            return Object.assign({}, state, { absenceTypes: action.absenceTypes } );

        case types.GET_ABSENCE_RELATED_INFO_SUCCESS:
            return Object.assign({}, state, { absenceRelatedInfo : action.absenceRelatedInfo});

        case types.GET_ABSENCES_SUMMARY_SUCCESS:
            return Object.assign({}, state, {absencesSummary : action.absencesSummary });

        case types.GET_MY_ABSENCE_SUCCESS:
            return Object.assign({}, state, {myAbsences : action.myAbsences });

        default:
            return state;
    }
}
