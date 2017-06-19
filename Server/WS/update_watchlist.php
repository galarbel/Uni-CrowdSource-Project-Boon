<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}
if (!isset($_POST["tags"]) ) {
    badRequest("missing 'tags' parameter");
}
if (!isset($_POST["wishlistId"]) ) {
    badRequest("missing 'wishlistId' parameter");
}

$username       = $_POST["username"];
$password       = $_POST["password"];
$tags_raw       = $_POST["tags"];
$tags           = explode(";",$tags_raw);
$wishlist_id    =  getNumericParamOrDefault($_POST, "wishlistId", true, null);

//get user_id from given username
$getUserIdQuery = "call get_user_id (?)";
$userIdRaw = $db->rawQuery($getUserIdQuery,[$username])[0];
$user_id = getNumericParamOrDefault($userIdRaw, "id", true, null);


$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
$SQLQuery = "call delete_user_wish_list (?)";
$db->rawQuery($SQLQuery,[$wishlist_id]);


$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
$SQLQuery = "call insert_user_wish_list (?)";


$wishlist_id_raw = $db->rawQuery($SQLQuery,[$user_id])[0];
$wishlist_id = getNumericParamOrDefault($wishlist_id_raw, "LAST_INSERT_ID()", true, null);

$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);

if (isset($wishlist_id)){
    foreach ($tags as $tag){

        $SQLQuery = "call insert_user_wish_list_tag (?,?)";
        $db->rawQuery($SQLQuery,[$wishlist_id,$tag]);

    }
    $results["data"]["wishlist_id"] = $wishlist_id;
    $results["data"]["submitSuccess"] = true;

    $db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
    $sqlQuery = "call get_user_wish_list (?)";
    $results["data"]["raw"] = $db->rawQuery($sqlQuery,[$wishlist_id])[0];

    $tag_labels =  explode(";",$results["data"]["raw"]["tag_labels"]);
    $tag_ids =  explode(";",$results["data"]["raw"]["tag_ids"]);
    $results["data"]["tags"] = [];
    for ($y = 0; $y < count($tag_labels); $y++) {
        $temp->value = $tag_ids[$y];
        $temp->label = $tag_labels[$y];
        array_push($results["data"]["tags"],json_encode($temp));
    }
}else{
    $results["data"]["submitSuccess"] = false;
    //TODO handle error
}
$results["code"] = 200;

header('Content-type: application/json');
echo json_encode($results);

//TODO need to add async call to send notifications to relevant users..
?>