<?php

$arr = scandir( 'patron_uploads' );
		
	//	$arrToSend = array("status"=>"error", "errorMessage"=>"dirToSearch: $dirToSearch");		
		$arrToSend = array('fileNames'=>$arr, "status"=>"successful");
		echo json_encode($arrToSend);

?>
