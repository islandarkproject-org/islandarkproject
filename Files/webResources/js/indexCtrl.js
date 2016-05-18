app.controller('MainPageController',['$scope', '$window', '$timeout','NgTableParams','$filter','infoService', '$modal',
	function($scope, $window, $timeout,NgTableParams,$filter, infoService,$modal)
	{
		$scope.lists = [{id: 1, name:'list1', last_modified: '2015-11-11', sharedWith: ['Bob@builder.com', 'Harry@potter.com', 'Marry@something.com'],
				tasks: [{id: 1, name: 'Task1', status:false},{id: 2, name: 'Task2', status:true}],
					role:"owner"},
				 {id: 2, name:'list2', last_modified: '2015-11-11', sharedWith: ['Tami', 'Harry'],
				tasks: [{id: 3, name: 'Task3', status:false},{id: 4, name: 'Task4', status:true}],
					role:"owner"},
				 {id: 3, name:'list3', last_modified: '2015-11-11', sharedWith: ['Whit', 'snappy'],
				tasks: [{id: 5, name: 'Task5', status:true},{id: 6, name: 'Task6', status:true}],
					role:"owner"},
				 {id: 4, name:'list4', last_modified: '2015-11-11', sharedWith: ['Bobby', 'Harry'],
				tasks: [{id:7, name: 'Task7', status:true},{id:8, name: 'Task8', status:true}],
					role:"view"},
				  {id:5, name:'list5', last_modified: '2015-11-11', sharedWith: ['Tamiasdf', 'Harry'],
				tasks: [{id:9, name: 'Task9', status:true},{id:10, name: 'Task10', status:true}],
					role:"edit"},
				  {id: 6, name:'list6', last_modified: '2015-11-11', sharedWith: ['Whitssss', 'snappy'],
				tasks: [{id:11, name: 'Task11', status:true},{id:12, name: 'Task12', status:false}],
					role:"view"}];

		$scope.loggedInDetails = {email:"", firstName: ""};
		$scope.myLists = [];
		$scope.sharedLists = [];
		$scope.checkBoxes = [];
		$scope.loadedList = {}; 
		$scope.adding = false;
		$scope.addedTaskInput = {text: ""};
		$scope.addedListInput = {text: ""};
		$scope.addedDelta = {lists:[],tasks:[], shares:[]}; //{lists:[], tasks:[{listName: 'xyz', name:"abc", status:t/f},{}]}
		$scope.deleteDelta = {lists:[], tasks:[], shares:[]}; //{lists:[], tasks:[]}
		$scope.pageControls = {showEditTask:false,showAddTask:false, showDeleteTask:false, markCompleteEdit:false,
					showMode:"showAll", showListDropDown: true, showMainHelpMessage:true};
		$scope.radioButtons = {selected:"showAll"};
		$scope.credentials = {url:'/logout', option:"Log out"};
		var possibleSharees = [];

		var loadData = function(callBack)
		{
			//getData
			infoService.getData().then(function(data)
			{
				if(data.status == "success")
				{
					$scope.loggedInDetails.email = data.loggedInData.email;
					$scope.loggedInDetails.firstName = data.loggedInData.name[0];
					data = data.data.data;
					$scope.lists.length = 0;
					$scope.myLists.length = 0;
					$scope.sharedLists.length = 0;

					$scope.lists = data;
					//parse data
					for(index in $scope.lists)
					{
						if($scope.lists[index].role == "owner")
							$scope.myLists.push($scope.lists[index]);
						else
							$scope.sharedLists.push($scope.lists[index]);
					}
					callBack();
				}
			});
			
		}

		$scope.loadList = function(listId)
		{
			resetDefaults();
			$scope.pageControls.showMainHelpMessage = false;	
			$scope.checkBoxes.length = 0;	
			var index = searchListsByID(listId);
			if(index > -1)
			{
				$scope.loadedList = $scope.lists[index];
				if($scope.loadedList.role == "edit" || $scope.loadedList.role == "owner")
				{
					$scope.pageControls.showEditTask = true;
					$scope.pageControls.showAddTask = true;
					$scope.pageControls.showDeleteTask = true;
					$scope.pageControls.markCompleteEdit = true;
				}
				$scope.checkBoxes.length = 0;
				for(i in $scope.loadedList.tasks)
				{
					$scope.checkBoxes[$scope.loadedList.tasks[i].id] = $scope.loadedList.tasks[i].status;
				}
			}
			else
			{
				$scope.loadedList = {}
			}
			$scope.tableParams.reload();
		}

		$scope.save = function(callBack)
		{
			console.log($scope.addedDelta);
			infoService.saveLists({addedDelta:$scope.addedDelta, deleteDelta:$scope.deleteDelta}).then(function(data)
			{
				if(data.status == "success")
				{
					$scope.addedDelta.tasks.length = 0;
					$scope.deleteDelta.tasks.length = 0;
					$scope.addedDelta.lists.length = 0;
					$scope.deleteDelta.lists.length = 0;
					$scope.addedDelta.shares.length = 0;
					callBack();
					if(data.newestListId > -1)
						$scope.loadedList.id = data.newestListId;
					$scope.refresh();
				}				
				console.log(data);
			});			
		//	console.log($scope.lists);
		//	console.log($scope.addedDelta);
		}

		$scope.pageLoad = function()
		{
			loadData(function(){});
			
			infoService.getPossibleSharees().then(function(data)
			{
				possibleSharees = data.data;
			});

			setUp($scope.loadedList.tasks,1,10);

		}

		$scope.addList = function(addedList)
		{
			if(addedList != "" && addedList != undefined)
			{
				//only add if its not already in there
				$scope.addedDelta.lists.push(addedList);
				
				$scope.save(function()
				{
					$scope.addedListInput.text = "";
				});
			}
		}

		$scope.editShare = function()
		{
			var modalInstance = $modal.open(
			{
				animation: true,
				templateUrl: 'editShareModal.html',
				controller: 'editShareModalInstanceCtrl',
				size: 'sm',
				resolve: 
				{
					items: function () 
					{
					  return angular.copy($scope.loadedList.sharedWith);
					},
					possibleSharees: function()
					{
					  return possibleSharees;
					}
				}
			});

			modalInstance.result.then(function (deltas) 
			{
				
			      //go thru selectedItem.deleted and remove from $scope.lists
				
				//$scope.deleteDelta.shares = $scope.deleteDelta.shares.concat(deltas.deleted);
				
				//go thru deltas.added and update $scope.lists
				var obj = {listId:$scope.loadedList.id, rows:deltas}; 
				$scope.addedDelta.shares.push(obj);
				console.log($scope.addedDelta.shares);
				//save lists
				$scope.save(function(){});
			}, function () 
			{
			     //cancel
			});
		}

		$scope.addTask = function(addedTask)
		{
			if(addedTask != "" && addedTask != undefined)
			{
				$scope.addedDelta.tasks.push({listId: $scope.loadedList.id, name: addedTask, status: false});
				
				$scope.save(function(){$scope.addedTaskInput.text = "";});
				$scope.pageControls.showTaskPop = false;
			}
			//$scope.adding = false;
		}
	
		$scope.removeTask = function(taskID)
		{
			$scope.deleteDelta.tasks.push({listId: $scope.loadedList.id, taskID: taskID});
			$scope.save(function(){});
			
		}

		//this is what handles remove list
		$scope.openListModal = function (size) 
		{
			var modalInstance = $modal.open(
			{
				animation: true,
				templateUrl: 'listManagerModal.html',
				controller: 'ModalInstanceCtrl',
				size: 'sm',
				resolve: 
				{
					items: function () 
					{
					  return angular.copy($scope.lists);
					},
					email: function()
					{
					  return $scope.loggedInDetails.email;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) 
			{
			      //go thru selectedItem.deleted and remove from $scope.lists
				for(i in selectedItem.deleted)
				{
					$scope.deleteDelta.lists.push(selectedItem.deleted[i].id);
				}

				$scope.deleteDelta.shares = $scope.deleteDelta.shares.concat(selectedItem.unFollowed);
				
				//go thru selectedItem.updated and update $scope.lists

				//save lists
				$scope.save(function(){});
			}, function () 
			{
			     //cancel
			});
		};

		$scope.refresh = function()
		{
			//refresh the data on the screen
			loadData(function(){
				if($scope.loadedList != 'undefined' && $scope.loadedList.id >= 0)
					$scope.loadList($scope.loadedList.id);
			});
		}

		var resetDefaults = function()
		{
			$scope.pageControls = {showEditTask:false,showAddTask:false, showDeleteTask:false, markCompleteEdit:false,
				showListDropDown:true};
		}

		var searchListsByID = function(listId)
		{
			for(i in $scope.lists)
			{
				if($scope.lists[i].id == listId)
					return i;
			}
			return -1;
		}

		/* 
		  This will search for the specified task in the loaded list. It will then 
		  go to Lists, pick out the list the loaded list corresponds to and return the 
		  task inside of it
		*/
		$scope.findTaskById = function(taskID)
		{
			
			var listIndex = searchListsByID($scope.loadedList.id);
			if(listIndex < 0)
				return null;
		

			for(i in $scope.lists[listIndex].tasks)
			{
				if($scope.lists[listIndex].tasks[i].id == taskID)
					return $scope.lists[listIndex].tasks[i];
			}
			return null;
		}	
		
		$scope.checkBoxSelected = function(taskID, name)
		{
			status = $scope.checkBoxes[taskID];
			$scope.findTaskById(taskID).status = status
			$scope.deleteDelta.tasks.push({listId: $scope.loadedList.id, taskID:taskID});
			$scope.addedDelta.tasks.push({listId: $scope.loadedList.id, name:name, status: status});
			$scope.save(function(){});
		}

		$scope.$watch("radioButtons.selected", function(oldv, newV)
		{
			//showModeToggle();
		});

		$scope.showModeToggle = function()
		{
			//$scope.pageControls.mode = radioButtons.selected;			
		}
		
		$scope.addTaskInputListener = function(event, text)
		{
			if(event.keyCode == 13)
			{
				$scope.addTask(text);
				/*var element = $window.document.getElementById("temp");
				if(element)
					element.focus();
				*/
			}
		}

		$scope.deleteAll = function()
		{
			if(confirm("Are you sure you want to remove all the completed tasks??"))
			{			
				var temp = $scope.loadedList.tasks;
				for(i in temp)
				{
					if(temp[i].status)
						$scope.deleteDelta.tasks.push({listId: $scope.loadedList.id, taskID: temp[i].id});
				}
			
				$scope.save(function(){});
			}
		}

		/*$scope.showAddTaskPopOver = function()
		{
			$scope.pageControls.showTaskPop = true;
		}*/

		var setUp = function(data, pageIn, countIn)
		{
			$scope.tableParams = new NgTableParams({
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
					counts: [10,15,20],
					getData: function($defer, params) {
						// use build-in angular filter
						$scope.myData = angular.copy($scope.loadedList.tasks, []);
					
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


	app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, email) {

		  $scope.results = {changed:[],deleted:[], unFollowed:[]}
		  $scope.lists = items;
		  $scope.loggedInEmail = {text: email};
		  /*$scope.selected = {
		    item: $scope.items[0]
		  };*/
		  $scope.editListName = function(item)
		  {
			console.log("edit name: ");
			console.log(item);
		  }

		  $scope.deleteList = function(item)
		  {
			console.log(item);
			if(item.owner == $scope.loggedInEmail.text)
			{
				$scope.results.deleted.push(item);
			}
			else
			{
				$scope.results.unFollowed.push(item.id);
			}
			for(i in $scope.lists)
			{
				if($scope.lists[i].id == item.id)
					$scope.lists.splice(i,1);
			}
			
		  }

		  $scope.ok = function () {
		    $modalInstance.close($scope.results);
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };
	});

	app.controller('editShareModalInstanceCtrl', function ($scope, $modalInstance, items, possibleSharees) {

		  $scope.shares = items;
		  $scope.addInput = "";
		  $scope.possibleSharees = [];
		  $scope.possibleSharees = $scope.possibleSharees.concat(possibleSharees);
		  $scope.alerts = [];

		  $scope.addShare = function()
		  {	
			//validate $scope.addInput
			if($scope.possibleSharees.indexOf($scope.addInput) > -1)
			{
				var dupFound = false;
				//check for duplicates
				for(i in $scope.shares)
				{
					if($scope.shares[i].email == $scope.addInput)
					{
						dupFound = true;
						break;
					}	
				}
				if(!dupFound)
				{
					var obj = {email: $scope.addInput, role: 'view'};
					//$scope.results.added.push(obj);
					$scope.shares.push(obj);
					$scope.alerts.splice(0,1);
					$scope.alerts.push({message:"Successfully Added", type:"success"});
				}
				else
				{
					$scope.alerts.splice(0,1);
					$scope.alerts.push({message:"That user name is already listed. Will not add again", type:"danger"});
				}
			}
			else
			{
				$scope.alerts.splice(0,1);
				$scope.alerts.push({message:"Not a valid user name", type:"danger"});
			}
			$scope.addInput = "";
		  }

		  $scope.deleteShare = function(item)
		  {			
			for(i in $scope.shares)
			{
				if($scope.shares[i].email == item.email)
				{
					$scope.shares.splice(i,1);
					break;
				}
			}
			
		  }

		  $scope.ok = function () {
		    //$modalInstance.close($scope.results);
			if($scope.addInput != "")
			{
				if(confirm("The person in the search box hasn't been added as a share. Are you sure you want to exit?"))
					$modalInstance.close($scope.shares);
			}					
			else
				$modalInstance.close($scope.shares);
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };
	});

