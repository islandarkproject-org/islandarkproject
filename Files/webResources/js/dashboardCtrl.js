app.controller('dashboardController',function($scope, infoService, $timeout, $state)
	{
		//function to auto refresh after so much time??
		$scope.changeState = function(stateToGo)
		{
			switch(stateToGo)
			{
				case 'upload':
					$state.transitionTo('dashboard.uploader', {arg:'arg'});
					break;	
				case 'view':
					$state.transitionTo('dashboard.viewContent', {arg:'arg'});
					break;									
			}
		}
	});

