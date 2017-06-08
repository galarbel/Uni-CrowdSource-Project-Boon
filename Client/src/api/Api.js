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
}

export default Api;
