/*
 Active environment - where to fetch the data from.
 Choose between - dummy, dev, stg and prd.
 */
import * as dummyDataCollection from "./dummyData/dummyData";

export const activeEnv = "dummy";

const env = {
    "dummy": "",
    "local": "http://arielg-800g1:8080/timeoff-api",
    /*"local": "http://localhost:8080/timeoff-api",*/
    "dev": "http://dummyserver-dev.checkpoint.com:8080/DummyWS/rest",
    "stg": "http://dummyserver-stg.checkpoint.com:8080/DummyWS/rest",
    "prd": "http://dummyserver.checkpoint.com:8080/DummyWS/rest",

    cpiServers : {
        dummy: "http://cpi-dev.checkpoint.com/",
        local: "http://cpi-dev.checkpoint.com/",
        dev: "http://cpi-dev.checkpoint.com/",
        stg: "http://cpi-stg.checkpoint.com/",
        prd: "http://cpi.checkpoint.com/",
    }
};

export function getUserInfoPage(workerId) {
    return env.cpiServers[activeEnv] + "CPPhonebook/depuser/dep_frame.asp?id=" + workerId;
}

//can remove this function once we finish the calendar page
export function getTeamCalenderPage() {
    return env.cpiServers[activeEnv] + "MyCPFrame/TimeOff/reports.asp";
}

export function getDummyWSUrl() {
    let basePath = "/dummyResource";
    return env[activeEnv] + basePath;
}

export function getAbsenceRelatedInfoUrl() {
    let basePath = "/employeeInfo/getVacationRelatedInfo";
    return activeEnv === "dummy" ? dummyDataCollection.dummyAbsenceRelatedInfo : env[activeEnv] + basePath;
}

export function getAbsenceTypesUrl() {
    let basePath = "/employeeInfo/getCategories";
    return activeEnv === "dummy" ? dummyDataCollection.dummyAbsenceTypes : env[activeEnv] + basePath;
}

export function getCalculatedDaysUrl() {
    let basePath = "/action/calculate";
    return activeEnv === "dummy" ? dummyDataCollection.dummyCalculatedDays : env[activeEnv] + basePath;
}

export function modifyRequestUrl() {
    let basePath = "/action/modifyRequest";
    return activeEnv === "dummy" ? dummyDataCollection.dummyCalculatedDays : env[activeEnv] + basePath;
}

export function getAbsencesSummaryUrl() {
    let basePath = "/employeeInfo/getAbsencesSummary";
    return activeEnv === "dummy" ? dummyDataCollection.dummyAbsencesSummary : env[activeEnv] + basePath;
}

export function createRequestUrl() {
    let basePath = "/action/createRequest";
    return activeEnv === "dummy" ? dummyDataCollection.dummyCreateRequest : env[activeEnv] + basePath;
}

export function deleteRequestUrl() {
    let basePath = "/action/deleteRequest";
    return activeEnv === "dummy" ? dummyDataCollection.dummyCreateRequest : env[activeEnv] + basePath;
}

export function getMyAbsencesUrl() {
    let basePath = "/employeeInfo/getMyRequests";
    return activeEnv === "dummy" ? dummyDataCollection.dummyMyRequests : env[activeEnv] + basePath;
}

export function getManagerPendingAbsencesUrl() {
    let basePath = "/managerInfo/getPendingRequests";
    return activeEnv === "dummy" ? dummyDataCollection.dummyMyRequests : env[activeEnv] + basePath;
}

export function getManagerEmployeeVacationRelatedInfoUrl() {
    let basePath = "/managerInfo/getEmployeeVacationRelatedInfo";
    return activeEnv === "dummy" ? dummyDataCollection.dummyAbsenceRelatedInfo : env[activeEnv] + basePath;
}

export function getManagerRequestDetailsUrl() {
    let basePath = "/managerInfo/getRequestDetails";
    return activeEnv === "dummy" ? dummyDataCollection.dummyMyRequests : env[activeEnv] + basePath;
}

export function getRequestDetailsUrl() {
    let basePath = "/employeeInfo/getRequestDetails";
    return activeEnv === "dummy" ? dummyDataCollection.dummyMyRequests : env[activeEnv] + basePath;
}

export function approveOrRejectRequestUrl() {
    let basePath = "/managerAction/approveOrRejectRequest";
    return activeEnv === "dummy" ? dummyDataCollection.dummyMyRequests : env[activeEnv] + basePath;
}

