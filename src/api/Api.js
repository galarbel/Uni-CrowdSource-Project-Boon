import "whatwg-fetch";
import delay from "./delay";
import * as def from "./def";
import * as dummyDataCollection from "./dummyData/dummyData";
import {getData} from "./ApiHelper";

class Api {
    //Employee Related Info
    static getAbsenceRelatedInfo() { return getData(def.getAbsenceRelatedInfoUrl); }
    static getAbsenceTypes() { return getData(def.getAbsenceTypesUrl); }
    static getAbsencesSummary() { return getData(def.getAbsencesSummaryUrl); }

    static getCalculatedDays(formData) {
        //TODO - check that formData has params... for now - assume it has
        formData.dateFrom = formData.dateFrom.format("Y-MM-DD");
        formData.dateTo = formData.dateTo.format("Y-MM-DD");
        return getData(def.getCalculatedDaysUrl,formData);
    }

    static createRequest(formData) {
        //TODO - check that formData has params... for now - assume it has
        //formData.dateFrom = formData.dateFrom.format("Y-MM-DD");
        //formData.dateTo = formData.dateTo.format("Y-MM-DD");

        return getData(def.createRequestUrl,formData);
    }

    static deleteRequest(formData) {
        //TODO - check that formData has params... for now - assume it has
        return getData(def.deleteRequestUrl,formData);
    }

    static modifyRequest(formData) {
        //TODO - check that formData has params... for now - assume it has
        return getData(def.modifyRequestUrl,formData);
    }

    static getMyAbsences() { return getData(def.getMyAbsencesUrl); }


    //Manager Related Info
    //TODO : remove dummy values....
    static getManagerPendingAbsences() { return getData(def.getManagerPendingAbsencesUrl, {testManagerId: "lshaki" }); }

    static getManagerEmployeeVacationRelatedInfo(data) {
        return getData(def.getManagerEmployeeVacationRelatedInfoUrl, data);
    }

    static getManagerRequestDetails(requestNumber) {
        return getData(def.getManagerRequestDetailsUrl, {
                reqNumber: requestNumber
            }
        );
    }

    static getRequestDetails(requestNumber) {
        return getData(def.getRequestDetailsUrl, {
                reqNumber: requestNumber
            }
        );
    }

    static approveOrRejectRequest(data) {
        return getData(def.approveOrRejectRequestUrl, data);
    }

}

export default Api;
