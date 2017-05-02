import initialState from './initialState';

export default function deviceProfileReducer(state = initialState.deviceProfile, action) {
    switch (action.type) {
        case 'UPDATE_DEVICE_PROFILE':
            return Object.assign({}, action.deviceProfile);

        default:
            return state;
    }
}
