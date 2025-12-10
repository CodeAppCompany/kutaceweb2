<?php
	//NOTES: this service it's to do a password change
	include("../connection/connection.service.php");//Db connection
	include("../complements/complements.service.php");//
	
	try{
		$server = serverStatus($con);
		if(!$server){
			$json["response"] = "out of order";
			echo json_encode($json, JSON_PRETTY_PRINT);
			return;
		}

		$json["response"] = "done";
		echo json_encode($json, JSON_PRETTY_PRINT);
	}catch(Exception $e) {
	    $json["response"] = "internal server error";
		echo json_encode($json, JSON_PRETTY_PRINT);
	}

?>