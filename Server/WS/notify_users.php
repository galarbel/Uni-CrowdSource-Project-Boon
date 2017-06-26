<?php

include_once '../Global/config.php';

define('GOOGLE_API_KEY', 'AAAAfv-vuus:APA91bHbE9b_68UbBDqoNPJ2w2OHpN8ICeCmQzYi7v96WCzLD5cUWiHK7EOePCuV4JA_-eZVF4jPHuQdQ2iouYUPRXNVcykd5Pf0wTNwxnfiWrv0e7W0mSZPu6G_IaqJCWCEJo9OcSJB');
define('GOOGLE_FCM_URL', 'https://fcm.googleapis.com/fcm/send');

//$item_id = getNumericParamOrDefault($_POST, "itemId", true, null);
$item_id = $argv[1];
$device_ids = [];

$sqlQuery = "call get_users_to_notify (?)";

$users = $db->rawQuery($sqlQuery,[$item_id]);
sleep($argv[2]);
//$sleep = getNumericParamOrDefault($_POST, "sleep", true, null);
sleep($sleep);
if (count($users)){

    $startIndex = 0;
    $endIndex = ceil(count($users) * 0.2);

    if ($sleep <> '0'){
        $startIndex = ceil(count($users) * 0.2);
        $endIndex = count($users);
    }
    $device_ids = Array();
    for ($x = $startIndex; $x < $endIndex; $x++) {
        $device_ids[] = utf8_encode($users[$x]["device_id"]);
    }
    
    $fields = array(
        'registration_ids' => $device_ids ,
        'data' => array(
            'body' => 'An item in your wishlist is now available! Would you like to check it out?',
            'title' => 'Incoming boon!',
            'soundname' => 'icq',
            'itemId' => $item_id
        )
    );

    $headers = array(
        'Authorization:key='.GOOGLE_API_KEY,
        'Content-Type: application/json'
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, GOOGLE_FCM_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));


    $result = curl_exec($ch);
    if($result === false)
        die('Curl failed ' . curl_error());
    curl_close($ch);
    return $result;
};
?>