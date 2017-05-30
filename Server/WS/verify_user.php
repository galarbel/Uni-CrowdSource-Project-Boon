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

$sqlQuery = "call verify_user (?,?)";

$answer = $db->rawQuery($sqlQuery,[$username,$password]);
if (count($answer)){
    $results["code"] = 200;
    $results["data"] = $answer;
}else{
    $results["code"] = 400;
    $results["data"] = "Wrong username or password";
}

echo json_encode($results);

?>