app.controller('mainCtrl',function($scope, infoService, $timeout, $state)
	{
			$scope.authenticated = infoService.isAuthenticated();
			$scope.userName = "";
			$scope.$on('user:updated', function(event,data) {
				 // you could inspect the data to see if what you care about changed, or just update your own scope
				 $scope.authenticated = data;
				if(infoService.isAuthenticated() == true)
				{
					/*var toGoTo = $scope.activeTab.split('/');
					toGoTo = toGoTo[1];
					toGoTo = toGoTo === "" ? 'home' : toGoTo;
					$state.transitionTo(toGoTo, {arg:'arg'});*/
					
					//$state.transitionTo('viewContent', {arg:'arg'});
				}
				$scope.userName = infoService.getCurrentUser();
			   });

			$scope.$state = $state;
			$scope.$on('tab:change', function(event,data){	
				$scope.activeTab = data;
				console.log($scope.activeTab);
			});

			$scope.temp = function()
			{ console.log($scope.authenticated); }

			$scope.onLoad = function()
			{
				infoService.changeAuthStatus(loggedIn, user);
			}
	});
