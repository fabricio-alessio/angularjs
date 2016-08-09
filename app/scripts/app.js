
angular.module('authorization', ['ui.router', 'ui.bootstrap', 'ngMaterial','ngStorage', 'pascalprecht.translate'])
	.config(function($stateProvider, $urlRouterProvider){
		
		$stateProvider
	        .state('modules', {
	            url: '/modules',
	            templateUrl: 'views/modules/modules.html',
	            controller: 'ModulesCtrl'
	        })
	        .state('module', {
	            url: '/module/:name',
	            templateUrl: 'views/modules/module.html',
	            controller: 'ModuleCtrl'
	        })
	        .state('moduleNew', {
	            url: '/module-new',
	            templateUrl: 'views/modules/module-new.html',
	            controller: 'ModuleNewCtrl'
	        })
	        .state('login', {
	            url: '/login',
	            templateUrl: 'views/login/login.html',
	            controller: 'LoginCtrl'
	        });

	        $urlRouterProvider.otherwise( 'login' );
		
	})
	.config(function($translateProvider) {

		$translateProvider.useStaticFilesLoader({
		    prefix: '../i18n/',
		    suffix: '.json'
		});
	   $translateProvider.preferredLanguage('en');


	});
