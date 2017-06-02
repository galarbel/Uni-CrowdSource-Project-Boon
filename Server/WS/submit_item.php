<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}
if (!isset($_POST["title"]) ) {
    badRequest("missing 'title' parameter");
}
if (!isset($_POST["category"]) ) {
    badRequest("missing 'category' parameter");
}
if (!isset($_POST["area"]) ) {
    badRequest("missing 'area' parameter");
}
if (!isset($_POST["description"]) ) {
    badRequest("missing 'description' parameter");
}
if (!isset($_POST["tags"]) ) {
    badRequest("missing 'tags' parameter");
}

if(isset($_FILES['image']))
{
    $errors=array();
    $allowed_ext= array('jpg','jpeg','png','gif');
    $file_name =$_FILES['image']['name'];
    $file_ext = strtolower( end(explode('.',$file_name)));

    $file_size=$_FILES['image']['size'];
    $file_tmp= $_FILES['image']['tmp_name'];
    $data = file_get_contents( $file_tmp );
    $base64 = base64_encode($data);

    if(in_array($file_ext,$allowed_ext) === false)
    {
        $errors[]='Extension not allowed';
    }

    if($file_size > 2097152)
    {
        $errors[]= 'File size must be under 2mb';
    }

    if(!empty($errors))
    {
        foreach($errors as $error)
        {
            echo $error , '<br/>';
        }
        die;
    }
}

$username   = $_POST["username"];
$password   = $_POST["password"];
$title      = $_POST["title"];
$category   = $_POST["category"];
$area       = $_POST["area"];
$description= $_POST["description"];
$tags       = $_POST["tags"];

//get user_id from given username
$getUserIdQuery = "call get_user_id (?)";
$userIdRaw = $db->rawQuery($getUserIdQuery,[$username]);
$user_id = $userIdRaw["id"];

$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
$SQLQuery = "call get_GOT_tag_add (?)";
$results["code"] = 200;
$results["data"] = $db->rawQuery($SQLQuery,[$user_id])[0];


header('Content-type: application/json');
echo json_encode($results);

?>

