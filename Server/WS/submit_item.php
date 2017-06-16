<?php

include_once '../Global/config.php';

// check params
if (!isset($_POST["username"]) ) {
    badRequest("missing 'username' parameter");
}
if (!isset($_POST["password"]) ) {
    badRequest("missing 'password' parameter");
}
if (!isset($_POST["name"]) ) {
    badRequest("missing 'name' parameter");
}
if (!isset($_POST["category"]) ) {
    badRequest("missing 'category' parameter");
}
if (!isset($_POST["area"]) ) {
    badRequest("missing 'area' parameter");
}
if (!isset($_POST["desc"]) ) {
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
    //echo $base64;
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
$image = "";
if(isset($base64)){$image =  $base64;}


$username   = $_POST["username"];
$password   = $_POST["password"];
$title      = $_POST["name"];
$category   = getNumericParamOrDefault($_POST, "category", true, null);
$area       = getNumericParamOrDefault($_POST, "area", true, null);
$desc       = $_POST["desc"];
$tags_raw   = $_POST["tags"];
$tags       = explode(";",$tags_raw);

//get user_id from given username
$getUserIdQuery = "call get_user_id (?)";
$userIdRaw = $db->rawQuery($getUserIdQuery,[$username])[0];
$user_id = getNumericParamOrDefault($userIdRaw, "id", true, null);

$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);
$SQLQuery = "call insert_item (?,?,?,?,?,?)";


$item_id_raw = $db->rawQuery($SQLQuery,[$user_id,$title,$desc,$area,$category,$image])[0];
$item_id = getNumericParamOrDefault($item_id_raw, "@itemID", true, null);
$db = new MysqliDb ($DBServer, $DBUsername, $DBPassword, $DBName);

if (isset($item_id)){
    foreach ($tags as $tag){

        $SQLQuery = "call insert_item_tag (?,?,?)";
        $db->rawQuery($SQLQuery,[$user_id,$item_id,$tag]);

    }
    exec("nohup php -f notify_users.php ". (string)$item_id . " 0 > /dev/null 2>&1 &");
    //exec("nohup php -f notify_users.php ". (string)$item_id . " 60 > /dev/null 2>&1 &");
    $results["data"]["submitSuccess"] = true;
}else{
    $results["data"]["submitSuccess"] = false;
    //TODO handle error
}
$results["code"] = 200;

header('Content-type: application/json');
echo json_encode($results);

//TODO need to add async call to send notifications to relevant users..
?>