import "whatwg-fetch";
import * as def from "./def";
import {doAjaxCall} from "./ApiHelper";

class Api {
    //Employee Related Info
    static getSomeData() { return doAjaxCall(def.getSomeData); }

    static getSomeDataWithParams(params) {
        return doAjaxCall(def.getSomeData,params);
    }

    static doLogin(params) {
        return doAjaxCall(def.login,params);
    }
}

export default Api;
