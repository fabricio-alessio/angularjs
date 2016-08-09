angular
    .module('authorization')
	.factory('moduleService', function($http, $sessionStorage, AUTHORIZATION_CONSTANTS) {

		return {

			getModules : function(successCallback, errorCallback) {

				var url = AUTHORIZATION_CONSTANTS.AUTHORIZATION_API.URL + "modules";
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
        	
			},

			getModule : function(successCallback, errorCallback, moduleName) {

				var url = AUTHORIZATION_CONSTANTS.AUTHORIZATION_API.URL + "modules/" + moduleName;
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
        	
			},

			saveModule : function(successCallback, errorCallback, module) {

				var url = AUTHORIZATION_CONSTANTS.AUTHORIZATION_API.URL + "modules/" + module.name;
				var token = $sessionStorage.token;
				
				$http({
                    url: url,
                    method: 'PUT',
                    cache: false,
                    data: module,
                    headers: {
		              'Content-Type': 'application/json',
		              'Authorization': 'Bearer ' + token
		            }
                })
                .success(successCallback)
                .error(errorCallback);
        	
			},

			create : function(successCallback, errorCallback, module) {

				var url = AUTHORIZATION_CONSTANTS.AUTHORIZATION_API.URL + "modules";
				var token = $sessionStorage.token;
				
				$http({
                    url: url,
                    method: 'POST',
                    cache: false,
                    data: module,
                    headers: {
		              'Content-Type': 'application/json',
		              'Authorization': 'Bearer ' + token
		            }
                })
                .success(successCallback)
                .error(errorCallback);
        	
			},

			refresh : function(successCallback, errorCallback, moduleName) {

				var url = AUTHORIZATION_CONSTANTS.AUTHORIZATION_API.URL + "modules/" + moduleName + "/refresh";
				var token = $sessionStorage.token;
				
				$http({
                    url: url,
                    method: 'PUT',
                    cache: false,
                    headers: {
		              'Content-Type': 'application/json',
		              'Authorization': 'Bearer ' + token
		            }
                })
                .success(successCallback)
                .error(errorCallback);
        	
			},

			remove : function(successCallback, errorCallback, moduleName) {

				var url = AUTHORIZATION_CONSTANTS.AUTHORIZATION_API.URL + "modules/" + moduleName;
				var token = $sessionStorage.token;
				
				$http({
                    url: url,
                    method: 'DELETE',
                    cache: false,
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