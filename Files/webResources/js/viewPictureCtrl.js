app.controller('viewPictureController', ['$scope','modelService','infoService','$stateParams', '$state',
	function($scope, modelService,infoService, $stateParams,$state)
{
	//$$location.search().id;
	$scope.pic;

	infoService.retrieveFileDetails($stateParams.id)
	.then(function(input)
	{
		$scope.pic = input.data;
	},
	function(error)
	{
		console.log(error);
	});

	//console.log($scope.pic);
	//console.log($location.search().id);	

	$scope.getLoggedInUser = function()
	{
		return modelService.getUser();
	}

	$scope.deletePic = function(url)
	{
		if(confirm("Are you sure you want to delete this file?"))
		{
			urlParsed = url.split("/",-1);
			console.log(urlParsed[1]);
			infoService.deletePic(urlParsed[1]).then(function(data)
			{
				if(data.data.status === "Success")
				{
						$state.go("viewContent");
						/*modelService.getData(true).then(function(data)
						{
							rawData = angular.fromJson(data);
							$scope.categoryChanged(currentCat);
						});*/
				}
				else
					alert("An error has occurred");
			},
			function(error)
			{
				console.log(error);
			});
		}
	}
}]);
