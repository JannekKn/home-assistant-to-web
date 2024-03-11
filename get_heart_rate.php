<?php

$url = "https://your-homeassistant-url.something/";
$sensor = "sensor.your_heartRate_sensor";
$auth = "access_token";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url . 'api/states/' . $sensor);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: Bearer ' . $auth
));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
curl_close($ch);
$info = json_decode($result,true);
echo($info["state"]);
?>
