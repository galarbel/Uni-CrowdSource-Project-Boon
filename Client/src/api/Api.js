import "whatwg-fetch";
import * as def from "./def";
import {doAjaxCall} from "./ApiHelper";

class Api {
    static doLogin(params) {
        return doAjaxCall(def.login,params);
    }

    static checkUserNamePassword(params) {
        return doAjaxCall(def.checkUserNamePassword, params);
    }

    static doRegister(params) {
        return doAjaxCall(def.register, params);
    }

    static getGameOfTagsQuestion() {
        return doAjaxCall(def.getGameOfTagsQuestions);
    }

    static getAllTags() {
        return doAjaxCall(def.getAllTags);
    }

    static getAllCategories() {
        return doAjaxCall(def.getAllCategories);
    }

    static getAllCities() {
        return doAjaxCall(def.getAllCities);
    }

    static answerGameOfTags(params) {
        return doAjaxCall(def.answerGameOfTags, params);
    }

    static submitNewItem(params) {
        return doAjaxCall(def.submitNewItem, params);
    }

    static getCatalogItems() {
        return doAjaxCall(def.getCatalogItems);
    }

    static getItemDetails(params) {
        return doAjaxCall(def.getItemDetails, params);
    }

    static reportFalseItem(params) {
        return doAjaxCall(def.reportFalseItem, params);
    }

    static getUserDetails() {
        return doAjaxCall(def.getUserDetails);
    }

    static getUserItems() {
        return doAjaxCall(def.getUserItems);
    }

    static updateUserDetails(params) {
        return doAjaxCall(def.updateUserDetails, params);
    }

    static getWatchList() {
        return doAjaxCall(def.getWatchList);
    }

    static submitWatchlist(params) {
        return doAjaxCall(def.submitWatchlist, params);
    }

    static editWatchlist(params) {
        return doAjaxCall(def.editWatchlist, params);
    }

    static deleteWatchlist(params) {
        return doAjaxCall(def.deleteWatchlist, params);
    }
}

export default Api;
