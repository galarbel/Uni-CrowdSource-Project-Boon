<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}
if (!isset($_POST["deviceId"]) ) {
    badRequest("missing 'deviceId' parameter");
}
$username = $_POST["username"];
$password = $_POST["password"];
$device_id = $_POST["deviceId"];

$sqlQuery = "call verify_user (?,?,?)";

$answer = $db->rawQuery($sqlQuery,[$username,$password,$device_id])[0];
if (count($answer)){
    $results["code"] = 200;
    $results["data"] = $answer;
}else{
    $results["code"] = 400;
    $results["data"] = "Wrong username or password";
}

header('Content-type: application/json');
echo json_encode($results);

?>