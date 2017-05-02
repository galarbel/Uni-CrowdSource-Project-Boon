/* eslint-disable import/default */
import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, useRouterHistory } from "react-router";
import { createHistory } from "history";
import configureStore from "./store/configureStore";
import {desktopRoutes, mobileRoutes} from "./routes";
import {storeDeviceProfile} from "./actions/deviceProfileActions";
import "./styles/styles.scss";
import "../node_modules/toastr/build/toastr.min.css";
import '../node_modules/react-datepicker/dist/react-datepicker.css';

import MobileDetect from 'mobile-detect';
let md = new MobileDetect(window.navigator.userAgent);
window.md = md;

let deviceProfile = {
    isDesktop: md.mobile() === null && md.tablet() === null,
    mobile: md.mobile(),
    phone: md.phone(),
    tablet: md.tablet(),
    userAgent: md.userAgent(),
    os: md.os(),
};

// Load routes based on device profile.
let routes = desktopRoutes;
if (md.mobile() !== null || md.tablet() !== null) {
    routes = mobileRoutes;
}

// Configure store;
const store = configureStore();
store.dispatch(storeDeviceProfile(deviceProfile));

const browserHistory = useRouterHistory(createHistory)({
    basename: '/TimeOff'
});

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
