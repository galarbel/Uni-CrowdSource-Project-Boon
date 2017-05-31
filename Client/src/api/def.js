/*
 Active environment - where to fetch the data from.
 Choose between - dummy, dev, stg and prd.
 */
import * as dummyDataCollection from "./dummyData/dummyData";

const WS = "http://www.cs.tau.ac.il/~goldberger/Boon/Server/WS/";
const forceDummy = false;

export function login() {
    let basePath = "login";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.LoginOK : WS + basePath + ".php";
}

export function checkUserNamePassword() {
    let basePath = "check_username_availability";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.checkUserNamePassword : WS + basePath + ".php";
}

export function register() {
    let basePath = "register";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.LoginOK : WS + basePath + ".php";
}

export function getGameOfTagsQuestions() {
    let basePath = "GOT_play";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags : WS + basePath + ".php";
}

export function getTagsSuggestions() {
    let basePath = "get_all_tags"; //todo
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.suggestionTags : WS + basePath + ".php";
}

export function answerGameOfTagsType1() {
    let basePath = "GOT_verify";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags2 : WS + basePath + ".php";
}

export function answerGameOfTagsType2() {
    let basePath = ""; //TODO
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}
