<?php

include_once '../Global/config.php';

$item_id = getNumericParamOrDefault($_POST, "itemId", true, null);

$sqlQuery = "call get_users_to_notify (?)";

$users = $db->rawQuery($sqlQuery,[$item_id]);

header('Content-type: application/json');
echo json_encode($users);
?>