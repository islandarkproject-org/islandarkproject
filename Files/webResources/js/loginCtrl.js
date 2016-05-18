	app.controller('LoginController',function($rootScope, $scope, infoService, $timeout, $state)
	{
		//$scope.postURL = {text:"/login"};
		$scope.registerMode = false;
		$scope.pageControls = {nameError: false, userNameError: false, emailError: false, passwordError: false, passwordValidateError:false,disableUserName:false};
		$scope.personDetails = {userName: '', email:'', password:'', passwordValidate:'', fName:''};
		$scope.alerts = [];

		function checkIfAlreadyLoggedIn()
		{
			if(infoService.isAuthenticated() == true)
				transTo();
		}

		$scope.$on('user:updated', function(event,data) {
		 // you could inspect the data to see if what you care about changed, or just update your own scope
			if(data == true)
			{
				transTo();
			}
	    });

		$scope.login = function()
		{
			if(validateInput(false))
			{
				infoService.login($scope.personDetails).then(function(data)
				{
					if(data.status == "success") //double check successful 
						transTo();//window.location.replace(data.data);
					else if (data.status == "notAuth")
						showAlert("Invalid user name or password", "danger", 3500);
					else
						showAlert("Unknown Error", "danger", 3500);
				},function(data)
				{
					if(data.data.indexOf("email") > -1)
						$scope.pageControls.emailError = true;
					else
						$scope.pageControls.emailError = false;

					if(data.data.indexOf("Password") > -1)
						$scope.pageControls.passwordError = true;
					else
						$scope.pageControls.passwordError = false;

					showAlert(data.data, "danger", 3500);
				});
			}
		}

		$scope.register = function()
		{
			//make sure confirmation equals password
			if(validateInput(true))
			{
				infoService.register($scope.personDetails).then(function(data)
				{
					if(data.status == "success") //double check successful 
						transTo();//window.location.replace(data.data);
					else
						showAlert(data.data, "danger", 3500);

				},function(data)
				{
					showAlert(data.data, "danger", 3500);
				});
			}
		}

		function validateInput(checkRegisterInputs)
		{
			$scope.pageControls.emailError = false;
			$scope.pageControls.passwordError = false;
			$scope.pageControls.passwordValidateError = false;
			$scope.pageControls.nameError = false;
			$scope.pageControls.userNameError = false;

			var emailRex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			//user name too short
			if($scope.personDetails.userName.length < 4)
			{
				$scope.pageControls.userNameError = true;
				showAlert("User name must be at least 4 characters long", "danger", 3500);
				return false;
			}//user name too long
			else if($scope.personDetails.userName.length > 25)
			{
				$scope.pageControls.userNameError = true;
				showAlert("User name can not be longer than 24 characters", "danger", 3500);
				return false;
			}//allow only numeric chars in user name
			else if (!/^[a-zA-Z0-9_-]*$/g.test($scope.personDetails.userName))
			{
				$scope.pageControls.userNameError = true;
				showAlert("User name can only contain numbers and letters", "danger", 3500);
				return false;
			}//password too short
			else if($scope.personDetails.password.length < 4)
			{
				$scope.pageControls.passwordError = true;
				showAlert("Password must be at least 4 characters long", "danger", 3500);
				return false;
			}

			if(checkRegisterInputs)//register mode
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
				else if(!/^\w+( \w+)*$/g.test($scope.personDetails.fName))
				{
					$scope.pageControls.nameError = true;
					showAlert("Name must contain only letters", "danger", 3500);
					return false;
				}//check if passwords match
				else if($scope.personDetails.password !== $scope.personDetails.passwordValidate)
				{
					showAlert("Passwords do not match. Re-enter them and try again", "danger", 4500);
					$scope.pageControls.passwordError = true;
					$scope.pageControls.passwordValidateError = true;
					return false;
				}	
			}
			
			return true;
			
		}

		$scope.toggleRegister = function()
		{
			$scope.registerMode = !$scope.registerMode;
		} 

		var showAlert = function(message, type, delay)
		{
			$scope.alerts.push({message:message, type:type});
			
			$timeout(function()
			{//controls the fade out of the alert
				$scope.alerts.splice(0,1);
			}, delay);	
		}

		$scope.showAlert1 = function()
		{
			showAlert("this is an alert", "danger", 3500);
		}

		function transTo()
		{
			var goTo = typeof($rootScope.redirTo) === 'undefined' ? 'home' : $rootScope.redirTo;
			$state.transitionTo(goTo, {arg:'arg'});
		}

	});

