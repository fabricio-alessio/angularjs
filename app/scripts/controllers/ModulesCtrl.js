angular.module('authorization').controller('ModulesCtrl', function($scope, moduleService){

	var sucessCallback = function(response){
		$scope.modules = response;
	};

	var errorCallback = function(){
		swal("Error", "Error, try again later", "error"); 
	};


	var response = moduleService.getModules(sucessCallback, errorCallback);

});