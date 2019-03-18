let taskTwo = {
  	bindings: {},
  	templateUrl: require('./task-two.html'),
  	controller: class appCtrl {
    	constructor($scope, $rootScope, $state, appService, $filter, $uibModal) {
			this.appService = appService;
			this.appService.serviceVar = "test"; 
			this.myVar = "js test";

			// Search - Form
        // $scope.salutation = [
        //     {value: 'Ms', label: 'Ms'},
        //     {value: 'Mrs', label: 'Mrs'},
        //     {value: 'Miss', label: 'Miss'},
        //     {value: 'Mr', label: 'Mr'}
        // ];

        // $scope.gender = [
        //     {value: 'Female', label: 'Female'},
        //     {value: 'Male', label: 'Male'},
        //     {value: 'Other', label: 'Other'}
        // ];

        $scope.headerImages = [
            {name: 'img1.jpg', id: 1},
            {name: 'img2.jpg', id: 2},
            {name: 'img3.jpg', id: 3},
        ]
        $scope.GetValue = function () {
                let imgId = $scope.SelectedImgId;
                let imgName;
                for (var i = 0; i < $scope.headerImages.length; i++) {
                    if ($scope.headerImages[i].id == imgId) {
                        imgName = $scope.headerImages[i].name;
                        break;
                    }
                }
                var message = "Value: " + imgId + " Text: " + imgName + "\n";
                console.log(message);
                $scope.filepreview = imgName;
            }

        // Address 
        $scope.statesOrRegions = [
            {value: 'Bavaria', label: 'BY'}
        ];

        $scope.countries = [
            {value: 'Germany', label: 'Germany'},
            {value: 'United Kingdom', label: 'United Kingdom'}
        ];

        $scope.options = {
            //types: ['(cities)'],
            componentRestrictions: { country: ['DE', 'UK'] }
        };

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
    
        // Address - Set the default value of addressCheckbox to false - show all address fields
        $scope.addressCheckbox = false;

        // Address - Manual - on click
        $scope.setAddressFields = function setAddressFields(countryValue, stateValue) {
            if(countryValue) {
                for(var i=0; i < $scope.countries.length; i++) {
                    if($scope.countries[i].value === countryValue) {
                        vm.address.components.country = $scope.countries[i];
                        break;
                    }
                }
            }

            if(stateValue) {
                for(var i=0; i < $scope.statesOrRegions.length; i++) {
                    if($scope.statesOrRegions[i].value === stateValue ||
                        $scope.statesOrRegions[i].label === stateValue) {
                        vm.address.components.state = $scope.statesOrRegions[i];
                        break;
                    }
                }
            }
        }

        // Phone, mobile and email format
        //$scope.phoneNumber = /^\(?(?:\+?61|0)(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}$/;
        $scope.ausContactNumber = /^(?:\+?61|0)4 ?(?:(?:[01] ?[0-9]|2 ?[0-57-9]|3 ?[1-9]|4 ?[7-9]|5 ?[018]) ?[0-9]|3 ?0 ?[0-5])(?: ?[0-9]){5}$/;
        $scope.emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Selected options
        $scope.selectedOptionFn = function selectedOptionFn (id, arrName, selectedOption) { 
            // if(selectedOption) {
            //     var arrLen = arrName.length;
            //     for(var i = 0; i < arrLen; i++) {
            //         if(arrName[i].label === selectedOption) {
            //             arrName[i].selected = true;
            //         }
            //     }
            // }

            // switch(arrName) {
            //     case 'salutation':
            //         vm.salutationSelectedItem = selectedOption;
            //         break;
            //     case 'gender':
            //         vm.genderSelectedItem = selectedOption;
            //         break;
            //     default:
            //     //    code block
            // }

            // vm.salutationSelectedItem = selectedOption;
        }

        $scope.data = $rootScope.row;

        if($rootScope.formDataKey) {

            // Retrieve Data from table - home.controller
            $scope.data = $rootScope.row;
            if($scope.data.id) {
                $scope.id = $scope.data.id;
            }

            // First Name
            if($scope.data.title) {
                $scope.title = $scope.data.title;
            }
             if($scope.data.field) {
                $scope.field = $scope.data.field;
            }
             if($scope.data.speaker) {
                $scope.speaker = $scope.data.speaker;
            }
             if($scope.data.date) {
              //$scope.date = $filter("date")($scope.data.date, 'dd-MM-yyyy');
              $scope.date = $scope.data.date;
            }
            if($scope.data.description) {
                $scope.description = $scope.data.description;
            }

            // set selected value to a particular value
            // Salutation
           //  if($scope.data.salutation) {
           //      for (var i=0; i < $scope.salutation.length; i++) {
           //          if($scope.salutation[i].value == $scope.data.salutation ) {  
           //              $scope.salutationItem = $scope.salutation[i];
           //          }
           //      }
           // }
           // // Gender
           // if($scope.data.gender) {
           //      for (var i=0; i < $scope.gender.length; i++) {
           //          if($scope.gender[i].value == $scope.data.gender ) {
           //              $scope.genderItem = $scope.gender[i];
           //          }
           //      }
           // }

           // Phone
           if($scope.data.contactnumber) {
                $scope.contactnumber = $scope.data.contactnumber;
           }

           // Mobile
           if($scope.data.mobile) {
                $scope.mobile = $scope.data.mobile; 
           }

           // Email
           if($scope.data.email) {
                $scope.email = $scope.data.email;
           }

           // Address
           if($scope.data.address) {
                $rootScope.address.name = $scope.data.address;
           }

      	}

        $scope.disabled = function(invalid) {
          if(!invalid) {

            $scope.eventArray = [];
              $scope.eventArray.push({
                id: $scope.id,
                title: $scope.title,
                field: $scope.field,
                speaker: $scope.speaker,
                date: $scope.date,
                number: $scope.contactnumber,
                email: $scope.email,
                address: $rootScope.address.name,
                description: $scope.description,
                doneProd: false,
                doneDev: false
              });

            if($rootScope.formDataKey) {
              //$rootScope.eventID = $scope.data.id;
              $rootScope.edit($scope.data.id, $scope.eventArray);
            } else {
              //$scope.id = $rootScope.eventID;
              $rootScope.addTodo($scope.eventArray);
            }
          
            $state.go('taskOne');
            
          }
        }

        // $scope.promote = function(employee) {
        //   var $modalInstance = $uibModal.open({
        //     templateUrl: 'confirmTpl.html',
        //     controller: function($scope) {
        //       $scope.employee = employee;
        //       // $scope.items = items;
        //       // $scope.selected = {
        //       //   item: $scope.items[0]
        //       // };

        //       $scope.ok = function () {
        //         $modalInstance.close(); //$scope.selected.item
        //       };

        //       $scope.cancel = function () {
        //         $modalInstance.dismiss('cancel');
        //       };
        //     }
        //   });
        // };

    	}
  	}
}

taskTwo.$inject = ['$scope', '$rootScope', '$state', 'appService', '$filter', '$uibModal']; 
export default taskTwo;