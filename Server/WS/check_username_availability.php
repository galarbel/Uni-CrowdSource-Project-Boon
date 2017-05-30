<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}

$username = $_POST["username"];

$sqlQuery = "call check_username_availability_on_reg (?)";

$answer = $db->rawQuery($sqlQuery,[$username]);
if (count($answer)){
    $results["code"] = 400;
    $results["data"] = "Username is already taken";
}else {
    $results["code"] = 200;
    $results["data"] = "username is available";
}
echo json_encode($results);

?>