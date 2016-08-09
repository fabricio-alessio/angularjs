angular
    .module('authorization')
	.factory('countryService', function($http, $sessionStorage, AUTHORIZATION_CONSTANTS) {

		return {

			getCountries : function(successCallback, errorCallback) {
				
				var url = AUTHORIZATION_CONSTANTS.AUTHORIZATION_API.URL + "countries";
				var token = $sessionStorage.token;
				
				$http({
                    url: url,
                    method: 'GET',
                    cache: false,
                    data: '',
                    headers: {
		              'Content-Type': 'application/json',
		              'Authorization': 'Bearer ' + token
		            }
                })
                .success(successCallback)
                .error(errorCallback);
        	
			}

		};

	});