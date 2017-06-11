import React from "react";
import {Route, IndexRoute, IndexRedirect} from "react-router";
import App from "./components/App";
import LoginPage from "./components/login/LoginPage";
import Register from "./components/login/Register";
import MainContainer from "./components/MainContainer";
import CatalogPage from "./components/catalog/Catalog";
import SubmitPage from "./components/submit/SubmitPage";
import ProductDetailsPage from "./components/catalog/ProductDetailsPage";
import MyItemDetailsPage from "./components/myaccount/ItemDetailsPage";
import GameOfTagsPage from "./components/got/GameOfTagsPage";
import MyAccountPage from "./components/myaccount/MyAccountMainPage";

export const routes = (
    <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={Register} loginNotRequired/>
        <Route path="/main" component={MainContainer} >
            <Route path="/catalog" component={CatalogPage} displayName="Catalog"/>
            <Route path="/catalog/details/:id" component={ProductDetailsPage} displayName="Details"/>
            <Route path="/myItems/details/:id" component={MyItemDetailsPage} displayName="Item Details"/>
            <Route path="/submit" component={SubmitPage} displayName="Submit"/>
            <Route path="/tags" component={GameOfTagsPage} displayName="Game Of Tags"/>
            <Route path="/account" component={MyAccountPage} displayName="My Account"/>
        </Route>
    </Route>
);
