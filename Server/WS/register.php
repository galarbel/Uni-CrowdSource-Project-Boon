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
$answer = $db->rawQuery($sqlQuery,[$username]);

if (count($answer)){
    $results["code"] = 400;
    $results["data"] = "username is already taken";
}else{
    $results["code"] = 200;
    $sqlQuery = "call insert_user (?,?,?,?)";
    $results["data"] = $db->rawQuery($sqlQuery,[$username,$password,$email,$phone]);
}

echo json_encode($results);

?>