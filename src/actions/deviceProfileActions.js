import * as types from '../constants/actionTypes';

export function storeDeviceProfile(deviceProfile) {
    return {type: types.UPDATE_DEVICE_PROFILE, deviceProfile};
}
