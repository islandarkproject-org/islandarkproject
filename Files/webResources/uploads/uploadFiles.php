<?php

/**
* This file will receive any files uploaded from the angular upload library. In the URL
* a mode must be set, 0 for library, 1 for instantiated tests. The projectID is also 
* required for an instantiated test. More details on the file structure can be found in
* the documentation. This will not only copy the uploaded file to the server but will 
* also enter a row in the DB.
*    
*/


if ( !empty( $_FILES ) ) {
	/*if($_SESSION['userRole'] != 1)
	{
		$answer = array("error"=>"not authenticated");
		$json = json_encode( $answer );
		http_response_code(403);
		echo $json;
		exit;
	}
	//The projectID which is the folder where the uploads will be saved is in the URL
	// eg ../../uploadAngular.php?projectID=1234   We splice the URL and extract just the 
	// project number to use as a folder name
	/*$folderName;
	$answers;
	if($_GET["mode"] == "0")
	{
		$folderName = ;
		$answers = array("sqlFindDup"=>"SELECT * FROM TestTemplateFilesAttached WHERE testTemplateFK=? AND fileName=?",
						  "sqlInsert"=>"INSERT INTO TestTemplateFilesAttached (testTemplateFK, fileName) VALUES (?,?)");
	}
	else if($_GET["mode"] == "1")
	{
		if(!(isset($_GET["projectID"])))
		{
			$answer = array("error"=>"Missing project ID");
			$json = json_encode( $answer );
			http_response_code(400);
			echo $json;
			exit;
		}
		
		$folderName = "InstaniatedTestsUploadedFiles" . DIRECTORY_SEPARATOR . $_GET["projectID"];
		$answers = array("sqlFindDup"=>"SELECT * FROM InstaniatedTestsFilesAttached WHERE FK_InstantiatedTestID=? " .
								"AND fileName=?",
						 "sqlInsert"=>"INSERT INTO InstaniatedTestsFilesAttached (FK_InstantiatedTestID, fileName) " .
								"VALUES (?,?)");
	}
	else
	{
		$answer = array("error"=>"I don't understand that mode");
		$json = json_encode( $answer );
		http_response_code(400);
		echo $json;
		exit;
	}
	*/	
	//upload or save the uploaded files from the user
	//$arrOStr = $_GET["id"];
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = 'patron_uploads/';
	$uploadFilePath = $_FILES[ 'file' ][ 'name' ];
	if (!file_exists($uploadPath)) 
	{
		mkdir($uploadPath, 0777, true);
	}
	$finalPath = $uploadPath . $uploadFilePath;
    move_uploaded_file( $tempPath, $finalPath);
	//$arrOStr[1] == testID
//	$answer = "Success " . $finalPath . " " . $test;
	/*$conn = DBConnect();
	$error = "";
	
	//go insert a row for this file in the DB.
	sqlsrv_begin_transaction($conn);
	$sqlFindDup = $answers["sqlFindDup"];
	$sql = $answers["sqlInsert"];
	$params = array($arrOStr, $uploadFilePath);
	
	$result = sqlsrv_query($conn, $sqlFindDup, $params);
	$row_count = sqlsrv_has_rows($result);
	
	if(!$row_count)
	{
		$result = sqlsrv_query($conn, $sql, $params);
		
		if(!$result) //there was an error
		{	
			$error .= readError("error inserting row for uploaded file ");
		}
		
		$answer = array( 'answer' => 'File transfer to ' . $finalPath, 'error'=>$error, 
			'row_count'=>$row_count) ;
    }
	else
	{
		$answer = array('answer'=>"duplicate found", 'row_count'=>$row_count, 'error'=>$error);
	}
	
	
	if(empty($error))
		sqlsrv_commit($conn);
	else
	{
		sqlsrv_rollback($conn);
		http_response_code(404);
	}*/

	$json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}

?>
