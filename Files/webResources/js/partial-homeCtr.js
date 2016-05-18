app.controller('MainPageController',['$scope','$cookies','modelService','NgTableParams','$filter','infoService','$state',
	function($scope, $cookies, modelService,NgTableParams,$filter, infoService, $state)
	{
			
		$scope.getData = function()
		{

			modelService.getData(temp).then(function(data)
			{
				//console.log("in call back ");
				
				$scope.lists= angular.copy(data);
				for(var i = 0; i < $scope.lists.length; i++)
				{	
					
				}


			});
			temp = !temp;

		}

		$scope.isAuthenticated = function()
		{
			return infoService.isAuthenticated();
		}

		var createTableParams = function(loadedList)
		{
			var pageIn = 1;
			var countIn = 10;
			$scope.tableParams[loadedList.name] = new NgTableParams({
				page: pageIn,            // show first page
				count: countIn,         // count per page
				sorting:
					{
						completed: 'desc'
					}
			
				}, 
				{
				
					//total: $scope.loadedList.tasks.length, // length of data
					total: 0,
					counts: [15,20,25],
					getData: function($defer, params) {
						// use build-in angular filter
						$scope.myData = angular.copy(loadedList.tasks, []);
					
						var orderedData = params.sorting ?
							$filter('orderBy')($scope.myData, params.orderBy()) :
							$scope.myData;
						orderedData = params.filter ?
							$filter('filter')(orderedData, params.filter()) :
							orderedData;

						$scope.tasks = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

						params.total(orderedData.length); // set total for recalc pagination
						$defer.resolve($scope.tasks);
					}
				});
		}
		
	}]);
