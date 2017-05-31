import React from "react";
import {Route, IndexRoute, IndexRedirect} from "react-router";
import App from "./components/App";
import LoginPage from "./components/login/LoginPage";
import Register from "./components/login/Register";
import MainContainer from "./components/MainContainer";
import CatalogPage from "./components/catalog/Catalog";
import SubmitPage from "./components/submit/SubmitPage";
import ProductDetailsPage from "./components/catalog/ProductDetailsPage";
import GameOfTagsPage from "./components/got/GameOfTagsPage";

export const routes = (
    <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={Register} loginNotRequired/>
        <Route path="/main" component={MainContainer} >
            <Route path="/catalog" component={CatalogPage} displayName="Catalog"/>
            <Route path="/catalog/details" component={ProductDetailsPage}/>
            <Route path="/submit" component={SubmitPage} displayName="Submit"/>
            <Route path="/tags" component={GameOfTagsPage} displayName="Game Of Tags"/>
        </Route>
    </Route>
);
