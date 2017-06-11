<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}

$username = $_POST["username"];

$sqlQuery = "call check_username_availability (?)";

$answer = $db->rawQuery($sqlQuery,[$username])[0];

$results["code"] = 200;
$results["data"]["isAvailable"] = !count($answer);

header('Content-type: application/json');
echo json_encode($results);

?>