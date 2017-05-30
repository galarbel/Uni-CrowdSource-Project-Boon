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
$item_id = getNumericParamOrDefault($_POST, "item_id", true, null);

$sqlQuery = "call get_item_details (?)";

$results["code"] = 200;
$results["data"] = $db->rawQuery($sqlQuery,[$item_id]);

header('Content-type: application/json');
echo json_encode($results);

?>