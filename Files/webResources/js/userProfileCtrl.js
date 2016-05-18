app.controller('userProfileController',function($rootScope, $scope, infoService, $state,$uibModal, $timeout)
{
	$scope.alerts = [];
	$scope.personDetails = {userName: '', email:'', password:'', passwordValidate:'', fName:''};
	var personDetailsRevert = {userName: '', email:'', password:'', passwordValidate:'', fName:''};

	$scope.registerMode = true;
	$scope.pageControls = {disableUserName: true, nameError: false, userNameError: false, emailError: false, 
							passwordError: false, passwordValidateError:false,disableUserName:false};
		

	infoService.getPersonDetails().then(
	function(data)
	{
		console.log(data.data);
		data = data.data;
		//set the userDetails into place
		$scope.personDetails.userName = data.userName;
		$scope.personDetails.email = data.email;
		$scope.personDetails.fName = data.name;
		
		personDetailsRevert = angular.copy($scope.personDetails);
		//backup to personDetailsRevert
	},
	function(error)
	{
		console.log(error);
	});

	$scope.undo = function()
	{
		$scope.personDetails.userName = personDetailsRevert.userName;
		$scope.personDetails.email = personDetailsRevert.email;
		$scope.personDetails.fName = personDetailsRevert.fName;
	}

	$scope.update = function()
	{
		//send userDetails to server
		if(verifyInput())
		{
			//go update uer details
			//console.log($scope.personDetails);
			$scope.enterPasswordModal();
			//open the password confirm modal
		}
	}

	var showAlert = function(message, type, delay)
	{
		$scope.alerts.push({message:message, type:type});
		
		$timeout(function()
		{//controls the fade out of the alert
			$scope.alerts.splice(0,1);
		}, delay);	
	}

	$scope.openPasswordModal = function () {

		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'changePassword.html',
		  size:'md',
		  controller:function($scope, $uibModalInstance)
			{
				$scope.pageControls = {passwordError: false, passwordValidateError:false};
				$scope.alerts = [];	
	
				$scope.changePassword = function()
				{
					if(typeof($scope.password) == 'undefined' || typeof($scope.password.oldPassword) == 'undefined'
						|| typeof($scope.password.newPassword) == 'undefined' || typeof($scope.password.newPasswordVerify) == 'undefined')
					{	
						showPasswordAlert("Enter in all the fields", "danger", 3500);
					}
					else
					{
						if($scope.password.newPassword.length < 4)
						{
							$scope.pageControls.passwordError = true;
							showPasswordAlert("Password must be at least 4 characters long", "danger", 3500);
						}
						else if($scope.password.newPassword !== $scope.password.newPasswordVerify)
						{
							showPasswordAlert("Passwords do not match", "danger", 4500);
							$scope.pageControls.passwordError = true;
							$scope.pageControls.passwordValidateError = true;	
						}
						else
						{
							$uibModalInstance.close($scope.password);
						}
					}
				}
				$scope.cancel = function () 
				{
					$uibModalInstance.dismiss('cancel');
   			    };
				
				var showPasswordAlert = function(message, type, delay)
				{
					$scope.alerts.push({message:message, type:type});
		
					$timeout(function()
					{//controls the fade out of the alert
						$scope.alerts.splice(0,1);
					}, delay);	
				}

		
			}/*,
		  resolve: {
		    items: function () {
		      return $scope.items;
		    }
		  }*/
		});
		modalInstance.result.then(function (input) {
			  	infoService.updatePassword(input)
				.then(function(response)
				{
					if(response.data.status == true)
					{
						showAlert("Success","success", 3500);
					}
					else
					{
						showAlert("Error", "danger", 3500);
					}
				},
				function(error)
				{
					console.log(error);
				});
				
			}, function () {
			  //canceled
			});
	}

	$scope.enterPasswordModal = function () {
	
		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'confirmPassword.html',
		  size:'md',
		  controller:function($scope, $uibModalInstance)
			{
				$scope.alerts = [];
				$scope.ok = function()
				{
					if(typeof($scope.password) == 'undefined')
						showPasswordAlert("Enter password", "danger",3500);
					else if ($scope.password.length < 4)
						showPasswordAlert("Password must be at least 4 characters long", "danger",3500);
					else
						$uibModalInstance.close($scope.password);
				}
				$scope.cancel = function () 
				{
					$uibModalInstance.dismiss('cancel');
   			    };
				var showPasswordAlert = function(message, type, delay)
				{
					$scope.alerts.push({message:message, type:type});
		
					$timeout(function()
					{//controls the fade out of the alert
						$scope.alerts.splice(0,1);
					}, delay);	
				}

		
			},
		  resolve: {
		    personDetails: function () {
		      return $scope.personDetails;
		    }
		  }
		});
		modalInstance.result.then(function (input) {
				//take the input, its the password. 
				//make sure it makes sence (correct length)
				//then take it and add it to personDetails, (may or may not need the resolve on line 163
				//send it off to infoService
				//console.log(input);		
				var temp = $scope.personDetails;
				temp['password'] = input;  
			infoService.updatePersonDetails(temp)
			.then(function(response)
				{
					if(response.data.status === 'success')
						showAlert("Successfully updated", "success", 3500);
					else
						showAlert(response.data.status + ". No changes made", "danger", 3500);
				},
				function(error)
				{
					showAlert("An error has occured", "danger", 3500);
				});

			}, function (error) {
			  //canceled
			});
	}

	function verifyInput()
	{
		$scope.pageControls.emailError = false;
		$scope.pageControls.passwordError = false;
		$scope.pageControls.passwordValidateError = false;
		$scope.pageControls.nameError = false;
		$scope.pageControls.userNameError = false;
		var emailRex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		//if(checkRegisterInputs)//register mode
		{
			//no email address
			if($scope.personDetails.email.length < 1)
			{
				$scope.pageControls.emailError = true;
				showAlert("Email is required", "danger", 3500);
				return false;
			}//email is valid
			else if(!emailRex.test($scope.personDetails.email))
			{
				$scope.pageControls.emailError = true;
				showAlert("The emailed entered is not valid", "danger", 3500);
				return false;
			}//no name input
			else if($scope.personDetails.fName.length < 1)
			{
				$scope.pageControls.nameError = true;
				showAlert("Name in required", "danger", 3500);
				return false;
			}//only allow chars for name
			else if(!/^[a-zA-Z]*$/g.test($scope.personDetails.fName))
			{
				$scope.pageControls.nameError = true;
				showAlert("Name must contain only letters", "danger", 3500);
				return false;
			}
		}
		
		return true;
	}
});
