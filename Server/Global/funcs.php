<?php

/** Executes a curl call
 * @param $url
 * @returns the response
 */
function curlCall($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $output = curl_exec($ch);
    curl_close($ch);

    return $output;
}


/** Return BadRequest (400) to the client with a relevant error message.
 * @param {string} $errorMessage - the error message to be printed
 * @exits with http status of 400-bad request and prints the given error message
 */
function badRequest($errorMessage) {
    $response["code"] = 400;
    //http_response_code(400);
    //echo $errorMessage;
    $response["data"] = $errorMessage;
    echo json_encode($response);
    die;
}

/** Gets a numeric parameter value.
 * @param {array} $requestParams - the array that should contain the specified param
 * @param {string} $paramName - name of the parameter
 * @param {boolean} $isRequired
 * @param {string} $defaultValue - value to be returned if the param is optional
 * @returns the numeric value of the parameter or its default value,
 *          exits with http status of 400-bad request - if the parameter is required but not on the request or not numeric
 */
function getNumericParamOrDefault($requestParams, $paramName, $isRequired, $defaultValue) {
    if(isset($requestParams[$paramName])) {
        $paramValue = $requestParams[$paramName];
        if(is_numeric($paramValue))  {
            return $paramValue;
        } else {
            badRequest("parameter '" .$paramName . "'' is not a number");
        }
    } else if (!$isRequired){
        return $defaultValue;
    } else {
        badRequest("parameter '" .$paramName . "'' is missing");
    }
}
?>