routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default function routing ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
        .state('taskOne', {
          url: '/taskOne',
          template: '<task-one></task-one>'
        })
        .state('taskTwo', {
          url: '/taskTwo',
          template: '<task-two></task-two>',
        })
  $urlRouterProvider.otherwise('/taskOne');
  $locationProvider.html5Mode(false);
}
