<?php

define('GOOGLE_API_KEY', 'AAAAfv-vuus:APA91bHbE9b_68UbBDqoNPJ2w2OHpN8ICeCmQzYi7v96WCzLD5cUWiHK7EOePCuV4JA_-eZVF4jPHuQdQ2iouYUPRXNVcykd5Pf0wTNwxnfiWrv0e7W0mSZPu6G_IaqJCWCEJo9OcSJB');
define('GOOGLE_FCM_URL', 'https://fcm.googleapis.com/fcm/send');

//can actually insert more than 1 token here. there seems to be a problem with PHP though, gotta "utf8_encode" each token

$Token = Array(utf8_encode($argv[3]));

//this is a template for a message, but there's actually few other options, + support for 'vibrate' and 'sound'... might need to check into it more
//sleep(10);
//echo $argv[1];
$fields = array(
	'registration_ids' => $Token ,
	'notification' => array(
		'body' => $argv[1],
		'title' => $argv[2],
        'sound' => 'default'
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
?>