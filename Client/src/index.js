/* eslint-disable import/default */
import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, useRouterHistory } from "react-router";
import { createHashHistory } from "history";
import configureStore from "./store/configureStore";
import {routes} from "./routes";
import "./styles/styles.scss";
import "../node_modules/toastr/build/toastr.min.css";
import '../node_modules/react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';

import MobileDetect from 'mobile-detect';
let md = new MobileDetect(window.navigator.userAgent);
window.md = md;

// Configure store;
const store = configureStore();

const browserHistory = useRouterHistory(createHashHistory)({
    basename: ''
});

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
