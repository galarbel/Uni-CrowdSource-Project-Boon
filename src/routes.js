import React from "react";
import {Route, IndexRoute, IndexRedirect} from "react-router";
import App from "./components/App";
import LoginPage from "./components/login/LoginPage";
import Register from "./components/login/Register";
import MainContainer from "./components/MainContainer";
import CatalogPage from "./components/catalog/Catalog";

export const routes = (
    <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={Register}/>
        <Route path="/main" component={MainContainer} >
			<Route path="/catalog" component={CatalogPage}/>
        </Route>
    </Route>
);
