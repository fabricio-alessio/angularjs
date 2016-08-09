angular
	.module('authorization')
	.factory('loginService', function($http, $sessionStorage, AUTHORIZATION_CONSTANTS){

		return {
		
			doLogin : function(user, successCallback, errorCallback) {

				var url = AUTHORIZATION_CONSTANTS.AUTHORIZATION_API.URL + "superusers/login";

				$http({
                    url: url,
                    method: 'POST',
                    cache: false,
                    data: user,
                    headers: {
		              'Content-Type': 'application/json',
		            }
                })
                .success(function(response){
                	$sessionStorage.token = response.token;
                	successCallback(response);
                })
                .error(errorCallback);

			},

			doLogout : function() {
				$sessionStorage.$reset();
			}
		};
});