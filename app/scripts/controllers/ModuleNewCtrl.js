angular.module('authorization').controller('ModuleNewCtrl', 
		function($scope, $location, $translate, moduleService) {

	$scope.module = {};

	$scope.create = function() {

		var callbackSuccess = function(response) {

			var successRefresh = function(responseRefresh) {
				$location.path('/module/' + $scope.module.name);
			};

			var errorRefresh = function(refreshError) {
				$translate(refreshError.code).then(function (translatedValue) {
            		swal("Error", translatedValue, "error"); 
        		});
			};

			moduleService.refresh(successRefresh, errorRefresh, $scope.module.name);
		};

		var callbackError = function(error) {
			$translate(error.code).then(function (translatedValue) {
            	swal("Error", translatedValue, "error"); 
        	});
		};

		if ($scope.form.$valid) {

			moduleService.create(callbackSuccess, callbackError, $scope.module);
		}
	};
});