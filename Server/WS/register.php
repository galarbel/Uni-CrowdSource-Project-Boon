<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}
if (!isset($_POST["email"]) ) {
    badRequest("missing 'email' parameter");
}
if (!isset($_POST["phone"]) ) {
    badRequest("missing 'phone' parameter");
}

$username = $_POST["username"];
$password = $_POST["password"];
$email = $_POST["email"];
$phone = $_POST["phone"];

$sqlQuery = "call check_username_availability (?)";
$answer = $db->rawQuery($sqlQuery,[$username])[0];
$isUsernameTaken = count($answer);

$results["code"] = 200;
if ($isUsernameTaken){
    $results["data"]["isAvailable"] = false;
}else{
    $sqlQuery = "call insert_user (?,?,?,?)";
    $results["data"] = $db->rawQuery($sqlQuery,[$username,$password,$email,$phone])[0];
}

echo json_encode($results);

?>