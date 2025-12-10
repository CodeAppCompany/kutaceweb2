<?php

    $con = new mysqli("localhost","root","","cmf");
    //$con = new mysqli("localhost","u954063399_root","Gapsa2018*","u954063399_test");
    $con->set_charset("utf8");
    if(!$con) die("error de conexion" . mysql_connect_error());

    header('Access-Control-Allow-Origin: *');  
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

?>