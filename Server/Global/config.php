<?php 

include_once 'constants.php';
include_once 'funcs.php';
include_once 'MysqliDb.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header('Content-type: application/json');

$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);

?>