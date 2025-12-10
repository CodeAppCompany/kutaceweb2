<?php
	//NOTES: this service it's to do a password change
	include("../connection/connection.service.php");//Db connection
	include("../complements/system.service.php");//System methods
	
	try{
		$server = serverStatus($con);
		if(!$server){
			$json["response"] = "out of order";
			echo json_encode($json, JSON_PRETTY_PRINT);
			return;
		}

		$json["response"] = "serv 01 | HOST__HTTPS : 200";
		echo json_encode($json, JSON_PRETTY_PRINT);
	}catch(Exception $e) {
	    $json["response"] = "internal server error";
		echo json_encode($json, JSON_PRETTY_PRINT);
	}

?>