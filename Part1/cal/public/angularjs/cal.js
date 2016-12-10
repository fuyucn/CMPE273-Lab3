var cal = angular.module('cal', []);

cal.controller('cal', function($scope, $http) {

	$scope.data = {
	    availableOptions: [
	      {value: 1, name: 'Add'},
	      {value: 2, name: 'Subtraction'},
	      {value: 3, name: 'Multiple'},
	      {value: 4, name: 'Division'}
	    ],
	    selectedOption: {value: 1, name: 'Add'} //This sets the default value of the select in the ui
    };

	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/cal',
			data : {
				"first_num" : $scope.first_num,
				"sec_num" : $scope.sec_num,
				"action" : $scope.data.selectedOption.value
			}
		}).success(function(data) {

			if (data.statusCode == 200) {
				$scope.result = data.result;

			}else{
				$scope.result = data.result;
				alert("plsase check your itput");
			}

		}).error(function(error) {
			alert(error);
		});
	};
})
