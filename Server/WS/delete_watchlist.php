<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}

$username       = $_POST["username"];
$password       = $_POST["password"];
$wishlist_id    =  getNumericParamOrDefault($_POST, "wishlistId", true, null);

$SQLQuery = "call delete_user_wish_list (?)";
$db->rawQuery($SQLQuery,[$wishlist_id]);

$results["data"]["deleteSuccess"] = true;
$results["code"] = 200;

header('Content-type: application/json');
echo json_encode($results);

//TODO need to add async call to send notifications to relevant users..
?>