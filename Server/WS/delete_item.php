<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}
if (!isset($_POST["itemId"]) ) {
    badRequest("missing 'itemId' parameter");
}


$username       = $_POST["username"];
$password       = $_POST["password"];
$item_id        =  getNumericParamOrDefault($_POST, "itemId", true, null);

//get user_id from given username
$getUserIdQuery = "call get_user_id (?)";
$userIdRaw = $db->rawQuery($getUserIdQuery,[$username])[0];
$user_id = getNumericParamOrDefault($userIdRaw, "id", true, null);

$SQLQuery = "call delete_item (?,?)";
$db->rawQuery($SQLQuery,[$item_id,$user_id]);

$results["data"]["deleteSuccess"] = true;
$results["code"] = 200;

header('Content-type: application/json');
echo json_encode($results);

?>