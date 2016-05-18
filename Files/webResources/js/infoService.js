	<!---------------------------------------- HTTP Service ------------------------------------------------>
	app.factory('infoService', ['$http','$cookies','$rootScope', function($http, $cookies, $rootScope)
	{
		var authenticated = false;
		var user = {userName:""};
		var getUrl = window.location;
		var folder = getUrl.pathname.split("/");
		folder = folder[1];
		var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + folder + "/";
		
		$http.get("/verify").then(function(response)
		{
			if(response.data.status == true)
				changeAuthStatus(true);
			else
				changeAuthStatus(false);
		});

		function changeAuthStatus(newVal)
		{
			authenticated = newVal;
			$rootScope.$broadcast('user:updated',authenticated);
		}

		return {
			changeAuthStatus:function(loggedIn, userIn)
			{
				changeAuthStatus(loggedIn);
				user = userIn;
				$cookies.mySession = userIn;
			},
			getData:function()
			{
				return $http.get("/getData")
					.then(function(response)
					{
						return response.data;	
					});
			},
			login:function(data)
			{
				return $http.post("/login", data)
				.then(function(response)
				{	
					if(response.data.status == "success")
					{
						//sessionStorage.user = data.email;
						$cookies.mySession = data.userName;
						user = data;						
						changeAuthStatus(true);
					}
					return response.data;
				});
			},
			register:function(data)
			{
				return $http.post("/register",data)
				.then(function(response)
				{
					if(response.data.status == "success")
					{
						$cookies.mySession = data.userName;
						user = data;
						changeAuthStatus(true);
					}
					return response.data;
				});
			},
			logOut:function()
			{
				//go to server and log out
				return $http.get("/logout").then(function(response)
				{
					$cookies.mySession = null;
					changeAuthStatus(false);
				});
				//sessionStorage.user = null;
				$rootScope.redirTo = 'home';
				$cookies.mySession = null;
				
			},
			isAuthenticated:function()
			{
				//return (sessionStorage.user != null);
				//return $cookies.mySession;
			//go to the server each time and ask?
				return authenticated;
			},
			getCurrentUser:function()
			{
				return $cookies.mySession == 'null' ? '' : $cookies.mySession;
			},
			getPersonDetails:function()
			{
				return $http.get("/getPersonDetails")
				.then(function(response)
				{
					return response;
				});
			},
			updatePersonDetails:function(input)
			{
				return $http.post("/updatePersonDetails", input)
				.then(function(response)
				{
					return response;
				});
			},
			updatePassword:function(passwords)
			{
				return $http.post("/updatePassword", passwords)
				.then(function(response)
				{
					return response;
				});
			},
			getBios:function()
			{
				return $http.get("/getBios")
				.then(function(response)
				{
					return response;
				});
			},
			deletePic(hash)
			{
				return $http.get("/deletePic/" + hash)
				.then(function(response)
				{
					return response;
				});
			},
			retrieveFileDetails(hash)
			{
				return $http.get("/retrieveFileDetails/" + hash)
				.then(function (response)
				{
					return response;
				});
			}
		};
	}]);
