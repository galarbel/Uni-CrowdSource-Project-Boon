<?php

include_once '../Global/config.php';

// get POST body
$post_body = json_decode(file_get_contents('php://input'), true);

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}

$username = $_POST["username"];
$password = $_POST["password"];
$item_id = getNumericParamOrDefault($_POST, "item_id", true, null);

//get user_id from given username
$getUserIdQuery = "call get_user_id (?)";
$userIdRaw = $db->rawQuery($getUserIdQuery,[$username])[0];
$user_id = getNumericParamOrDefault($userIdRaw, "id", true, null);

$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
$sqlQuery = "call get_item_details (?,?)";
$results["data"] = $db->rawQuery($sqlQuery,[$item_id,$user_id])[0];

$results["data"]["reported_by_user"] = $results["data"]["reported_by_user"] ? true: false;


$results["code"] = 200;
header('Content-type: application/json');
echo json_encode($results);

?>