<?php

include_once '../Global/config.php';
//TODO add handle points to users per tag answer.

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
$userIdRaw = $db->rawQuery($getUserIdQuery,[$username]);
$user_id = $userIdRaw["id"];

$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
$GOTVerify = rand(0,1) == 1;

$results["code"] = 200;
if ($GOTVerify){ //verify tag
    $SQLQuery = "call get_GOT_tag_verify (?)";
    $results["data"] = $db->rawQuery($SQLQuery,[$user_id])[0];
    $results["data"]["type"] = 1; //frontend flag for verify mode
}else{ //add tags
    $SQLQuery = "call get_GOT_tag_add (?)";
    $results["data"] = $db->rawQuery($SQLQuery,[$user_id])[0];
    $results["data"]["type"] = 2; //frontend flag for add mode
}

header('Content-type: application/json');
echo json_encode($results);

?>