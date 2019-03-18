let taskOne = {
	bindings: {},
	templateUrl: require('./task-one.html'),
	controller: class appCtrl {
	constructor($scope, $rootScope, $state, appService, $filter) {
		this.appService = appService;
		// this.appService.serviceVar = "Task1";
		// this.homeVar = "test1t";

		// $scope.MyModel = {};
  //       $scope.MyModel.Test = "none";
  //       $scope.MyModel.WriteKey = "";
  //       $scope.MyModel.WriteValue = "";
  //       $scope.MyModel.WriteDescription = "";
  //       $scope.MyModel.WriteSpeaker = "";
  //       $scope.MyModel.ReadKey = "";
  //       $scope.MyModel.ReadValue = "";
  //       $scope.MyModel.ReadDescription = "";
  //       $scope.MyModel.ReadSpeaker = "";
        
  //       console.debug("test debug message");
        
  //       if (typeof(localStorage) == 'undefined' )
  //         $scope.MyModel.Test = 'Your browser does not support HTML5 localStorage. Try upgrading.';
  //       else
  //         $scope.MyModel.Test = "Found localStorage";
        
  //       $scope.WriteToStorage = function () {
  //         console.debug("writing to storage");
  //         localStorage.setItem($scope.MyModel.WriteKey, $scope.MyModel.WriteValue);
  //         localStorage.setItem('c', 'hard coded');
  //       }
        
  //       $scope.ReadFromStorage = function () {
  //         console.debug("reading from storage");
  //         $scope.MyModel.ReadValue = localStorage.getItem($scope.MyModel.ReadKey);
  //         console.debug(localStorage.getItem('c'));
  //       };

  //       $scope.api_url;
		// $scope.api_token;
		// $scope.submit=function(){   
		//     localStorage.setItem('api_url', JSON.stringify($scope.api_url));
		//     localStorage.setItem('api_token', JSON.stringify($scope.api_token));

		//     console.log($scope.api_url);
		//     console.log($scope.api_token)
		// }

	
			$scope.appTitle = "Events";
			$scope.saved = localStorage.getItem('events');
			$scope.todos = ($scope.saved !== null) ? JSON.parse($scope.saved) : [];

			// $scope.currentPage = 1
			// ,$scope.numPerPage = 10
			// ,$scope.maxSize = 5;

			var localSet = function() {
			    localStorage.setItem('events', JSON.stringify($scope.todos));
			};

			localSet();

			$rootScope.addTodo = function(array) {

			  	array.map(item => {
			    	$scope.id = $rootScope.eventID;
					$scope.title = item.title;
					$scope.field = item.field;
					$scope.speaker = item.speaker;
					$scope.date = item.date;
					$scope.contactnumber = item.contactnumber;
					$scope.email = item.email;
					$rootScope.address.name = item.address;
					$scope.description = item.description;
				});

			  	$scope.todos.push({
					id: $scope.id,
					title: $scope.title,
					field: $scope.field,
					speaker: $scope.speaker,
					date: $scope.date,
					number: $scope.contactnumber,
					email: $scope.email,
					address: $rootScope.address.name ,
					description: $scope.description,
					doneProd: false,
					doneDev: false
				});
			    
			    $scope.title = ''; //clear the input after adding
			    $scope.field = '';
			    $scope.speaker = '';
			    $scope.date = '';
			    $scope.number = '';
			    $scope.email = '';
			    $rootScope.address = {
		            name: '',
		            place: '',
		            components: {
						placeId: '',
						unittNumber: '', 
						streetNumber: '', 
						street: '',
						addressLine2: '', 
						suburb: '', 
						city: '',
						postCode: '',
						state: '',
						countryCode: '',
						country: '',
						district: '',
						location: {
			                lat: '',
			                long: ''
		              	}
		            }
		        };
			    $scope.description = '';
			    localSet();
			  };

			  $scope.addNewEvent = function() {

			  let lastIndex = $scope.todos.length -1;
			  	if($scope.todos.length === 0) {
			  		$rootScope.eventID = 1;
			  	} else {
			  		$rootScope.eventID = $scope.todos[lastIndex].id +1;
			  	}
			  	
			  	$state.go('taskTwo');
			  }

			  $scope.remaining = function() {
			    var count = 0;
			    angular.forEach($scope.todos, function(todo){
			      count+= todo.doneProd && todo.doneDev ? 0 : 1;
			    });
			    return count;
			  };

			  $scope.archive = function() {
			    var rusure = confirm("Are you sure you want to remove the completed tasks from the list?");
			    if(rusure){
			      var oldTodos = $scope.todos;
			      $scope.todos = [];

			      angular.forEach(oldTodos, function(todo){
			        if (!todo.doneProd || !todo.doneDev)
			          $scope.todos.push(todo);
			      });
			      localSet();
			    }
			  };

			$scope.delete = function ( idx ) {
			    var rusure = confirm("Are you sure you want to remove the task from the list?");
			    if(rusure){
			      $scope.todos.splice(idx, 1);
			      localSet();
			    }
			};

			$rootScope.edit = function ( id, array ) {
			    //var changes = prompt("Please make the changes below", $scope.todos[idx].text);
			    //let changes = prompt("Please make the changes below", $scope.todos[idx].title);
			    //if(changes != null){

			    let idx = $scope.todos.findIndex(x => x.id === id);
				array.map(item => {
	      			$scope.todos[idx].title = item.title;
	      			$scope.todos[idx].field = item.field;
	      			$scope.todos[idx].speaker = item.speaker;
	      			$scope.todos[idx].date = item.date;
	      			$scope.todos[idx].contactnumber = item.number;
	      			$scope.todos[idx].email = item.email;
	      			$scope.todos[idx].address = item.address;
	      			$scope.todos[idx].description = item.description;
	      		});
			    localSet();
			};

			  $scope.checkboxClick = function() {
			    localSet();
			  };

			  $('.splash, .container').fadeToggle();

			  // $scope.$watch('currentPage + numPerPage', function() {
			  //   var begin = (($scope.currentPage - 1) * $scope.numPerPage)
			  //   , end = begin + $scope.numPerPage;
			    
			  //   $scope.filteredTodos = $scope.todos.slice(begin, end);
			  // });
		
			$scope.$watch('searchText', function() {
				let json = $scope.todos;
			  	$scope.filteredtodos = $filter('filter')($scope.todos, $scope.searchText);

				//console.log(json[obj].text); //compare this with your "searchtext"
			});

			$rootScope.formDataKey = false;
			$scope.rowClick = function rowClick (path, todo) {
				$state.go(path);
	            //$location.path( path );

	            $rootScope.formDataKey = true;
	            $rootScope.path = path;
	            $rootScope.row = todo;
	        }
	}
},
	controllerAs: 'taskOneCtrl'
}
taskOne.$inject = ['$scope', '$rootScope', '$state', 'appService', '$filter'];
export default taskOne;