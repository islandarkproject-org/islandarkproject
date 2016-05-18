	app.controller('aboutController',function($scope, infoService, $timeout, $state, $window)
	{
		$scope.persons = [];
	
		infoService.getBios().then(function(data)
		{
			data = data.data;
			$scope.persons.length = 0;
			for(var i = 0; i < data.length; i++)
			{
				$scope.persons.push(data[i]);
			}
		});

		var showAlert = function(message, type, delay)
		{
			$scope.alerts.push({message:message, type:type});
			
			$timeout(function()
			{//controls the fade out of the alert
				$scope.alerts.splice(0,1);
			}, delay);	
		}

		var screenWidth = $window.innerWidth;

		if (screenWidth < 700){
			$scope.smallScreen = true;
		}else{
			$scope.smallScreen = false;
		}

	});

