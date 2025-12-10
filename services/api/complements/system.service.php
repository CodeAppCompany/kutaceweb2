<?php

	//method to get the global service web connection
	function __HostAddress(){
		return 'http://localhost/cmf/';
	}

	//method to get the server status
	function serverStatus($con){
		try{
			$query = "select * from api where title = 'api access'";
			if($res = $con -> query($query)){
				$status = false;
				while ($row = mysqli_fetch_assoc($res)){
					if($row['value'] == 'enabled') $status = true;
				}

				return $status;
			}else{
				return false;
			}
		}catch(Exception $e) {
	    	return false;
		}
	}

	//Method to get a keys
	function getKey($size){
		$characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        $key = '';
        for($x = 0; $x < $size ;$x++){
	        $randstring = '';
        	for ($i = 0; $i < 1; $i++){
	            $randstring = $characters[rand(0, strlen($characters) - 1)];
	        }
	        $key .= $randstring;
        }

        return $key;
	}

	//Method to get the server time
	function getTime(){
		date_default_timezone_set("America/Mexico_City");
		$year = date('Y-m-d', time());
		$hour = date('H:i:s', time());
		return $year.' '.$hour;//example -> 2021-01-20 21:01:33
	}

		//method to desifrate codes
	function atob($string){
		try{
			if(!$string) return 'params incomplete';
			return base64_decode($string);
		}catch(Exception $e){
			return 'internal server error';
		}
	}

	//method to cifrate text
	function btoa($string){
		try{
			if(!$string) return 'params incomplete';
			return base64_encode($string);
		}catch(Exception $e){
			return 'internal server error';
		}
	}

?>