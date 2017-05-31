<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}

if (!isset($_POST["itemTagId"]) ) {
    badRequest("missing 'item_tag_id' parameter");
}

if (!isset($_POST["isCorrect"]) ) {
    badRequest("missing 'isCorrect' parameter");
}

$username = $_POST["username"];
$password = $_POST["password"];
$itemTagId = $_POST["itemTagId"];
$isCorrect = $_POST["isCorrect"];

//get user_id from given username
$getUserIdQuery = "call get_user_id (?)";
$userIdRaw = $db->rawQuery($getUserIdQuery,[$username]);
$user_id = $userIdRaw["id"];

$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
$getGotVerifyQuery = "call update_tag_credit (?,?,?,?)";

$results["code"] = 200;
$results["data"] = $db->rawQuery($getGotVerifyQuery,[$user_id,$itemTagId,$isCorrect])[0];
$results["data"]["type"] = 1; //frontend flag for verify mode

header('Content-type: application/json');
echo json_encode($results);

?>