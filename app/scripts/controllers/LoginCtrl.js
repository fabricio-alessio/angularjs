angular.module('authorization').controller('LoginCtrl', function(
	$scope, $location, $sessionStorage, $translate, 
	loginService, countryService, roleService){
	
	$scope.user = {};

	$scope.error = '';

	var sucessCallback = function(response){

		function loadCountries(countries) {
	      	return countries.map(function (country) {
		        country._lowername = country.name.toLowerCase();
		        country._lowercode = country.code.toLowerCase();
		        return country;
	      	});
		}
		
		var sucessCountry = function(countriesResponse){
			$sessionStorage.countries = loadCountries(countriesResponse);
		};

		var errorCountry = function(){
			swal("Error", "Error, try again later", "error"); 
		};
		
		countryService.getCountries(sucessCountry, errorCountry);

		var sucessRoles = function(rolesResponse){
			$sessionStorage.rolesDefault = rolesResponse;
		};

		var errorRoles = function(){
			swal("Error", "Error, try again later", "error"); 
		};

		roleService.getRolesDefault(sucessRoles, errorRoles);

		$location.path('/modules');
	};

	var errorCallback = function(error){
		$translate(error.code).then(function (translatedValue) {
            $scope.error = translatedValue;
        });
	};

	$scope.submit = function(){

		if ($scope.formLogin.$valid) {
			loginService.doLogin($scope.user, sucessCallback, errorCallback);
		}
	};

});