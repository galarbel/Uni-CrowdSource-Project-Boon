import "whatwg-fetch";
import * as def from "./def";
import {getData} from "./ApiHelper";

class Api {
    //Employee Related Info
    static getSomeData() { return getData(def.getSomeData); }

    static getSomeDataWithParams(params) {
        return getData(def.getSomeData,params);
    }

}

export default Api;
