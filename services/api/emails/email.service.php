<?php

	//Module complements
	use PHPMailer\PHPMailer\PHPMailer;//PHP mailer modules
	require '../../../../libraries/email/vendor/autoload.php';//Complements of php mailer

	// methdo to send emails
	function __multipleEmailSend($__emailParams, $con){
	    try{
	    	if(
	    		(!$__emailParams['title']) ||
	    		(!$__emailParams['subTitle']) ||
	    		(!$__emailParams['altBody']) ||
	    		(!$__emailParams['container']) 
	    	) return 'form email params incomplete';
			
	    	// getting config form the server to send emails > user account, password, and CCO destinations
			$APIemail = $con -> prepare("
				select * from api 
					where title IN ('email user', 'email password', 'contacts', 'bcc')
			");
			if(!$APIemail || !$APIemail->execute()) return false;
			$data = [
				'email user'     => '', // account to send the email
				'email password' => '', // password 
				'contacts'       => '', // Contacts in CC when we need to send all emails
				'bcc'       => '' // Contacts in BCC when we need to send all emails
			];
			$result = $APIemail->get_result();
			while($row = $result->fetch_assoc()){
				if(isset($data[$row['title']])){
					$data[$row['title']] = $row['value'];
				}
			}

			if($data['email user'] === '' || $data['email password'] === '') return false;
			
			// sending email
			try{
				$mail = new PHPMailer;
				$mail -> isSMTP();
				$mail -> SMTPDebug = 0;
				$mail -> Host = "smtp.hostinger.com";
				$mail -> Port = 587;
				$mail -> SMTPAuth = true;
				$mail -> Username = $data['email user'];
				$mail -> Password = $data['email password'];
				$mail -> setFrom($data['email user'], $__emailParams['title']);
				$mail -> Subject = $__emailParams['subTitle'];
				$mail -> msgHTML($__emailParams['container'], __DIR__);
				$mail -> AltBody = $__emailParams['altBody'];
				$mail -> IsHTML(true);
				$mail -> CharSet = 'UTF-8';
				
				// CC
				foreach(array_map('trim', explode(';', $data['contacts'])) as $__email){
					if ($__email !== '') $mail -> addAddress($__email);
				}

				// BCC
				foreach(array_map('trim', explode(';', $data['bcc'])) as $__email){
					if($__email !== '') $mail->addBCC($__email);
				}

				// send email
				return $mail->send();
			}catch(phpmailerException $e){
				echo $e;
				return false;
			}catch(Exception $e) {
				echo $e;
				return false;
			}
	    }catch(Exception $e) {
			echo $e;
		    return false;
		}
	}
?>