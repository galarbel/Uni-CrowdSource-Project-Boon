<?php

include_once '../Global/config.php';

/** API for verify username and password of a user
 *
 *  Method : GET
 *
 *  Required/optional parameters: username (string), password (string).
 *
 *  Returns:
 *  On success - Success (200) with the user details
 *  On DB error - Internal Server Error (500) with an error message
 */

$sqlQuery = "SELECT * FROM users where  ";
$results = $db->rawQuery($sqlQuery);

header('Content-type: application/json');
echo json_encode($results);

?>