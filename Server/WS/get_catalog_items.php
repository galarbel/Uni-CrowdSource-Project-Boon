<?php

include_once '../Global/config.php';

// get POST body
$post_body = json_decode(file_get_contents('php://input'), true);

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}

$username = $_POST["username"];
$password = $_POST["password"];

$sqlQuery = "call get_catalog_items ()";

$results["code"] = 200;
$results["data"] = $db->rawQuery($sqlQuery);

header('Content-type: application/json');
echo json_encode($results);

?>