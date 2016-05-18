app.factory('modelService', ['infoService', '$q',function(infoService, $q)
	{
		var lists = [];
		
		return {
			getData:function(force)
			{
				if (lists == null || force)
				{
					return infoService.getData().then(function(data)
					{
						lists.length = 0;
						for(var i = 0; i < data.data.length; i++)
						{
							lists.push(data.data[i]);
						}

						return lists;
					});
				}
				else
				{
					var deferred = $q.defer();
					deferred.resolve(lists);

  					return deferred.promise;
				}
			},
			isAuthenticated:function()
			{
				return (user != null);
			},
			getUser:function()
			{
				return infoService.getCurrentUser();
			}

		};
	}]);
