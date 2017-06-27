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

//get user_id from given username
$getUserIdQuery = "call get_user_id (?)";
$userIdRaw = $db->rawQuery($getUserIdQuery,[$username])[0];
$user_id = getNumericParamOrDefault($userIdRaw, "id", true, null);

$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
$sqlQuery = "call get_user_wish_lists (?)";
$results["data"] = $db->rawQuery($sqlQuery,[$user_id]);
$results["code"] = 200;

for ($x = 0; $x < count($results["data"]); $x++) {
    $tag_labels =  explode(";",$results["data"][$x]["tag_labels"]);
    $tag_ids =  explode(";",$results["data"][$x]["tag_ids"]);
    $results["data"][$x]["tags"] = [];
    for ($y = 0; $y < count($tag_labels); $y++) {
        $temp->value =$tag_ids[$y];
        $temp->label = $tag_labels[$y];
        array_push($results["data"][$x]["tags"],json_encode($temp));
    }
}

header('Content-type: application/json');
echo json_encode($results);

?>