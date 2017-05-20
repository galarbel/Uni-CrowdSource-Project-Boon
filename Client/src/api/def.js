/*
 Active environment - where to fetch the data from.
 Choose between - dummy, dev, stg and prd.
 */
import * as dummyDataCollection from "./dummyData/dummyData";

export const activeEnv = "dummy";

const env = {
    "dummy": "",
    "local": "http://localhost:8080/boon-api",
    "prd": "http://cs.tau.ac.il/~galarbel/boonWS/",
};

export function getSomeData() {
    let basePath = "somePath/";
    return activeEnv === "dummy" ? dummyDataCollection.dummyData : env[activeEnv] + basePath;
}


export function login() {
    let basePath = ""; //TODO
    return activeEnv === "dummy" ? dummyDataCollection.dummyData.LoginOK : env[activeEnv] + basePath;
}

export function checkUserNamePassword() {
    let basePath = ""; //TODO
    return activeEnv === "dummy" ? dummyDataCollection.dummyData.checkUserNamePassword : env[activeEnv] + basePath;
}

export function register() {
    let basePath = ""; //TODO
    return activeEnv === "dummy" ? dummyDataCollection.dummyData.LoginOK : env[activeEnv] + basePath;
}