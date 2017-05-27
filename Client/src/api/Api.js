import "whatwg-fetch";
import * as def from "./def";
import {doAjaxCall} from "./ApiHelper";

class Api {
    static getSomeDataWithParams(params) {
        return doAjaxCall(def.getSomeData,params);
    }

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

    static getTagsSuggestions() {
        return doAjaxCall(def.getTagsSuggestions);
    }

    static answerGameOfTagsType1(params) {
        return doAjaxCall(def.answerGameOfTagsType1, params);
    }

    static answerGameOfTagsType2(params) {
        return doAjaxCall(def.answerGameOfTagsType2, params);
    }
}

export default Api;
