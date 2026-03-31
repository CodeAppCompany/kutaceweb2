<?php
	//NOTES: this service it's to do a password change
	include("../../connection/connection.service.php");//Db connection
	include("../../complements/system.service.php");//System methods
	include("../../emails/email.service.php");//email librarie
	include("../../emails/templates.service.php");//templates to send emails
	
	try{
		$server = serverStatus($con);
		if(!$server){
			$json["response"] = "out of order";
			echo json_encode($json, JSON_PRETTY_PRINT);
			return;
		}
		
		if(
			(!isset($_POST['name'])) || 
			(!isset($_POST['email'])) || 
			(!isset($_POST['message']))
		){
			$json["response"] = "form params incomplete";
			echo json_encode($json, JSON_PRETTY_PRINT);
			return;
		}

		//Form params
		$user_name = $con -> real_escape_string($_POST['name']);
		$user_email = $con -> real_escape_string($_POST['email']);
		$user_message = $con -> real_escape_string($_POST['message']);

        // adding email message into the DB before to send it through an email
		$date = getTime();
        $addEmail = $con -> prepare("
			insert into emails values(0, ?, ?, ?, ?)
		");
        if($addEmail){
            $addEmail -> bind_param(
				"ssss", 
				$user_name,
                $user_email,
                $user_message, 
				$date
			);
			if($addEmail -> execute()){
                // sending the email
				$send = __multipleEmailSend(array(
					"title" => "KutAce - Formulario de Contacto",
					"subTitle" => "Formulario de Contacto",
					"altBody" => "Formulario de Contacto",
					"container" => contactTemplate(
							$user_name,
                            $user_email,
                            $user_message
						)
					), 
					$con
				);
				if(!$send){
					$json["response"] = "internal server error";
					echo json_encode($json, JSON_PRETTY_PRINT);
					return;
				}

				$json["response"] = "done";
				echo json_encode($json, JSON_PRETTY_PRINT);
				return;
            }else{
                $json["response"] = "internal server error";
                echo json_encode($json, JSON_PRETTY_PRINT);
                return;
            }
        }else{
            $json["response"] = "internal server error";
			echo json_encode($json, JSON_PRETTY_PRINT);
			return;
        }
	}catch(Exception $e){
		echo $e;
	    $json["response"] = "internal server error";
		echo json_encode($json, JSON_PRETTY_PRINT);
	}

?>