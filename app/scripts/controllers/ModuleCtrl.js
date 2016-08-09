angular.module('authorization').controller('ModuleCtrl', 
	        function(moduleService, countryService, moduleAdapterIn, moduleAdapterOut,
	        		$scope, $timeout, $q, $sessionStorage, $location, $stateParams, $state, $translate){

	$scope.transformChip = function(chip) {

      if (angular.isObject(chip)) {
        return chip;
      }
     
      return { name: chip, code: 'new' };
    };
    
    $scope.querySearch = function(query) {
      var results = query ? $sessionStorage.countries.filter($scope.createFilterFor(query)) : [];
      return results;
    };
 
    $scope.createFilterFor = function(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(countries) {
        return (countries._lowername.indexOf(lowercaseQuery) === 0) ||
            (countries._lowercode.indexOf(lowercaseQuery) === 0);
      };
    };

    $scope.transformChipRoles = function(chip) {
    	    	
      if (angular.isObject(chip)) {
        return chip;
      }

      return { name: chip };
    };
    
    $scope.querySearchRoles = function(query) {
    	
      var results = query ? $sessionStorage.rolesDefault.filter($scope.createFilterForRoles(query)) : [];
      return results;
    };
 
    $scope.createFilterForRoles = function(query) {
      var uppercaseQuery = angular.uppercase(query);
      return function filterFn(roles) {
        return (roles.indexOf(uppercaseQuery) === 0) || (roles.indexOf(uppercaseQuery) === 0);
      };
    };

    $scope.save = function() {

    	var sucessSave = function(response) {
			$location.path('/modules');
		};

		var errorSave = function(error) {
			$translate(error.code).then(function (translatedValue) {
            	swal("Error", translatedValue, "error"); 
        	});
		};

		$scope.module.features = moduleAdapterOut.adaptFeatures($scope.features);
		moduleService.saveModule(sucessSave, errorSave, $scope.module);

	};

	$scope.remove = function() {

		swal({   
			title: "Are you sure?",   
			text: "You will not be able to recover this module!",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "Yes, delete it!",   
			cancelButtonText: "No, cancel!",   
			closeOnConfirm: false,   
			closeOnCancel: false }, 
			function (isConfirm) {   
				if (isConfirm) {  
					var sucessRemove = function(response) {
						swal("Deleted!", "Your module has been deleted.", "success");   
						$location.path('/modules');
					};
					var errorRemove = function(error) {
						$translate(error.code).then(function (translatedValue) {
			            	swal("Error", translatedValue, "error"); 
			        	});
					};   
					moduleService.remove(sucessRemove, errorRemove, $stateParams.name);
				} else {     
					swal("Cancelled", "Your module is safe :)", "error");   
				} 
			});
	};

	var load = function() {

		var sucessCallback = function(response) {
			$scope.module = response;
			$scope.features = moduleAdapterIn.adaptFeatures($scope.module.features);
			$scope.rolesChoices = $sessionStorage.rolesDefault;
			console.log($sessionStorage.rolesDefault);
		};

		var errorCallback = function(error) {
			$translate(error.code).then(function (translatedValue) {
            	swal("Error", translatedValue, "error"); 
        	});
        	$scope.hasError = true; 	
		};
		moduleService.getModule(sucessCallback, errorCallback, $stateParams.name);
	};

	var refresh = function() {

		var sucessRefresh = function(response) {
			load();
		};

		var errorRefresh = function(error) {
			$translate(error.code).then(function (translatedValue) {
            	swal("Error", translatedValue, "error"); 
        	});
        	$scope.hasError = true;
		};

		moduleService.refresh(sucessRefresh, errorRefresh, $stateParams.name);
	};

	if($stateParams.name != "new"){

		refresh();
	}
});