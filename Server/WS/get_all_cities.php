<?php

include_once '../Global/config.php';


$sqlQuery = "call get_cities()";

$results["code"] = 200;
$results["data"] = $db->rawQuery($sqlQuery);

header('Content-type: application/json');
echo json_encode($results);

?>