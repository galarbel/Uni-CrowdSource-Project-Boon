import React from "react";
import {Route, IndexRoute, IndexRedirect} from "react-router";
import App from "./components/App";
import LoginPage from "./components/common/login/LoginPage";
import Register from "./components/common/login/Register";

export const routes = (
    <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={Register}/>
    </Route>
);
