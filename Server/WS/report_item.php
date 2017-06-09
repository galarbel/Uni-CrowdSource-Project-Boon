<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}
if (!isset($_POST["item_id"]) ) {
    badRequest("missing 'item_id' parameter");
}


$username   = $_POST["username"];
$password   = $_POST["password"];
$item_id   = $_POST["item_id"];

//get user_id from given username
$getUserIdQuery = "call get_user_id (?)";
$userIdRaw = $db->rawQuery($getUserIdQuery,[$username])[0];
$user_id = getNumericParamOrDefault($userIdRaw, "id", true, null);

$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
$SQLQuery = "call insert_item_report (?,?)";
$item_id_raw = $db->rawQuery($SQLQuery,[$item_id,$user_id])[0];

$results["data"]["submitSuccess"] = true;
$results["code"] = 200;

header('Content-type: application/json');
echo json_encode($results);

?>