import React from "react";
import {Route, IndexRoute, IndexRedirect} from "react-router";
import App from "./components/App";
import LoginPage from "./components/login/LoginPage";
import Register from "./components/login/Register";
import MainContainer from "./components/MainContainer";
import CatalogPage from "./components/catalog/Catalog";
import ProductDetailsPage from "./components/catalog/ProductDetailsPage";

export const routes = (
    <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={Register} loginNotRequired/>
        <Route path="/main" component={MainContainer} >
            <Route path="/catalog" component={CatalogPage}/>
            <Route path="/details" component={ProductDetailsPage}/>
        </Route>
    </Route>
);
