angular
    .module('authorization')
	.factory('roleService', function($http, $sessionStorage, AUTHORIZATION_CONSTANTS) {

		return {

			getRolesDefault : function(successCallback, errorCallback) {
				
				var url = AUTHORIZATION_CONSTANTS.AUTHORIZATION_API.URL + "profiles/default";
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