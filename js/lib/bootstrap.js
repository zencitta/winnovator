var app = angular.module('Sprot', ['ngSanitize', 'ngRoute', 'pascalprecht.translate'], function($routeProvider){
		$routeProvider.when('/', {
			templateUrl : '/js/modules/main/index.html'
		}).when('/care', {
			templateUrl : '/js/modules/care/index.html',
			controller : 'CareCtrl'
		}).when('/options', {
            templateUrl : '/js/modules/voca/options.html',
            controller : 'VocaCtrl'
        }).when('/share', {
            templateUrl : '/js/modules/voca/share.html',
            controller : 'VocaCtrl'
        }).when('/remind', {
            templateUrl : '/js/modules/voca/remind.html',
            controller : 'VocaCtrl'
        }).when('/sent', {
            templateUrl : '/js/modules/voca/sent.html',
            controller : 'VocaCtrl'
        }).when('/record', {
            templateUrl : '/js/modules/voca/record.html',
            controller : 'VocaCtrl'
        }).when('/voca', {
            templateUrl : '/js/modules/voca/index.html',
            controller : 'VocaCtrl'
        }).when('/cont/more', {
			templateUrl : '/js/modules/cont/more.html',
			controller : 'ContCtrl'
		}).when('/cont', {
			templateUrl : '/js/modules/cont/index.html',
			controller : 'ContCtrl'
		}).when('/reve', {
			templateUrl : '/js/modules/reve/index.html',
			controller : 'ReveCtrl'
		}).otherwise({
			redirectTo : '/'
		});
	}),
	JSON_CALL = function(){};

app.run(function($rootScope) {
     $rootScope.startTimestamp = moment().format('YYYY-M-DD H:m:s');
   })
	.constant('INFO', {
	   	'TEAM'    : 'Winnovatiors',
	   	'VERSION' : '1.0.0'
   })
   .constant('SETTINGS', {
	   	title : 'Sprout'
   });

app.config(['$translateProvider', function ($translateProvider) {
	$translateProvider.translations('en', {
		TITLE                : 'Sprout',
		MENU_LIFE_CARE       : 'Life Care',
		MENU_VOCAL_MSG       : 'Vocal Message',
		MENU_CONTACTS        : 'Contacts',
		MENU_REVEAL          : 'Reveal',
		CARE_FRIENDS_AROUND  : 'Friends Around',
		CARE_FACILITIES      : 'Caring Houses',
		CARE_PARKS           : 'Parks',
		CARE_HOSPITALS       : 'Hospitals',
		CARE_DISTANCE		 : 'Distance',
		CARE_FRIENDS_GOTO    : 'Goto',
		CARE_FRIENDS_CALL    : 'Call',
		CARE_FRIENDS_CALLVM  : 'Vocal Msg',
		CARE_FRIENDS_INVITE  : 'Invite',
        VOCA_SHARE           : 'SHARE',
        VOCA_REMIND          : 'REMIND',
        VOCA_RECORD          : 'RECORD',
        VOCA_SENT            : 'VOICE MEMO SENT',
        CONT_CONTACTS_LIST   : 'Contacts List',
        CONT_MY_SON          : 'Son',
        CONT_SET_DEFAULT     : 'Set Default',
        CONT_CALL            : 'Call',
        REVE_RECORDING	     : 'Record Voice',
		REVE_UNLOCK	         : 'Unlock Will',
		REVE_LOG_TIME        : 'Log time',
		REVE_LOG_SEC		 : 'Sec.',
		REVE_CLOCK			 : 'Timer',
		REVE_CLOCK_TIME		 : 'Timer Time',
		REVE_VOCLOG          : 'Vocal Memo',
		REVE_REMOVE	         : 'Remove',
		REVE_PLAY			 : 'Play',
        REVE_RECORD			 : 'Record',
        REVE_SET_UNLOCKER    : 'Set Unlocker',
        REVE_HOME			 : 'Home',
        REVE_BACK	         : 'Back'
	});
	$translateProvider.preferredLanguage('en');
}]);

app.controller('MainCtrl', 
	function($rootScope, $scope, $http, $interval, $location, SETTINGS, INFO){//MainCtr body

		console.info('App started @ ' + $rootScope.startTimestamp);
		console.info('App Info: ', INFO);

		$scope.SETTINGS = SETTINGS;
		$scope.goto = function(path){
			$location.url(path)
		};
		$scope.back = function(){
			history.back();	
		}

	}//eo MainCtrl body
);//eo MainCtrl