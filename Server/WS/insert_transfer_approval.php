<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}

$username           = $_POST["username"];
$password           = $_POST["password"];
$request_id         = getNumericParamOrDefault($_POST, "requestId", true, null);


$sqlQuery = "call insert_item_request_approval(?)";
$results["data"] = $db->rawQuery($sqlQuery,[$request_id])[0];


$results["code"] = 200;
header('Content-type: application/json');
echo json_encode($results);

?>