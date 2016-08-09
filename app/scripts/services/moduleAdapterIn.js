angular
    .module('authorization')
	.factory('moduleAdapterIn', function($sessionStorage) {

		var getCountryByCode = function(code) {

			for (var country in $sessionStorage.countries) {
				if ($sessionStorage.countries[country].code == code) {
					return $sessionStorage.countries[country];
				}
			}
		};

		var adaptCountries = function(countryCodes) {

			var countries = [];
			for (var countryCode in countryCodes) {

				if (countryCodes[countryCode] == "ALL") {
					return {all: true, list: []};
				}

				countries.push(getCountryByCode(countryCodes[countryCode]));
			}
			return {all: false, list: countries};
		};

		var adaptPaymentModels = function(listPaymentModels) {

			return {
				all: listPaymentModels.indexOf("ALL") > -1,
				aggregator: listPaymentModels.indexOf("AGGREGATOR") > -1,
				gateway: listPaymentModels.indexOf("GATEWAY") > -1
			};
		};

		var adaptAccountIds = function(listIds) {

			for (var id in listIds) {

				if (listIds[id] == "ALL") {
					return {all: true, list: []};
				}
			}
			return {all: false, list: listIds};

		};

		var getRole = function(roleName) {
			for (var role in $sessionStorage.rolesDefault) {
				if ($sessionStorage.rolesDefault[role] == roleName) {
					var roleObj = {};
					roleObj.name = $sessionStorage.rolesDefault[role];
					return roleObj;
				}
			}
		};

		var adaptRoles = function(roles) {

			var list = [];

			for (var role in roles) {

				if (roles[role] == "ALL") {
					return {all: true, list: []};
				}

				list.push(getRole(roles[role]));

			}
			return {all: false, list: list};
		};


		return {

			adaptFeatures : function(features) {

				var map = {};

				for (var feature in features) {
					var entry = {
						// mapCountries : adaptCountries(features[feature].countries),
						// paymentModels : adaptPaymentModels(features[feature].paymentModels),
						mapCountries : [],
						paymentModels : [],
						mapAccountIds : adaptAccountIds(features[feature].accountIds),
						mapRoles: adaptRoles(features[feature].roles)
					};
					map[feature] = entry;
				}
				return map;
			}

		};

	});