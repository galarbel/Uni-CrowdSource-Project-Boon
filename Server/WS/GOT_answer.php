<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}
if (!isset($_POST["type"]) ) {
    badRequest("missing 'type' parameter");
}


$username = $_POST["username"];
$password = $_POST["password"];
$gameType = $_POST["type"];

//get user_id from given username
$getUserIdQuery = "call get_user_id (?)";
$userIdRaw = $db->rawQuery($getUserIdQuery,[$username])[0];
$user_id = getNumericParamOrDefault($userIdRaw, "id", true, null);



if ($gameType == "1"){ //verify

    if (!isset($_POST["isCorrect"]) ) {
        badRequest("missing 'isCorrect' parameter");
    }
    if (!isset($_POST["itemTagId"]) ) {
        badRequest("missing 'itemTagId' parameter");
    }
    $itemTagId = getNumericParamOrDefault($_POST, "itemTagId", true, null);
    $isCorrect = $_POST["isCorrect"];
    $db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
    $sqlQuery = "call update_tag_credit (?,?,?)";
    $db->rawQuery($sqlQuery,[$user_id,$itemTagId,$isCorrect])[0];
    $results["data"]["type"] = 1; //frontend flag for verify mode

}elseif ($gameType == "2"){

    if (!isset($_POST["itemId"]) ) {
        badRequest("missing 'itemId' parameter");
    }
    if (!isset($_POST["tags"]) ) {
        badRequest("missing 'tags' parameter");
    }
    $item_id    = getNumericParamOrDefault($_POST, "itemId", true, null);
    $tags_raw   = $_POST["tags"];
    $tags       = explode(";",$tags_raw);

    foreach ($tags as $tag){
        $db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
        $SQLQuery = "call insert_item_tag_ariel (?,?,?)";
        $results1 = $db->rawQuery($SQLQuery,[$user_id,$item_id,$tag])[0];
    }
    $results["data"]["type"] = 2; //frontend flag for add mode

}else{
    badRequest("'type' parameter has invalid value");
}
$results["data"]["submitSuccess"] = true;
$results["code"] = 200;


header('Content-type: application/json');
echo json_encode($results);

?>