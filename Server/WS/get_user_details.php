<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}

$username = $_POST["username"];
$password = $_POST["password"];

//get user_id from given username
$getUserIdQuery = "call get_user_id (?)";
$userIdRaw = $db->rawQuery($getUserIdQuery,[$username])[0];
$user_id = getNumericParamOrDefault($userIdRaw, "id", true, null);

$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
$sqlQuery = "call get_user_details (?)";
$results["data"] = $db->rawQuery($sqlQuery,[$user_id])[0];


$results["code"] = 200;
header('Content-type: application/json');
echo json_encode($results);

?>