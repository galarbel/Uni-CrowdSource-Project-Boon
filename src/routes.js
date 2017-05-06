import React from "react";
import {Route, IndexRoute, IndexRedirect} from "react-router";
import App from "./components/App";
import LoginPage from "./components/LoginPage";
import MainContainer from "./components/MainContainer";

export const routes = (
    <Route path="/" component={App}>
        <IndexRedirect to="/main" />
        <Route path="/login" component={LoginPage}/>
        <Route path="/main" component={MainContainer}/>
    </Route>
);
