angular
    .module('authorization')
	.factory('moduleAdapterOut', function() {

		var adaptCountries = function(mapCountries) {

			if (mapCountries.all) {
				return ["ALL"];
			}

			var list = [];

			for(var country in mapCountries.list){
				list.push(mapCountries.list[country].code);
			}

			return list;
			
		};

		var adaptPaymentModels = function(mapPaymentModels) {

			if (mapPaymentModels.all){
				return ["ALL"];
			}

			var list = [];

			if (mapPaymentModels.aggregator) {
				list.push("AGGREGATOR");
			}
			if (mapPaymentModels.gateway) {
				list.push("GATEWAY");
			}

			return list;
		};

		var adaptAccountIds = function(mapIds) {

			if (mapIds.all) {
				return ["ALL"];
			} else {
				return mapIds.list;
			}

		};

		var adaptRoles = function(mapRoles) {

			if (mapRoles.all) {
				return ["ALL"];
			} else {

				var list = [];

				for(var role in mapRoles.list){
					list.push(mapRoles.list[role].name);
				}
				return list;
			}

		};

		return {

			adaptFeatures : function(features) {

				var map = {};

				for (var feature in features) {
					var entry = {
						// countries : adaptCountries(features[feature].mapCountries),
						// paymentModels : adaptPaymentModels(features[feature].paymentModels),
						countries : [],
						paymentModels : [],
						accountIds : adaptAccountIds(features[feature].mapAccountIds),
						roles : adaptRoles(features[feature].mapRoles)
					};
					map[feature] = entry;
				}
				return map;
			}

		};

	});