app.controller('viewContentCtrl', ['$rootScope','$scope','modelService','infoService','$state','$location',
	 function($rootScope, $scope, modelService,infoService,$state,$location)
{
	/*var dateUploaded = {title:"Date Uploaded", sortFunction:dateUploadedSort};*/
	var dateOfEvent = {title:"Date Of Event", sortFunction:dateOfEventSort, orderBy:""};
	var alphabetical = {title:"Alphabetical Order by Event name", sortFunction:alphabeticalSort, orderBy:"title"};
	var location = {title:"Location", sortFunction:locationSort, orderBy:"title"};
	var privacy = {title:"My Photos", sortFunction:privacySort, orderBy:""};
	var mostRecent = {title:"Uploaded Date", sortFunction:mostRecentSort, orderBy:""};

	var currentCat;

	$scope.orderByParam = "title";

	/*function dateUploadedSort()
	{
		rawData.sort(function(a,b)
		{
			return a.eventDate < b.eventDate;
		});
	}*/
	function dateOfEventSort()
	{
		var temp = rawData.sort(function(a,b)
		{
			return parseInt(b.eventDate) - parseInt(a.eventDate);
		});

		var sorted = [];
		
		var monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
		];

		//load up the different categories
		for(obj in temp)
		{
			var theDateKey = new Date(parseInt(temp[obj].eventDate));
			theDateKey = theDateKey.getDate() + "-" + monthNames[theDateKey.getMonth()] + "-" + theDateKey.getFullYear();
			var theArray = sorted[theDateKey];
			if(Array.isArray(theArray))
				theArray.push(temp[obj]);
			else
				sorted[theDateKey] = [temp[obj]];
		}
			
		//combine the category title, and data into one, sorted array
		return combineTitleWithData(sorted);
	}
	function alphabeticalSort()
	{
		var temp = rawData.sort(function(a,b)
		{
			return a.title < b.title;
		});

		var sorted = [];
		//load up the different categories
		for(obj in temp)
		{
			var theArray = sorted[temp[obj].title.substring(0,1)];
			if(Array.isArray(theArray))
				theArray.push(temp[obj]);
			else
				sorted[temp[obj].title.substring(0,1)] = [temp[obj]];
		}
			
		//combine the category title, and data into one, sorted array
		return combineTitleWithData(sorted);
	}
	function locationSort()
	{
		//sort the raw data by the location
		var temp = rawData.sort(function(a,b)
		{
			return a.location > b.loction;
		});

		var sorted = [];
		//load up the different categories
		for(obj in temp)
		{
			var theArray = sorted[temp[obj].location];
			if(Array.isArray(theArray))
				theArray.push(temp[obj]);
			else
				sorted[temp[obj].location] = [temp[obj]];
		}
			
		//combine the category title, and data into one, sorted array
		return combineTitleWithData(sorted);
	}

	function privacySort()
	{

		var sorted = [];
		var temp = angular.copy(rawData);
		//load up the different categories
		for(obj in temp)
		{
			//the pic owner should already by lower case, the modelServer may not be. 
			if(temp[obj].owner.toLowerCase() == modelService.getUser().toLowerCase())
			{
				var key = temp[obj].privacy;
				key = key.charAt(0).toUpperCase() + key.slice(1);
				var theArray = sorted[key];
				if(Array.isArray(theArray))
					theArray.push(temp[obj]);
				else
					sorted[key] = [temp[obj]];	
			}
		}
			
		//combine the category title, and data into one, sorted array
		return combineTitleWithData(sorted);
	}

	function mostRecentSort()
	{

		var temp = rawData.sort(function(a,b)
		{
			return b.uploadedDate - a.uploadedDate;
		});

		//var temp = angular.copy(rawData);

		var sorted = [];
		sorted['Uploaded Date'] = temp;
			
		//combine the category title, and data into one, sorted array
		return combineTitleWithData(sorted);
	}

	function combineTitleWithData(sorted)
	{
		var finalArray = [];
		for(key in sorted)
		{
			finalArray.push({title:key, pictures:sorted[key]});
		}
		return finalArray;
	}

	$scope.categories = [dateOfEvent, alphabetical, location,privacy, mostRecent];
	$scope.pageControls = {currentlySelectedCat:alphabetical};

	$scope.dataRows = [];
	var rawData = [];
	var sortedData = [];
	//run this when page is loaded initially and get the data
	modelService.getData(true).then(function(data)
	{
		rawData = angular.fromJson(data);
		
		$scope.categoryChanged(typeof($rootScope.currSelectedCat) == 'undefined' ? alphabetical : $rootScope.currSelectedCat);
	});

/*[{title:'A', pictures:[{url:"http://domain.me/wp-content/themes/domaintheme/logo200200.png", title:"My Event", eventDate:"Nov 3rd 1999", location:"LOCAL", owner: "ME", description:"describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me "},
{url:"http://domain.me/wp-content/themes/domaintheme/logo200200.png", title:"My Event", eventDate:"Nov 3rd 1999", location:"LOCAL", owner: "ME", description:"describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me "},
{url:"http://domain.me/wp-content/themes/domaintheme/logo200200.png", title:"My Event", eventDate:"Nov 3rd 1999", location:"LOCAL", owner: "ME", description:"describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me "},
{url:"http://domain.me/wp-content/themes/domaintheme/logo200200.png", title:"My Event", eventDate:"Nov 3rd 1999", location:"LOCAL", owner: "ME", description:"describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me "},
{url:"http://domain.me/wp-content/themes/domaintheme/logo200200.png", title:"My Event", eventDate:"Nov 3rd 1999", location:"LOCAL", owner: "ME", description:"describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me "},
{url:"http://domain.me/wp-content/themes/domaintheme/logo200200.png", title:"My Event", eventDate:"Nov 3rd 1999", location:"LOCAL", owner: "ME", description:"describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me describe me "}]}];
*/

	$scope.categoryChanged = function(newCat)
	{
		$scope.pageControls.currentlySelectedCat = newCat;
		$scope.dataRows = newCat.sortFunction();
		currentCat = newCat;
		$rootScope.currSelectedCat = currentCat;
	}

	$scope.loadMore = function() 
	{
		var stop = $scope.dataRows.length + 8;
		for(var i = $scope.dataRows.length; i < stop; i++)
		{
			$scope.dataRows.length.push(sortedData[i]);
		}

	}
	$scope.checkPhotoOwner = function(picOwner)
	{
		return modelService.getUser() == picOwner;
	}


/* been moved to viewPicture	
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
						modelService.getData(true).then(function(data)
						{
							rawData = angular.fromJson(data);
							$scope.categoryChanged(currentCat);
						});
				}
			});
		}
	}
*/

	$scope.viewPicture = function(pic)
	{
		//$state.go('viewPicture', {id: pic.hash});
		//$location.href = '/viewPicture?id='+pic.hash;
		$location.path('/viewPicture').search({id: pic.hash});
	}

	//for loading when someone presses the back button to get here
	$scope.categoryChanged(typeof($rootScope.currSelectedCat) == 'undefined' ? alphabetical : $rootScope.currSelectedCat);

	
}]);
