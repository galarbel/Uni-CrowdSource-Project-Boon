/**
 * Created by gala on 3/9/2017.
 */
import {getStringForFetch,makeCancelable} from "../utils/Utils";
import delay from "./delay";

export function checkStatus(response) {
    if (response && response.code && response.code == 200 && response.data) {
        return response;
    }

    let errorMessage = "Bad Request";
    if (response && response.data && response.data.errorMessage) {
        errorMessage = response.data.errorMessage;
    }
    const error = new Error(errorMessage);
    throw error;
}

export function parseJson(response) {
    try {
        return response.json();
    } catch (e) {
        let error = new Error(response.statusText);
        throw error;
    }
}

export function doAjaxCall(fetchUrl,data) {
    const cancelablePromise = makeCancelable(new Promise((resolve, reject) => {
        setTimeout(() => {
            fetchUrl().endsWith && fetchUrl().endsWith(".php") ?
                fetchDataFromServer(resolve, reject, fetchUrl,data) :
                resolve(fetchUrl().data);
        }, delay);
    }));

    return cancelablePromise.promise;
}

function fetchDataFromServer(resolve, reject, fetchUrl, data) {
    let fetchParams = {
        method: "POST",
        headers: {
            'Accept': 'application/json,application/javascript, application/x-javascript'
        },
        credentials: 'include'
    };

    if (localStorage.getItem("userDetails")) {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        data = Object.assign({},userDetails,data);
    }

    if (data) {
        fetchParams.body = getStringForFetch(data);
    }

    fetch(fetchUrl(), fetchParams)
        .then(parseJson)
        .then(checkStatus)
        .then((result) => {
            resolve(result.data);
        }).catch(error => {
        reject(error);
    });
}




