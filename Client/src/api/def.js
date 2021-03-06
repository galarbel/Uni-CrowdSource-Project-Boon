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

export function getAllTags() {
    let basePath = "get_all_tags";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.suggestionTags : WS + basePath + ".php";
}

export function getAllCategories() {
    let basePath = "get_all_categories";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.suggestionTags : WS + basePath + ".php";
}

export function getAllCities() {
    let basePath = "get_all_cities";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.suggestionTags : WS + basePath + ".php";
}

export function answerGameOfTags() {
    let basePath = "GOT_answer";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags2 : WS + basePath + ".php";
}

//from this point we actually had a server and DB up, so we stopped investing in "Dummy Data" :)
export function submitNewItem() {
    let basePath = "submit_item";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function getCatalogItems() {
    let basePath = "get_catalog_items";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function getItemDetails() {
    let basePath = "get_item_details";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function reportFalseItem() {
    let basePath = "report_item";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function getUserDetails() {
    let basePath = "get_user_details";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function getUserItems() {
    let basePath = "get_user_items";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function updateUserDetails() {
    let basePath = "update_user_details";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function getWatchList() {
    let basePath = "get_user_watchlists";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function submitWatchlist() {
    let basePath = "submit_watchlist";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function editWatchlist() {
    let basePath = "update_watchlist";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function deleteWatchlist() {
    let basePath = "delete_watchlist";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function transferItem() {
    let basePath = "insert_transfer_request";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function deleteItem() {
    let basePath = "delete_item";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function getPendingTransferApproval() {
    let basePath = "get_items_pending_approval";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function getUsernameSuggestions() {
    let basePath = "get_users_for_transfer";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function getUserHistoryItems() {
    let basePath = "get_user_history";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}

export function approveOrRejectTransfer() {
    let basePath = "insert_transfer_answer";
    return basePath === "" || forceDummy ? dummyDataCollection.dummyData.GameOfTags3 : WS + basePath + ".php";
}
