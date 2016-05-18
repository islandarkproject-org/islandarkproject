var app = angular.module('myApp',['ui.bootstrap','ui.router','ngCookies','ngTable','angularFileUpload','ngAnimate']).run(
function($rootScope, $state, infoService, $location, $window)
{
	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		if (toState.authenticate && !infoService.isAuthenticated()){
		  // User isn’t authenticated
		  $state.transitionTo("logIn");
		  $rootScope.$broadcast('tab:change',toState.url);
          $rootScope.redirTo = toState.name; //save this so once they log in we redirect to their first choice
		  event.preventDefault(); 
		}
		//else
		//	$rootScope.$broadcast('tab:change',toState.url);

	  });

	$rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
		if(toState.url.indexOf("/viewPicture") > -1)
			$("html, body").animate({ scrollTop: 0 }, 200);

		if (!$window.ga)
                    return;
 
        $window.ga('send', 'pageview', { page: $location.path() });
	})
});

app.config(function($stateProvider, $urlRouterProvider) {
    
   // $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'static/views/partial-home.html',
			controller: 'MainPageController',
			authenticate: false
        })

        .state('uploader', {
            url: '/uploader',
            templateUrl: 'static/views/uploader.html',
			controller: 'UploaderCtrl',
			authenticate: true
        })

        .state('viewContent', {
            url: '/viewContent',
            templateUrl: 'static/views/viewContent.html',
			controller: 'viewContentCtrl',
			authenticate: true
        })

		.state('viewPicture',{
			url:'/viewPicture/:id',
			params:{input:{}},
			templateUrl: 'static/views/viewPicture.html',
			controller: 'viewPictureController',
			authenticate: true
		})
        
        // Login page =================================
        .state('logIn', {
            url: '/logIn',
			views: {
                '': { templateUrl: 'static/views/login.html',
						controller: 'LoginController',
						authenticate: false
                },
                'userInputDetails@logIn': { 
                    templateUrl: 'static/views/userDetailsInput.html'
                }
            }
            
        })

	    // Logout page =================================
        .state('logOut', {
            url: '/logOut',
            templateUrl: 'static/views/partial-home.html',
			controller: function($scope, $state, infoService){
				infoService.logOut().then(function()
				{
					$state.transitionTo('home', {arg:'arg'});
				});
			},
			authenticate: false
        })

        .state('about', {
            url: '/about',
            templateUrl: 'static/views/about.html',
			controller: 'aboutController',
			authenticate: false
        })

        .state('contact', {
            url: '/contact',
            templateUrl: 'static/views/contact.html',
			controller: 'contactController',
			authenticate: false
        })

		.state('userProfile',{
			url:'/userProfile',
			views: {
                '': { templateUrl:'static/views/userProfile.html',
						controller: 'userProfileController'
                },
                'userInputDetails@userProfile': { 
                    templateUrl: 'static/views/userProfileInput.html'
                }
            },
			authenticate: true
			
		})

	

		$urlRouterProvider.otherwise("/");        

})

.directive('checkUser', ['$rootScope', '$location', 'infoService', 
  function ($r, $location, infoService) {
    return {
      link: function (scope, elem, attrs, ctrl) {
        $r.$on('$routeChangeStart', function(e, curr, prev){
			if(infoService.isAuthenticated() == true)
				$r.authenticated = true;
			else
				$r.authenticated = false;	          
			//if (prev.authenticate && !infoService.isAuthenticated()) {
            // reload the login route
          //}
          /*
          * IMPORTANT:
          * It's not difficult to fool the previous control,
          * so it's really IMPORTANT to repeat server side
          * the same control before sending back reserved data.
          */
        });
      }
    }
  }]);
	
