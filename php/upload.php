<?php
header('Access-Control-Allow-Origin: *');
$file = $_FILES["file"];

move_uploaded_file(
  $file['tmp_name'],
  "./upload/" . $file['name']
);

$result = [
  'code' => 0,
  'msg' => '图片上传成功',
  'data' => [
    'url' => 'http://'.$_SERVER['HTTP_HOST'].'/upload/' . $file['name']
  ]
];

echo json_encode($result)
?>