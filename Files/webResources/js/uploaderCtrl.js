'use strict';


app.controller('UploaderCtrl', ['$scope', '$state', 'FileUploader','$timeout', function($scope, $state, FileUploader,$timeout) {
        var uploader = $scope.uploader = new FileUploader({
            url: '/uploadFile',
			removeAfterUpload: true
        });
		$scope.fileDetails = [];
		$scope.alertMessage = '';

		function showAlert(message, length)
		{
			$scope.alertMessage = message;

			stop = $timeout(function() {
            	$scope.alertMessage = '';
          	}, length);
		}

		$scope.uploadAll = function()
		{
			for(var i = 0; i < $scope.uploader.queue.length; i++)
			{
				$scope.uploadItem($scope.uploader.queue[i]);
			}
		}

		$scope.uploadItem = function(fileItem)
		{
			console.log(fileItem);	

			for(var i = 0; i < $scope.uploader.queue.length; i++)
			{
				if($scope.uploader.queue[i].file.name == fileItem.file.name)
				{
					if($scope.fileDetails[i].name == "" ||
						$scope.fileDetails[i].location == "" ||
						$scope.fileDetails[i].description == "" ||
						$scope.fileDetails[i].date == "")
					{
						//alert("Fill in the missing file details before uploading");
						showAlert("Fill in missing file details before uploading", 6000);
					}
					else
					{
						fileItem.upload();
					}
				}
			}
		}

		$scope.removeItem = function(fileItem, removeItemFromList)
		{
			for(var i = 0; i < $scope.uploader.queue.length; i++)
			{
				if(($scope.uploader.queue[i].file.name === fileItem.file.name))
					{
						$scope.fileDetails.splice(i,1);
					}
			}
			if(removeItemFromList == true || removeItemFromList == "true")
				fileItem.remove();
		}

		$scope.clearQueue = function()
		{
			for(var i = $scope.uploader.queue.length-1; i >= 0; i--)
			{
				$scope.removeItem($scope.uploader.queue[i], true);
			}
		}
		
        // FILTERS

        uploader.filters.push({
            name: 'imageType',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                /*return this.queue.length < 10;*/
		        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
		        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            },
			message:'That type of file is not supported. Only picture files are allowed'
        });
		uploader.filters.push(
			{
			name: 'imageSize',
			fn: function(item, options){
					return item.size < 5242880; //Less than two megs
			},
			message:'File size must be less than 5 megabytes'
		});

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
			showAlert(filter.message, 6000);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);	
			//check if already in queue
			var removed = false;
			for(var i = 0; i < $scope.uploader.queue.length; i++)
			{
				if(($scope.uploader.queue[i].file.name === fileItem.file.name) &&
					($scope.uploader.queue[i] !== fileItem))
					{
						alert(fileItem.file.name + ' is already in upload queue. Will not be added'); 
						$scope.uploader.queue.splice(i,1);
						removed = true;
					}
			}
			if(!removed)
			{
				//add empty meta data to the list
				$scope.fileDetails.push({name:"",date:(new Date()).getTime(),description:'',location:'',privacy:'private'});
			}
		}

        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(fileItem) {
			//if all is well find the file name in the queue, figure out what meta data to add to formData.
			for(var i = 0; i < $scope.uploader.queue.length; i++)
			{
				if(($scope.uploader.queue[i].file.name === fileItem.file.name))
					{
						$scope.fileDetails[i].date = (new Date($scope.fileDetails[i].date)).getTime();
						fileItem.formData.push($scope.fileDetails[i]);
					}
			}
            //console.info('onBeforeUploadItem', fileItem);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
			$scope.removeItem(fileItem,false);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            if($scope.uploader.queue.length <= 0 && confirm("Upload complete. Would you like to go view all the uploaded content?"))
			{
				$state.transitionTo('viewContent', {arg:'arg'});
			}
        };



		//------------------------ DATE PICKER STUFF ---------------------------------

		  // Disable weekend selection
		  $scope.disabled = function(date, mode) {
			return false;
		  };

		  $scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date(1700, 1, 1);
		  };

		  $scope.toggleMin();

		  $scope.maxDate = new Date();


		  $scope.setDate = function(year, month, day) {
			$scope.dt = new Date(year, month, day);
		  };

		  $scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		  };

		  $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		  $scope.format = $scope.formats[0];
		  $scope.altInputFormats = ['M!/d!/yyyy'];

    }]);
